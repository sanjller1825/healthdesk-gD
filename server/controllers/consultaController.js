import pool from '../index.js';

export const getConsultas = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, p.nombre AS nombre_paciente, u.nombre AS nombre_doctor, c.fecha, c.tipo, c.diagnostico, c.estado, c.creado_en
       FROM consultas c
       JOIN pacientes p ON c.paciente_id = p.id
       JOIN usuarios u ON c.usuario_id = u.id
       ORDER BY c.fecha DESC`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener consultas:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getConsultaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Consulta no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener consulta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createConsulta = async (req, res) => {
  const { paciente_id, usuario_id, fecha, tipo, diagnostico, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO consultas (paciente_id, usuario_id, fecha, tipo, diagnostico, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [paciente_id, usuario_id, fecha, tipo, diagnostico, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear consulta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateConsulta = async (req, res) => {
  const { id } = req.params;
  const { fecha, tipo, diagnostico, estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE consultas SET fecha = $1, tipo = $2, diagnostico = $3, estado = $4 WHERE id = $5 RETURNING *',
      [fecha, tipo, diagnostico, estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Consulta no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar consulta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteConsulta = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Consulta no encontrada' });
    }
    res.status(200).json({ message: 'Consulta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar consulta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};