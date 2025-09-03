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
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({status: 'ok', time: result.rows[0]});
    }catch (error) {
        console.error(errorMessage);
        res.status(500).send("Error en la DB");
    }
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});