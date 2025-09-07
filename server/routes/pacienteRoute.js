import express from "express";
import {createPaciente, getPacientes, getPacienteById, updatePaciente, deletePaciente} from "../controllers/pacienteController.js";

const router = express.Router();

router.post("/pacientes", createPaciente);
router.get("/pacientes", getPacientes);
router.get("/pacientes/:id", getPacienteById);
router.put("/pacientes/:id", updatePaciente);
router.delete("/pacientes/:id", deletePaciente);

export default router;
