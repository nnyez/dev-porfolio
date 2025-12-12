# 🚀 GUÍA COMPLETA DE CONFIGURACIÓN Y DESPLIEGUE

## Portfolio Dev - Setup, Deploy & Administration

---

## 📑 TABLA DE CONTENIDOS

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación Local](#instalación-local)
3. [Configuración de Firebase](#configuración-de-firebase)
4. [Variables de Entorno](#variables-de-entorno)
5. [Despliegue en Producción](#despliegue-en-producción)

---

## 1. REQUISITOS PREVIOS

### 1.1 Software Requerido

Antes de comenzar, asegúrate de tener instalado:

```bash
# Verificar versiones instaladas
node --version      # v18.17.0 o superior
npm --version       # v9.0.0 o superior
git --version       # v2.30.0 o superior
```

**Descargas:**
- **Node.js:** https://nodejs.org/ (LTS recomendado)
- **Git:** https://git-scm.com/
- **pnpm:** `npm install -g pnpm` (recomendado en lugar de npm)

### 1.2 Cuentas Requeridas

| Servicio | Propósito | Enlace |
|----------|----------|--------|
| Firebase | Backend, Auth, BD | https://firebase.google.com |
| Google Cloud | Project management | https://cloud.google.com |
| Vercel | Hosting (Recomendado) | https://vercel.com |
| GitHub | Versionamiento | https://github.com |

### 1.3 Conocimientos Requeridos

- ✅ Básico de JavaScript/TypeScript
- ✅ Línea de comandos (terminal/PowerShell)
- ✅ Git y control de versiones
- ✅ Conceptos de bases de datos NoSQL
- ✅ Autenticación OAuth

---

## 1.4 Arquitectura del Sistema (Conceptos Clave)

### Roles de Usuario (3 tipos)
| Rol | Acceso | Uso Principal |
|-----|--------|--------------|
| **admin** | Acceso total | Administración de plataforma |
| **programmer** | Dashboard + Proyectos + Schedules | Ofrecer servicios |
| **standard** | Dashboard + Solicitudes | Solicitar asesorías |

### Colecciones Firestore (4 principales)
- `users` - Perfiles de usuarios
- `projects` - Portafolio de programadores
- `applications` - Solicitudes de asesoría
- `schedules` - Disponibilidad horaria

### Flujo Principal
```
Usuario → Registro (role: standard)
       ↓
       Puede solicitar asesorías
       ↓
Si quiere ofrecer: Cambiar a (role: programmer)
       ↓
Puede crear proyectos + Configurar horarios
```

---

## 2. INSTALACIÓN LOCAL

### 2.1 Clonar el Repositorio

```bash
# 1. Clonar desde GitHub
git clone https://github.com/tu-usuario/proyect-app.git
cd proyect-app

# 2. Ver rama actual
git branch -a

# 3. Usar rama de desarrollo (opcional)
git checkout develop
```

### 2.2 Instalar Dependencias

```bash
# Opción A: Usando pnpm (recomendado)
pnpm install

# Opción B: Usando npm
npm install

# Opción C: Usando yarn
yarn install
```

**Verificar instalación:**
```bash
pnpm list      # Ver todas las dependencias instaladas
```

### 2.3 Estructura del Proyecto Post-Instalación

```
proyect-app/
├── node_modules/          # Dependencias (no commitear)
├── .next/                 # Build output (no commitear)
├── app/                   # Código fuente
├── public/                # Activos estáticos
├── docs/                  # Documentación
├── firebase.config.ts     # ⚠️ IMPORTANTE: Necesita configuración
├── .env.local.example     # Template de variables
├── package.json
└── tsconfig.json
```

---

## 3. CONFIGURACIÓN DE FIREBASE

### 3.1 Crear Proyecto en Firebase

**Paso 1: Ir a Firebase Console**
```
https://console.firebase.google.com
```

**Paso 2: Crear Nuevo Proyecto**
1. Click en "Agregar proyecto"
2. Nombre del proyecto: `Portfolio Dev` (o tu nombre)
3. Aceptar términos y crear

**Paso 3: Habilitar Google Analytics**
- Opcional pero recomendado
- Usar cuenta de Google existente

**Paso 4: Esperar a que se cree (2-3 minutos)**

### 3.2 Configurar Autenticación

**En Firebase Console:**
1. Ir a **Authentication**
2. Click en **Comenzar**
3. Habilitar métodos de sign-in:

#### Email/Contraseña
```
Authentication > Sign-in method
├── Email/Contraseña: ✅ Habilitado
├── Google: ✅ Habilitado
└── Anonymous: ❌ Deshabilitado (por seguridad)
```

#### Google OAuth
```
1. Click en "Google"
2. Habilitar
3. Llenar información del proyecto
   - Email de soporte: tu-email@gmail.com
   - Nombre de app: Portfolio Dev
4. Agregar URLs autorizadas:
   - http://localhost:3000
   - https://tu-dominio.com (después en prod)
```

### 3.3 Crear Base de Datos Firestore

**En Firebase Console:**
1. Ir a **Firestore Database**
2. Click en **Crear base de datos**
3. Seleccionar ubicación: `europe-west1` o cercana
4. Modo de seguridad: **Iniciar en modo de prueba**
   - ⚠️ CAMBIAR A PRODUCCIÓN ANTES DE PÚBLICO

```javascript
// firestore.rules (temporal para desarrollo)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // ⚠️ SOLO DESARROLLO
    }
  }
}
```

### 3.4 Obtener Credenciales Firebase

**En Firebase Console:**

1. **Ir a Project Settings (⚙️)**
2. **Ir a tab "Apps"**
3. **Agregar app > Web**
4. Nombre de la app: `Portfolio Dev Web`
5. Copiar las credenciales que aparecen:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "proyecto-xxxxx.firebaseapp.com",
  projectId: "proyecto-xxxxx",
  storageBucket: "proyecto-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### 3.5 Actualizar firebase.config.ts

```bash
# Abrir archivo
code firebase.config.ts
```

**Contenido a actualizar:**
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // ← Reemplazar
  authDomain: "YOUR_AUTH_DOMAIN",   // ← Reemplazar
  projectId: "YOUR_PROJECT_ID",     // ← Reemplazar
  storageBucket: "YOUR_STORAGE",    // ← Reemplazar
  messagingSenderId: "YOUR_MSG_ID", // ← Reemplazar
  appId: "YOUR_APP_ID",             // ← Reemplazar
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 4. VARIABLES DE ENTORNO

### 4.1 Crear Archivo .env.local

```bash
# En la raíz del proyecto
cp .env.local.example .env.local
```

**O crear manualmente:**
```bash
touch .env.local
```

### 4.2 Llenar Variables

**Contenido de `.env.local`:**
```env
# ========== FIREBASE CONFIG ==========
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=proyecto-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=proyecto-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=proyecto-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456

# ========== EMAIL CONFIG (Nodemailer) ==========
NEXT_PUBLIC_EMAIL_USER=tu-email@gmail.com
NEXT_PUBLIC_EMAIL_PASSWORD=app-password-from-google

# ========== APP CONFIG ==========
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Portfolio Dev

# ========== DESARROLLO ==========
NODE_ENV=development
```

### 4.3 Seguridad de Variables

⚠️ **IMPORTANTE:**
```bash
# NUNCA commitear .env.local
echo ".env.local" >> .gitignore

# Variables con NEXT_PUBLIC_ son visibles en cliente (ok para Firebase)
# Otras variables son privadas en servidor
```

---

## 4.4 Configuración de Email (Nodemailer/SMTP)

**Funcionalidad:** Sistema de notificaciones por email cuando:
- Se crea una nueva solicitud de asesoría
- Se acepta una solicitud
- Se rechaza una solicitud

### Paso 1: Generar Contraseña de Aplicación (Gmail)

1. Habilitar **2FA** en cuenta Google (https://myaccount.google.com/security)
2. Ir a **App passwords** (https://myaccount.google.com/apppasswords)
3. Seleccionar:
   - App: **Mail**
   - Device: **Windows/Mac/Linux**
4. Copiar contraseña generada (16 caracteres)

### Paso 2: Completar `.env.local`

```env
SMTP_SERVER_HOST=smtp.gmail.com
SMTP_SERVER_PORT=587
SMTP_SERVER_SECURE=false
SMTP_SERVER_USERNAME=tu-email@gmail.com
SMTP_SERVER_PASSWORD=xxxx xxxx xxxx xxxx    # La contraseña de app
SITE_MAIL_RECIEVER=tu-email@gmail.com
```

### Paso 3: Verificar Funcionamiento

- Crear solicitud de asesoría (el programador recibirá email)
- Aceptar solicitud (el cliente recibirá email)
- Verificar logs: `pnpm dev` debe mostrar "Message Sent: <id>"

**Archivos involucrados:**
- `app/lib/mail-service.ts` - SMTP transporter
- `app/lib/email-actions.ts` - Funciones de notificación
- `app/dashboard/standard-applications/ui/ServiceApplicationsManager.tsx` - Trigger

---

## 4.5 Arquitectura de la Capa `lib/`

La carpeta `app/lib/` contiene la lógica de negocio y comunicación con Firestore. Usa **RxJS Observables** para operaciones asincrónicas en tiempo real.

### Types (`lib/types.ts`)
- **Tipos de usuario:** `UserStandard`, `UserProgrammer`, `UserAdmin`
- **Colecciones:** `Project`, `ServiceApplication`, `UserAvailabilityConfig`
- **Estados:** `ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'completed'`

### Autenticación (`lib/firebaseAuth.ts`)
```typescript
// Registro con Email/Contraseña
export async function registerEmailUser(email, password, userData)

// Login con Email/Contraseña
export async function loginEmailUser(email, password)

// Login con Google OAuth
export async function signInWithGoogle()
```

### Base de Datos (`lib/firebaseRepository.ts`) - RxJS Observables

**USUARIOS:**
```typescript
getAllUsers(uid, filter?)           // Obtiene todos menos el actual
getUserData(uid)                    // Datos de un usuario específico
updateUserRole(uid, newRole)        // Cambiar rol
updateUserData(uid, newData)        // Actualizar perfil
deleteUser(uid)                     // Eliminar usuario
```

**PROYECTOS:**
```typescript
getAllProjects(filter?)             // Todos los proyectos o filtrados
addProject(projectData)             // Crear proyecto
updateProject(projectId, newData)   // Editar proyecto
deleteProject(projectId)            // Eliminar proyecto
```

**SOLICITUDES (Applications):**
```typescript
addServiceApplication(appData)      // Crear solicitud de asesoría
getApplicationsForProgrammer(uid)   // Solicitudes recibidas por programador
getApplicationsFromClient(uid)      // Solicitudes creadas por cliente
updateApplicationStatus(appId, status, extraData)  // Cambiar estado
deleteServiceApplication(appId)     // Eliminar solicitud
```

**HORARIOS (Schedules):**
```typescript
addSchedule(scheduleData)           // Guardar disponibilidad semanal
```

### Notificaciones (`lib/email-actions.ts` + `lib/mail-service.ts`)
```typescript
notifyNewApplication(...)           // Email al programador (nueva solicitud)
notifyApplicationAccepted(...)      // Email al cliente (solicitud aceptada)
notifyApplicationRejected(...)      // Email al cliente (solicitud rechazada)
```

### Contexto de Autenticación (`app/context/AuthContext.tsx`)
- Usa **RxJS switchMap** para sincronizar Firebase Auth + Firestore
- Proporciona `user` (Firebase Auth) y `userData` (Firestore)
- Se actualiza automáticamente en tiempo real

---

## 5. DESPLIEGUE EN PRODUCCIÓN

### 5.1 Preparación Pre-Despliegue

#### Paso 1: Actualizar Firestore Rules

```bash
# Ir a Firebase Console > Firestore > Rules
```

**Reemplazar con reglas seguras:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios solo leen/escriben su documento
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      allow list: if false;
    }
    
    // Proyectos: lectura pública, escritura owner
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.ownerId;
      allow create: if request.auth.uid == request.resource.data.ownerId;
    }
    
    // Solicitudes: owner puede leer
    match /applications/{appId} {
      allow read: if 
        request.auth.uid == resource.data.userId || 
        request.auth.uid == resource.data.programmerId;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update: if 
        request.auth.uid == resource.data.programmerId ||
        request.auth.uid == resource.data.userId;
    }
    
    // Admin solo (bloqueado por default)
    match /admin/{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Publicar Rules:**
- Click en "Publicar"

#### Paso 2: Build de Producción Local

```bash
# Limpiar builds anteriores
rm -rf .next

# Generar build de producción
pnpm build

# Verificar que no haya errores
```

**Output esperado:**
```
✓ Built in 23.4s
✓ Linting and checking validity of types
✓ Collecting page data
...
Route (pages)           Size
...
```

#### Paso 3: Probar Build Localmente

```bash
# Iniciar servidor de producción local
pnpm start

# Visitar http://localhost:3000
# Probar funcionalidades principales
```

#### Paso 4: Actualizar Variables de Producción

**En Firebase Console:**
1. Project Settings > Apps
2. Copiar config (aunque es mismo proyecto)

**Preparar archivo `.env.production`:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=proyecto-xxxxx.firebaseapp.com
...
NEXT_PUBLIC_APP_URL=https://tu-dominio-produccion.com
NODE_ENV=production
```

### 5.2 Desplegar en Vercel (Recomendado)

#### Opción A: Desde GitHub (Easiest)

**Paso 1: Conectar GitHub**
1. Ir a https://vercel.com
2. Sign in con GitHub
3. Autorizar Vercel

**Paso 2: Importar Proyecto**
1. Click en "New Project"
2. Seleccionar repositorio `proyect-app`
3. Click "Import"

**Paso 3: Configurar Variables de Entorno**
```
Environment Variables
├── NEXT_PUBLIC_FIREBASE_API_KEY = AIza...
├── NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = ...
└── ... (todas las demás)
```

**Paso 4: Desplegar**
```
Click en "Deploy"
Esperar 2-5 minutos
```

**Resultado:**
```
✓ Deployment successful
URL: https://proyect-app.vercel.app
```

#### Opción B: Deploy Manual (CLI)

```bash
# 1. Instalar Vercel CLI
pnpm install -g vercel

# 2. Login
vercel login

# 3. Configurar proyecto
vercel

# 4. Deploy
vercel --prod

# 5. Copiar URL
https://proyect-app-xxxxx.vercel.app
```

### 5.3 Desplegar en Vercel (Recomendado)

**Opción simplificada y recomendada**

#### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel

# Verificar
vercel --version
```

#### Paso 2: Conectar repositorio

```bash
# Desde la carpeta del proyecto
vercel

# Seguir las instrucciones:
# 1. Confirm project setup
# 2. Link to existing project o crear nuevo
# 3. Seleccionar framework: Next.js
# 4. Build settings automáticos
```

#### Paso 3: Configurar variables de entorno

En Vercel Dashboard:
```
Project > Settings > Environment Variables

Agregar:
├── NEXT_PUBLIC_FIREBASE_API_KEY = tu_api_key
├── NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = tu_auth_domain
├── NEXT_PUBLIC_FIREBASE_PROJECT_ID = tu_project_id
├── NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = tu_storage_bucket
├── NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = tu_sender_id
└── NEXT_PUBLIC_FIREBASE_APP_ID = tu_app_id
```

#### Paso 4: Deploy automático

```bash
# Despliegue a staging
vercel

# Despliegue a producción
vercel --prod

# URL resultado
https://proyect-app.vercel.app
```

#### Actualizaciones automáticas

- Cada push a `main` → Despliegue automático a producción
- Cada PR → Preview automático en Vercel
- Sin pasos manuales adicionales

### 5.4 Configurar Dominio Personalizado en Vercel

```
Vercel Dashboard > Project Settings > Domains

1. Agregar dominio
   Input: tu-dominio.com

2. Seleccionar tipo:
   ├── Dominio Vercel (gratis): usar subdominio
   └── Dominio personalizado: apuntar DNS

3. Configurar DNS (si es personalizado):
   Registrador de dominio:
   ├── Ir a DNS settings
   ├── Agregar CNAME record
   │   - Nombre: @ o www
   │   - Valor: cname.vercel-dns.com
   ├── Guardar
   └── Esperar 10-30 minutos

4. Validación automática en Vercel
```

---

## 6. MONITOREO Y MANTENIMIENTO

### 6.1 Verificar Estado de la Aplicación

```bash
# 1. Logs en Vercel
vercel logs --prod

# 2. Logs en Firebase
firebase functions:log (si hay Cloud Functions)

# 3. Monitoreo de Firestore
Firebase Console > Firestore > Monitoring
```

### 6.2 Monitoreo de Rendimiento

**Lighthouse en Chrome DevTools:**
```
1. Abrir Chrome DevTools (F12)
2. Ir a tab "Lighthouse"
3. Generate report
4. Revisar scores (mínimo 90)
```

**Métricas Importantes:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.8s

### 6.3 Monitoreo de Seguridad

**Firebase Console:**
```
Analytics > Security
├── Ver intentos de login fallidos
├── Actividades sospechosas
└── IP bloqueadas
```

**Checklist de Seguridad:**
- ✅ Firestore Rules restrictivas
- ✅ Variables de entorno no expuestas
- ✅ HTTPS habilitado
- ✅ CORS configurado
- ✅ Rate limiting activo
- ✅ Backups regulares

### 6.4 Actualizar Dependencias

```bash
# Ver actualizaciones disponibles
pnpm outdated

# Actualizar todo
pnpm update

# Actualizar específico
pnpm update next react

# Verificar vulnerabilidades
pnpm audit
pnpm audit --fix
```

---

## 7. TROUBLESHOOTING

### Problema 1: "Cannot find module 'firebase'"

```bash
# Solución:
pnpm install firebase
# o si usa npm:
npm install firebase
```

### Problema 2: Variables de entorno no cargadas

```bash
# Verificar archivo .env.local existe
ls -la .env.local

# Reiniciar servidor
# Control + C en terminal
# pnpm dev
```

### Problema 3: Error de autenticación Firebase

```
Error: "Firebase: Error (auth/operation-not-supported-in-this-environment)"
```

**Soluciones:**
```bash
# 1. Verificar firebase.config.ts tiene credenciales correctas
# 2. Verificar firebaseConfig tiene todos los campos
# 3. En localhost, verificar que http://localhost:3000 está en 
#    Firebase Console > Authentication > Settings > Authorized domains
```

### Problema 4: Componentes no renderizan

```
Error: "Expected null, but got [object Object]"
```

**Solución: Usar "use client"**
```typescript
'use client'; // En componentes que usan hooks

import { useAuth } from '@/app/context/AuthContext';

export default function MyComponent() {
  const { user } = useAuth();
  return <div>{user?.email}</div>;
}
```

### Problema 5: Firestore rules bloqueando acceso

```
FirebaseError: Missing or insufficient permissions.
```

**Solución:**
```javascript
// Verificar rules en Firebase Console > Firestore > Rules
// Asegurar que el usuario tiene permisos:
match /users/{uid} {
  allow read: if request.auth.uid == uid;
  allow write: if request.auth.uid == uid;
}
```

### Problema 6: Build falla en producción

```bash
# Ejecutar build localmente
pnpm build

# Si hay errores TypeScript
pnpm tsc --noEmit

# Si hay errores ESLint
pnpm lint --fix
```

---

## 8. BACKUP Y RECUPERACIÓN

### 8.1 Backup de Firestore

#### Automático (Recomendado):
```
Firebase Console > Firestore > Backups
├── Crear política de backup
├── Frecuencia: Diaria
├── Retención: 7 días
└── Storage: gs://your-bucket/backups
```

#### Manual:
```bash
# Exportar Firestore a archivo
gcloud firestore export gs://your-bucket/backup-2025-12-12

# Importar (restaurar)
gcloud firestore import gs://your-bucket/backup-2025-12-12
```

### 8.2 Backup de Code

```bash
# GitHub tiene backups automáticos
# Pero también:

# 1. Clone local
git clone https://github.com/usuario/proyect-app
cd proyect-app

# 2. Ver historial
git log --oneline

# 3. Si necesitas revertir cambios
git revert <commit-id>
git push origin main
```

### 8.3 Recuperación de Errores

**Si data se borró accidentalmente:**
```bash
# 1. Restaurar desde backup en Firebase
Firebase Console > Firestore > Backups > Restore

# 2. O usar git para código
git checkout <commit-anterior>
```

---

## 📋 CHECKLIST DE DESPLIEGUE

### Pre-Despliegue
- [ ] Build local ejecuta sin errores (`pnpm build`)
- [ ] No hay warnings de TypeScript
- [ ] ESLint pasando (`pnpm lint`)
- [ ] Firestore Rules actualizadas
- [ ] Variables de entorno configuradas
- [ ] Firebase credenciales verificadas
- [ ] Domain/Email configurado en Firebase Auth

### Despliegue
- [ ] Código pusheado a GitHub
- [ ] Vercel/Firebase detecta cambios
- [ ] Build automático completado
- [ ] Despliegue exitoso
- [ ] URL funciona

### Post-Despliegue
- [ ] Acceso a aplicación verificado
- [ ] Autenticación funciona
- [ ] Crear usuario de prueba
- [ ] Firestore queries funcionan
- [ ] Certificado SSL válido (HTTPS)
- [ ] Lighthouse score > 90

### Mantenimiento Regular
- [ ] Revisar logs (semanal)
- [ ] Actualizar dependencias (mensual)
- [ ] Backup de datos (automático)
- [ ] Security audit (mensual)
- [ ] Performance monitoring (continuo)

---

## 🆘 SOPORTE Y RECURSOS

### Documentación
- [Firebase Docs](https://firebase.google.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Comunidades
- [Firebase Community](https://firebase.community)
- [Next.js Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

### Reportar Issues
```bash
# En GitHub
Issues > New Issue
Descripción detallada del problema
Pasos para reproducir
Screenshots si aplica
```

---

**Documento Versión:** 1.0  
**Fecha de Última Actualización:** Diciembre 2025  
**Status:** ✅ Completado

*Para soporte adicional, contactar al equipo de desarrollo o revisar la documentación técnica en la carpeta `/docs`.*
