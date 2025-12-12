# 📅 Sistema de Schedules (Disponibilidad de Programadores)

## Descripción General

El sistema de **Schedules** permite que los programadores definan su disponibilidad horaria semanal. Esto facilita que los clientes sepan cuándo pueden solicitar asesorías y ayuda a programadores a gestionar su tiempo.

---

## 🎯 Propósito

- **Para Programadores:** Definir sus horarios de trabajo disponibles
- **Para Clientes:** Ver cuándo un programador está disponible
- **Para Admin:** Monitorear y gestionar la disponibilidad de la plataforma

---

## 📊 Estructura de Datos

### Modelo en Firestore

```typescript
// Colección: /schedules/{userId}
interface UserAvailabilityConfig {
  uid: string;                    // ID del usuario (programador)
  weeklySchedule: DayAvailability[]; // Array de días
  updatedAt?: Date;               // Última actualización
}

interface DayAvailability {
  day: string;                    // "monday", "tuesday", etc.
  slots: {
    start: string;               // "09:00" (HH:mm)
    end: string;                 // "17:00" (HH:mm)
  };
}
```

### Ejemplo en Firestore

```json
{
  "uid": "user123",
  "weeklySchedule": [
    {
      "day": "monday",
      "slots": {
        "start": "09:00",
        "end": "17:00"
      }
    },
    {
      "day": "tuesday",
      "slots": {
        "start": "09:00",
        "end": "17:00"
      }
    },
    {
      "day": "wednesday",
      "slots": {
        "start": "14:00",
        "end": "20:00"
      }
    }
    // ... más días
  ],
  "updatedAt": "2025-12-12T10:30:00Z"
}
```

---

## 🏗️ Componentes

### AvailabilityScheduler.tsx

**Ubicación:** `app/dashboard/standard-applications/ui/AvailabilityScheduler.tsx`

**Responsabilidades:**
- ✅ Interfaz visual para configurar horarios
- ✅ Validación de horas (start < end)
- ✅ Seleccionar días habilitados/deshabilitados
- ✅ Guardar en Firestore
- ✅ Modo lectura (solo vista)

**Props:**
```typescript
interface Props {
  onlyView?: boolean;  // Si true, solo muestra sin editar
}
```

**Características:**
- 7 días de la semana (Lunes a Domingo)
- Formato de hora: HH:mm (24 horas)
- Por defecto: Lunes-Viernes 9:00-17:00
- Fin de semana deshabilitado por defecto
- Validación en tiempo real
- Guardado con confirmación visual

---

## 🔄 Flujo de Uso

### Para Programadores

```
1. Ir a: Dashboard > Profile (su perfil)
   ↓
2. Ver sección: "Calendario de Disponibilidad"
   ↓
3. Configurar horarios por día:
   - Seleccionar/deseleccionar día
   - Ingresar hora inicio
   - Ingresar hora fin
   ↓
4. Guardar cambios
   ↓
5. Se almacena en: /schedules/{uid}
```

### Para Clientes

```
1. Ver perfil de programador: /developers?id=uid
   ↓
2. Ver sección: "Disponibilidad"
   ↓
3. Ver horarios disponibles del programador
   ↓
4. Solicitar asesoría (si es horario disponible)
```

---

## 🔐 Firestore Security Rules

```javascript
// En firestore.rules

match /schedules/{userId} {
  // LECTURA: El propietario o admin
  allow read: if isOwner(userId) || isAdmin();
  
  // CREAR/ACTUALIZAR: El propietario o admin
  allow write: if isOwner(userId) || isAdmin();
  
  // ELIMINAR: Solo admin
  allow delete: if isAdmin();
}
```

---

## 💻 API & Funciones

### Obtener Schedule

**Función:** `firebaseRepository.ts`

```typescript
export function getSchedule(userId: string) {
  return db.collection('schedules').doc(userId).valueChanges();
}
```

**Uso:**
```typescript
const schedule$ = getSchedule(userId);
schedule$.subscribe(schedule => {
  console.log(schedule); // UserAvailabilityConfig
});
```

### Guardar/Actualizar Schedule

**Función:** `firebaseRepository.ts`

```typescript
export async function addSchedule(config: UserAvailabilityConfig) {
  return db
    .collection('schedules')
    .doc(config.uid)
    .set(config, { merge: true });
}
```

**Uso:**
```typescript
const scheduleData: UserAvailabilityConfig = {
  uid: user.uid,
  weeklySchedule: [
    {
      day: "monday",
      slots: { start: "09:00", end: "17:00" }
    },
    // ...
  ]
};

await addSchedule(scheduleData);
```

---

## 🎨 UI/UX

### Vista de Administrador (Editable)

```
┌─────────────────────────────────────────────┐
│ 🕐 Calendario de Disponibilidad             │
├─────────────────────────────────────────────┤
│                                              │
│ ☑ Lunes      [09:00] - [17:00]             │
│ ☑ Martes     [09:00] - [17:00]             │
│ ☑ Miércoles  [14:00] - [20:00]             │
│ ☑ Jueves     [09:00] - [17:00]             │
│ ☑ Viernes    [09:00] - [17:00]             │
│ ☐ Sábado                                    │
│ ☐ Domingo                                   │
│                                              │
│                  [💾 Guardar Cambios]       │
│                                              │
└─────────────────────────────────────────────┘
```

