# 📱 Portfolio Dev - Gestor de Portafolios de Programadores

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

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

# 3. Configurar Firebase (ver GUIA_RAPIDA.md)
# Actualiza firebase.config.ts con tus credenciales

# 4. Iniciar en desarrollo
pnpm dev

# Abre http://localhost:3000
```

**¿Necesitas más detalles?** → Ver [GUIA_RAPIDA.md](GUIA_RAPIDA.md)

---

## 📚 DOCUMENTACIÓN COMPLETA (400+ PÁGINAS)

Este proyecto incluye **documentación profesional y exhaustiva**:

### 📖 Documentos Principales

| Documento | Enfoque | Páginas | Para |
|-----------|---------|---------|------|
| [**RESUMEN_EJECUTIVO.md**](RESUMEN_EJECUTIVO.md) | Visión general | 15 | Stakeholders, Gerentes |
| [**GUIA_RAPIDA.md**](GUIA_RAPIDA.md) | Referencia rápida | 12 | Developers (inicio) |
| [**INFORME_DESARROLLO.md**](INFORME_DESARROLLO.md) | ⭐ DOCUMENTACIÓN COMPLETA | 100+ | Developers, Arquitectos |
| [**ARQUITECTURA_TECNICA.md**](ARQUITECTURA_TECNICA.md) | Diseño técnico | 40+ | Arquitectos, Senior Dev |
| [**FAQ.md**](FAQ.md) | 90+ Preguntas frecuentes | 50+ | Todos |
| [**INDICE_MAESTRO.md**](INDICE_MAESTRO.md) | Navegación de docs | 30+ | Todos (guía) |
| [**CONTRIBUTING.md**](CONTRIBUTING.md) | Cómo contribuir | 25+ | Developers |

### 📊 Estadísticas
- **Total:** 400+ páginas
- **Palabras:** 80,000+
- **Ejemplos de código:** 100+
- **Diagramas:** 20+
- **Preguntas respondidas:** 90+

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

### GitHub Pages
```bash
# 1. Asegurar: output: "export" en next.config.ts
# 2. Push a main
git push origin main
# 3. GitHub Actions despliega automáticamente
# URL: https://usuario.github.io/portfolio-dev
```

### Firebase Hosting
```bash
pnpm build
firebase deploy
# URL: https://portfolio-dev.web.app
```

**📖 Guía completa:** [INFORME_DESARROLLO.md - Sección 7](INFORME_DESARROLLO.md#7-guía-de-despliegue)

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

**📖 Más problemas:** [INFORME_DESARROLLO.md - Sección 10 (50+ soluciones)](INFORME_DESARROLLO.md#10-troubleshooting)

---

## 📚 Dónde Encontrar Información

| Necesito... | Ir a... |
|------------|---------|
| Empezar rápido | [GUIA_RAPIDA.md](GUIA_RAPIDA.md) |
| Documentación completa | [INFORME_DESARROLLO.md](INFORME_DESARROLLO.md) |
| Entender arquitectura | [ARQUITECTURA_TECNICA.md](ARQUITECTURA_TECNICA.md) |
| Una pregunta rápida | [FAQ.md](FAQ.md) |
| Navegar documentación | [INDICE_MAESTRO.md](INDICE_MAESTRO.md) |
| Guiar a admin/usuarios | [INFORME_DESARROLLO.md - Secciones 8-9](INFORME_DESARROLLO.md) |
| Solucionar un error | [INFORME_DESARROLLO.md - Sección 10](INFORME_DESARROLLO.md#10-troubleshooting) |

---

## 🎓 Recursos Útiles

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🔥 [Firebase Docs](https://firebase.google.com/docs)
- ⚛️ [React Docs](https://react.dev)
- 🔵 [TypeScript Docs](https://www.typescriptlang.org/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📝 Versión

- **Proyecto:** v0.1.0 (En Desarrollo)
- **Documentación:** v1.0 (Completa)
- **Última actualización:** 12 Diciembre 2025

---

## 🤝 Contribuir

¿Quieres contribuir al proyecto? Ver [CONTRIBUTING.md](CONTRIBUTING.md) para:
- Cómo reportar bugs
- Cómo solicitar features
- Estándares de código
- Proceso de Pull Requests

---

## 📞 Soporte

- **Preguntas frecuentes** → [FAQ.md](FAQ.md)
- **Solucionar un error** → [INFORME_DESARROLLO.md - Troubleshooting](INFORME_DESARROLLO.md#10-troubleshooting)
- **Navegar documentación** → [INDICE_MAESTRO.md](INDICE_MAESTRO.md)

---

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

---

## 🎉 ¡Bienvenido a Portfolio Dev!

**Comienza aquí:**
1. Lee [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md) (15 min)
2. Sigue [GUIA_RAPIDA.md](GUIA_RAPIDA.md) (instalación)
3. Consulta [INDICE_MAESTRO.md](INDICE_MAESTRO.md) para encontrar lo que necesitas

**Happy coding! 🚀**
