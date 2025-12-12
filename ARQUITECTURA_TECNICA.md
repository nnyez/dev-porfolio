# 🏗️ ARQUITECTURA TÉCNICA DETALLADA

## 1. VISTA GENERAL DE LA ARQUITECTURA

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO FINAL                             │
│                     (Navegador Web)                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                 HTTP/HTTPS │ (REST API)
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
    ┌───▼────────────────┐            ┌──────▼──────────────┐
    │   Next.js 16       │            │   Firebase CDN      │
    │  ┌────────────────┐│            │  ┌────────────────┐ │
    │  │ App Router     ││            │  │ Static Files   │ │
    │  │ Pages/Routes   ││            │  │ Images/CSS/JS  │ │
    │  └────────────────┘│            │  └────────────────┘ │
    │  ┌────────────────┐│            └────────────────────┘
    │  │ React 19       ││
    │  │ Components     ││
    │  └────────────────┘│
    │  ┌────────────────┐│
    │  │ Tailwind CSS   ││
    │  │ Styling        ││
    │  └────────────────┘│
    └────┬──────────────┘
         │
         │ REST Calls
         │ (JSON)
         │
    ┌────▼──────────────┐
    │   Firebase SDK    │
    │  ┌────────────────┐
    │  │ Authentication │
    │  │ Firestore API  │
    │  │ Cloud Storage  │
    │  └────────────────┘
    └────┬──────────────┘
         │
         │ HTTPS
         │
    ┌────▼──────────────────────────────────┐
    │      Google Cloud (Firebase)           │
    │  ┌────────────────────────────────┐  │
    │  │ Firebase Auth                  │  │
    │  │ (OAuth 2.0, Email/Password)    │  │
    │  └────────────────────────────────┘  │
    │  ┌────────────────────────────────┐  │
    │  │ Firestore (NoSQL Database)     │  │
    │  │ Realtime + Offline Support     │  │
    │  └────────────────────────────────┘  │
    │  ┌────────────────────────────────┐  │
    │  │ Cloud Storage (Archivos)       │  │
    │  └────────────────────────────────┘  │
    └────────────────────────────────────┘
