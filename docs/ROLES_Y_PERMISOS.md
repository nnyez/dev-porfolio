# 👥 Sistema de Roles y Permisos (RBAC)

## Descripción General

**Portfolio Dev** implementa un sistema de **Control de Acceso Basado en Roles (RBAC)** que gestiona qué pueden hacer diferentes tipos de usuarios en la plataforma.

---

## 🎯 Objetivos

- ✅ Garantizar seguridad de datos
- ✅ Controlar acceso a funcionalidades
- ✅ Separar responsabilidades
- ✅ Facilitar auditoría y compliance

---

## 📊 Roles Disponibles

### 1️⃣ **ADMIN** (Administrador)

**Descripción:**  
Acceso total a la plataforma. Gestiona usuarios, contenido y configuración.

**Permisos:**
```
┌──────────────────────────────────────┐
│ 🔑 PERMISOS ADMIN                    │
├──────────────────────────────────────┤
│ ✅ Leer todos los usuarios           │
│ ✅ Crear usuarios                    │
│ ✅ Editar perfil de cualquier usuario│
│ ✅ Cambiar roles de usuarios         │
│ ✅ Eliminar usuarios                 │
│ ✅ Ver todos los proyectos           │
│ ✅ Eliminar proyectos                │
│ ✅ Ver todas las solicitudes         │
│ ✅ Cambiar estado de solicitudes     │
│ ✅ Ver y editar mensajes             │
│ ✅ Acceso a analytics                │
│ ✅ Cambiar configuración global      │
└──────────────────────────────────────┘
```

**Acceso a Rutas:**
- ✅ `/dashboard/users` - Gestión de usuarios
- ✅ `/dashboard/admin` - Panel administrativo (futuro)
- ✅ `/dashboard/analytics` - Analytics (futuro)

**Casos de Uso:**
- Aprobar nuevos programadores
- Moderar contenido
- Resolver disputas
- Ver reportes de la plataforma

---

### 2️⃣ **PROGRAMMER** (Programador)

**Descripción:**  
Usuario proveedor de servicios. Expone su portafolio y recibe solicitudes de asesorías.

**Permisos:**
```
┌──────────────────────────────────────┐
│ 🚀 PERMISOS PROGRAMMER               │
├──────────────────────────────────────┤
│ ✅ Leer su propio perfil             │
│ ✅ Editar su propio perfil           │
│ ✅ Ver su foto de perfil             │
│ ✅ Crear proyectos propios           │
│ ✅ Editar proyectos propios          │
│ ✅ Eliminar proyectos propios        │
│ ✅ Ver sus solicitudes recibidas     │
│ ✅ Cambiar estado de solicitudes     │
│ ✅ Configurar disponibilidad         │
│ ✅ Ver disponibilidad de otros       │
│ ✅ Enviar mensajes a clientes        │
│ ✅ Ver mensajes recibidos            │
│ ❌ No puede editar perfil de otros   │
│ ❌ No puede ver datos privados       │
│ ❌ No puede eliminar usuarios        │
└──────────────────────────────────────┘
```

**Acceso a Rutas:**
- ✅ `/dashboard/profile/[id]` - Su perfil
- ✅ `/dashboard/projects` - Sus proyectos
- ✅ `/dashboard/standard-applications` - Sus solicitudes
- ✅ `/developers?id=[id]` - Perfil público

**Casos de Uso:**
- Crear portafolio
- Recibir solicitudes de clientes
- Responder solicitudes
- Configurar horarios disponibles

---

### 3️⃣ **STANDARD** (Cliente/Usuario Regular)

**Descripción:**  
Usuario consumidor de servicios. Busca programadores y solicita asesorías.

