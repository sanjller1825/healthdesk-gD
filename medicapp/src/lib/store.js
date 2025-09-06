import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import sample from '../data/sample'

const drugWarnings = [
  { a: 'warfarina', b: 'ibuprofeno', level: 'alto', note: 'Riesgo de sangrado aumentado.' },
  { a: 'metformina', b: 'yodo', level: 'medio', note: 'Riesgo de acidosis láctica con contraste yodado.' },
  { a: 'viagra', b: 'nitroglicerina', level: 'alto', note: 'Puede causar hipotensión severa.' },
]

function checkInteractions(meds) {
  const names = meds.map(m => (m.nombre || '').toLowerCase())
  const alerts = []
  for (let rule of drugWarnings) {
    if (names.includes(rule.a) && names.includes(rule.b)) alerts.push(rule)
  }
  return alerts
}

const useStore = create(persist((set, get) => ({
  patients: sample.patients,
  appointments: sample.appointments,
  prescriptions: sample.prescriptions,

  totals: () => {
    const today = dayjs().format('YYYY-MM-DD')
    const todayAppointments = get().appointments.filter(a => a.fecha === today)
    const ingresos = get().prescriptions.reduce((acc, p) => acc + (p.costo || 0), 0)
    return {
      totalPacientes: get().patients.length,
      citasHoy: todayAppointments.length,
      ingresos,
    }
  },

  addPatient: (data) => set(state => ({
    patients: [...state.patients, { id: uuidv4(), ...data }]
  })),
  updatePatient: (id, data) => set(state => ({
    patients: state.patients.map(p => p.id === id ? { ...p, ...data } : p)
  })),

  addAppointment: (data) => set(state => ({
    appointments: [...state.appointments, { id: uuidv4(), estado: 'programada', ...data }]
  })),
  updateAppointment: (id, data) => set(state => ({
    appointments: state.appointments.map(a => a.id === id ? { ...a, ...data } : a)
  })),

  addPrescription: (data) => set(state => {
    const alerts = checkInteractions(data.medicamentos || [])
    return {
      prescriptions: [...state.prescriptions, { id: uuidv4(), alertas: alerts, ...data }]
    }
  }),

  updatePrescription: (id, data) => set(state => ({
    prescriptions: state.prescriptions.map(p => p.id === id ? { ...p, ...data } : p)
  })),

}), { name: 'medicapp-storage' }))

export default useStore
