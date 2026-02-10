# 🚀 GUÍA COMPLETA DE CONFIGURACIÓN Y DESPLIEGUE

## Portfolio Dev - Setup, Deploy & Administration

---

## 📑 TABLA DE CONTENIDOS

1. [Requisitos Previos](#1-requisitos-previos)
2. [Instalación Local](#2-instalación-local)
3. [Variables de Entorno](#3-variables-de-entorno)
4. [Arquitectura del Sistema](#4-arquitectura-del-sistema)
5. [Despliegue en Producción](#5-despliegue-en-producción)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. REQUISITOS PREVIOS

### 1.1 Software Requerido

```bash
# Verificar versiones instaladas
node --version      # v18.17.0 o superior
npm --version       # v9.0.0 o superior
git --version       # v2.30.0 o superior
```

**Descargas:**
- **Node.js:** https://nodejs.org/ (LTS recomendado)
- **Git:** https://git-scm.com/
- **pnpm:** `npm install -g pnpm` (recomendado)

### 1.2 Cuentas Requeridas

| Servicio | Propósito | Enlace |
|----------|----------|--------|
| GitHub | Versionamiento | https://github.com |
| Vercel | Hosting Frontend | https://vercel.com |

### 1.3 Roles de Usuario (3 tipos)

| Rol | Acceso | Uso Principal |
|-----|--------|--------------|
| **ADMIN** | Acceso total | Administración de plataforma |
| **PROGRAMMER** | Dashboard + Proyectos + Disponibilidad | Ofrecer servicios |
| **STANDARD** | Dashboard + Solicitudes | Solicitar asesorías |

---

## 2. INSTALACIÓN LOCAL

### 2.1 Clonar el Repositorio

```bash
# 1. Clonar desde GitHub
git clone https://github.com/tu-usuario/proyect-app.git
cd proyect-app

# 2. Ver rama actual
git branch -a
```

### 2.2 Instalar Dependencias

```bash
# Usando pnpm (recomendado)
pnpm install

# Verificar instalación
pnpm list
```

### 2.3 Estructura del Proyecto

```
proyect-app/
├── app/
│   ├── auth/                 # Login y registro
│   ├── dashboard/            # Panel de usuario
│   │   ├── profile/          # Perfil
│   │   ├── projects/         # Proyectos
│   │   ├── standard-applications/  # Solicitudes
│   │   └── users/            # Admin: gestión
│   └── lib/                  # Servicios y repositorios
│       ├── auth/             # AuthService (JWT)
│       ├── applications/     # ApplicationsRepository
│       ├── availability/     # AvailabilityRepository
│       ├── projects/         # ProjectsRepository
│       ├── users/            # UsersRepository
│       └── schema/           # DTOs y tipos
├── docs/                     # Documentación
├── public/                   # Archivos estáticos
├── .env.local               # Variables de entorno
├── package.json
└── tsconfig.json
```

---

## 3. VARIABLES DE ENTORNO

### 3.1 Crear Archivo de Configuración

Crear archivo `.env.local` en la raíz del proyecto:

```env
# API Backend URL - Producción
NEXT_PUBLIC_API_BASE_URL=https://proyect-backend-dgcy.onrender.com/
```

### 3.2 Desarrollo Local

Para desarrollo con backend local:

```env
# API Backend URL - Desarrollo
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/
```

### 3.3 Iniciar Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Abrir en navegador
# http://localhost:3000
```

---

## 4. ARQUITECTURA DEL SISTEMA

### 4.1 Diagrama de Arquitectura

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Frontend      │       │   Backend API   │       │   Database      │
│   (Next.js)     │──────▶│  (Spring Boot)  │──────▶│  (PostgreSQL)   │
│   Vercel        │  HTTP │    Render       │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### 4.2 Stack Tecnológico

**Frontend:**
- Next.js 16.1.6
- React 19
- TypeScript 5
- Tailwind CSS 4
- RxJS (Observables)
- Material-UI

**Backend:**
- Spring Boot (Java)
- REST API
- JWT Authentication
- PostgreSQL

### 4.3 Flujo de Autenticación

```
1. Usuario envía credenciales (email/password)
2. Backend valida y genera JWT token
3. Token se almacena en localStorage
4. Todas las peticiones incluyen token en headers
5. Backend valida token en cada request
```

### 4.4 Repositorios (Capa de Datos)

| Repositorio | Propósito | Endpoints |
|-------------|-----------|-----------|
| `AuthService` | Autenticación | /api/auth/login, /api/auth/register |
| `UsersRepository` | Perfiles de usuario | /api/profiles/* |
| `ProjectsRepository` | Proyectos | /api/projects/* |
| `ApplicationsRepository` | Solicitudes de servicio | /api/applications/* |
| `AvailabilityRepository` | Disponibilidad | /api/availability/* |

---

## 5. DESPLIEGUE EN PRODUCCIÓN

### 5.1 Frontend - Vercel

#### Opción 1: Desde el Navegador (Recomendado)

```
1. Ir a https://vercel.com
2. Click "Add New" > "Project"
3. Conectar repositorio de GitHub
4. Seleccionar: proyect-app
5. Configurar variables de entorno:
   - Name: NEXT_PUBLIC_API_BASE_URL
   - Value: https://proyect-backend-dgcy.onrender.com/
6. Click "Deploy"
```

#### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 5.2 URLs de Producción

| Servicio | URL |
|----------|-----|
| **Frontend** | https://tu-app.vercel.app |
| **Backend API** | https://proyect-backend-dgcy.onrender.com |

### 5.3 Variables de Entorno en Vercel

En Vercel Dashboard > Settings > Environment Variables:

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://proyect-backend-dgcy.onrender.com/` |

---

## 6. TROUBLESHOOTING

### 6.1 Problemas Comunes

| Problema | Solución |
|----------|----------|
| **API no responde** | Verificar que NEXT_PUBLIC_API_BASE_URL esté configurado |
| **Error 401 Unauthorized** | Token expirado, hacer logout y login |
| **Port 3000 en uso** | `pnpm dev -- -p 3001` |
| **Build falla** | `rm -rf .next && pnpm build` |
| **Backend dormido** | Render apaga servicios inactivos, esperar 30-60 segundos |

### 6.2 Logs de Debug

```bash
# Ver logs de desarrollo
pnpm dev

# Los logs de API aparecen en:
# - Consola del navegador (F12)
# - Terminal del servidor
```

### 6.3 Verificar Conexión al Backend

```bash
# Test manual de endpoint
curl https://proyect-backend-dgcy.onrender.com/api/health
```

---

## 7. COMANDOS ÚTILES

```bash
# Desarrollo
pnpm dev              # Iniciar desarrollo
pnpm build           # Build producción
pnpm start           # Iniciar build

# Calidad
pnpm lint            # ESLint
pnpm tsc --noEmit    # TypeScript check

# Deploy
vercel --prod        # Deploy a Vercel
```

---

**Última actualización:** Febrero 2026