```

---

## 2. CAPAS DE LA ARQUITECTURA

### 2.1 Capa de Presentación (Frontend)

**Responsabilidad:** Renderizar la interfaz y capturar interacción del usuario.

```
┌─────────────────────────────────────┐
│     CAPA DE PRESENTACIÓN            │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Pages (Next.js)             │   │
│  │ ├─ app/page.tsx (inicio)    │   │
│  │ ├─ app/auth/login/page.tsx  │   │
│  │ ├─ app/dashboard/*          │   │
│  │ └─ app/projects/page.tsx    │   │
│  └─────────────────────────────┘   │
│           ▲                         │
│           │ Inyecta                 │
│           │                         │
│  ┌─────────────────────────────┐   │
│  │ Componentes React           │   │
│  │ ├─ UI Components            │   │
│  │ ├─ Containers               │   │
│  │ ├─ Hooks (useAuth, etc)     │   │
│  │ └─ Context Providers        │   │
│  └─────────────────────────────┘   │
│           ▲                         │
│           │ Estiliza                │
│           │                         │
│  ┌─────────────────────────────┐   │
│  │ Tailwind CSS + Material-UI  │   │
│  │ ├─ Utility Classes          │   │
│  │ ├─ Components Material      │   │
│  │ └─ CSS Modules              │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Tecnologías:**
- `Next.js 16` - Framework React
- `React 19` - Librería de UI
- `TypeScript` - Tipado estático
- `Tailwind CSS 4` - Styling utilitario
- `Material-UI 7` - Componentes complejos

---

### 2.2 Capa de Lógica de Negocio (App Logic)

**Responsabilidad:** Gestionar estado, lógica y flujos de datos.

```
┌─────────────────────────────────────┐
│  CAPA DE LÓGICA DE NEGOCIO          │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ React Context API           │   │
│  │ ├─ AuthContext              │   │
│  │ │  ├─ user (Firebase Auth)  │   │
│  │ │  ├─ userData (Firestore)  │   │
│  │ │  └─ loading state         │   │
│  │ └─ (Futuros: AppContext)    │   │
│  └─────────────────────────────┘   │
│           ▲                         │
│           │ Proporciona              │
│           │                         │
│  ┌─────────────────────────────┐   │
│  │ React Hooks Personalizados  │   │
│  │ ├─ useAuth()                │   │
│  │ ├─ useForm() + Zod          │   │
│  │ ├─ useEffect() para sync    │   │
│  │ └─ useState() para estado   │   │
│  └─────────────────────────────┘   │
│           ▲                         │
│           │ Usa                     │
│           │                         │
│  ┌─────────────────────────────┐   │
│  │ RxJS Observables            │   │
│  │ ├─ switchMap (cancelar)     │   │
│  │ ├─ pipe (transformaciones)  │   │
│  │ └─ subscribe (suscripción)  │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Patrón: Observer Pattern + Reactive Programming**

```typescript
// Flujo de datos reactivo
authState$ (Observable)
  │
  ├─ switchMap(user => getUserData(user.uid))
  │  │
  │  └─ Cancela suscripción anterior si llega nuevo user
  │
  └─ subscribe({ next: (data) => setUserData(data) })
     │
     └─ Actualiza React State
```

**Tecnologías:**
- `React Context API` - Estado global
- `RxJS 7.8` - Reactive streams
- `React Hook Form` - Gestión de formularios
- `Zod` - Validación de esquemas

---

### 2.3 Capa de Acceso a Datos (Data Access)

**Responsabilidad:** Comunicarse con Firebase y gestionar datos.

```
┌─────────────────────────────────────┐
│ CAPA DE ACCESO A DATOS              │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │ firebaseRepository.ts       │   │
│  │ ├─ getAllUsers()            │   │
│  │ ├─ getUserData()            │   │
│  │ ├─ updateUserData()         │   │
│  │ ├─ addProject()             │   │
│  │ ├─ deleteProject()          │   │
│  │ ├─ getApplications()        │   │
│  │ └─ addSchedule()            │   │
│  │                             │   │
│  │ Retorna: Observable<T>      │   │
│  └─────────────────────────────┘   │
│           ▲                         │
│           │ Usa                     │
│           │                         │
│  ┌─────────────────────────────┐   │
│  │ firebaseAuth.ts             │   │
│  │ ├─ registerEmailUser()      │   │
│  │ ├─ loginEmailUser()         │   │
│  │ ├─ signInWithGoogle()       │   │
│  │ └─ logoutUser()             │   │
│  └─────────────────────────────┘   │
│           ▲                         │
│           │                         │
│  ┌─────────────────────────────┐   │
│  │ Firebase SDK                │   │
│  │ ├─ @firebase/auth           │   │
│  │ ├─ @firebase/firestore      │   │
│  │ ├─ @firebase/storage        │   │
│  │ └─ onAuthStateChanged()     │   │
│  │    onSnapshot()             │   │
│  │    updateDoc(), etc         │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Principios:**
- Todas las funciones retornan `Observable<T>`
- RxJS maneja la reactividad automáticamente
- Error handling centralizado con `catchError()`

---

### 2.4 Capa de Infraestructura (Cloud Services)

**Responsabilidad:** Proveer servicios de backend (autenticación, base de datos, storage).

```
┌──────────────────────────────────────┐
│ CAPA DE INFRAESTRUCTURA              │
│      (Google Cloud / Firebase)       │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐   │
│  │ Firebase Authentication      │   │
│  │ ├─ Google OAuth 2.0          │   │
│  │ ├─ Email/Password Sign-in    │   │
│  │ ├─ Session Management        │   │
│  │ └─ Token JWT                 │   │
│  └──────────────────────────────┘   │
│           ▲                          │
│  ┌──────────────────────────────┐   │
│  │ Firestore Database           │   │
│  │ ├─ Document Storage          │   │
│  │ ├─ Real-time Listeners       │   │
│  │ ├─ Transactions              │   │
│  │ ├─ Offline Persistence       │   │
│  │ └─ Security Rules            │   │
│  └──────────────────────────────┘   │
│           ▲                          │
│  ┌──────────────────────────────┐   │
│  │ Cloud Storage (Cloud Storage)│   │
│  │ ├─ Almacenamiento de archivos│   │
│  │ ├─ CDN de imágenes           │   │
│  │ └─ Versionamiento             │   │
│  └──────────────────────────────┘   │
│           ▲                          │
│  ┌──────────────────────────────┐   │
│  │ Cloud Functions (Futuro)     │   │
│  │ ├─ Lógica servidor           │   │
│  │ └─ Webhooks                  │   │
│  └──────────────────────────────┘   │
│                                      │
└──────────────────────────────────────┘
```

---

## 3. FLUJOS CLAVE

### 3.1 Flujo de Autenticación

```
┌──────────┐
│  Usuario │
└────┬─────┘
     │
     │ Haz click en "Iniciar Sesión"
     │
     ▼
┌────────────────────────────────────┐
│  /auth/login (página)              │
├────────────────────────────────────┤
│ ┌────────────────────────────────┐ │
│ │ Formulario con validación Zod  │ │
│ │ ├─ Email (validación)          │ │
│ │ └─ Contraseña (min 6 chars)    │ │
│ └────────────────────────────────┘ │
└────┬─────────────────────────────┘
     │
     │ Envía credentials (onSubmit)
     │
     ▼
┌────────────────────────────────────┐
│ firebaseAuth.loginEmailUser()      │
├────────────────────────────────────┤
│ signInWithEmailAndPassword()        │
│ (Firebase SDK)                     │
└────┬─────────────────────────────┘
     │
     │ ✅ Success o ❌ Error
     │
     ├─────────────────┬──────────────┤
     │                 │              │
     ▼                 ▼              ▼
   ✅ OK           ❌ Error      ❌ Error
   │              (Firebase)    (Email exists)
   │              │             │
   │              setError()    setError()
   │              │             │
   │              └─────┬───────┘
   │                    │
   │              Usuario ve msg
   │              de error
   │
   ▼
  onAuthStateChanged()
  detecta cambio
   │
   ▼
  AuthContext se actualiza
  ├─ user (Firebase User)
  ├─ userData (Firestore Doc)
  └─ loading = false
   │
   ▼
  router.push("/dashboard/profile")
   │
   ▼
┌───────────────────────┐
│ Dashboard del Usuario │
└───────────────────────┘
```

---

### 3.2 Flujo de Sincronización Auth + Firestore

```
Inicio de Sesión
      │
      ▼
┌─────────────────────────────────────┐
│ onAuthStateChanged()                │
│ (Firebase Auth Listener)            │
└────┬────────────────────────────────┘
     │
     │ Emite: User | null
     │
     ▼
┌──────────────────────────────────────┐
│ RxJS Observable (authState$)         │
└────┬─────────────────────────────────┘
     │
     │ switchMap (cancela anterior)
     │
     ├─ Si user es null:
     │  └─ of({ user: null, userData: null })
     │
     └─ Si user existe:
        │
        ▼
     ┌────────────────────────────────┐
     │ getUserData(user.uid)          │
     │ onSnapshot(doc...)             │
     │ (Firestore Real-time Listener) │
     └────┬───────────────────────────┘
          │
          │ Emite: UserData
          │
          ▼
     ┌────────────────────────────────┐
     │ map() → { user, userData }     │
     └────┬───────────────────────────┘
          │
          ▼
     ┌────────────────────────────────┐
     │ subscribe()                    │
     │ setUser(result.user)           │
     │ setUserData(result.userData)   │
     │ setLoading(false)              │
     └────┬───────────────────────────┘
          │
          ▼
     ┌──────────────────────────────┐
     │ React State Actualizado      │
     │ (AuthContext re-renders)     │
     └──────────────────────────────┘
```

**Beneficios:**
- ✅ Una sola fuente de verdad (Context)
- ✅ Sincronización automática
- ✅ Sin race conditions
- ✅ Cancela suscripciones previas

---

### 3.3 Flujo de CRUD de Proyectos

```
Programador en Dashboard/Projects
│
├─ CREATE (Nuevo Proyecto)
│  │
│  ├─ Formulario validado (Zod)
│  │  ├─ Nombre *
│  │  ├─ Descripción *
│  │  ├─ URL (opcional)
│  │  ├─ Imagen (opcional)
│  │  └─ Tecnologías *
│  │
│  ├─ onClick "Crear"
│  │
│  └─ firebaseRepository.addProject()
│     └─ setDoc(db, 'users/{uid}/projects/{projectId}', projectData)
│        └─ Firestore Database actualiza
│           └─ onSnapshot listener detecta cambio
│              └─ UI se actualiza automáticamente
│
├─ READ (Ver Proyectos)
│  │
│  └─ useEffect(() => {
│     getAllProjects(uid).subscribe(projects => {
│       setProjects(projects)
│     })
│  })
│  └─ Tabla de proyectos renderiza
│
├─ UPDATE (Editar Proyecto)
│  │
│  ├─ Click "Editar"
│  │
│  ├─ Formulario prefillado con datos actuales
│  │
│  ├─ Modificar valores
│  │
│  └─ onClick "Guardar"
│     └─ firebaseRepository.updateProject()
│        └─ updateDoc(db, 'users/{uid}/projects/{projectId}', updates)
│           └─ Firestore Database actualiza
│              └─ onSnapshot listener detecta cambio
│                 └─ UI se actualiza
│
└─ DELETE (Eliminar Proyecto)
   │
   ├─ Click "Eliminar"
   │
   ├─ Modal de confirmación
   │
   └─ onClick "Confirmar"
      └─ firebaseRepository.deleteProject()
         └─ deleteDoc(db, 'users/{uid}/projects/{projectId}')
            └─ Firestore Database borra documento
               └─ onSnapshot listener detecta cambio
                  └─ Proyecto desaparece de tabla
```

---

## 4. MODELADO DE DATOS

### 4.1 Relaciones entre Colecciones

```
┌─────────────┐
│   users     │
│ (collection)│
└──────┬──────┘
       │
       ├─ {uid: "abc123"}
       │  ├─ uid: "abc123"
       │  ├─ email: "user@ejemplo.com"
       │  ├─ displayName: "Juan García"
       │  ├─ role: "programmer"
       │  │
       │  └─ 📂 projects/ (subcollection)
       │     ├─ {projectId: "proj1"}
       │     │  ├─ id: "proj1"
       │     │  ├─ name: "E-commerce App"
       │     │  ├─ ownerUid: "abc123" (referencia)
       │     │  └─ technologiesUsed: ["React", "Node.js"]
       │     │
       │     └─ {projectId: "proj2"}
       │        └─ ...
       │
       └─ {uid: "def456"}
          ├─ uid: "def456"
          ├─ email: "standard@ejemplo.com"
          ├─ displayName: "María López"
          ├─ role: "standard"
          │
          └─ 📂 projects/ (vacío)

┌────────────────┐
│  schedules     │
│ (collection)   │
└────────┬───────┘
         │
         ├─ {uid: "abc123"}
         │  ├─ uid: "abc123"
         │  └─ weeklySchedule: [
         │     {day: "Lunes", slots: {start: "09:00", end: "18:00"}},
         │     ...
         │  ]
         │
         └─ {uid: "def456"}
            └─ ...

┌──────────────────┐
│  applications    │
│ (collection)     │
└────────┬─────────┘
         │
         ├─ {appId: "app1"}
         │  ├─ id: "app1"
         │  ├─ standardUid: "def456" (quien solicita)
         │  ├─ programmerUid: "abc123" (quien atiende)
         │  ├─ status: "pending"
         │  ├─ message: "Necesito ayuda con..."
         │  └─ createdAt: 1702428000000
         │
         └─ {appId: "app2"}
            └─ ...
```

### 4.2 Discriminated Unions en TypeScript

```typescript
// Patrón: Un tipo con discriminador "role"

type AppUser = UserStandard | UserProgrammer | UserAdmin;

interface UserBase {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface UserStandard extends UserBase {
  role: 'standard';
  companyName?: string;
}

interface UserProgrammer extends UserBase {
  role: 'programmer';
  title: string;
  programmingLanguages: string[];
  skills: string[];
  experienceYears: number;
}

interface UserAdmin extends UserBase {
  role: 'admin';
  permissions: string[];
}

// Tipo narrowing automático:
if (user.role === 'programmer') {
  // TypeScript sabe que user.programmingLanguages existe
  console.log(user.programmingLanguages);
} else if (user.role === 'standard') {
  // TypeScript sabe que user.companyName existe
  console.log(user.companyName);
}
```

---

## 5. PATRONES DE DISEÑO UTILIZADOS

### 5.1 Observer Pattern (RxJS)

```typescript
// Provee: Productor envía datos
const authState$ = new Observable(observer => {
  onAuthStateChanged(auth, user => {
    observer.next(user);  // Envía dato
  });
});

// Consume: Suscriptor recibe datos
authState$.subscribe(user => {
  console.log('Usuario cambió:', user);
});
```

**Ventajas:**
- ✅ Desacoplamiento entre productor y consumidor
- ✅ Múltiples suscriptores simultáneos
- ✅ Transformación de datos con `pipe()`
- ✅ Manejo de asincronia elegante

---

### 5.2 Context API Pattern

```typescript
// Crear contexto
const AuthContext = createContext<AuthContextType>({...});

// Proveedor
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, loading, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

// Consumidor
export const useAuth = () => useContext(AuthContext);

// Uso en componente
export default function MiComponente() {
  const { user, userData } = useAuth();
  // Usuario global sin prop drilling
}
```

**Ventajas:**
- ✅ Estado global sin librerías pesadas
- ✅ Evita "prop drilling"
- ✅ Sincronización automática entre componentes
- ✅ Easy to debug (React DevTools)

---

### 5.3 Repository Pattern

```typescript
// Abstracción de Firestore
export function getUserData(uid: string): Observable<UserBase | null> {
  return new Observable(observer => {
    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, snapshot => {
      observer.next(snapshot.data() as UserBase);
    });
    return () => unsubscribe();
  });
}

// Componente usa sin conocer detalles de Firestore
const userData$ = getUserData(uid);
userData$.subscribe(user => setUser(user));
```

**Ventajas:**
- ✅ Encapsulación de detalles de BD
- ✅ Fácil de mockear para tests
- ✅ Intercambiar BD sin afectar componentes
- ✅ Lógica de acceso a datos centralizada

---

### 5.4 Compound Component Pattern

```typescript
// Formulario compuesto
export function LoginForm() {
  const { register, handleSubmit, errors } = useForm({...});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput {...register('email')} />
        <FormError error={errors.email} />
      </FormField>
      <FormSubmitButton>Enviar</FormSubmitButton>
    </form>
  );
}
```

**Ventajas:**
- ✅ Componentes reutilizables y composables
- ✅ Lógica compartida implícita
- ✅ Flexible para diferentes layouts

---

## 6. CICLO DE VIDA DE UN COMPONENTE

```
Component Monta
    │
    ├─ Initial Render (UI)
    │
    ├─ useEffect(() => {}) [sin dependencias]
    │  └─ Se ejecuta UNA VEZ después del primer render
    │     └─ Perfecto para: Fetching datos, subscripciones
    │
    ├─ useEffect(() => {}) [dependencias]
    │  └─ Se ejecuta cuando dependencias cambian
    │     └─ Perfecto para: Reaccionar a cambios de state/props
    │
    ├─ User Interaction (click, input, etc)
    │  └─ Estado se actualiza → Re-render
    │
    └─ Component Se Desmonta
       └─ Cleanup en useEffect:
          return () => { /* limpieza */ }
          └─ Perfecto para: Unsubscribe, limpiar listeners
