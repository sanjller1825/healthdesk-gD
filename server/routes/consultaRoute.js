import express from 'express';
import { getConsultas, getConsultaById, createConsulta, updateConsulta, deleteConsulta } from '../controllers/consultas.controller.js';

const router = express.Router();

router.get('/consultas', getConsultas);
router.get('/consultas/:id', getConsultaById);
router.post('/consultas', createConsulta);
router.put('/consultas/:id', updateConsulta);
router.delete('/consultas/:id', deleteConsulta);

export default router;