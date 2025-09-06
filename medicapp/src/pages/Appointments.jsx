import { useMemo, useState } from 'react'
import useStore from '../lib/store'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import Table from '../components/ui/Table'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import dayjs from 'dayjs'

export default function Appointments() {
  const { appointments, patients, addAppointment, updateAppointment } = useStore()
  const [q, setQ] = useState('')
  const [estado, setEstado] = useState('')
  const [tipo, setTipo] = useState('')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ pacienteId: '', tipo: 'clínica', fecha: dayjs().format('YYYY-MM-DD'), hora: '09:00', motivo: '' })

  const filtered = useMemo(()=>{
    return appointments.filter(a=>{
      const p = patients.find(p=>p.id===a.pacienteId)
      const matchQ = !q || p?.nombre?.toLowerCase().includes(q.toLowerCase()) || a.motivo?.toLowerCase().includes(q.toLowerCase())
      const matchE = !estado || a.estado===estado
      const matchT = !tipo || a.tipo===tipo
      return matchQ && matchE && matchT
    })
  }, [appointments, patients, q, estado, tipo])

  function submit() {
    if (!form.pacienteId) return alert('Seleccione un paciente')
    addAppointment(form)
    setOpen(false)
  }

  function setStatus(a, estado) { updateAppointment(a.id, { estado }) }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-col md:flex-row gap-3 md:items-end md:justify-between">
          <div className="font-semibold">Gestión de Citas</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Buscar por paciente o motivo..." value={q} onChange={e=>setQ(e.target.value)} />
            <Select value={estado} onChange={e=>setEstado(e.target.value)}>
              <option value="">Estado (todos)</option>
              <option>programada</option>
              <option>en curso</option>
              <option>completada</option>
              <option>cancelada</option>
            </Select>
            <Select value={tipo} onChange={e=>setTipo(e.target.value)}>
              <option value="">Tipo (todos)</option>
              <option>clínica</option>
              <option>en línea</option>
            </Select>
            <Button onClick={()=>setOpen(true)}>+ Nueva cita</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              { header: 'Fecha', accessor: 'fecha' },
              { header: 'Hora', accessor: 'hora' },
              { header: 'Paciente', render: (a)=> patients.find(p=>p.id===a.pacienteId)?.nombre },
              { header: 'Tipo', accessor: 'tipo' },
              { header: 'Motivo', accessor: 'motivo' },
              { header: 'Estado', accessor: 'estado' },
              { header: 'Acciones', render: (a)=> (
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={()=>setStatus(a,'en curso')}>En curso</Button>
                  <Button variant="ghost" onClick={()=>setStatus(a,'completada')}>Completar</Button>
                  <Button variant="ghost" onClick={()=>setStatus(a,'cancelada')}>Cancelar</Button>
                </div>
              )},
            ]}
            data={filtered}
          />
        </CardContent>
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="Nueva cita"
        footer={<div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={()=>setOpen(false)}>Cancelar</Button>
          <Button onClick={submit}>Guardar</Button>
        </div>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select label="Paciente" value={form.pacienteId} onChange={e=>setForm({...form, pacienteId:e.target.value})}>
            <option value="">Seleccione...</option>
            {patients.map(p=> <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </Select>
          <Select label="Tipo" value={form.tipo} onChange={e=>setForm({...form, tipo:e.target.value})}>
            <option>clínica</option>
            <option>en línea</option>
          </Select>
          <Input label="Fecha" type="date" value={form.fecha} onChange={e=>setForm({...form, fecha:e.target.value})}/>
          <Input label="Hora" type="time" value={form.hora} onChange={e=>setForm({...form, hora:e.target.value})}/>
          <Input label="Motivo" value={form.motivo} onChange={e=>setForm({...form, motivo:e.target.value})}/>
          <Input label="Enlace (si es en línea)" value={form.enlace||''} onChange={e=>setForm({...form, enlace:e.target.value})}/>
        </div>
      </Modal>
    </div>
  )
}
