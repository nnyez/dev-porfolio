-- ============================================================
-- SCHEMA RELACIONAL - PLATAFORMA DE SERVICIOS
-- Tercera Forma Normal (3NF) - PostgreSQL 12+
-- Basado en tipos TypeScript de types.ts
-- ============================================================

-- ===== TIPOS ENUMERADOS =====
CREATE TYPE user_role AS ENUM ('standard', 'programmer', 'admin');
CREATE TYPE application_status_enum AS ENUM ('pending', 'reviewed', 'accepted', 'rejected', 'completed');

-- ===== TABLA PRINCIPAL: USUARIOS (AppUser) =====
-- Estructura unificada para todos los roles
-- Campos opcionales según el rol
CREATE TABLE users (
  uid VARCHAR(128) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(512),
  phone_number VARCHAR(20),
  role user_role NOT NULL,
  
  -- Campos opcionales (principalmente para programadores)
  title VARCHAR(255),           -- "Senior Fullstack Dev"
  bio TEXT,                     -- Descripción profesional
  experience_years INT,         -- Años de experiencia
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CHECK (experience_years IS NULL OR experience_years >= 0)
);

CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_role ON users(role);
CREATE INDEX idx_created_at ON users(created_at);

-- ===== TABLA DE LENGUAJES DE PROGRAMACIÓN =====
CREATE TABLE programming_languages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== TABLA DE HABILIDADES =====
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_category ON skills(category);