### Vista de Cliente (Solo Lectura)

```
┌─────────────────────────────────────────────┐
│ 📅 Disponibilidad de Juan Pérez             │
├─────────────────────────────────────────────┤
│                                              │
│ 🟢 Lunes - Viernes: 9:00 AM - 5:00 PM     │
│ 🟡 Miércoles: 2:00 PM - 8:00 PM (extra)   │
│ 🔴 Sábado - Domingo: No disponible         │
│                                              │
│ Última actualización: Hoy a las 10:30 AM   │
│                                              │
└─────────────────────────────────────────────┘
```

---

## ✅ Validaciones

### En Zod (Form Validation)

```typescript
const daySchema = z
  .object({
    day: z.string(),
    enabled: z.boolean(),
    slots: z.object({
      start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    }),
  })
  .refine(
    (data) => {
      if (!data.enabled) return true;
      return data.slots.start < data.slots.end;
    },
    { message: "La hora final debe ser posterior a la inicial" }
  );
```

### Validaciones Implementadas

- ✅ Formato HH:mm (24 horas)
- ✅ Rango válido: 00:00 - 23:59
- ✅ Hora inicio < Hora fin
- ✅ Solo días habilitados se guardan
- ✅ Máximo 7 días por semana

---

## 🔗 Integración con Otras Funcionalidades

### Con Solicitudes de Asesorías (Applications)

```typescript
// Cuando cliente solicita asesoría:

1. Obtener schedule del programador
   ↓
2. Verificar si hay disponibilidad
   ↓
3. Si disponibilidad existe:
   - Mostrar "Solicitar" habilitado
   - Sugerir horarios disponibles
   ↓
4. Si NO hay disponibilidad:
   - Mostrar "No disponible en este momento"
   - Sugerir volver más tarde
```

### Con Notificaciones

```javascript
// Cuando programador actualiza schedule:
- Notificar clientes interesados
- "Juan está disponible ahora en horario X"
```

---

## 📋 Casos de Uso

### Caso 1: Programador Configura Horarios

```
Persona: Juan (Programador)
Acción: Configurar disponibilidad
Pasos:
  1. Login a Dashboard
  2. Ir a mi perfil
  3. Sección "Disponibilidad"
  4. Marcar: Lun-Vie 9:00-17:00, Miér extra 14:00-20:00
  5. Guardar
Resultado: Clientes ven la disponibilidad actualizada
```

### Caso 2: Cliente ve Disponibilidad

```
Persona: María (Cliente)
Acción: Ver disponibilidad de programador
Pasos:
  1. Buscar programador Juan
  2. Ver perfil: /developers?id=juan_uid
  3. Ver sección "Disponibilidad"
  4. Ver que Miércoles está disponible hasta 20:00
Resultado: Puede solicitar asesoría en ese horario
```

### Caso 3: Admin Monitorea Disponibilidad

```
Persona: Admin
Acción: Ver estadísticas de disponibilidad
Pasos:
  1. Dashboard Admin
  2. Sección: "Programadores"
  3. Ver: Horas disponibles por programador
  4. Identificar programadores sobrecargados
Resultado: Puede sugerir distribución de carga
```

---

## 🚀 Features Futuros

- ⬜ Sincronización con Google Calendar
- ⬜ Solicitudes automáticas en horarios disponibles
- ⬜ Notificaciones cuando hay disponibilidad
- ⬜ Horarios recurrentes (cada semana igual)
- ⬜ Excepciones de día (vacaciones, enfermedades)
- ⬜ Historial de cambios de horarios
- ⬜ Estadísticas de uso de schedules

---

## 🔧 Troubleshooting

### Problema: Los cambios no se guardan

```
Solución:
1. Verificar que el usuario sea programador (role: 'programmer')
2. Verificar permisos en Firestore Rules
3. Verificar conexión a Internet
4. Abrir consola (F12) y buscar errores
```

### Problema: Horarios no aparecen en perfil del programador

```
Solución:
1. Programador debe estar autenticado
2. Ir a Dashboard > Profile propio
3. Desplegar sección "Disponibilidad"
4. Guardar cambios si está vacío
5. Esperar 2-3 segundos para actualización
```

### Problema: Cliente no ve disponibilidad

```
Solución:
1. Programador debe haber guardado al menos 1 horario
2. Cliente debe estar en perfil correcto: /developers?id=uid
3. Refrescar página (Ctrl+R)
4. Verificar que el uid sea correcto
```

---

## 📚 Documentación Relacionada

- [Roles y Permisos](./ROLES_Y_PERMISOS.md)
- [Firestore Rules](../firestore.rules)
- [Applications (Solicitudes)](./APLICACIONES_Y_SOLICITUDES.md)
- [Componentes UI](./COMPONENTES_UI.md)

---

## 📞 Contacto / Soporte

Para reportar problemas o sugerencias sobre el sistema de schedules:
- Crear issue en GitHub
- Contactar al equipo de desarrollo
- Ver [Guía de Usuario Final](./GUIA_USUARIO_FINAL.md)

---

**Última actualización:** 12 de Diciembre 2025  
**Status:** ✅ Documentado y Funcional
