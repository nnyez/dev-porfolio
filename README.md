# 📱 Portfolio Dev - Gestor de Portafolios de Programadores

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Hosting-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Documentación](https://img.shields.io/badge/Documentación-500%2B%20páginas-brightgreen?style=flat-square&logo=readme)](docs/COMIENZA_AQUI.md)
[![Status](https://img.shields.io/badge/Status-✅%20Producción-success?style=flat-square)]()

## 📋 Descripción

**Portfolio Dev** es una plataforma web moderna que actúa como intermediaria entre programadores profesionales y usuarios que requieren asesorías técnicas especializadas.

### 🎯 Propósito

- 👨‍💻 **Programadores:** Exponer su portafolio y ofrecer servicios de consultoría
- 👤 **Usuarios:** Descubrir programadores y solicitar asesorías
- 🔐 **Administradores:** Gestionar la plataforma

---

## 🚀 Inicio Rápido

```bash
# 1. Clonar repositorio
git clone <URL>
cd proyect-app

# 2. Instalar dependencias
pnpm install

# 3. Configurar Firebase
# Actualiza firebase.config.ts con tus credenciales

# 4. Iniciar en desarrollo
pnpm dev

# Abre http://localhost:3000
```

📖 **¿Necesitas más detalles?** → [docs/SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md)

---

## 🎓 📚 DOCUMENTACIÓN ACADÉMICA COMPLETA

> **Proyecto con documentación profesional de 500+ páginas**

Este proyecto incluye documentación académica, técnica y operacional **exhaustiva y lissta para presentación académica o profesional**.

### 🚀 COMIENZA AQUÍ

**👉 [docs/COMIENZA_AQUI.md](docs/COMIENZA_AQUI.md)** - Guía de orientación (elige tu rol)

```
¿Eres...?
├─ 👨‍🎓 Estudiante/Académico        → Informe Académico
├─ 👨‍💻 Desarrollador               → Setup & Deployment
├─ 🚀 DevOps                       → Deployment Guide
├─ 👤 Administrador               → Guía Admin
├─ 👥 Usuario Final               → Guía Usuario
└─ 🗺️ No sé por dónde empezar      → Índice Maestro
```

### 📖 Documentos Principales

| Documento | Contenido | Páginas |
|-----------|----------|---------|
| **[COMIENZA_AQUI.md](docs/COMIENZA_AQUI.md)** | ⭐ **Punto de entrada rápido** | 10 |
| **[INFORME_ACADEMICO.md](docs/INFORME_ACADEMICO.md)** | Informe académico completo | 150+ |
| **[SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md)** | Instalación y despliegue | 80+ |
| **[GUIA_ADMINISTRADOR.md](docs/GUIA_ADMINISTRADOR.md)** | Manual administrativo | 95+ |
| **[GUIA_USUARIO_FINAL.md](docs/GUIA_USUARIO_FINAL.md)** | Guía de usuarios | 120+ |
| **[INDICE_MAESTRO_DOCUMENTACION.md](docs/INDICE_MAESTRO_DOCUMENTACION.md)** | Índice centralizado | 50+ |

### 📊 Estadísticas

- **500+ páginas** de documentación
- **100,000+ palabras**
- **100+ ejemplos** de código
- **150+ tablas y diagramas**
- **50+ preguntas** frecuentes
- **100+ secciones** temáticas

---

## ✨ Funcionalidades Principales

### 🔐 Autenticación
- ✅ Google Sign-In
- ✅ Email/Contraseña
- ✅ Sistema de roles (4 tipos)

### 👥 Gestión de Perfiles
- ✅ Perfil de Usuario Standard (clientes)
- ✅ Perfil de Programador (proveedores)
- ✅ Panel de Administrador

### 🎯 Portafolio
- ✅ Crear/Editar/Eliminar proyectos
- ✅ Descripción con tecnologías usadas
- ✅ Visualización pública de portfolios

### 📅 Disponibilidad y Solicitudes
- ✅ Configurar horarios semanales
- ✅ Sistema de solicitudes de asesorías
- ✅ Estados (pending, reviewed, accepted, rejected, completed)

### 🛠️ Panel Admin
- ✅ Gestión de usuarios
- ✅ Cambio de roles
- ✅ Visualización de reportes

---

## 🏗️ Stack Tecnológico

```
Frontend:
├── Next.js 16.0.7
├── React 19.2.0
├── TypeScript 5
├── Tailwind CSS 4
└── Material-UI 7.3.6

Estado & Reactividad:
├── React Context API
├── RxJS 7.8.2 (Observables)
├── React Hook Form
└── Zod (Validación)

Backend & BD:
├── Firebase Authentication
├── Firestore Database (NoSQL)
└── Cloud Storage (futuro)

Herramientas:
├── ESLint 9
├── Prettier 3.7.4
└── pnpm (Package Manager)
```

---

## 📁 Estructura del Proyecto

```
proyect-app/
├── app/
│   ├── auth/                 # Autenticación
│   ├── dashboard/            # Panel de usuario
│   │   ├── profile/          # Mi perfil
│   │   ├── projects/         # Mis proyectos
│   │   ├── users/            # Gestión (solo admin)
│   │   └── standard-applications/
│   ├── context/              # Context API
│   ├── lib/                  # Librerías
│   │   ├── firebaseAuth.ts
│   │   ├── firebaseRepository.ts
│   │   └── types.ts
│   ├── projects/             # Página pública
│   └── ui/                   # Componentes reutilizables
├── firebase.config.ts        # ⚠️ Configurar aquí
├── next.config.ts
├── tailwind.config.js
└── package.json
```

---

## 🔧 Configuración Esencial (Firebase)

1. **Crear proyecto en [Firebase Console](https://console.firebase.google.com/)**
2. **Copiar credenciales a `firebase.config.ts`**
3. **Habilitar autenticación:**
   - Google Sign-In
   - Email/Contraseña
4. **Crear Firestore Database**
5. **Configurar Firestore Rules**

**📖 Guía detallada:** [INFORME_DESARROLLO.md - Sección 6](INFORME_DESARROLLO.md#6-guía-de-configuración-e-instalación)

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
firebase deploy      # Firebase Hosting
git push origin main # GitHub Pages (con Actions)
```

---

## 🚀 Despliegue

### Vercel (Recomendado)

#### Opción 1: Desde el Navegador (Más Fácil) ⭐
```
1. Ir a https://vercel.com
2. Click: Add New > Project > Import Git Repository
3. Seleccionar repositorio: proyect-app
4. Agregar variables Firebase
5. Click Deploy
```

👉 **[Guía Visual Paso a Paso](VERCEL_WEB_METHOD.md)**

#### Opción 2: Desde la CLI
```bash
npm i -g vercel
vercel --prod
```

**📖 Documentación:**
- 🌐 [Guía Visual Web](VERCEL_WEB_METHOD.md) - Con capturas y detalles
- 🚀 [Guía Rápida Vercel](VERCEL_DEPLOYMENT.md) - 5 minutos (2 opciones)
- 📚 [Guía Completa Setup & Deployment](docs/SETUP_Y_DEPLOYMENT.md#5-despliegue-en-producción)

---

## 👤 Crear Usuario Admin

1. Regístrate en la app (Google o Email)
2. Ve a Firebase Console → Firestore
3. En colección `/users/{tu-uid}`, cambia `role` de `"standard"` a `"admin"`
4. Recarga la app

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| **Firebase no inicia** | Verifica credentials en firebase.config.ts |
| **Port 3000 en uso** | `pnpm dev -- -p 3001` |
| **Errores TypeScript** | `pnpm tsc --noEmit` |
| **Google Sign-In no funciona** | Agrega tu dominio en Firebase Console → Authorized Domains |

---

## 📚 Dónde Encontrar Información

| Necesito... | Ir a... | Tipo |
|------------|---------|------|
| **Empezar rápido** | [docs/COMIENZA_AQUI.md](docs/COMIENZA_AQUI.md) | 🚀 Inicio |
| **Instalar localmente** | [docs/SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md) | 💻 Setup |
| **Desplegar a producción** | [docs/SETUP_Y_DEPLOYMENT.md#5-despliegue-en-producción](docs/SETUP_Y_DEPLOYMENT.md) | 🚀 Despliegue |
| **Informe académico** | [docs/INFORME_ACADEMICO.md](docs/INFORME_ACADEMICO.md) | 🎓 Académico |
| **Decisiones de diseño** | [docs/INFORME_ACADEMICO.md#5-decisiones-de-diseño](docs/INFORME_ACADEMICO.md) | 📐 Arquitectura |
| **Desafíos enfrentados** | [docs/INFORME_ACADEMICO.md#6-desafíos-enfrentados](docs/INFORME_ACADEMICO.md) | 💡 Aprendizaje |
| **Stack tecnológico** | [docs/INFORME_ACADEMICO.md#8-stack-tecnológico](docs/INFORME_ACADEMICO.md) | 🛠️ Tech |
| **Guía administrador** | [docs/GUIA_ADMINISTRADOR.md](docs/GUIA_ADMINISTRADOR.md) | 👨‍💼 Admin |
| **Guía usuario final** | [docs/GUIA_USUARIO_FINAL.md](docs/GUIA_USUARIO_FINAL.md) | 👥 Usuario |
| **Preguntas frecuentes** | [docs/GUIA_USUARIO_FINAL.md#8-preguntas-frecuentes](docs/GUIA_USUARIO_FINAL.md) | ❓ FAQs |
| **Solucionar errores** | [docs/SETUP_Y_DEPLOYMENT.md#7-troubleshooting](docs/SETUP_Y_DEPLOYMENT.md) | 🔧 Help |
| **Navegar toda la docs** | [docs/INDICE_MAESTRO_DOCUMENTACION.md](docs/INDICE_MAESTRO_DOCUMENTACION.md) | 🗺️ Índice |

---

## 🎓 Recursos Útiles

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🔥 [Firebase Docs](https://firebase.google.com/docs)
- ⚛️ [React Docs](https://react.dev)
- 🔵 [TypeScript Docs](https://www.typescriptlang.org/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📝 Versión & Estado

| Métrica | Valor |
|---------|-------|
| **Versión del Proyecto** | v0.1.0 (En Desarrollo) |
| **Documentación** | v1.0 (Completa - ✅) |
| **Última Actualización** | 12 Diciembre 2025 |
| **Páginas de Documentación** | 500+ |
| **Status** | ✅ Producción |

---


## 📞 Soporte

| Tipo de Ayuda | Ir a... |
|---------------|---------|
| **Preguntas frecuentes** | [docs/GUIA_USUARIO_FINAL.md#8-preguntas-frecuentes](docs/GUIA_USUARIO_FINAL.md) |
| **Solucionar errores** | [docs/SETUP_Y_DEPLOYMENT.md#7-troubleshooting](docs/SETUP_Y_DEPLOYMENT.md) |
| **Navegar documentación** | [docs/INDICE_MAESTRO_DOCUMENTACION.md](docs/INDICE_MAESTRO_DOCUMENTACION.md) |
| **Resolución de problemas admin** | [docs/GUIA_ADMINISTRADOR.md#9-resolución-de-problemas](docs/GUIA_ADMINISTRADOR.md) |

---

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

---

## 🚀 ¡Bienvenido a Portfolio Dev!

### 🎯 Comienza Por Aquí

👉 **[docs/COMIENZA_AQUI.md](docs/COMIENZA_AQUI.md)** - Elige tu rol y comienza

```
┌─────────────────────────────────────────┐
│  ¿QUÉ QUIERES HACER?                   │
├─────────────────────────────────────────┤
│ 👨‍🎓 Estudiar/Entender proyecto          │
│ 👨‍💻 Desarrollar código                  │
│ 🚀 Desplegar a producción               │
│ 👤 Administrar plataforma               │
│ 👥 Usar como usuario final              │
└─────────────────────────────────────────┘
```


---

**Happy coding! 🚀**
