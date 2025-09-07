import pool from '../index.js';

export const createPaciente = async (req, res) => {
  try {
    const { nombre, apellidos, fecha_nacimiento, genero, direccion, telefono, email } = req.body;
    const result = await pool.query(
      `INSERT INTO pacientes (nombre, apellidos, fecha_nacimiento, genero, direccion, telefono, email) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nombre, apellidos, fecha_nacimiento, genero, direccion, telefono, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPacientes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pacientes ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPacienteById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pacientes WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePaciente = async (req, res) => {
  try {
    const { nombre, apellidos, fecha_nacimiento, genero, direccion, telefono, email } = req.body;
    const result = await pool.query(
      `UPDATE pacientes 
       SET nombre=$1, apellidos=$2, fecha_nacimiento=$3, genero=$4, direccion=$5, telefono=$6, email=$7
       WHERE id=$8 RETURNING *`,
      [nombre, apellidos, fecha_nacimiento, genero, direccion, telefono, email, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePaciente = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM pacientes WHERE id=$1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json({ message: "Paciente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
