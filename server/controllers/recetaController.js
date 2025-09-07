import pool from '../index.js';

export const getRecetas = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        r.id,
        r.paciente_id,
        r.usuario_id,
        r.fecha_emision,
        r.codigo_receta,
        r.instrucciones,
        r.creado_en,
        json_agg(json_build_object('medicamento', mr.medicamento, 'dosis', mr.dosis, 'frecuencia', mr.frecuencia)) AS medicamentos_recetados
      FROM recetas r
      LEFT JOIN medicamentos_recetados mr ON r.id = mr.receta_id
      GROUP BY r.id
      ORDER BY r.creado_en DESC`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getRecetaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT
        r.id,
        r.paciente_id,
        r.usuario_id,
        r.fecha_emision,
        r.codigo_receta,
        r.instrucciones,
        r.creado_en,
        json_agg(json_build_object('medicamento', mr.medicamento, 'dosis', mr.dosis, 'frecuencia', mr.frecuencia)) AS medicamentos_recetados
      FROM recetas r
      LEFT JOIN medicamentos_recetados mr ON r.id = mr.receta_id
      WHERE r.id = $1
      GROUP BY r.id`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener receta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createReceta = async (req, res) => {
  const { paciente_id, usuario_id, fecha_emision, codigo_receta, instrucciones, medicamentos_recetados } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const recetaResult = await client.query(
      'INSERT INTO recetas (paciente_id, usuario_id, fecha_emision, codigo_receta, instrucciones) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [paciente_id, usuario_id, fecha_emision, codigo_receta, instrucciones]
    );
    const recetaId = recetaResult.rows[0].id;

    if (medicamentos_recetados && medicamentos_recetados.length > 0) {
      const medicamentosQuery = 'INSERT INTO medicamentos_recetados (receta_id, medicamento, dosis, frecuencia) VALUES ($1, $2, $3, $4)';
      for (const med of medicamentos_recetados) {
        await client.query(medicamentosQuery, [recetaId, med.medicamento, med.dosis, med.frecuencia]);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Receta y medicamentos creados correctamente', recetaId });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear receta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  } finally {
    client.release();
  }
};

export const updateReceta = async (req, res) => {
  const { id } = req.params;
  const { fecha_emision, codigo_receta, instrucciones } = req.body;
  try {
    const result = await pool.query(
      'UPDATE recetas SET fecha_emision = $1, codigo_receta = $2, instrucciones = $3 WHERE id = $4 RETURNING *',
      [fecha_emision, codigo_receta, instrucciones, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar receta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteReceta = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM recetas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    res.status(200).json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar receta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};