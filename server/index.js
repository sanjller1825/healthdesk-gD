import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.POSTGRE_URL,
    ssl: {
        require: true, 
        rejectUnauthorized: false 
    }
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({status: 'ok', time: result.rows[0]});
    }catch (error) {
        console.error(error);
        res.status(500).send("Error en la DB");
    }
});

pool.connect()
    .then(() => {
        console.log('✅ Conexión a PostgreSQL exitosa');
    })
    .catch((err) => {
        console.error('❌ Error al conectar a PostgreSQL:', err);
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en puerto ${port}`);
});