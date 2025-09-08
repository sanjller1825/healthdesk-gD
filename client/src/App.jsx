import React from 'react';
import './App.css';
import Layout from './components/layout/Layout';

const App = () => {
    return (
        <Layout>
                {/* Header */}
                <div className="header">
                    <h1>Bienvenido, Santiago Llerena</h1>
                    <p>Aquí tiene un resumen de hoy.</p>
                </div>

                {/* Estadísticas Rápidas */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <img src="/icons/pacientes.png" alt="pacientes" className="nav-icon"/>
                        <div className="stat-value">1.245</div>
                        <div className="stat-description">Pacientes Activos</div>
                    </div>
                    <div className="stat-card">
                        <img src="/icons/consulta.png" alt="consulta" className="stat-icon" />
                        <div className="stat-value">34</div>
                        <div className="stat-description">Consultas Pendientes</div>
                    </div>
                    <div className="stat-card">
                        <img src="/icons/newexam.png" alt="examen" className="stat-icon" />
                        <div className="stat-value">12</div>
                        <div className="stat-description">Exámenes Programados</div>
                    </div>
                    <div className="stat-card">
                        <img src="/icons/receta.png" alt="recetas" className="stat-icon" />
                        <div className="stat-value">89</div>
                        <div className="stat-description">Recetas Emitidas</div>
                    </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="actions-grid">
                    <button className="action-button btn-blue">
                        <img src="/icons/addpaciente.png" alt="addPaciente" className="stat-icon" />
                        Añadir Paciente
                    </button>
                    <button className="action-button btn-green">
                        <img src="/icons/consulta.png" alt="addConsulta" className="stat-icon" />
                        Nueva Consulta
                    </button>
                    <button className="action-button btn-purple">
                        <img src="/icons/newexam.png" alt="addConsulta" className="stat-icon" />
                        Solicitar Examen
                    </button>
                    <button className="action-button btn-indigo">
                        <img src="/icons/receta.png" alt="addConsulta" className="stat-icon" />
                        Crear Receta
                    </button>
                </div>

                {/* Gráficos y Listas */}
                <div className="content-grid">
                    <div className="chart-card">
                        <h2 className="card-title">Consultas por Tipo</h2>
                        <p className="card-subtitle">Distribución de las consultas realizadas.</p>
                        <div className="chart-placeholder">
                            [Gráfico de barras aquí]
                        </div>
                    </div>
                    <div className="list-card">
                        <h2 className="card-title">Próximas Citas</h2>
                        <p className="card-subtitle">Sus citas programadas para hoy.</p>
                        <ul className="list-items">
                            <li className="list-item">
                                <div>
                                    <div className="list-item-main">Elena García</div>
                                    <div className="list-item-sub">Consulta General</div>
                                </div>
                                <div className="list-item-time">10:00 AM</div>
                            </li>
                            <li className="list-item">
                                <div>
                                    <div className="list-item-main">Carlos Ruíz</div>
                                    <div className="list-item-sub">Revisión Dermatológica</div>
                                </div>
                                <div className="list-item-time">10:30 AM</div>
                            </li>
                            <li className="list-item">
                                <div>
                                    <div className="list-item-main">Sofía Martínez</div>
                                    <div className="list-item-sub">Control Pediátrico</div>
                                </div>
                                <div className="list-item-time">11:00 AM</div>
                            </li>
                            <li className="list-item">
                                <div>
                                    <div className="list-item-main">Pablo López</div>
                                    <div className="list-item-sub">Seguimiento Cardiológico</div>
                                </div>
                                <div className="list-item-time">11:30 AM</div>
                            </li>
                        </ul>
                    </div>
                </div>
        </Layout>
    );
};

export default App;