import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from "pg";
import pacienteRoute from './routes/pacienteRoute.js';
import userRoute from './routes/userRoute.js';
import examenRoute from './routes/examenRoute.js';
import consultaRoute from './routes/consultaRoute.js';
import recetaRoute from './routes/recetaRoute.js';

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

pool.connect()
    .then(() => {
        console.log('Conexión a PostgreSQL exitosa');
    })
    .catch((err) => {
        console.error('Error al conectar a PostgreSQL:', err);
});

export default pool;

app.use('/api', pacienteRoute);
app.use('/api', userRoute);
app.use('/api', examenRoute);
app.use('/api', consultaRoute);
app.use('/api', recetaRoute);

app.listen(port, () => {console.log(`Servidor corriendo en puerto ${port}`);});

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

