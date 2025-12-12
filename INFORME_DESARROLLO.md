# 📋 INFORME DE DESARROLLO - GESTOR DE PORTAFOLIOS DE PROGRAMADORES

**Versión:** 0.1.0  
**Fecha de Elaboración:** 12 de Diciembre de 2025  
**Estado del Proyecto:** En Desarrollo  
**Plataforma:** Next.js 16 + Firebase + Tailwind CSS  

---

## 📑 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Arquitectura Técnica](#arquitectura-técnica)
4. [Decisiones de Diseño](#decisiones-de-diseño)
5. [Desafíos Enfrentados y Soluciones](#desafíos-enfrentados-y-soluciones)
6. [Guía de Configuración e Instalación](#guía-de-configuración-e-instalación)
7. [Guía de Despliegue](#guía-de-despliegue)
8. [Manual de Usuario - Administrador](#manual-de-usuario---administrador)
9. [Manual de Usuario - Usuarios Finales](#manual-de-usuario---usuarios-finales)
10. [Troubleshooting](#troubleshooting)

---

## 1. RESUMEN EJECUTIVO

### Descripción General

**Proyecto de Portafolios Profesionales** es una plataforma web centralizada que permite a programadores exponer su trabajo y experiencia, mientras facilita que usuarios externos soliciten asesorías especializadas. La plataforma actúa como intermediaria entre profesionales de desarrollo de software y clientes potenciales.

### Objetivos Principales

- ✅ Crear un espacio centralizado para que programadores muestren su portafolio
- ✅ Permitir que usuarios soliciten asesorías a programadores especializados
- ✅ Implementar un sistema de roles y permisos robusto
- ✅ Proporcionar una interfaz visual moderna y coherente
- ✅ Garantizar la seguridad de datos mediante Firebase
- ✅ Facilitar el despliegue en GitHub Pages

### Resultados Alcanzados

- **Usuarios**: 4 tipos de roles implementados (Visitante, Standard, Programmer, Admin)
- **Autenticación**: Google Sign-In + Email/Password
- **Módulos Funcionales**: Autenticación, Gestión de Perfiles, Portafolio, Disponibilidad/Calendarios
- **UI/UX**: Diseño coherente con Tailwind CSS y Material-UI
- **Stack Técnico**: Next.js 16, React 19, Firebase, TypeScript

---

## 2. DESCRIPCIÓN DEL PROYECTO

### 2.1 Visión General

El proyecto es una solución SaaS (Software as a Service) que automatiza la conexión entre programadores freelance/consultores y usuarios que requieren servicios de asesoría técnica.

### 2.2 Funcionalidades Principales

#### **A. Autenticación y Autorización**
- Registro e inicio de sesión con Google
- Registro con Email y Contraseña
- Sistema de roles basado en Firestore
- Protección de rutas según rol de usuario

#### **B. Gestión de Perfiles**
- Perfil de Usuario Estándar (solicita asesorías)
- Perfil de Programador (ofrece servicios)
  - Información técnica (lenguajes, skills, experiencia)
  - Bio y descripción profesional
  - Foto de perfil
- Perfil de Administrador (gestión del sistema)

#### **C. Portafolio**
- Visualización de proyectos realizados
- Descripción de proyectos con tecnologías usadas
- URL del proyecto y screenshot
- Gestión de proyectos (crear, editar, eliminar)

#### **D. Disponibilidad y Calendarios**
- Configuración semanal de disponibilidad
- Rangos horarios configurable
- Sistema de aplicaciones/citas para solicitar asesorías

#### **E. Panel Administrativo**
- Gestión de usuarios
- Cambio de roles
- Visualización de reportes
- Eliminación de usuarios maliciosos

### 2.3 Actores del Sistema

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Visitante** | Usuario no autenticado | Ver portafolios públicos |
| **Standard** | Cliente que solicita asesorías | Ver programadores, solicitar asesorías, gestionar su perfil |
| **Programmer** | Profesional que ofrece servicios | Crear/editar portafolio, configurar disponibilidad, ver solicitudes |
| **Admin** | Administrador del sistema | Todo (incluyendo funciones de programador) |

---

## 3. ARQUITECTURA TÉCNICA

### 3.1 Stack Tecnológico

```
Frontend:
├── Next.js 16.0.7 (App Router)
├── React 19.2.0 + React DOM
├── TypeScript 5
├── Tailwind CSS 4 (con PostCSS)
├── Material-UI (MUI) v7.3.6
├── Lucide React (iconos)
└── React Hook Form + Zod (validación de formularios)

Backend & Base de Datos:
├── Firebase Authentication
├── Firebase Firestore (NoSQL)
├── Firebase Hosting (deployment)
└── Firebase Rules (seguridad)

Estado y Reactividad:
├── RxJS 7.8.2 (observables)
├── React Context API
└── React Hook Form

Herramientas de Desarrollo:
├── ESLint 9
├── Prettier 3.7.4
├── Node.js (ambiente de desarrollo)
└── pnpm (gestor de paquetes)
```

### 3.2 Estructura de Carpetas

```
proyecto-app/
├── app/
│   ├── auth/
│   │   ├── guards/          # Protección de rutas
│   │   ├── login/           # Página de inicio de sesión
│   │   ├── register/        # Página de registro
│   │   └── ui/              # Componentes de autenticación
│   │
│   ├── dashboard/
│   │   ├── profile/         # Gestión de perfiles de usuario
│   │   ├── projects/        # Gestión de proyectos/portafolio
│   │   ├── users/           # Panel admin de usuarios
│   │   ├── standard-applications/ # Solicitudes de asesorías
│   │   └── ui/              # Componentes del dashboard
│   │
│   ├── context/             # Context API (AuthContext)
│   ├── lib/
│   │   ├── firebaseAuth.ts      # Funciones de autenticación
│   │   ├── firebaseRepository.ts # CRUD en Firestore
│   │   ├── types.ts             # Tipos TypeScript
│   │   └── global.d.ts          # Definiciones globales
│   │
│   ├── projects/            # Página pública de proyectos
│   ├── ui/                  # Componentes reutilizables
│   │   └── shared/          # Componentes globales
│   │
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio
│
├── public/                  # Recursos estáticos
│   ├── icons/
│   └── projects/
│
├── firebase.config.ts       # Configuración de Firebase
├── next.config.ts           # Configuración de Next.js
├── tsconfig.json            # Configuración TypeScript
├── tailwind.config.js       # Configuración Tailwind
└── package.json             # Dependencias del proyecto
```

### 3.3 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO (Cliente)                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   ┌────▼─────┐                         ┌────▼────┐
   │ Next.js  │                         │ Browser │
   │  App     │                         │ (UI)    │
   └────┬─────┘                         └────▲────┘
        │                                    │
        │ (Client-side)                      │
        │                                    │
   ┌────▼────────────────────────────┐      │
   │   React Context API              │      │
   │   - AuthContext                  │      │
   │   - User State                   │      │
   └────┬─────────────────────────────┘      │
        │                                    │
        │ (Real-time Subscriptions)          │
        │                                    │
   ┌────▼──────────────────────────────┐     │
   │   Firebase Services               │     │
   │   ├── Authentication              │     │
   │   ├── Firestore (Real-time)       │     │
   │   └── Cloud Storage (Future)      │     │
   └────┬──────────────────────────────┘     │
        │                                    │
        │ (Observables RxJS)                 │
        │                                    │
   ┌────▼──────────────────────────────┐     │
   │   Firestore Database              │     │
   │   ├── /users/{uid}                │     │
   │   ├── /users/{uid}/projects       │     │
   │   ├── /schedules/{uid}            │     │
   │   └── /applications               │     │
   └───────────────────────────────────┘     │
                                             │
                    ┌────────────────────────┘
                    │ (Actualización en tiempo real)
                    │
            (Componentes React se re-renderizan)
```

### 3.4 Estructura de Datos en Firestore

```firestore
firestore/
├── users/ {collection}
│   └── {uid} {document}
│       ├── uid: string
│       ├── email: string
│       ├── displayName: string
│       ├── photoURL?: string
│       ├── role: "standard" | "programmer" | "admin"
│       ├── companyName?: string (standard)
│       ├── title?: string (programmer)
│       ├── bio?: string (programmer)
│       ├── programmingLanguages?: string[] (programmer)
│       ├── skills?: string[] (programmer)
│       ├── experienceYears?: number (programmer)
│       │
│       └── projects/ {subcollection}
│           └── {projectId}
│               ├── id: string
│               ├── name: string
│               ├── description: string
│               ├── projectUrl?: string
│               ├── imageUrl?: string
│               └── technologiesUsed?: string[]
│
├── schedules/ {collection}
│   └── {uid} {document}
│       ├── uid: string
│       └── weeklySchedule: DayAvailability[]
│           ├── day: string
│           └── slots: { start: string, end: string }
│
└── applications/ {collection}
    └── {applicationId}
        ├── id: string
        ├── standardUid: string (quien solicita)
        ├── programmerUid: string (quien ofrece)
        ├── status: "pending" | "reviewed" | "accepted" | "rejected" | "completed"
        ├── message: string
        └── createdAt: number (timestamp)
```

---

## 4. DECISIONES DE DISEÑO

### 4.1 Selección del Stack Tecnológico

#### **Next.js 16 con App Router**
**Decisión:** Usar Next.js en lugar de React puro.

**Justificación:**
- ✅ Soporte nativo para server/client components
- ✅ Rutas dinámicas automáticas
- ✅ Optimización de imágenes integrada
- ✅ Mejor SEO con generación estática
- ✅ Despliegue simple en múltiples plataformas

#### **Firebase para Backend**
**Decisión:** Usar Firebase (Auth + Firestore) en lugar de un servidor Node.js personalizado.

**Justificación:**
- ✅ No requiere mantener servidor
- ✅ Escalabilidad automática
- ✅ Autenticación segura y confiable
- ✅ Base de datos en tiempo real (Firestore)
- ✅ Integración fácil con Next.js
- ✅ Costo reducido en fase inicial

#### **TypeScript**
**Decisión:** Usar TypeScript en lugar de JavaScript.

**Justificación:**
- ✅ Tipado estático previene errores
- ✅ Mejor experiencia de desarrollo (autocompletado)
- ✅ Documentación en el código
- ✅ Refactorización más segura
- ✅ Facilita trabajo en equipo

### 4.2 Patrón de Autenticación

#### **Context API + RxJS Observables**
**Decisión:** Implementar AuthContext con RxJS para manejo reactivo del estado de autenticación.

**Código Clave:**
```typescript
// Flujo reactivo: Auth → Firestore → React State
const authState$ = new Observable<User | null>(observer => {
  return onAuthStateChanged(auth, ...)
});

authState$.pipe(
  switchMap(currentUser => 
    currentUser ? getUserData(currentUser.uid) : of(null)
  )
).subscribe(result => {
  setUser(result.user);
  setUserData(result.userData);
})
```

**Ventajas:**
- ✅ Manejo elegante de flujos asincronos
- ✅ Cancela automáticamente suscripciones previas
- ✅ Sincronización automática de Auth + Firestore
- ✅ Menos re-renders innecesarios

### 4.3 Validación de Formularios

#### **Zod + React Hook Form**
**Decisión:** Usar Zod para validación y React Hook Form para gestión de formularios.

**Ejemplo:**
```typescript
const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const { register, handleSubmit } = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});
```

**Ventajas:**
- ✅ Validación declarativa y reutilizable
- ✅ Mensajes de error personalizados
- ✅ Validación cliente y servidor
- ✅ Menos código boilerplate

### 4.4 Diseño UI/UX

#### **Tailwind CSS + Material-UI**
**Decisión:** Combinar Tailwind CSS para utilidad y MUI para componentes complejos.

**Enfoque:**
- Usar **Tailwind** para: layouts, spacing, colores, tipografía base
- Usar **MUI** para: modales, datepickers, select avanzados, iconos (complemento)

**Justificación:**
- ✅ Flexibilidad de Tailwind + componentes listos de MUI
- ✅ Coherencia visual garantizada
- ✅ Reutilización de componentes
- ✅ Mantenimiento más sencillo

#### **Sistema de Colores**
```css
/* Tailwind CSS Custom */
--color-primary: #6366f1 (Indigo)
--color-secondary: #f3f4f6 (Gray)
--color-accent: #ec4899 (Pink)
--color-success: #10b981 (Green)
--color-warning: #f59e0b (Amber)
--color-error: #ef4444 (Red)
```

### 4.5 Gestión de Roles y Permisos

#### **Enfoque de Rutas Protegidas**
**Decisión:** Implementar RoleGuard en Next.js para proteger rutas.

**Estructura:**
```typescript
// app/auth/guards/RoleWard.tsx
if (!userData || !expectedRoles.includes(userData.role)) {
  redirect('/');
}
```

**Niveles de Protección:**
1. **Cliente-side**: Guards en componentes
2. **Firestore Rules**: Validación en BD
3. **Servidor**: Next.js middleware (futuro)

### 4.6 Despliegue

#### **GitHub Pages**
**Decisión:** Desplegar en GitHub Pages con Firebase como backend.

**Configuración:**
- Next.js con `output: "export"` para exportar estático
- Firebase Firestore y Auth en la nube
- GitHub Actions para CI/CD

---

## 5. DESAFÍOS ENFRENTADOS Y SOLUCIONES

### 5.1 Desafío 1: Diseño UI/UX Coherente

**Problema:**
La interfaz visual requería ser moderna, profesional y coherente en toda la aplicación. Fue difícil balancear entre la flexibilidad de Tailwind y componentes predefinidos de MUI.

**Solución Implementada:**

1. **Sistema de Componentes Reutilizables**
   - Creación de componentes `shared/` base (Card, Button, Label)
   - Paleta de colores consistente
   - Espaciado uniforme con escala Tailwind

2. **Documentación de Estilos**
   - Archivo `globals.css` con variables y utilidades globales
   - Guía de componentes en comentarios
   - Ejemplo de uso en cada componente

3. **Prueba A/B Manual**
   - Iteraciones de diseño con feedback
   - Ajustes basados en usabilidad

**Resultado:**
✅ Interfaz coherente y profesional en todas las secciones

---

### 5.2 Desafío 2: Dominar Zod + React Hook Form

**Problema:**
Zod y React Hook Form son bibliotecas complejas con muchas opciones. Fue necesario aprender:
- Esquemas de validación avanzados
- Integración con componentes controlados
- Manejo de errores dinámicos

**Solución Implementada:**

1. **Estudio de Documentación**
   - Lectura de docs oficiales
   - Ejemplos prácticos en formularios reales

2. **Patrones Reutilizables**
   ```typescript
   // Patrón base para todos los formularios
   const schema = z.object({ /* campos */ });
   type FormData = z.infer<typeof schema>;
   
   const { register, handleSubmit, formState: { errors } } = 
     useForm<FormData>({ resolver: zodResolver(schema) });
   ```

3. **Validación Personalizada**
   - `refine()` para lógica compleja
   - Validación asincrónica con Firebase
   - Mensajes de error contextuales

**Resultado:**
✅ Formularios validados, seguros y user-friendly

---

### 5.3 Desafío 3: Sincronización Auth + Firestore

**Problema:**
Mantener sincronizado el usuario autenticado (Firebase Auth) con su data en Firestore fue complejo:
- Race conditions durante login
- Re-renders excesivos
- Suscripciones duplicadas

**Solución Implementada:**

1. **RxJS para Orquestación Reactiva**
   ```typescript
   // switchMap cancela automáticamente suscripción anterior
   authState$.pipe(
     switchMap(user => 
       user ? getUserData(user.uid) : of(null)
     )
   )
   ```

2. **Context Global Único**
   - Un solo AuthContext como fuente de verdad
   - Hook `useAuth()` reutilizable en toda la app
   - Loading state para evitar race conditions

3. **Cleanup Automático**
   - Unsubscribe al desmontar componentes
   - Validación de usuario antes de operaciones

**Resultado:**
✅ Sincronización confiable y sin race conditions

---

### 5.4 Desafío 4: Protección de Rutas Según Rol

**Problema:**
Diferentes roles (Visitante, Standard, Programmer, Admin) requieren acceso a diferentes páginas. Fue necesario:
- Implementar guards en múltiples rutas
- Evitar que usuarios no autenticados accedan a áreas restringidas
- Permitir que Admin actúe como Programmer

**Solución Implementada:**

1. **RoleWard Guard Component**
   ```typescript
   // app/auth/guards/RoleWard.tsx
   export default function RoleWard({ 
     children, 
     expectedRoles 
   }: Props) {
     const { userData, loading } = useAuth();
     
     if (loading) return <LoadingSpinner />;
     if (!userData?.role || !expectedRoles.includes(userData.role)) {
       redirect('/');
     }
     return children;
   }
   ```

2. **Layout Wrapper para Protección**
   ```typescript
   // app/dashboard/layout.tsx
   <RoleWard expectedRoles={['programmer', 'admin']}>
     {children}
   </RoleWard>
   ```

3. **Firestore Security Rules**
   ```firestore
   // Cada usuario solo puede leer/escribir sus datos
   allow read, write: if request.auth.uid == resource.data.uid;
   ```

**Resultado:**
✅ Control de acceso multi-nivel y seguro

---

### 5.5 Desafío 5: Manejo de Errores de Firebase

**Problema:**
Firebase lanza errores con códigos específicos (`auth/user-not-found`, `auth/invalid-credential`) que necesitan mensajes amigables para el usuario.

**Solución Implementada:**

```typescript
// Mapeo de errores de Firebase a mensajes amigables
const errorMessages: Record<string, string> = {
  'auth/user-not-found': 'Correo no registrado',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/invalid-credential': 'Correo o contraseña incorrectos',
  'auth/email-already-in-use': 'Este correo ya está registrado',
  'auth/weak-password': 'La contraseña es muy débil',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
};

try {
  await loginEmailUser(email, password);
} catch (error) {
  const message = errorMessages[error.code] || 'Error desconocido';
  setFirebaseError(message);
}
```

**Resultado:**
✅ Experiencia de usuario mejorada con errores claros

---

## 6. GUÍA DE CONFIGURACIÓN E INSTALACIÓN

### 6.1 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior): https://nodejs.org/
- **pnpm** (v8 o superior): `npm install -g pnpm`
- **Git**: https://git-scm.com/
- **Una cuenta de Firebase**: https://firebase.google.com/
- **Una cuenta de GitHub**: https://github.com/ (para despliegue)

### 6.2 Paso 1: Clonar el Repositorio

```bash
# Navega a tu directorio de proyectos
cd ~/Repositorio/PlataformasWeb/FrameworksProjects/Reactjs/

# Clona el repositorio
git clone <URL_DEL_REPOSITORIO>
cd proyect-app
```

### 6.3 Paso 2: Instalar Dependencias

```bash
# Instala todas las dependencias del proyecto
pnpm install

# Verifica que se instaló correctamente
pnpm --version
node --version
```

**Tiempo esperado:** 2-5 minutos

**Salida esperada:**
```
✓ Packages: 45 installed
✓ Lockfile is up-to-date
✓ Modules linked
```

### 6.4 Paso 3: Configurar Firebase

#### **3.1 Crear un Proyecto en Firebase**

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear Proyecto"
3. Nombre del proyecto: `portfolio-dev` (o el que prefieras)
4. Acepta los términos y crea el proyecto
5. Selecciona "Web" como plataforma

#### **3.2 Obtener Credenciales**

Después de crear el proyecto:

1. Ve a **Configuración del Proyecto** (ícono de engranaje)
2. Ve a la pestaña **"Tus apps"**
3. En la sección **SDK setup and configuration**, copia el objeto `firebaseConfig`

Deberá verse así:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef1234567890"
};
```

#### **3.3 Actualizar archivo firebase.config.ts**

Abre [firebase.config.ts](firebase.config.ts) y reemplaza la configuración:

```typescript
const firebaseConfig = {
  // REEMPLAZA CON TUS CREDENCIALES
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id",
};
```

⚠️ **SEGURIDAD:** Las credenciales de Firebase son públicas (se envían al navegador). No incluyes secretos aquí. Las Firestore Rules protegen los datos.

### 6.5 Paso 4: Habilitar Métodos de Autenticación

En Firebase Console:

1. Ve a **Authentication** (en el menú izquierdo)
2. Haz clic en **Comenzar**
3. Ve a **Métodos de inicio de sesión**
4. Habilita:
   - **Google**
   - **Email/Contraseña**

#### **Para Google Sign-In:**

1. Haz clic en **Google**
2. Actívalo
3. Proporciona un correo de soporte y nombre público
4. Guarda

#### **Para Email/Contraseña:**

1. Haz clic en **Email/Contraseña**
2. Actívalo
3. Guarda

### 6.6 Paso 5: Crear Firestore Database

En Firebase Console:

1. Ve a **Firestore Database** (en el menú izquierdo)
2. Haz clic en **Crear base de datos**
3. Selecciona ubicación: Elige la más cercana a ti (ej: `nam5` para América)
4. Modo de seguridad: Selecciona **Modo de producción**
5. Haz clic en **Crear**

#### **Configurar Firestore Rules**

Después de crear la BD:

1. Ve a la pestaña **Reglas**
2. Reemplaza el contenido con:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Usuarios: cada usuario puede leer/escribir su propio documento
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      
      // Proyectos subcollection: solo el propietario
      match /projects/{projectId} {
        allow read, write: if request.auth.uid == uid;
      }
    }
    
    // Horarios: solo el propietario
    match /schedules/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Aplicaciones/Solicitudes
    match /applications/{appId} {
      // Lectores: el estándar que solicita o el programador contactado
      allow read: if request.auth.uid in [resource.data.standardUid, resource.data.programmerUid];
      
      // Escritura: creador de la aplicación
      allow write: if request.auth.uid == resource.data.standardUid;
      
      // Admin puede ver/editar todo
      allow read, write: if isAdmin(request.auth.uid);
    }
    
    // Función helper para verificar si es admin
    function isAdmin(uid) {
      return exists(/databases/$(database)/documents/users/$(uid)) &&
             get(/databases/$(database)/documents/users/$(uid)).data.role == 'admin';
    }
  }
}
```

3. Haz clic en **Publicar**

### 6.7 Paso 6: Crear Usuario Admin Inicial

**Opción A: Crear manualmente**

1. En Firebase Console, ve a **Authentication**
2. Haz clic en **Crear usuario**
3. Email: tu-email@ejemplo.com
4. Contraseña: una contraseña segura
5. Crea el usuario

**Opción B: Registrarse desde la app y cambiar rol**

1. Inicia la app y regístrate
2. Ve a Firebase Console → Firestore
3. En la colección `users`, encuentra tu documento
4. Edita el campo `role` de `"standard"` a `"admin"`

### 6.8 Paso 7: Configurar Variables de Entorno (opcional)

Si necesitas variables de entorno:

```bash
# Crea archivo .env.local en la raíz del proyecto
cat > .env.local << EOF
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
```

**Nota:** Variables con prefijo `NEXT_PUBLIC_` se envían al navegador. No incluyas secretos.

### 6.9 Verificar la Instalación

```bash
# Compila TypeScript
pnpm tsc --noEmit

# Ejecuta ESLint
pnpm lint

# Si todo está OK, deberías ver:
# ✓ No TypeScript errors
# ✓ No linting errors
```

---

## 7. GUÍA DE DESPLIEGUE

### 7.1 Despliegue en GitHub Pages

#### **Paso 1: Preparar el Proyecto**

1. Actualiza [next.config.ts](next.config.ts) para exportación estática:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Habilita exportación estática
  
  // ... resto de configuración ...
};

module.exports = nextConfig;
```

2. Asegúrate que la app no use características dinámicas de Next.js:
   - ❌ API Routes
   - ❌ getServerSideProps
   - ✅ Static generation
   - ✅ Client components

#### **Paso 2: Crear Repositorio en GitHub**

```bash
# Inicializa git (si no está iniciado)
git init

# Añade el repositorio remoto
git remote add origin https://github.com/tu-usuario/portfolio-dev.git

# Rama principal
git branch -M main

# Primer commit
git add .
git commit -m "Proyecto inicial de Portfolio Dev"

# Push al repositorio
git push -u origin main
```

#### **Paso 3: Configurar GitHub Pages**

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. **Source:** Selecciona `GitHub Actions`
4. Haz clic en **Create pull request** para el template "Static HTML"

#### **Paso 4: Crear Workflow de GitHub Actions**

Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [ 20.x ]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build
      run: pnpm build
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: './out'
    
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: actions/deploy-pages@v2
```

#### **Paso 5: Hacer Push y Desplegar**

```bash
# Añade los cambios
git add .

# Commit
git commit -m "Configurar GitHub Pages y Actions"

# Push
git push origin main

# GitHub Actions ejecutará automáticamente el workflow
# Espera 2-3 minutos y visita https://tu-usuario.github.io/portfolio-dev
```

### 7.2 Despliegue en Firebase Hosting (Alternativo)

Si prefieres Firebase Hosting en lugar de GitHub Pages:

#### **Paso 1: Instalar Firebase CLI**

```bash
npm install -g firebase-tools
```

#### **Paso 2: Autenticarse con Firebase**

```bash
firebase login
```

Sigue las instrucciones en el navegador.

#### **Paso 3: Inicializar Firebase Hosting**

```bash
firebase init hosting
```

**Preguntas y respuestas:**
- **¿Qué proyecto de Firebase deseas usar?** → Selecciona tu proyecto
- **¿Qué directorio deseas publicar?** → `out`
- **¿Configurar como SPA?** → `y` (Sí)

#### **Paso 4: Buildear y Desplegar**

```bash
# Build
pnpm build

# Desplegar
firebase deploy
```

**Salida esperada:**
```
✓ Deploy complete!

Project Console: https://console.firebase.google.com/project/portfolio-dev
Hosting URL: https://portfolio-dev.web.app
```

### 7.3 Verificar Despliegue

Después del despliegue:

1. Visita la URL publicada
2. Verifica que cargue correctamente
3. Prueba:
   - Login con Google
   - Registro con Email
   - Navegación entre páginas
   - Carga de datos desde Firestore

```bash
# Ver logs en tiempo real
firebase hosting:log
```

---

## 8. MANUAL DE USUARIO - ADMINISTRADOR

### 8.1 Introducción

El panel administrativo permite gestionar todos los aspectos de la plataforma: usuarios, roles, reportes y contenido.

**Acceso:** Solo usuarios con rol `admin` pueden acceder.

### 8.2 Acceso al Panel Admin

#### **Paso 1: Iniciar Sesión**

1. Ve a la URL de la aplicación
2. Haz clic en **"Iniciar Sesión"**
3. Elige una opción:
   - **Google Sign-In:** Click en botón Google
   - **Email/Contraseña:** Ingresa credenciales

#### **Paso 2: Ir al Dashboard**

Después de iniciar sesión, deberías redirigirse automáticamente a:
```
/dashboard/profile
```

Si no es así, haz click en **Dashboard** en la navegación.

### 8.3 Navegación Principal

**Barra de navegación lateral** (visible en `/dashboard/*`):

```
Dashboard
├── Mi Perfil        → /dashboard/profile
├── Mis Proyectos    → /dashboard/projects
├── Usuarios         → /dashboard/users (solo Admin)
├── Aplicaciones     → /dashboard/standard-applications
└── Disponibilidad   → /dashboard/standard-applications
```

### 8.4 Sección: Mi Perfil

**Ubicación:** `Dashboard → Mi Perfil` o `/dashboard/profile`

#### **Visualizar Mi Perfil**

Muestra tu información actual:
- Nombre
- Email
- Foto de perfil
- Rol actual
- Información adicional según el rol

#### **Editar Mi Perfil**

1. Haz clic en botón **"Editar"**
2. Modifica los campos deseados
3. Haz clic en **"Guardar"**

**Campos editables por rol:**

| Campo | Standard | Programmer | Admin |
|-------|----------|-----------|-------|
| Nombre | ✅ | ✅ | ✅ |
| Foto | ✅ | ✅ | ✅ |
| Empresa | ✅ | ❌ | ❌ |
| Título | ❌ | ✅ | ✅ |
| Bio | ❌ | ✅ | ✅ |
| Lenguajes | ❌ | ✅ | ✅ |
| Skills | ❌ | ✅ | ✅ |
| Experiencia (años) | ❌ | ✅ | ✅ |

### 8.5 Sección: Mis Proyectos

**Ubicación:** `Dashboard → Mis Proyectos` o `/dashboard/projects`

#### **Ver Proyectos**

Muestra tabla con tus proyectos:

| Columna | Descripción |
|---------|-------------|
| Nombre | Nombre del proyecto |
| Descripción | Descripción breve |
| Tecnologías | Lenguajes/frameworks usados |
| Acciones | Editar/Eliminar |

#### **Crear Nuevo Proyecto**

1. Haz clic en botón **"Nuevo Proyecto"**
2. Completa el formulario:

```
Nombre del Proyecto *
├── Ejemplo: "Plataforma de E-Commerce"

Descripción *
├── Ejemplo: "Sistema de tienda online con carrito, pagos..."

URL del Proyecto (opcional)
├── Ejemplo: https://tienda-online.com

URL de Imagen (opcional)
├── Ejemplo: https://imgur.com/imagen.jpg

Tecnologías Usadas *
├── React, Next.js, Firebase
├── Selecciona múltiples opciones
└── Puedes escribir custom
```

3. Haz clic en **"Crear Proyecto"**

#### **Editar Proyecto**

1. En la fila del proyecto, haz clic en **"Editar"**
2. Modifica los campos
3. Haz clic en **"Guardar"**

#### **Eliminar Proyecto**

1. En la fila del proyecto, haz clic en **"Eliminar"**
2. **Confirma** en el modal de confirmación
3. El proyecto se elimina permanentemente

### 8.6 Sección: Gestión de Usuarios (Solo Admin)

**Ubicación:** `Dashboard → Usuarios` o `/dashboard/users`

⚠️ **Solo accesible para admins**

#### **Ver Lista de Usuarios**

Tabla con todos los usuarios del sistema:

| Columna | Descripción |
|---------|-------------|
| Nombre | Nombre del usuario |
| Email | Correo electrónico |
| Rol Actual | standard / programmer / admin |
| Acciones | Cambiar rol / Eliminar |

#### **Cambiar Rol de Usuario**

1. En la fila del usuario, haz clic en **"Cambiar Rol"**
2. Selecciona nuevo rol:
   - **standard:** Usuario que solicita asesorías
   - **programmer:** Programador que ofrece servicios
   - **admin:** Administrador del sistema
3. Haz clic en **"Guardar"**

**Ejemplo de caso de uso:**
```
Un usuario 'standard' quiere convertirse en 'programmer'
→ Admin cambia su rol en la tabla
→ Usuario ahora puede crear proyectos y ofrecerseservicios
```

#### **Eliminar Usuario**

⚠️ **Esta acción es irreversible**

1. En la fila del usuario, haz clic en **"Eliminar"**
2. Confirma en el modal
3. El usuario y todos sus datos se eliminan
4. El usuario deberá registrarse nuevamente para acceder

**Casos de uso:**
- Usuario reportado por abuso
- Duplicidad de cuentas
- Usuario solicita eliminación

### 8.7 Sección: Aplicaciones/Solicitudes

**Ubicación:** `Dashboard → Aplicaciones` o `/dashboard/standard-applications`

#### **Ver Solicitudes de Asesorías**

Tabla con solicitudes recibidas:

| Columna | Descripción |
|---------|-------------|
| Usuario | Quién solicita |
| Mensaje | Descripción de la solicitud |
| Estado | pending / reviewed / accepted / rejected / completed |
| Fecha | Cuándo se creó |
| Acciones | Aceptar / Rechazar |

#### **Cambiar Estado de Solicitud**

**Estados disponibles:**

| Estado | Descripción | Acción |
|--------|-------------|--------|
| **pending** | Nueva, sin revisar | Admin debe revisar |
| **reviewed** | Admin la revisó | Pasar a accepted/rejected |
| **accepted** | Aceptada | Realizar la asesoría |
| **rejected** | Rechazada | Usuario notificado |
| **completed** | Asesoría terminada | Archivar |

**Cómo cambiar estado:**

1. Haz clic en la solicitud
2. Lee el mensaje del usuario
3. Decide:
   - **"Aceptar"** → Estado `accepted`
   - **"Rechazar"** → Estado `rejected`
   - **"Completar"** → Estado `completed`

### 8.8 Configuración de Disponibilidad

**Ubicación:** `Dashboard → Disponibilidad`

#### **Configurar Horarios de Trabajo**

Tabla semanal con franjas horarias:

```
Lunes    09:00 - 18:00
Martes   09:00 - 18:00
Miércoles 09:00 - 18:00
Jueves   09:00 - 18:00
Viernes  09:00 - 18:00
Sábado   13:00 - 17:00
Domingo  ---
```

#### **Editar Disponibilidad**

1. Haz clic en el día que deseas modificar
2. Ingresa:
   - **Hora de inicio** (ej: 09:00)
   - **Hora de fin** (ej: 18:00)
3. Haz clic en **"Guardar"**

#### **Eliminar Disponibilidad**

Para un día sin disponibilidad:

1. Haz clic en **"Eliminar"** para ese día
2. El día quedará vacío

**Nota:** La disponibilidad se usa para que usuarios soliciten asesorías en tus horarios.

### 8.9 Cerrar Sesión

1. En la esquina superior derecha, busca tu avatar/nombre
2. Haz clic en **"Cerrar Sesión"**
3. Se redirige a la página de inicio

---

## 9. MANUAL DE USUARIO - USUARIOS FINALES

### 9.1 Introducción para Usuarios Standard

Los usuarios "Standard" son aquellos que buscan solicitar asesorías a programadores profesionales en la plataforma.

**Funcionalidades principales:**
- Crear y gestionar perfil
- Explorar portafolios de programadores
- Solicitar asesorías
- Seguimiento de solicitudes

### 9.2 Registro e Inicio de Sesión

#### **Opción 1: Registro con Google (Recomendado)**

1. Ve a la página principal
2. Haz clic en **"Registrarse con Google"**
3. Selecciona tu cuenta de Google
4. Se crea automáticamente tu perfil como "Standard"

**Ventajas:**
- ✅ Más rápido
- ✅ Foto de perfil automática
- ✅ Mayor seguridad

#### **Opción 2: Registro con Email y Contraseña**

1. Ve a la página principal
2. Haz clic en **"Crear Cuenta"**
3. Completa el formulario:

```
Nombre Completo *
├── Ejemplo: Juan García

Correo Electrónico *
├── Ejemplo: juan@gmail.com

Contraseña *
├── Mínimo 8 caracteres
├── Incluir mayúsculas, números y símbolos

Confirmar Contraseña *
├── Debe coincidir con la anterior
```

4. Haz clic en **"Registrarse"**
5. Se crea tu perfil como "Standard"

#### **Iniciar Sesión Posteriores**

1. Haz clic en **"Iniciar Sesión"**
2. Elige el mismo método que usaste para registrarte
3. Ingresa credenciales
4. Se redirige automáticamente al Dashboard

### 9.3 Mi Perfil

**Ubicación:** `Dashboard → Mi Perfil`

#### **Ver Mi Información**

Muestra:
- Nombre
- Correo electrónico
- Foto de perfil
- Empresa (si aplica)
- Rol: "Standard"

#### **Editar Perfil**

1. Haz clic en botón **"Editar"**
2. Modifica:
   - **Nombre:** Tu nombre completo
   - **Foto:** URL de una imagen
   - **Empresa (opcional):** Dónde trabajas

3. Haz clic en **"Guardar"**

**Ejemplo:**
```
Nombre: Juan García López
Empresa: Empresa ABC S.A.
Foto: https://imgur.com/profile.jpg
```

### 9.4 Explorar Programadores

**Ubicación:** Página principal o `/projects`

#### **Ver Catálogo de Programadores**

Muestra grid de cards con programadores:

Cada card contiene:
- Foto de perfil
- Nombre
- Título (ej: "Senior Fullstack Developer")
- Skills destacados
- Años de experiencia
- Botón "Ver Perfil Completo"

#### **Filtrar/Buscar Programadores**

**Por Skills:**
- React, Node.js, Python, etc.
- Selecciona múltiples skills

**Por Experiencia:**
- 0-2 años
- 2-5 años
- 5-10 años
- 10+ años

#### **Ver Perfil Completo**

1. Haz clic en **"Ver Perfil"** en una card
2. Se abre página con información completa:

```
┌─────────────────────────────────────┐
│ [Foto]  Nombre                      │
│         Título                      │
│         ⭐ 5.0 (10 reseñas)         │
└─────────────────────────────────────┘

Biografía
└─ Descripción profesional...

Lenguajes de Programación
├─ JavaScript/TypeScript
├─ Python
└─ Java

Skills
├─ React, Next.js
├─ Firebase, MongoDB
├─ Docker, Kubernetes

Experiencia
└─ 7 años desarrollando aplicaciones web

Portafolio
├─ Proyecto 1: Sistema E-commerce
│  Tecnologías: React, Node.js, PostgreSQL
│  Link: https://...
│
├─ Proyecto 2: App Móvil Delivery
│  Tecnologías: React Native, Firebase
│  Link: https://...
└─ ...

Disponibilidad
├─ Lunes - Viernes: 09:00 - 18:00
├─ Sábado: 13:00 - 17:00
└─ Domingo: Cerrado

BOTÓN: "Solicitar Asesoría"
```

### 9.5 Solicitar Asesoría

#### **Paso 1: Acceder al Formulario**

En el perfil del programador, haz clic en **"Solicitar Asesoría"**

#### **Paso 2: Llenar Formulario**

```
Asunto de la Asesoría *
├── Ejemplo: "Ayuda con arquitectura de React"

Descripción Detallada *
├── Ej: "Necesito ayuda para estructurar mi proyecto
│        de e-commerce con React. He tenido problemas
│        con la gestión de estado..."

Duración Estimada (opcional)
├── 30 minutos
├── 1 hora
├── 2 horas
└── Más de 2 horas

Disponibilidad (opcional)
├── Fechas y horarios preferidos
└── (Se compara con disponibilidad del programador)
```

#### **Paso 3: Enviar Solicitud**

1. Haz clic en **"Enviar Solicitud"**
2. Recibirás confirmación
3. Espera a que el programador revise

**Estados de la solicitud:**
- 🔵 **pending:** Esperando revisión
- 🟡 **reviewed:** El programador la revisó
- 🟢 **accepted:** ¡Aceptada!
- 🔴 **rejected:** Rechazada
- ⚫ **completed:** Asesoría finalizada

### 9.6 Mis Solicitudes

**Ubicación:** `Dashboard → Aplicaciones`

Tabla con todas tus solicitudes enviadas:

| Columna | Descripción |
|---------|-------------|
| Programador | A quién solicitaste |
| Asunto | Tema de la asesoría |
| Estado | pending/reviewed/accepted/... |
| Fecha | Cuándo la enviaste |

#### **Acciones**

- **Ver Detalles:** Abre descripción completa
- **Cancelar (si pending):** Cancela la solicitud

### 9.7 Mejores Prácticas

#### **Al Solicitar una Asesoría:**

✅ **HACER:**
- Ser específico en la descripción del problema
- Mencionar tecnologías o contexto
- Indicar urgencia si aplica
- Ser cortés y profesional

❌ **NO HACER:**
- Solicitudes genéricas ("Ayuda con programación")
- Pedir que realicen el trabajo completo
- Lenguaje inapropiado
- Múltiples solicitudes al mismo programador

#### **Ejemplo de Buena Solicitud:**

```
Asunto: Ayuda con Autenticación en Next.js

Descripción:
Estoy desarrollando una aplicación de gestión de proyectos
con Next.js. Necesito implementar autenticación segura 
con Google y sesiones de usuario. 

He intentado usar next-auth pero tengo problemas con 
la configuración de callbacks y Prisma.

¿Podrías ayudarme a:
1. Configurar correctamente los callbacks
2. Sincronizar usuario con base de datos
3. Proteger rutas del cliente

Duración estimada: 1 hora
Disponibilidad: Viernes 15:00-17:00 o Sábado mañana
```

---

## 10. TROUBLESHOOTING

### 10.1 Problemas de Instalación

#### **Error: "pnpm: command not found"**

```bash
# Solución: Instalar pnpm globalmente
npm install -g pnpm

# Verificar instalación
pnpm --version
```

#### **Error: "node_modules not found" o dependencias incompletas**

```bash
# Solución: Reinstalar dependencias
rm -rf node_modules pnpm-lock.yaml  # En Windows: rmdir /s node_modules
pnpm install
```

#### **Error: "TypeScript errors: Cannot find module '@/*'"**

Este es un error de paths de TypeScript.

```bash
# Solución: Reconstruir el proyecto
pnpm tsc --noEmit

# Si persiste:
rm -rf .next
pnpm build
```

### 10.2 Problemas de Firebase

#### **Error: "Firebase config is not initialized"**

```
Error: Firebase initialization failed
```

**Causa:** `firebase.config.ts` tiene credenciales inválidas.

**Solución:**
1. Ve a Firebase Console
2. Copia credenciales correctas
3. Actualiza [firebase.config.ts](firebase.config.ts)
4. Reinicia el servidor: `pnpm dev`

#### **Error: "Permission denied" en Firestore**

```
FirebaseError: Missing or insufficient permissions
```

**Causa:** Firestore Rules rechaza la operación.

**Solución:**

1. Ve a Firebase Console → Firestore → Reglas
2. Verifica que las reglas permitan la operación:

```firestore
// Ejemplo: Permitir lectura pública
match /users/{userId} {
  allow read: if true;  // Público
  allow write: if request.auth.uid == userId;  // Solo propietario
}
```

3. Publica los cambios
4. Espera 1 minuto para que se repliquen

#### **Error: "Google Sign-In no funciona"**

```
Error: auth/popup-closed-by-user
```

**Causas posibles:**
1. Google Sign-In no habilitado en Firebase
2. Dominio no agregado a lista blanca de OAuth
3. Pop-up fue bloqueado

**Soluciones:**

A) **Habilitar Google Sign-In:**
```bash
# Firebase Console
→ Authentication
→ Sign-in method
→ Google (debe estar habilitado)
```

B) **Agregar dominio a OAuth:**
```bash
# Firebase Console
→ Authentication
→ Settings
→ Authorized Domains
→ Agregar: localhost:3000, tu-dominio.com, etc.
```

C) **Permitir pop-ups:**
- Navega a Configuración del navegador
- Desbloquea pop-ups para la aplicación

### 10.3 Problemas de Desarrollo

#### **Error: "Port 3000 already in use"**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Soluciones:**

A) **Usar puerto diferente:**
```bash
pnpm dev -- -p 3001
```

B) **Matar proceso que ocupa el puerto:**

En Windows:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

En Mac/Linux:
```bash
lsof -i :3000
kill -9 <PID>
```

#### **Error: "Cannot find module" durante build**

```
Error: Cannot find module '@/app/lib/types'
```

**Solución:**
```bash
# Limpiar build y reintentar
rm -rf .next

# En Windows:
rmdir /s .next

# Rebuild
pnpm build
```

#### **React Warning: "Hydration mismatch"**

```
Warning: Expected server HTML to contain a matching <div>
```

**Causa:** Cliente y servidor renderizan diferente contenido.

**Solución:** Asegurar que componentes que usan `useEffect` tengan `client` declaration:

```tsx
"use client";  // ← Agregar esto

import { useEffect } from "react";

export default function Component() {
  useEffect(() => {
    // Código que depende del navegador
  }, []);
  
  return <div>Contenido</div>;
}
```

### 10.4 Problemas de Seguridad

#### **⚠️ Credenciales de Firebase Expuestas**

Si accidentalmente incluyes credenciales con claves secretas (nunca debe pasar):

1. **Regenerar credenciales inmediatamente:**
   ```bash
   # Firebase Console
   → Project Settings
   → Service Accounts
   → Generate new private key
   ```

2. **Rotar credenciales de usuario:**
   ```bash
   # Firebase Console
   → Authentication
   → Users
   → Reset password para todos
   ```

3. **Revocar tokens activos:**
   ```bash
   # Firebase Console
   → Authentication
   → Sessions
   → Revocar sesiones activas
   ```

#### **Login/Contraseña Débil**

Si un usuario crea contraseña débil, Firebase la rechaza:

```
Error: The password must be 6 characters long, contain at least one uppercase letter, 
one lowercase letter, and one number.
```

**Solución:** Hacer que el usuario cree contraseña más fuerte.

### 10.5 Problemas de Despliegue

#### **GitHub Pages: "404 Not Found"**

**Causa:** Rutas dinámicas no están exportadas correctamente.

**Solución:**

1. Verificar que `output: "export"` esté en [next.config.ts](next.config.ts)
2. No usar rutas dinámicas que requieren datos
3. Generar página 404 personalizada:

```tsx
// app/not-found.tsx
export default function NotFound() {
  return <h1>Página no encontrada</h1>;
}
```

4. Rebuild y push:
```bash
pnpm build
git add .
git commit -m "Fix: Configurar para GitHub Pages"
git push origin main
```

#### **Firebase Hosting: Timeout en Deploy**

```
Error: deploy timeout after 5 minutes
```

**Soluciones:**

A) **Verificar conexión a internet**
```bash
firebase deploy --debug
```

B) **Reintentar:**
```bash
firebase deploy
```

C) **Si persiste, resetear:**
```bash
firebase logout
firebase login
firebase deploy
```

### 10.6 Soporte y Recursos

**Documentación oficial:**
- 🔗 [Next.js Docs](https://nextjs.org/docs)
- 🔗 [Firebase Docs](https://firebase.google.com/docs)
- 🔗 [TypeScript Docs](https://www.typescriptlang.org/docs/)
- 🔗 [Tailwind CSS Docs](https://tailwindcss.com/docs)
- 🔗 [React Hook Form](https://react-hook-form.com/)
- 🔗 [Zod Docs](https://zod.dev/)

**Comunidades:**
- Stack Overflow: Etiquetas `next.js`, `firebase`, `react`
- GitHub Issues: Reportar bugs
- Discord: Comunidades de Next.js y Firebase

---

## 11. CONCLUSIÓN

Este proyecto representa un excelente punto de partida para una plataforma de servicios profesionales. Con una arquitectura sólida basada en Next.js y Firebase, permite:

✅ Escalabilidad automática
✅ Seguridad de datos garantizada
✅ Experiencia de usuario moderna
✅ Facilidad de despliegue y mantenimiento

### Próximos Pasos Sugeridos:

1. **Implementar Sistema de Pagos**
   - Integrar Stripe o MercadoPago
   - Facturación automática

2. **Mejorar Sistema de Ratings**
   - Reseñas de usuarios
   - Sistema de estrellas

3. **Mensajería en Tiempo Real**
   - Chat entre usuarios
   - Notificaciones

4. **Analytics y Reportes**
   - Dashboard de métricas
   - Seguimiento de conversiones

5. **Optimización de Performance**
   - Caché de Firestore
   - CDN de imágenes

---

**Documento preparado:** 12 de Diciembre de 2025  
**Versión del Proyecto:** 0.1.0 (En Desarrollo)  
**Autor:** Sistema de Documentación Automática  
**Estado:** ✅ Completo y Listo para Revisión