**Permisos:**
```
┌──────────────────────────────────────┐
│ 👤 PERMISOS STANDARD                 │
├──────────────────────────────────────┤
│ ✅ Leer su propio perfil             │
│ ✅ Editar su propio perfil           │
│ ✅ Ver foto de perfil                │
│ ✅ Ver lista de programadores        │
│ ✅ Ver perfil público de programadores│
│ ✅ Ver proyectos de programadores    │
│ ✅ Crear solicitudes de asesoría     │
│ ✅ Ver sus propias solicitudes       │
│ ✅ Editar sus solicitudes (borrador) │
│ ✅ Cancelar sus solicitudes          │
│ ✅ Enviar mensajes a programadores   │
│ ✅ Ver mensajes recibidos            │
│ ❌ No puede crear proyectos          │
│ ❌ No puede cambiar roles            │
│ ❌ No puede ver datos de otros       │
│ ❌ No puede configurar disponibilidad│
└──────────────────────────────────────┘
```

**Acceso a Rutas:**
- ✅ `/dashboard/profile/[id]` - Su perfil
- ✅ `/projects` - Lista pública de programadores
- ✅ `/developers?id=[id]` - Perfil de programador
- ✅ `/dashboard/standard-applications` - Sus solicitudes

**Casos de Uso:**
- Ver portafolio de programadores
- Solicitar asesorías
- Comunicarse con programadores
- Gestionar sus solicitudes

---

### 4️⃣ **GUEST** (Visitante - Futuro)

**Descripción:**  
Usuario sin registrarse. Acceso limitado solo lectura.

**Permisos:**
```
┌──────────────────────────────────────┐
│ 👁️ PERMISOS GUEST                    │
├──────────────────────────────────────┤
│ ✅ Ver lista de programadores        │
│ ✅ Ver perfil público de programadores│
│ ✅ Ver proyectos públicos            │
│ ✅ Ver disponibilidad                │
│ ❌ No puede solicitar asesorías      │
│ ❌ No puede crear cuenta aún         │
│ ❌ No puede enviar mensajes          │
└──────────────────────────────────────┘
```

**Nota:** Este rol está preparado en el código pero aún no está completamente implementado.

---

## 🔐 Matriz de Permisos Detallada

| Recurso | Admin | Programmer | Standard | Guest |
|---------|-------|-----------|----------|-------|
| **USERS** | | | | |
| Leer todos | ✅ | ❌ | ❌ | ❌ |
| Leer propio | ✅ | ✅ | ✅ | ❌ |
| Crear usuario | ✅ | ❌ | ❌ | ⚠️ (registro) |
| Editar propio | ✅ | ✅ | ✅ | ❌ |
| Editar otros | ✅ | ❌ | ❌ | ❌ |
| Cambiar rol | ✅ | ❌ | ❌ | ❌ |
| Eliminar | ✅ | ❌ | ❌ | ❌ |
| **PROJECTS** | | | | |
| Leer todos | ✅ | ✅ | ✅ | ✅ |
| Crear | ✅ | ✅ | ❌ | ❌ |
| Editar propio | ✅ | ✅ | ❌ | ❌ |
| Editar otros | ✅ | ❌ | ❌ | ❌ |
| Eliminar propio | ✅ | ✅ | ❌ | ❌ |
| Eliminar otros | ✅ | ❌ | ❌ | ❌ |
| **APPLICATIONS** | | | | |
| Leer todas | ✅ | ❌ | ❌ | ❌ |
| Leer propias | ✅ | ✅ | ✅ | ❌ |
| Crear | ✅ | ❌ | ✅ | ❌ |
| Editar propias | ✅ | ✅ | ✅ | ❌ |
| Cambiar estado | ✅ | ✅ | ⚠️ (cancel) | ❌ |
| Eliminar propias | ✅ | ❌ | ✅ | ❌ |
| **SCHEDULES** | | | | |
| Leer todas | ✅ | ❌ | ❌ | ❌ |
| Leer propias | ✅ | ✅ | ❌ | ❌ |
| Crear/Editar | ✅ | ✅ | ❌ | ❌ |
| Ver públicas | ✅ | ✅ | ✅ | ✅ |
| **MESSAGES** | | | | |
| Leer todas | ✅ | ❌ | ❌ | ❌ |
| Leer propias | ✅ | ✅ | ✅ | ❌ |
| Crear | ✅ | ✅ | ✅ | ❌ |
| Editar propias | ✅ | ✅ | ✅ | ❌ |
| Eliminar propias | ✅ | ✅ | ✅ | ❌ |

