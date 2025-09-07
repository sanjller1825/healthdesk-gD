CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    rol VARCHAR(50) NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    fecha_nacimiento DATE,
    genero VARCHAR(20),
    direccion TEXT,
    telefono VARCHAR(20),
    email VARCHAR(100),
    contacto_emergencia_nombre VARCHAR(150),
    contacto_emergencia_telefono VARCHAR(20),
    notas_adicionales TEXT,
    creado_por INT REFERENCES usuarios(id),
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    usuario_id INT REFERENCES usuarios(id), -- el doctor que atiende
    fecha TIMESTAMP NOT NULL,
    tipo VARCHAR(100),
    diagnostico TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE examenes (
    id SERIAL PRIMARY KEY,
    consulta_id INT REFERENCES consultas(id),
    nombre VARCHAR(150) NOT NULL,
    resultado TEXT,
    fecha_programada DATE,
    fecha_realizado DATE,
    estado VARCHAR(50) DEFAULT 'pendiente',
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recetas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    usuario_id INT REFERENCES usuarios(id),
    fecha_emision DATE NOT NULL,
    codigo_receta VARCHAR(20) UNIQUE,
    instrucciones TEXT,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE medicamentos_recetados (
    id SERIAL PRIMARY KEY,
    receta_id INT REFERENCES recetas(id) ON DELETE CASCADE,
    medicamento VARCHAR(150) NOT NULL,
    dosis VARCHAR(100), -- Ej: 400 mg
    frecuencia VARCHAR(100) -- Ej: Cada 8 horas
);

-- SECUENCIA Y TRIGGER PARA CODIGO_RECETA
CREATE SEQUENCE receta_codigo_seq START 1;

CREATE OR REPLACE FUNCTION generar_codigo_receta()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.codigo_receta IS NULL THEN
        NEW.codigo_receta := 'REC-' || LPAD(NEXTVAL('receta_codigo_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_codigo_receta
BEFORE INSERT ON recetas
FOR EACH ROW
EXECUTE FUNCTION generar_codigo_receta();