-- ===== TABLA INTERMEDIA: LENGUAJES DE PROGRAMADOR =====
CREATE TABLE programmer_languages (
  programmer_uid VARCHAR(128) NOT NULL,
  language_id INT NOT NULL,
  
  PRIMARY KEY (programmer_uid, language_id),
  FOREIGN KEY (programmer_uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (language_id) REFERENCES programming_languages(id) ON DELETE CASCADE
);

-- ===== TABLA INTERMEDIA: HABILIDADES DE PROGRAMADOR =====
CREATE TABLE programmer_skills (
  programmer_uid VARCHAR(128) NOT NULL,
  skill_id INT NOT NULL,
  
  PRIMARY KEY (programmer_uid, skill_id),
  FOREIGN KEY (programmer_uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- ===== TABLA DE PERMISOS DE ADMINISTRADOR =====
CREATE TABLE admin_permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===== TABLA INTERMEDIA: PERMISOS DE ADMIN =====
CREATE TABLE admin_user_permissions (
  admin_uid VARCHAR(128) NOT NULL,
  permission_id INT NOT NULL,
  
  PRIMARY KEY (admin_uid, permission_id),
  FOREIGN KEY (admin_uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES admin_permissions(id) ON DELETE CASCADE
);

-- ===== TABLA DE PROYECTOS (Project) =====
CREATE TABLE projects (
  id VARCHAR(128) PRIMARY KEY,
  owner_uid VARCHAR(128) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_url VARCHAR(512),
  image_url VARCHAR(512),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (owner_uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE INDEX idx_owner_uid ON projects(owner_uid);
CREATE INDEX idx_created_at ON projects(created_at);

-- ===== TABLA INTERMEDIA: TECNOLOGÍAS DE PROYECTO =====
CREATE TABLE project_technologies (
  project_id VARCHAR(128) NOT NULL,
  technology_name VARCHAR(100) NOT NULL,
  
  PRIMARY KEY (project_id, technology_name),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ===== TABLA: CONFIGURACIÓN DE DISPONIBILIDAD (UserAvailabilityConfig) =====
CREATE TABLE user_availability_config (
  uid VARCHAR(128) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

-- ===== TABLA: HORARIOS DE DISPONIBILIDAD SEMANAL (DayAvailability) =====
-- Almacena el horario disponible para cada día de la semana
CREATE TABLE availability_schedule (
  id SERIAL PRIMARY KEY,
  availability_config_uid VARCHAR(128) NOT NULL,
  day_name VARCHAR(20) NOT NULL,  -- "Lunes", "Martes", etc
  start_time TIME NOT NULL,       -- "HH:mm" formato
  end_time TIME NOT NULL,         -- "HH:mm" formato
  
  UNIQUE (availability_config_uid, day_name),
  FOREIGN KEY (availability_config_uid) REFERENCES user_availability_config(uid) ON DELETE CASCADE,
  CHECK (start_time < end_time)
);

CREATE INDEX idx_availability_day ON availability_schedule(day_name);

-- ===== TABLA: SOLICITUDES DE SERVICIO (ServiceApplication) =====
CREATE TABLE service_applications (
  id VARCHAR(128) PRIMARY KEY,
  
  -- Relaciones
  client_uid VARCHAR(128) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  programmer_uid VARCHAR(128) NOT NULL,
  programmer_name VARCHAR(255),
  
  -- Estado
  status application_status_enum NOT NULL DEFAULT 'pending',
  
  -- Detalles de la solicitud
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget VARCHAR(100),
  
  -- Agendamiento propuesto
  scheduled_date TIMESTAMP NOT NULL,
  duration_minutes INT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  
  -- Respuesta
  meeting_link VARCHAR(512),
  rejection_reason TEXT,
  
  -- Metadatos
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (client_uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (programmer_uid) REFERENCES users(uid) ON DELETE CASCADE,
  
  CHECK (duration_minutes > 0),
  CHECK (start_time < end_time)
);

CREATE INDEX idx_client_uid ON service_applications(client_uid);
CREATE INDEX idx_programmer_uid ON service_applications(programmer_uid);
CREATE INDEX idx_status ON service_applications(status);
CREATE INDEX idx_scheduled_date ON service_applications(scheduled_date);
CREATE INDEX idx_created_at ON service_applications(created_at);
CREATE INDEX idx_programmer_scheduled ON service_applications(programmer_uid, scheduled_date);
CREATE INDEX idx_client_scheduled ON service_applications(client_uid, scheduled_date);

-- ===== VISTAS PARA CONSULTAS SIMPLIFICADAS =====

-- Vista de usuarios con su rol
CREATE VIEW users_with_role AS
SELECT 
  uid,
  email,
  display_name,
  photo_url,
  phone_number,
  role,
  created_at,
  updated_at
FROM users;

-- Vista de solicitudes con información completa
CREATE VIEW service_applications_full AS
SELECT 
  sa.id,
  sa.client_uid,
  sa.client_name,
  sa.programmer_uid,
  sa.programmer_name,
  sa.subject,
  sa.description,
  sa.budget,
  sa.scheduled_date,
  sa.duration_minutes,
  sa.start_time,
  sa.end_time,
  sa.status,
  sa.meeting_link,
  sa.rejection_reason,
  sa.created_at,
  sa.updated_at
FROM service_applications sa;

-- Vista de programadores con sus habilidades
CREATE VIEW programmers_with_skills AS
SELECT 
  u.uid,
  u.display_name,
  u.email,
  u.title,
  u.bio,
  u.experience_years,
  STRING_AGG(DISTINCT s.name, ', ' ORDER BY s.name) as skills,
  STRING_AGG(DISTINCT pl.name, ', ' ORDER BY pl.name) as languages
FROM users u
LEFT JOIN programmer_skills ps ON u.uid = ps.programmer_uid
LEFT JOIN skills s ON ps.skill_id = s.id
LEFT JOIN programmer_languages plang ON u.uid = plang.programmer_uid
LEFT JOIN programming_languages pl ON plang.language_id = pl.id
WHERE u.role = 'programmer'
GROUP BY u.uid, u.display_name, u.email, u.title, u.bio, u.experience_years;

-- ===== TRIGGERS PARA ACTUALIZAR AUTOMÁTICAMENTE UPDATED_AT =====

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_update
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_projects_update
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_availability_config_update
BEFORE UPDATE ON user_availability_config
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_service_applications_update
BEFORE UPDATE ON service_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
