import { NavLink } from 'react-router-dom'

function linkClass({ isActive }) {
  return `sidebar-link ${isActive ? 'active' : ''}`
}

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
      <nav className="space-y-1">
        <NavLink to="/" end className={linkClass}>Panel</NavLink>
        <NavLink to="/appointments" className={linkClass}>Citas</NavLink>
        <NavLink to="/patients" className={linkClass}>Pacientes</NavLink>
        <NavLink to="/prescriptions" className={linkClass}>Recetas</NavLink>
      </nav>
    </aside>
  )
}
