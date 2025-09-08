// src/components/Layout.jsx
import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="top-nav-links">
          <a href="#" className="active">Dashboard</a>
          <a href="#">Pacientes</a>
          <a href="#">Consultas</a>
          <a href="#">Exámenes</a>
          <a href="#">Recetas</a>
        </div>
        <div className="top-nav-user">
          {/* User icon placeholder */}
        </div>
      </nav>

      <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src="https://placehold.co/32x32/1f2937/FFFFFF?text=D" alt="Logo" />
                    <span>HealthDesk</span>
                </div>
                <nav className="flex-1">
                    <a href="#" className="nav-link active">
                        <img src="/icons/homew.png" alt="dashboard" className="nav-icon" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="nav-link">
                        <img src="/icons/pacientesw.png" alt="pacientes" className="nav-icon"/>
                        <span>Pacientes</span>
                    </a>
                    <a href="#" className="nav-link">
                        <img src="/icons/consultaw.png" alt="consulta" className="stat-icon" />
                        <span>Consultas</span>
                    </a>
                    <a href="#" className="nav-link">
                        <img src="/icons/newexamw.png" alt="examen" className="stat-icon" />
                        <span>Exámenes</span>
                    </a>
                    <a href="#" className="nav-link">
                        <img src="/icons/recetaw.png" alt="recetas" className="stat-icon" />
                        <span>Recetas</span>
                    </a>
                </nav>
            </aside>

        {/* Dynamic Content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;