---

## 🔧 Implementación Técnica

### En Firestore Rules (firestore.rules)

```javascript
// Funciones auxiliares
function isAuthenticated() {
  return request.auth != null;
}

function getUserRole() {
  return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
}

function isAdmin() {
  return isAuthenticated() && getUserRole() == 'admin';
}

function isProgrammer() {
  return isAuthenticated() && getUserRole() == 'programmer';
}

function isStandard() {
  return isAuthenticated() && getUserRole() == 'standard';
}

function isOwner(uid) {
  return request.auth.uid == uid;
}

// Ejemplo: Regla para Projects
match /projects/{projectId} {
  // Lectura: Todos autenticados
  allow read: if isAuthenticated();
  
  // Crear: Programadores y Admin
  allow create: if (isProgrammer() || isAdmin()) && 
                   request.resource.data.ownerUid == request.auth.uid;
  
  // Actualizar: Owner o Admin
  allow update: if isAdmin() || isOwner(resource.data.ownerUid);
  
  // Eliminar: Owner o Admin
  allow delete: if isAdmin() || isOwner(resource.data.ownerUid);
}
```

### En el Frontend (TypeScript)

```typescript
// app/lib/types.ts
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'programmer' | 'standard' | 'guest';
  // ... más campos
}

// app/context/AuthContext.tsx
export function useAuth() {
  const { userData } = useContext(AuthContext);
  
  // Funciones auxiliares
  const isAdmin = userData?.role === 'admin';
  const isProgrammer = userData?.role === 'programmer';
  const isStandard = userData?.role === 'standard';
  
  return { userData, isAdmin, isProgrammer, isStandard };
}

// Uso en componentes
function MyComponent() {
  const { isAdmin, isProgrammer } = useAuth();
  
  return (
    <>
      {isAdmin && <AdminPanel />}
      {isProgrammer && <ProgrammerDashboard />}
      {isStandard && <ClientDashboard />}
    </>
  );
}
```

---

## 🚀 Flujo de Asignación de Roles

### 1. Registro Inicial

```
Usuario se registra
  ↓
Role por defecto: "standard"
  ↓
Guardado en: /users/{uid}
```

### 2. Cambio a Programmer

```
Usuario solicita ser Programmer
  (Futuro: formulario)
  ↓
Admin revisa solicitud
  ↓
Admin aprueba → Cambia role a "programmer"
  ↓
Usuario puede crear proyectos
```

### 3. Cambio a Admin

```
Solo otro Admin puede cambiar a Admin
  (Medida de seguridad)
  ↓
Va a Firebase Console
  ↓
Cambiar manualmente: role = "admin"
  ↓
Usuario obtiene acceso admin
```

---

## 📋 Cambiar rol de un Usuario

### Método 1: Firebase Console (Manual)

```
1. Firebase Console > Firestore
2. Colección: users
3. Seleccionar documento: {uid}
4. Editar campo: role
5. Cambiar a: "programmer", "admin", etc.
6. Guardar
```

### Método 2: Admin Panel (Futuro)

```
1. Login como Admin
2. Dashboard > Usuarios
3. Buscar usuario
4. Click en: Cambiar Rol
5. Seleccionar nuevo rol
6. Guardar
```

---

## 🔐 Seguridad y Best Practices

### ✅ Lo que se Hace Bien

- Validación dual (Frontend + Backend)
- Firestore Rules estrictas
- Roles verificados en cada operación
- Cambios de rol auditados
- No se exponen datos sensibles

### ⚠️ Consideraciones Importantes

