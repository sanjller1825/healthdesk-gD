import { useMemo, useState } from 'react'
import useStore from '../lib/store'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import Table from '../components/ui/Table'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Select from '../components/ui/Select'

function MedRow({ i, med, onChange, onRemove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
      <Input label="Medicamento" value={med.nombre} onChange={e=>onChange(i,{...med, nombre:e.target.value})} />
      <Input label="Dosis" value={med.dosis} onChange={e=>onChange(i,{...med, dosis:e.target.value})} />
      <Input label="Frecuencia" value={med.frecuencia} onChange={e=>onChange(i,{...med, frecuencia:e.target.value})} />
      <Input label="Duración" value={med.duracion} onChange={e=>onChange(i,{...med, duracion:e.target.value})} />
      <div className="flex gap-2">
        <Input label="Indicaciones" value={med.indicaciones} onChange={e=>onChange(i,{...med, indicaciones:e.target.value})} />
        <Button variant="ghost" onClick={()=>onRemove(i)}>Quitar</Button>
      </div>
    </div>
  )
}

export default function Prescriptions() {
  const { patients, prescriptions, addPrescription } = useStore()
  const [q, setQ] = useState('')
  const [form, setForm] = useState({ pacienteId:'', fecha:'', diagnostico:'', medicamentos:[], observaciones:'', costo:0 })

  const filtered = useMemo(()=>{
    return prescriptions.filter(r=>{
      const p = patients.find(p=>p.id===r.pacienteId)
      const hay = (v)=> (v||'').toLowerCase().includes(q.toLowerCase())
      return hay(p?.nombre) || hay(r.diagnostico)
    })
  }, [prescriptions, patients, q])

  function addMed() {
    setForm({...form, medicamentos:[...form.medicamentos, { nombre:'', dosis:'', frecuencia:'', duracion:'', indicaciones:'' }]})
  }
  function updateMed(i, v) {
    const arr = form.medicamentos.slice(); arr[i]=v; setForm({...form, medicamentos:arr})
  }
  function removeMed(i) {
    const arr = form.medicamentos.slice(); arr.splice(i,1); setForm({...form, medicamentos:arr})
  }

  function submit() {
    if (!form.pacienteId || !form.diagnostico) return alert('Paciente y diagnóstico son obligatorios')
    addPrescription(form)
    alert('Receta creada con validación de interacciones básica')
    setForm({ pacienteId:'', fecha:'', diagnostico:'', medicamentos:[], observaciones:'', costo:0 })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex items-end justify-between gap-3">
          <div className="font-semibold">Gestión de Recetas</div>
          <Input placeholder="Buscar por paciente o diagnóstico..." value={q} onChange={e=>setQ(e.target.value)} />
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              { header: 'Fecha', accessor: 'fecha' },
              { header: 'Paciente', render: (r)=> patients.find(p=>p.id===r.pacienteId)?.nombre },
              { header: 'Diagnóstico', accessor: 'diagnostico' },
              { header: 'Medicamentos', render: (r)=> r.medicamentos?.map(m=>m.nombre).join(', ') },
              { header: 'Alertas', render: (r)=> r.alertas?.map(a=>`${a.a}+${a.b}`).join('; ') },
            ]}
            data={filtered}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><div className="font-semibold">Nueva Receta Digital</div></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select label="Paciente" value={form.pacienteId} onChange={e=>setForm({...form, pacienteId:e.target.value})}>
              <option value="">Seleccione...</option>
              {patients.map(p=> <option key={p.id} value={p.id}>{p.nombre}</option>)}
            </Select>
            <Input label="Fecha" type="date" value={form.fecha} onChange={e=>setForm({...form, fecha:e.target.value})}/>
            <Input label="Diagnóstico" value={form.diagnostico} onChange={e=>setForm({...form, diagnostico:e.target.value})}/>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Medicamentos</div>
            {form.medicamentos.map((m,i)=>(
              <MedRow key={i} i={i} med={m} onChange={updateMed} onRemove={removeMed} />
            ))}
            <Button variant="ghost" onClick={addMed}>+ Agregar medicamento</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input label="Observaciones" value={form.observaciones} onChange={e=>setForm({...form, observaciones:e.target.value})}/>
            <Input label="Costo" type="number" value={form.costo} onChange={e=>setForm({...form, costo:Number(e.target.value)})}/>
          </div>

          <div className="flex justify-end">
            <Button onClick={submit}>Guardar receta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
