import { Card, CardHeader, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'
import Table from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import useStore from '../lib/store'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { appointments, patients, totals } = useStore()
  const t = totals()
  const today = dayjs().format('YYYY-MM-DD')
  const todays = appointments.filter(a => a.fecha === today).slice(0,5)
  const recentPatients = [...patients].slice(-5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader><div className="text-sm text-slate-500">Pacientes totales</div></CardHeader>
          <CardContent><div className="text-3xl font-semibold">{t.totalPacientes}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><div className="text-sm text-slate-500">Citas de hoy</div></CardHeader>
          <CardContent><div className="text-3xl font-semibold">{t.citasHoy}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><div className="text-sm text-slate-500">Ingresos</div></CardHeader>
          <CardContent><div className="text-3xl font-semibold">${t.ingresos.toFixed(2)}</div></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="font-semibold">Citas de hoy</div>
            <Link to="/appointments"><Button variant="ghost">Ver todas</Button></Link>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { header: 'Hora', accessor: 'hora' },
                { header: 'Paciente', render: (a)=> {
                    const p = patients.find(x=>x.id===a.pacienteId); 
                    return <Link className="text-brand-700" to={`/patients/${a.pacienteId}`}>{p?.nombre}</Link>
                  } },
                { header: 'Tipo', accessor: 'tipo' },
                { header: 'Estado', render: (a)=> <Badge type={a.estado==='completada'?'success':a.estado==='cancelada'?'danger':a.estado==='en curso'?'warning':'info'}>{a.estado}</Badge> },
              ]}
              data={todays}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <div className="font-semibold">Pacientes recientes</div>
            <Link to="/patients"><Button variant="ghost">Ver todos</Button></Link>
          </CardHeader>
          <CardContent>
            <Table
              columns={[
                { header: 'Nombre', render: (p)=> <Link className="text-brand-700" to={`/patients/${p.id}`}>{p.nombre}</Link> },
                { header: 'Cédula', accessor: 'cedula' },
                { header: 'Teléfono', accessor: 'telefono' },
              ]}
              data={recentPatients}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/appointments"><Button>+ Nueva cita</Button></Link>
        <Link to="/patients"><Button variant="ghost">+ Nuevo paciente</Button></Link>
        <Link to="/prescriptions"><Button variant="ghost">+ Nueva receta</Button></Link>
      </div>
    </div>
  )
}
