import { useParams, Link } from 'react-router-dom'
import useStore from '../lib/store'
import { Card, CardHeader, CardContent } from '../components/ui/Card'
import Tabs from '../components/ui/Tabs'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

export default function PatientDetail() {
  const { id } = useParams()
  const { patients, appointments, prescriptions } = useStore()
  const p = patients.find(x=>x.id===id)

  if (!p) return <div>Paciente no encontrado. <Link className="text-brand-700" to="/patients">Volver</Link></div>

  const citas = appointments.filter(a=>a.pacienteId===id)
  const recetas = prescriptions.filter(r=>r.pacienteId===id)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex items-start justify-between">
          <div>
            <div className="text-xl font-semibold">{p.nombre}</div>
            <div className="text-sm text-slate-500">{p.cedula} · {p.email} · {p.telefono}</div>
            <div className="text-sm text-slate-500">{p.direccion}</div>
          </div>
          <Link to="/appointments"><Button variant="ghost">+ Agendar cita</Button></Link>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {p.alergias?.length ? <Badge type="warning">Alergias: {p.alergias.join(', ')}</Badge> : <Badge>Alergias: ninguna</Badge>}
            {p.condiciones?.length ? <Badge type="info">Condiciones: {p.condiciones.join(', ')}</Badge> : null}
          </div>
        </CardContent>
      </Card>

      <Tabs
        tabs={[
          { label: 'Citas', content: (
            <div className="space-y-2">
              {citas.map(c => (
                <div key={c.id} className="p-3 border rounded-xl bg-white flex items-center justify-between">
                  <div>
                    <div className="font-medium">{c.fecha} {c.hora} — {c.motivo}</div>
                    <div className="text-sm text-slate-500">Tipo: {c.tipo}</div>
                  </div>
                  <Badge type={c.estado==='completada'?'success':c.estado==='cancelada'?'danger':c.estado==='en curso'?'warning':'info'}>{c.estado}</Badge>
                </div>
              ))}
              {!citas.length && <div className="text-sm text-slate-500">Sin citas aún.</div>}
            </div>
          )},
          { label: 'Recetas', content: (
            <div className="space-y-2">
              {recetas.map(r => (
                <div key={r.id} className="p-3 border rounded-xl bg-white">
                  <div className="font-medium">{r.fecha} — Diagnóstico: {r.diagnostico}</div>
                  <ul className="list-disc pl-5">
                    {r.medicamentos?.map((m,idx)=>(
                      <li key={idx}>{m.nombre} — {m.dosis}, {m.frecuencia}, {m.duracion}. {m.indicaciones}</li>
                    ))}
                  </ul>
                  {r.alertas?.length ? <div className="mt-2 text-red-700 text-sm">Alertas: {r.alertas.map(a=>`${a.a}+${a.b} (${a.level})`).join(', ')}</div> : null}
                </div>
              ))}
              {!recetas.length && <div className="text-sm text-slate-500">Sin recetas aún.</div>}
              <Link to="/prescriptions"><Button className="mt-2">+ Nueva receta</Button></Link>
            </div>
          )},
          { label: 'Signos vitales / Historial', content: (
            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {p.signosVitales?.map((s,idx)=>(
                  <div key={idx} className="p-3 border rounded-xl bg-white">
                    <div className="font-medium">{s.fecha}</div>
                    <div className="text-sm">PA: {s.pa} | FC: {s.fc} | Temp: {s.temp}°C | SpO₂: {s.spo2}%</div>
                  </div>
                ))}
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <div className="font-medium">Notas clínicas</div>
                <div className="text-sm text-slate-700 whitespace-pre-wrap">{p.notas || 'Sin notas.'}</div>
              </div>
            </div>
          )},
        ]}
      />
    </div>
  )
}
