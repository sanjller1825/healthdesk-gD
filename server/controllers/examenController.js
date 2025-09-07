import pool from '../index.js';

export const getExamenes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM examenes ORDER BY creado_en DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener exámenes:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getExamenById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM examenes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener examen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createExamen = async (req, res) => {
  const { consulta_id, nombre, resultado, fecha_programada, fecha_realizado, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO examenes (consulta_id, nombre, resultado, fecha_programada, fecha_realizado, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [consulta_id, nombre, resultado, fecha_programada, fecha_realizado, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear examen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateExamen = async (req, res) => {
  const { id } = req.params;
  const { nombre, resultado, fecha_programada, fecha_realizado, estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE examenes SET nombre = $1, resultado = $2, fecha_programada = $3, fecha_realizado = $4, estado = $5 WHERE id = $6 RETURNING *',
      [nombre, resultado, fecha_programada, fecha_realizado, estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar examen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteExamen = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM examenes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Examen no encontrado' });
    }
    res.status(200).json({ message: 'Examen eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar examen:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
