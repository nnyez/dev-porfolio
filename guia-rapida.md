# 🚀 GUÍA RÁPIDA - PORTFOLIO DEV

## 📦 Instalación Rápida (5 minutos)

```bash
# 1. Instalar Node.js (si no lo tienes)
# Descarga de https://nodejs.org/

# 2. Instalar pnpm
npm install -g pnpm

# 3. Clonar y entrar al proyecto
git clone <URL>
cd proyect-app

# 4. Instalar dependencias
pnpm install

# 5. Configurar Firebase
# Abre firebase.config.ts y actualiza credenciales

# 6. Iniciar desarrollo
pnpm dev

# Abre http://localhost:3000
```

---

## 🔑 Configuración Firebase Esencial

### Paso 1: Crear Proyecto
1. Ve a https://console.firebase.google.com/
2. Crea nuevo proyecto
3. Elige ubicación más cercana

### Paso 2: Habilitar Autenticación
- Authentication → Sign-in methods
- Habilita: **Google** + **Email/Password**

### Paso 3: Crear Firestore DB
- Firestore Database → Crear BD
- Modo: **Producción**
- Ubicación: **nam5** (o la más cercana)

### Paso 4: Pegar Credenciales
```typescript
// firebase.config.ts
const firebaseConfig = {
  apiKey: "TU-API-KEY",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.firebasestorage.app",
  messagingSenderId: "TU-ID",
  appId: "TU-APP-ID",
};
```

### Paso 5: Firestore Rules
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      match /projects/{projectId} {
        allow read, write: if request.auth.uid == uid;
      }
    }
    match /schedules/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /applications/{appId} {
      allow read: if request.auth.uid in [resource.data.standardUid, resource.data.programmerUid];
      allow write: if request.auth.uid == resource.data.standardUid;
    }
  }
}
```

---

## 🎯 Comandos Útiles

```bash
# Desarrollo
pnpm dev              # Inicia servidor en localhost:3000
pnpm build           # Compila para producción
pnpm start           # Inicia servidor compilado

# Calidad de código
pnpm lint            # Ejecuta ESLint
pnpm tsc --noEmit    # Verifica tipos TypeScript

# Despliegue
firebase deploy      # Desplegar en Firebase Hosting
git push origin main # Desplegar en GitHub Pages
```

---

## 📱 Roles y Permisos

| Rol | Puede hacer |
|-----|------------|
| **Visitante** | Ver portafolios públicos |
| **Standard** | Ver programadores, solicitar asesorías |
| **Programmer** | Crear portafolio, ver solicitudes, configurar disponibilidad |
| **Admin** | TODO (gestionar usuarios, cambiar roles, etc.) |

---

## 🔐 Usuario Admin Inicial

### Opción 1: Registrarse en la app
1. Abre http://localhost:3000
2. Regístrate (Google o Email)
3. Ve a Firebase Console → Firestore
4. En colección `/users/{tu-uid}`, cambia `role: "admin"`

### Opción 2: Crear en Firebase Console
1. Firebase Console → Authentication → Crear usuario
2. Email: tu@ejemplo.com
3. Password: contraseña
4. Firestore → Crear documento en `/users/{uid}` con `role: "admin"`

---

## 🗂️ Estructura de Carpetas Importante

```
proyect-app/
├── app/
│   ├── auth/              ← Login/Registro
│   ├── dashboard/         ← Panel de usuario
│   │   ├── profile/       ← Mi perfil
│   │   ├── projects/      ← Mi portafolio
│   │   └── users/         ← Gestión (solo admin)
│   ├── lib/
│   │   ├── firebaseAuth.ts       ← Funciones Auth
│   │   ├── firebaseRepository.ts ← CRUD Firestore
│   │   └── types.ts              ← Tipos TypeScript
│   └── ui/                ← Componentes reutilizables
├── firebase.config.ts     ← ⚠️ ACTUALIZAR CON TUS DATOS
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚨 Errores Comunes y Soluciones

### ❌ "Cannot find module '@/'"
```bash
# Solución:
rm -rf .next node_modules
pnpm install
pnpm dev
```

### ❌ "Firebase config is not initialized"
→ Actualiza `firebase.config.ts` con credenciales correctas

### ❌ "Permission denied" en Firestore
→ Revisa que Firestore Rules estén publicadas correctamente

### ❌ "Port 3000 already in use"
```bash
# Cambiar puerto:
pnpm dev -- -p 3001
```

### ❌ "Google Sign-In no funciona"
1. Firebase Console → Authentication → Google (debe estar ON)
2. Firebase Console → Authentication → Authorized Domains → Agregar tu dominio

---

## 📊 Tipos de Datos Principales

```typescript
// Usuario
interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'standard' | 'programmer' | 'admin';
}

// Proyecto
interface Project {
  id: string;
  ownerUid: string;
  name: string;
  description: string;
  projectUrl?: string;
  imageUrl?: string;
  technologiesUsed?: string[];
}

// Solicitud de Asesoría
interface Application {
  id: string;
  standardUid: string;      // Quien solicita
  programmerUid: string;    // Quien ofrece asesoría
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'completed';
  message: string;
  createdAt: number;
}
```

---

## 🌐 Despliegue en GitHub Pages

```bash
# 1. Actualizar next.config.ts
# Agregar: output: "export"

# 2. Push a GitHub
git add .
git commit -m "Listo para GitHub Pages"
git push origin main

# 3. GitHub hace el deploy automáticamente
# Verifica en: https://tu-usuario.github.io/portfolio-dev
```

---

## 📚 Documentación Completa

Para documentación detallada, lee: **INFORME_DESARROLLO.md**

Contenido:
- ✅ Resumen ejecutivo
- ✅ Arquitectura técnica completa
- ✅ Decisiones de diseño
- ✅ Guía de configuración paso a paso
- ✅ Manual de usuario (Admin + Usuarios)
- ✅ Troubleshooting exhaustivo

---

## 💡 Tips Productivos

### 👨‍💻 Desarrollo
```bash
# Terminal 1: Servidor dev
pnpm dev

# Terminal 2: Type checking continuo
pnpm tsc --watch --noEmit

# Terminal 3: Linting
pnpm lint
```

### 🔍 Debug
```tsx
// En componentes React
"use client";
console.log("Data:", userData);
// Ver en: http://localhost:3000 → F12 → Console
```

### 📦 Agregar Dependencias
```bash
pnpm add nombre-paquete
pnpm add -D nombre-paquete-dev  # para dev
```

### 🧹 Limpiar Cache
```bash
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
```

---

## 🔒 Seguridad - Checklist

- ✅ Firebase credentials en `firebase.config.ts` (públicas, OK)
- ✅ No agregar `.env` con secretos al repo
- ✅ Firestore Rules validar `request.auth.uid`
- ✅ Google Sign-In solo en dominios autorizados
- ✅ Never commit API keys privadas

---

## 🎓 Recursos Adicionales

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

**Última actualización:** 12 Diciembre 2025  
**Versión:** 0.1.0
