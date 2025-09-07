import express from 'express';
import { getRecetas, getRecetaById, createReceta, updateReceta, deleteReceta } from '../controllers/recetaController.js';

const router = express.Router();

router.get('/recetas', getRecetas);
router.get('/recetas/:id', getRecetaById);
router.post('/recetas', createReceta);
router.put('/recetas/:id', updateReceta);
router.delete('/recetas/:id', deleteReceta);

export default router;