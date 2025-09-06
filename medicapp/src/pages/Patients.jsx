import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../lib/store'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import Table from '../components/ui/Table'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

export default function Patients() {
  const { patients, addPatient } = useStore()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ cedula:'', nombre:'', email:'', telefono:'', nacimiento:'', sexo:'', alergias:'', condiciones:'', direccion:'' })

  const filtered = useMemo(()=>{
    return patients.filter(p=>{
      const hay = (v)=> (v||'').toLowerCase().includes(q.toLowerCase())
      return hay(p.nombre) || hay(p.cedula) || hay(p.email)
    })
  }, [patients, q])

  function submit() {
    addPatient({
      ...form,
      alergias: form.alergias ? form.alergias.split(',').map(s=>s.trim()) : [],
      condiciones: form.condiciones ? form.condiciones.split(',').map(s=>s.trim()) : [],
      contactosEmergencia: [],
      signosVitales: [],
      notas: ''
    })
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div className="font-semibold">Gestión de Pacientes</div>
          <div className="flex gap-3">
            <Input placeholder="Buscar por nombre, cédula o email..." value={q} onChange={e=>setQ(e.target.value)} />
            <Button onClick={()=>setOpen(true)}>+ Nuevo paciente</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              { header: 'Nombre', render: (p)=> <Link className="text-brand-700" to={`/patients/${p.id}`}>{p.nombre}</Link> },
              { header: 'Cédula', accessor: 'cedula' },
              { header: 'Email', accessor: 'email' },
              { header: 'Teléfono', accessor: 'telefono' },
            ]}
            data={filtered}
          />
        </CardContent>
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="Nuevo paciente"
        footer={<div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={()=>setOpen(false)}>Cancelar</Button>
          <Button onClick={submit}>Guardar</Button>
        </div>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input label="Nombre completo" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})}/>
          <Input label="Cédula" value={form.cedula} onChange={e=>setForm({...form, cedula:e.target.value})}/>
          <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          <Input label="Teléfono" value={form.telefono} onChange={e=>setForm({...form, telefono:e.target.value})}/>
          <Input label="Fecha de nacimiento" type="date" value={form.nacimiento} onChange={e=>setForm({...form, nacimiento:e.target.value})}/>
          <Input label="Sexo (M/F)" value={form.sexo} onChange={e=>setForm({...form, sexo:e.target.value})}/>
          <Input label="Alergias (separadas por coma)" value={form.alergias} onChange={e=>setForm({...form, alergias:e.target.value})}/>
          <Input label="Condiciones médicas (coma)" value={form.condiciones} onChange={e=>setForm({...form, condiciones:e.target.value})}/>
          <Input label="Dirección" className="md:col-span-2" value={form.direccion} onChange={e=>setForm({...form, direccion:e.target.value})}/>
        </div>
      </Modal>
    </div>
  )
}