```
1. NUNCA confíes en frontend para seguridad
   → Siempre validar en Firestore Rules

2. NUNCA expongas el campo 'role' al cliente sin validar
   → Frontend puede modificar datos locales

3. SIEMPRE verifica permisos en el servidor (Rules)
   → El cliente intenta, Rules validan

4. Cambios de rol son operaciones críticas
   → Solo Admin puede hacerlo
   → Considerar: logs, auditoría
```

---

## 📊 Diagrama de Transiciones

```
    ┌──────────────┐
    │   GUEST      │ (No autenticado)
    │              │
    └──────┬───────┘
           │ Registro
           ↓
    ┌──────────────┐
    │  STANDARD    │ ←─────────────┐
    │ (Cliente)    │               │
    └──────┬───────┘               │
           │                    Rechazo
           │ Solicitud          Solicitud
           │ (Manual Admin)        (Admin)
           ↓                       │
    ┌──────────────┐              │
    │ PROGRAMMER   │──────────────┘
    │(Desarrollador)│ (Solo Admin)
    └──────┬───────┘
           │ Promoción (Solo Admin)
           ↓
    ┌──────────────┐
    │    ADMIN     │
    │(Administrador)
    └──────────────┘
```

---

## 🎯 Casos de Uso por Rol

### Caso 1: Juan (PROGRAMMER)

```
Juan se registra
  → Role automático: STANDARD
  → Puede ver programadores y solicitar asesorías

Juan solicita ser Programmer
  → (Futuro: a través de formulario)
  
Admin aprueba
  → Role cambia a: PROGRAMMER
  
Juan ahora puede:
  → Crear proyectos
  → Recibir solicitudes
  → Configurar disponibilidad
  → No puede cambiar roles
```

### Caso 2: María (STANDARD)

```
María se registra
  → Role automático: STANDARD
  
María quiere solicitar asesoría
  → Puede ver perfil de programador
  → Puede ver disponibilidad
  → Puede crear solicitud
  
María NO puede:
  → Crear proyectos
  → Ver otros perfiles privados
  → Cambiar roles
```

### Caso 3: Admin

```
Admin se crea manualmente en Firebase
  → Role: ADMIN
  
Admin puede:
  → Ver todos los usuarios
  → Cambiar roles
  → Moderar contenido
  → Ver analytics
  
Responsabilidades:
  → Aprobar nuevos programadores
  → Resolver disputas
  → Mantener la plataforma segura
```

---

## 🚨 Errores Comunes

### Error 1: "Permission denied"
```
Causa: El usuario no tiene permiso para esta acción
Solución:
  1. Verificar que el usuario esté autenticado
  2. Verificar el rol en Firebase Console
  3. Verificar Firestore Rules
  4. Refrescar página (F5)
```

### Error 2: "No puedo cambiar mi rol"
```
Causa: Los usuarios estándar no pueden cambiar su propio rol
Solución:
  1. Contactar a un Admin
  2. Solicitar cambio de rol
  3. Admin lo aprueba en Firebase Console
```

### Error 3: "No veo las opciones de Admin"
```
Causa: El rol no está guardado correctamente
Solución:
  1. Ir a Firebase Console
  2. Verificar campo "role" en /users/{uid}
  3. Si está vacío, agregarlo manualmente
  4. Refrescar la app (Ctrl+Shift+R hard refresh)
```

---

## 📚 Documentación Relacionada

- [Firestore Rules](../firestore.rules)
- [Sistema de Schedules](./SCHEDULES_Y_DISPONIBILIDAD.md)
- [Guía de Usuario Final](./GUIA_USUARIO_FINAL.md)
- [Guía de Admin](./GUIA_ADMINISTRADOR.md)

---

## 📞 Contacto / Soporte

Para preguntas sobre roles y permisos:
- Ver [FAQ](../faq.md)
- Contactar al equipo de desarrollo
- Crear issue en GitHub

---

**Última actualización:** 12 de Diciembre 2025  
**Status:** ✅ Documentado y Funcional
