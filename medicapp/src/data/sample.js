import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

const today = dayjs().format('YYYY-MM-DD')

const patients = [
  {
    id: uuidv4(),
    cedula: "0912345678",
    nombre: "María Pérez",
    email: "maria@example.com",
    telefono: "+593987654321",
    nacimiento: "1990-04-12",
    sexo: "F",
    alergias: ["Penicilina"],
    condiciones: ["Hipertensión"],
    contactosEmergencia: [{ nombre: "José Pérez", telefono: "+59399111222" }],
    direccion: "Guayaquil, EC",
    signosVitales: [
      { fecha: today, pa: "120/80", fc: 75, temp: 36.6, spo2: 98 },
    ],
    notas: "Paciente ansiosa ante procedimientos."
  },
  {
    id: uuidv4(),
    cedula: "0922334455",
    nombre: "Carlos Gómez",
    email: "carlos@example.com",
    telefono: "+593989991111",
    nacimiento: "1985-10-29",
    sexo: "M",
    alergias: [],
    condiciones: ["Diabetes Tipo 2"],
    contactosEmergencia: [{ nombre: "Ana Gómez", telefono: "+59399333444" }],
    direccion: "Milagro, EC",
    signosVitales: [
      { fecha: today, pa: "130/85", fc: 80, temp: 36.8, spo2: 97 },
    ],
    notas: ""
  }
]

const appointments = [
  { id: uuidv4(), pacienteId: patients[0].id, tipo: "clínica", fecha: today, hora: "10:00", motivo: "Control", estado: "programada", notas: "" },
  { id: uuidv4(), pacienteId: patients[1].id, tipo: "en línea", fecha: today, hora: "14:30", motivo: "Resultados", estado: "programada", enlace: "https://videollamada.local" },
]

const prescriptions = [
  {
    id: uuidv4(),
    pacienteId: patients[1].id,
    fecha: today,
    diagnostico: "Hiperglucemia",
    medicamentos: [
      { nombre: "Metformina", dosis: "850mg", frecuencia: "cada 12h", duracion: "30 días", indicaciones: "Con alimentos" }
    ],
    observaciones: "",
    costo: 20,
    alertas: []
  }
]

export default { patients, appointments, prescriptions }
