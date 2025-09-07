import express from 'express';
import { getExamenes, getExamenById, createExamen, updateExamen, deleteExamen } from '../controllers/examenController.js';

const router = express.Router();

router.get('/examenes', getExamenes);
router.get('/examenes/:id', getExamenById);
router.post('/examenes', createExamen);
router.put('/examenes/:id', updateExamen);
router.delete('/examenes/:id', deleteExamen);

export default router;