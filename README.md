# 📱 Portfolio Dev - Gestor de Portafolios de Programadores

[![Next.js 16](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-green?style=flat-square&logo=spring)](https://spring.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Hosting-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-✅%20Producción-success?style=flat-square)]()

## 📋 Descripción

**Portfolio Dev** es una plataforma que conecta programadores profesionales con usuarios que requieren asesorías técnicas especializadas.

### 🎯 Propósito

- 👨‍💻 **Programadores:** Exponer portafolio y ofrecer servicios
- 👤 **Usuarios:** Descubrir programadores y solicitar asesorías
- 🔐 **Administradores:** Gestionar la plataforma

---

## 🚀 Inicio Rápido

```bash
# 1. Clonar y instalar
git clone <URL>
cd proyect-app
pnpm install

# 2. Configurar variables de entorno
# Crear archivo .env.local con:
NEXT_PUBLIC_API_BASE_URL=https://proyect-backend-dgcy.onrender.com/

# 3. Iniciar desarrollo
pnpm dev

# Abre http://localhost:3000
```

📖 **Documentación detallada:** [docs/SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md)

---

## ✨ Funcionalidades Principales

### 🔐 Autenticación
- ✅ Email/Contraseña
- ✅ Sistema de roles (3 tipos)
- ✅ JWT tokens

### 👥 Gestión de Perfiles
- ✅ Perfil usuario estándar (clientes)
- ✅ Perfil programador (proveedores)
- ✅ Panel de administrador

### 🎯 Portafolio
- ✅ Crear/Editar/Eliminar proyectos
- ✅ Visualización pública de portfolios
- ✅ Búsqueda de programadores

### 📅 Disponibilidad
- ✅ Configurar horarios semanales
- ✅ Sistema de solicitudes de asesorías
- ✅ Estados: PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED

### 💬 Comunicación
- ✅ Sistema de aplicaciones/solicitudes
- ✅ Notificaciones de estado

---

## 🏗️ Stack Tecnológico

```
Frontend:              Backend:
├─ Next.js 16.1.6     ├─ Spring Boot (Java)
├─ React 19           ├─ REST API
├─ TypeScript 5       ├─ JWT Authentication
├─ Tailwind CSS 4     └─ PostgreSQL
├─ RxJS (Observables)
└─ Material-UI

Despliegue:
├─ Frontend: Vercel
└─ Backend: Render (https://proyect-backend-dgcy.onrender.com)
```

---

## 📁 Estructura del Proyecto

```
app/
├─ auth/              # Autenticación (login/registro)
├─ dashboard/         # Panel privado
│  ├─ profile/        # Perfil de usuario
│  ├─ projects/       # Gestión de proyectos
│  ├─ standard-applications/  # Solicitudes de servicio
│  └─ users/          # Admin: gestión de usuarios
├─ projects/          # Listado público
└─ lib/               # Librerías y servicios
   ├─ auth/           # AuthService (JWT)
   ├─ applications/   # ApplicationsRepository
   ├─ availability/   # AvailabilityRepository
   ├─ projects/       # ProjectsRepository
   ├─ users/          # UsersRepository
   └─ schema/         # DTOs y tipos
```

---

## 🔑 Roles del Sistema

| Rol | Descripción | Acceso |
|-----|-----------|--------|
| **ADMIN** | Administrador de plataforma | Acceso total |
| **PROGRAMMER** | Proveedor de servicios | Dashboard + Proyectos + Horarios |
| **STANDARD** | Cliente regular | Dashboard + Solicitudes |

---

## ⚙️ Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# API Backend URL
NEXT_PUBLIC_API_BASE_URL=https://proyect-backend-dgcy.onrender.com/
```

Para desarrollo local con backend local:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/
```

---

## 🚀 Despliegue

### Frontend - Vercel (Recomendado)

```
1. Ir a https://vercel.com
2. Conectar GitHub
3. Seleccionar repositorio
4. Agregar variable de entorno:
   NEXT_PUBLIC_API_BASE_URL=https://proyect-backend-dgcy.onrender.com/
5. Deploy automático
```

### Backend - Render

El backend está desplegado en: `https://proyect-backend-dgcy.onrender.com`

📖 **Documentación completa:** [docs/SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md)

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| **API no responde** | Verifica NEXT_PUBLIC_API_BASE_URL en .env.local |
| **Port 3000 en uso** | `pnpm dev -- -p 3001` |
| **Error de autenticación** | Verifica que el backend esté activo |
| **Build falla** | `rm -rf .next && pnpm build` |

---

## 📚 Documentación

| Documento | Contenido |
|-----------|-----------|
| [SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md) | Instalación y despliegue |
| [GUIA_ADMINISTRADOR.md](docs/GUIA_ADMINISTRADOR.md) | Gestión de plataforma |
| [GUIA_USUARIO_FINAL.md](docs/GUIA_USUARIO_FINAL.md) | Manual de usuario |

---

## 💻 Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Inicia en localhost:3000
pnpm build           # Build para producción
pnpm start           # Inicia servidor compilado

# Calidad de código
pnpm lint            # ESLint
pnpm tsc --noEmit    # TypeScript check

# Deploy
vercel --prod        # Desplegar a Vercel
```

---

## 🔗 URLs de Producción

| Servicio | URL |
|----------|-----|
| **Frontend** | https://proyect-app.vercel.app (o tu dominio) |
| **Backend API** | https://proyect-backend-dgcy.onrender.com |

---

## 📊 Arquitectura

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   Frontend      │       │   Backend API   │       │   Database      │
│   (Next.js)     │──────▶│  (Spring Boot)  │──────▶│  (PostgreSQL)   │
│   Vercel        │       │    Render       │       │                 │
└─────────────────┘       └─────────────────┘       └─────────────────┘
```

### Flujo de Datos
1. Usuario interactúa con el frontend (Next.js)
2. Frontend hace peticiones HTTP al backend REST API
3. Backend procesa, valida y responde con JSON
4. Frontend actualiza el estado con RxJS Observables

---

## 🎓 Recursos

- 📖 [Next.js Docs](https://nextjs.org/docs)
- ⚛️ [React Docs](https://react.dev)
- 🍃 [Spring Boot Docs](https://spring.io/projects/spring-boot)

---

## 📝 Versión

| Métrica | Valor |
|---------|-------|
| **Versión** | v1.0.0 |
| **Status** | ✅ Producción |
| **Última actualización** | Febrero 2026 |

---

**Happy coding! 🚀**