```

**Ejemplo Real:**

```tsx
"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function Dashboard() {
  const { userData, loading } = useAuth();
  const [projects, setProjects] = useState([]);

  // 1. Se ejecuta UNA VEZ (después del primer render)
  useEffect(() => {
    if (!userData?.uid) return;

    // Suscribirse a proyectos
    const subscription = getAllProjects(userData.uid)
      .subscribe(data => setProjects(data));

    // 2. Cleanup: desuscribirse al desmontar
    return () => subscription.unsubscribe();
  }, [userData?.uid]);  // Re-run si el uid cambia

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Mis Proyectos</h1>
      {projects.map(p => <ProjectCard key={p.id} project={p} />)}
    </div>
  );
}
```

---

## 7. OPTIMIZACIONES Y MEJORES PRÁCTICAS

### 7.1 Prevenir Re-renders Innecesarios

```tsx
// ❌ Malo: Se re-renderiza en cada click del padre
function Hijo() {
  return <div>Contenido</div>;
}

// ✅ Bueno: Solo se re-renderiza si props cambian
const Hijo = React.memo(function Hijo() {
  return <div>Contenido</div>;
});
```

### 7.2 Manejar Estado Complejo

```tsx
// ❌ Evita múltiples useState para estado relacionado
const [nombre, setNombre] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState('');

// ✅ Usa useReducer para lógica compleja
const [state, dispatch] = useReducer((state, action) => {
  switch(action.type) {
    case 'SET_NOMBRE':
      return { ...state, nombre: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}, initialState);
```

### 7.3 Lazy Loading de Componentes

```tsx
// ✅ Cargar componente solo cuando sea necesario
import dynamic from 'next/dynamic';

const ModalProjecto = dynamic(() => import('./ModalProjecto'), {
  loading: () => <p>Cargando...</p>,
});
```

### 7.4 Caché de Resultados

```typescript
// ✅ Cachear datos para evitar fetches repetidos
const userCache = new Map<string, Observable<UserBase>>();

export function getUserData(uid: string): Observable<UserBase> {
  if (!userCache.has(uid)) {
    userCache.set(uid, new Observable(observer => {
      onSnapshot(doc(db, 'users', uid), doc => {
        observer.next(doc.data());
      });
    }));
  }
  return userCache.get(uid)!;
}
```

---

## 8. SEGURIDAD

### 8.1 Firestore Security Rules

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Usuarios: cada usuario es dueño de su doc
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      allow list: if false;  // No listar todos
      
      // Proyectos: solo el dueño puede modificar
      match /projects/{projectId} {
        allow read: if true;  // Público
        allow write: if request.auth.uid == uid;
      }
    }
    
    // Aplicaciones: solo participantes pueden ver
    match /applications/{appId} {
      allow read: if 
        request.auth.uid in [resource.data.standardUid, resource.data.programmerUid];
      allow create: if request.auth.uid == request.resource.data.standardUid;
      allow update: if 
        request.auth.uid in [resource.data.standardUid, resource.data.programmerUid];
    }
  }
}
```

### 8.2 CORS y Headers

```typescript
// next.config.ts
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
};
```

---

## 9. MONITOREO Y DEBUGGING

### 9.1 Logging

```typescript
// ✅ Logging estructurado
export function logEvent(event: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${event}:`, data);
}

// Uso
logEvent('USER_LOGIN', { uid: user.uid, email: user.email });
logEvent('PROJECT_CREATED', { projectId, ownerUid });
```

### 9.2 Herramientas de Debug

```bash
# Verificar tipos TypeScript
pnpm tsc --noEmit

# Lint código
pnpm lint

# DevTools React (extensión del navegador)
# Redux DevTools (para ver Context)
# Firebase Console (ver datos en tiempo real)
```

---

**Documento técnico preparado:** 12 Diciembre 2025  
**Nivel de detalle:** Arquitecto/Senior Developer  
**Versión:** 0.1.0
