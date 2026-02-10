# 👨‍💼 GUÍA DEL ADMINISTRADOR

## Portfolio Dev - Manual de Administración

---

## 📑 TABLA DE CONTENIDOS

1. [Introducción](#introducción)
2. [Acceso al Panel Admin](#acceso-al-panel-admin)
3. [Dashboard Administrativo](#dashboard-administrativo)
4. [Gestión de Usuarios](#gestión-de-usuarios)
5. [Gestión de Contenido](#gestión-de-contenido)
6. [Reportes y Estadísticas](#reportes-y-estadísticas)
7. [Configuración de Sistema](#configuración-de-sistema)
8. [Seguridad y Permisos](#seguridad-y-permisos)
9. [Resolución de Problemas](#resolución-de-problemas)
10. [Procedimientos de Emergencia](#procedimientos-de-emergencia)

---

## 1. INTRODUCCIÓN

### ¿Qué es Portfolio Dev?

Portfolio Dev es una plataforma que conecta:
- **Programadores:** Ofrecen servicios y muestran portfolios
- **Usuarios Estándar:** Solicitan asesorías y buscan programadores
- **Administradores:** Gestionan la plataforma

### Rol del Administrador

Como administrador, eres responsable de:
- ✅ Gestión de usuarios y roles
- ✅ Moderación de contenido
- ✅ Monitoreo de solicitudes
- ✅ Resolución de conflictos
- ✅ Mantenimiento del sistema
- ✅ Análisis de estadísticas

### Responsabilidades Diarias

| Tarea | Frecuencia | Tiempo |
|-------|-----------|--------|
| Revisar reportes | Diaria | 15 min |
| Verificar usuarios nuevos | Diaria | 10 min |
| Resolver problemas | Según necesario | 20-30 min |
| Backup de datos | 3x semana | 5 min |
| Analizar estadísticas | Semanal | 20 min |

---

## 2. ACCESO AL PANEL ADMIN

### 2.1 Login como Administrador

**Paso 1: Ir a la Aplicación**
```
https://tu-dominio.com/auth/login
```

**Paso 2: Ingresar Credenciales**
```
Email: admin@portfolio-dev.com
Contraseña: [contraseña segura]
```

**Paso 3: Redireccionamiento Automático**
```
✓ Sistema detecta rol "admin"
✓ Redirige automáticamente a /dashboard
✓ Aparece panel administrativo
```

### 2.2 Si No Tienes Acceso Admin

**Problema:** No veo opción de Admin

**Soluciones:**

1. **Verificar rol en la base de datos:**
   - Contactar al administrador del sistema
   - Verificar que tu usuario tenga rol `ADMIN`

2. **Cambiar rol (requiere acceso a base de datos):**
   - Actualizar el campo `role` del usuario a `ADMIN`
   - Logout y login nuevamente

3. **Registrarse como programador:**
   - Al registrarse, seleccionar la opción "Quiero ser programador"
   - El rol será `PROGRAMMER` (no admin, pero con más permisos que `STANDARD`)

---

## 3. DASHBOARD ADMINISTRATIVO

### 3.1 Vista General del Dashboard

Al entrar al panel de admin, verás:

```
┌──────────────────────────────────────────────┐
│  DASHBOARD ADMINISTRATIVO                    │
├──────────────────────────────────────────────┤
│                                              │
│  📊 ESTADÍSTICAS PRINCIPALES                 │
│  ├─ Usuarios totales: 245                   │
│  ├─ Programadores: 78                       │
│  ├─ Solicitudes pendientes: 12              │
│  └─ Nuevos registros (hoy): 3               │
│                                              │
│  📋 MENÚ LATERAL                             │
│  ├─ 👥 Usuarios                             │
│  ├─ 📁 Proyectos                            │
│  ├─ 📧 Solicitudes                          │
│  ├─ 📊 Reportes                             │
│  ├─ ⚙️ Configuración                        │
│  ├─ 🔐 Seguridad                            │
│  └─ 📞 Soporte                              │
│                                              │
│  🔔 NOTIFICACIONES RECIENTES                 │
│  ├─ Nuevo usuario registrado (hace 5 min)  │
│  ├─ Error en solicitud (hace 30 min)       │
│  └─ Backup completado exitosamente          │
│                                              │
└──────────────────────────────────────────────┘
```

### 3.2 Widgets del Dashboard

#### Widget: Usuarios Activos
```
Usuarios Online (últimas 24h): 34
├─ En Dashboard: 12
├─ Editando Perfil: 8
├─ Viendo Proyectos: 14
└─ Viendo Solicitudes: 2
```

#### Widget: Solicitudes Pendientes
```
Total Solicitudes: 45
├─ Pending: 12 ⚠️
├─ Reviewed: 18
├─ Accepted: 12
└─ Rejected: 3
```

#### Widget: Salud del Sistema
```
Status: ✅ Operacional

Backend API: ✅ Normal
Auth: ✅ Normal (12 logins/h)
Database: ✅ Normal
CPU: ✅ Normal (23% usado)
```

---

## 4. GESTIÓN DE USUARIOS

### 4.1 Ver Todos los Usuarios

**Ir a:** Dashboard > Usuarios

```
Lista de Usuarios:
┌────────────────────────────────────────────────────┐
│ Email           │ Rol         │ Registrado │ Acciones
├────────────────────────────────────────────────────┤
│ juan@email.com  │ Programmer  │ 5 días    │ ⋮
│ maria@email.com │ Standard    │ 2 días    │ ⋮
│ pedro@email... │ Admin       │ 10 días   │ ⋮
└────────────────────────────────────────────────────┘
```

### 4.2 Búsqueda y Filtros

```
Buscar Usuario:
┌──────────────────────────────────────────┐
│ 🔍 Buscar por email o nombre...          │
└──────────────────────────────────────────┘

Filtros:
├─ Rol: [Todos ▼] [Admin] [Programmer] [Standard]
├─ Estado: [Activo] [Inactivo] [Baneado]
├─ Fecha: [Últimos 7 días] [Este mes] [Personalizado]
└─ Búsqueda rápida: [Programadores activos] [Sin proyectos]
```

### 4.3 Perfil de Usuario

**Al hacer click en usuario, ver:**

```
👤 Perfil de Usuario: juan@email.com

Información Personal
├─ Email: juan@email.com
├─ Nombre: Juan García
├─ Rol: Programmer
├─ Estado: Activo
├─ Registrado: 5 de diciembre, 2025
└─ Último acceso: Hace 2 horas

Estadísticas
├─ Proyectos: 8
├─ Solicitudes recibidas: 12
├─ Solicitudes aceptadas: 9
└─ Rating: 4.8/5 ⭐

Acciones
├─ ✏️ Editar información
├─ 🔄 Cambiar rol
├─ 🚫 Desactivar usuario
├─ 🔒 Ver proyectos
└─ 📞 Contactar
```

### 4.4 Cambiar Rol de Usuario

**Paso 1: Abrir perfil del usuario**

**Paso 2: Botón "Cambiar Rol"**

```
Rol Actual: Standard

Seleccionar Nuevo Rol:
├─ ⭕ Standard (Usuario regular - solicita asesorías)
├─ ⭕ Programmer (Ofrece servicios - crea proyectos)
└─ ⭕ Admin (Acceso total - gestiona plataforma)

Razón del cambio: [Campo de texto]
```

**Paso 3: Confirmar**

```
⚠️ Confirmación
Cambiar rol de juan@email.com a "Programmer"?

Esta acción:
✓ Habilitará creación de proyectos
✓ Permitirá recibir solicitudes
✓ Acceso a estadísticas

[Cancelar] [Cambiar Rol]
```

**Resultado:** Usuario recibe email de notificación

### 4.5 Desactivar/Activar Usuario

```
Estado del Usuario: Activo

Cambiar Estado:
├─ 🟢 Activo: Usuario puede acceder
├─ 🔴 Inactivo: Usuario no puede acceder
├─ ⛔ Baneado: Usuario permanentemente bloqueado

Razón: [Campo de texto]
```

### 4.6 Eliminar Usuario

⚠️ **ACCIÓN IRREVERSIBLE**

```
Peligro: Eliminar Usuario

Si eliminas a juan@email.com:
✗ Su cuenta será eliminada
✗ Sus proyectos se eliminarán
✗ Sus solicitudes se cancelarán
✗ No se puede recuperar

Escribe "ELIMINAR" para confirmar: [________]
```

---

## 5. GESTIÓN DE CONTENIDO

### 5.1 Revisar Proyectos

**Ir a:** Dashboard > Proyectos

```
Proyectos Enviados:
┌─────────────────────────────────────────┐
│ App de Compras - Juan García            │
│ Enviado hace 2 días                     │
├─────────────────────────────────────────┤
│ Descripción: "Aplicación de e-commerce" │
│ Tecnologías: React, Node.js, Firebase   │
│ Link: github.com/juan/shop-app          │
│                                         │
│ Acciones:                               │
│ [✓ Aprobar] [✗ Rechazar] [👁️ Previsualizar]
└─────────────────────────────────────────┘
```

### 5.2 Filtrar Proyectos

```
Filtros de Proyectos:
├─ Estado: [Todos] [Pendiente] [Aprobado] [Rechazado]
├─ Programador: [Todos] [Buscar...]
├─ Tecnología: [React] [Node.js] [Python] ...
├─ Calidad: [Todos] [Excelente] [Bueno] [Regular]
└─ Fecha: [Últimos 7 días] [Este mes] ...
```

### 5.3 Revisar Proyecto

**Ver detalles completos:**

```
📁 App de Compras

👤 Programador: Juan García
🏆 Rating: 4.8/5
🔗 Link: github.com/juan/shop-app

📝 Descripción:
"Aplicación de e-commerce desarrollada con React 
y Node.js. Incluye carrito de compras, búsqueda 
y sistema de pagos."

💻 Tecnologías:
React 19 | Node.js 18 | Firebase | Stripe

✨ Características:
✓ Responsive design
✓ Autenticación OAuth
✓ Pagos con Stripe
✓ Admin panel

📊 Estadísticas:
├─ Vistas: 234
├─ Me gusta: 12
├─ Compartido: 8
└─ Contactos recibidos: 3

🔍 Revisión:
├─ Contenido inapropiado: No ✓
├─ Descripción clara: Sí ✓
├─ Tecnologías válidas: Sí ✓
├─ Link funciona: Sí ✓
└─ Cumple estándares: Sí ✓

Acciones:
[✓ Aprobar] [✗ Rechazar] [⏸️ Suspender]
```

### 5.4 Aprobar o Rechazar

**Aprobar:**
```
Proyecto: "App de Compras"
Estado: APROBADO

✓ Se mostrará en público
✓ El programador recibirá notificación
✓ Contadores se reinician
```

**Rechazar:**
```
Motivo del rechazo:
┌─────────────────────────────────┐
│ ○ Descripción insuficiente      │
│ ○ Contenido inapropiado         │
│ ○ Link no funciona              │
│ ○ Otro: [____________]          │
└─────────────────────────────────┘

Mensaje al programador:
┌────────────────────────────────────┐
│ Tu proyecto fue rechazado porque... │
│ [Mensaje personalizado]             │
└────────────────────────────────────┘

[Enviar]
```

### 5.5 Gestionar Solicitudes

**Ir a:** Dashboard > Solicitudes

```
Solicitudes Pendientes:

1️⃣ María solicita asesoría a Juan
   Tipo: Consultoría técnica
   Presupuesto: $200
   Enviado: Hace 3 días
   Estado: Pendiente

   [👁️ Ver] [📧 Recordar] [❌ Cancelar]

2️⃣ Carlos solicita asesoría a Elena
   Tipo: Code review
   Presupuesto: $150
   Enviado: Hace 1 día
   Estado: En revisión

   [👁️ Ver] [✓ Completar] [❌ Rechazar]
```

---

## 6. REPORTES Y ESTADÍSTICAS

### 6.1 Dashboard de Estadísticas

**Ir a:** Dashboard > Reportes

```
📊 ESTADÍSTICAS DEL SISTEMA

Período: [Este mes ▼] [Personalizado]

Resumen:
├─ Usuarios totales: 245 (↑ 12 este mes)
├─ Programadores: 78 (↑ 5)
├─ Solicitudes: 89 (↑ 23)
├─ Proyectos: 156 (↑ 18)
└─ Ingresos (si aplica): $2,340 (↑ 15%)

Crecimiento:
├─ Usuarios nuevos: 12 personas
├─ Tasa de retención: 94%
├─ Usuarios activos: 167 (68%)
└─ Tasa de conversión: 31%
```

### 6.2 Gráficos Interactivos

```
📈 Crecimiento de Usuarios (últimas 4 semanas)

100  │     ╱╱╱
     │   ╱╱
 50  │ ╱╱
     │╱
     └─────────────────
     S1  S2  S3  S4

📊 Solicitudes por Estado

Pendiente: 12 (27%)  ████░░
Aceptada: 18 (40%)   ████████░░
Completada: 12 (27%) ████░░
Rechazada: 3 (7%)    █░

💰 Ingresos por Mes

Dec: $2,340 ████████
Nov: $1,890 ██████
Oct: $1,456 █████
Sep: $890   ███
```

### 6.3 Exportar Reportes

```
Exportar Datos:

Formato:
├─ ○ CSV (Excel)
├─ ○ PDF (Documento)
├─ ○ JSON (Datos)
└─ ○ Gráficos (Presentación)

Período: [Personalizado]
Desde: 01/12/2025
Hasta: 31/12/2025

Incluir:
☑ Usuarios
☑ Proyectos
☑ Solicitudes
☑ Ingresos
☑ Estadísticas

[⬇️ Descargar]
```

---

## 7. CONFIGURACIÓN DE SISTEMA

### 7.1 Configuración General

**Ir a:** Dashboard > Configuración

```
⚙️ CONFIGURACIÓN DEL SISTEMA

Nombre de la Aplicación:
[Portfolio Dev                         ]

Descripción:
[Plataforma de conexión entre        ]
[programadores y usuarios             ]

URL Principal:
[https://portfolio-dev.com           ]

Idioma:
Español [▼] Inglés

Zona Horaria:
America/Bogota [▼]
```

### 7.2 Configuración de Email

```
📧 CONFIGURACIÓN DE EMAIL

Servicio: Gmail [▼]

Email de Origen:
[admin@portfolio-dev.com              ]

Contraseña de Aplicación:
[••••••••••••••••••••]  [Cambiar]

Prueba de Conexión: [✓ Conectado]

Plantillas de Email:
├─ Bienvenida
├─ Confirmación de email
├─ Recuperación de contraseña
├─ Nueva solicitud
├─ Solicitud aceptada/rechazada
└─ Notificaciones

[✏️ Editar Plantillas]
```

### 7.3 Configuración de Roles

```
🔐 CONFIGURACIÓN DE ROLES

ADMIN
├─ Acceso total
├─ Ver/Editar todo
├─ Gestionar usuarios
├─ Cambiar roles
└─ Acceso a logs

PROGRAMMER
├─ Crear proyectos
├─ Recibir solicitudes
├─ Ver disponibilidad
├─ Responder solicitudes
└─ Ver estadísticas personales

STANDARD
├─ Ver proyectos
├─ Crear solicitudes
├─ Ver perfil propio
└─ Contactar programadores

ADMIN
├─ Ver todos los usuarios
├─ Cambiar roles de usuarios
├─ Ver todas las solicitudes
└─ Gestionar plataforma
```

---

## 8. SEGURIDAD Y PERMISOS

### 8.1 Control de Acceso

```
🔐 PERMISOS Y SEGURIDAD

Nivel de Seguridad Actual: ALTO ✓

API Security Status: ✅ Seguras
├─ Usuarios: Acceso propio únicamente
├─ Proyectos: Lectura pública
├─ Solicitudes: Acceso de partes
└─ Admin: Acceso administrativo

Últimos Intentos de Acceso Denegado:
├─ 2025-12-12 10:23:45 - Usuario no autenticado
├─ 2025-12-11 15:44:12 - Role insuficiente
└─ 2025-12-10 09:12:33 - Acceso a datos prohibidos
```

### 8.2 Auditoría de Cambios

```
📋 LOG DE AUDITORÍA

Última hora:
├─ 2025-12-12 15:30 - Admin Juan: Cambió rol a María (→ Programmer)
├─ 2025-12-12 15:25 - Admin Juan: Aprobó proyecto "App de Compras"
├─ 2025-12-12 15:15 - Sistema: Backup completado
└─ 2025-12-12 15:10 - Usuario María: Login exitoso

Últimos 7 días:
├─ 45 cambios de rol
├─ 123 aprobaciones de proyectos
├─ 89 cambios de estado de solicitud
└─ 23 usuarios baneados
```

### 8.3 Verificación de Seguridad

**Checklist de Seguridad:**

```
🔒 VERIFICACIÓN DIARIA

□ Logs de intentos fallidos
□ API endpoints seguros
□ Certificado SSL válido
□ No hay accesos no autorizados
□ Backup del día completado

🔒 VERIFICACIÓN SEMANAL

□ Auditoría de usuarios admin
□ Revisión de permisos
□ Análisis de tráfico sospechoso
□ Actualización de blacklist IPs

🔒 VERIFICACIÓN MENSUAL

□ Penetration testing (opcional)
□ Revisión de dependencias
□ Actualización de reglas de seguridad
□ Análisis de riesgos
```

---

## 9. RESOLUCIÓN DE PROBLEMAS

### Problema 1: Usuario Olvidó Contraseña

**Solución:**
```
1. Ir a Dashboard > Usuarios
2. Buscar usuario: juan@email.com
3. Hacer click en ⋮ (opciones)
4. Seleccionar "Resetear Contraseña"
5. Email se envía automáticamente al usuario
6. Usuario hace click en link para new password
```

### Problema 2: Usuario Reporta Error

**Paso a paso:**
```
1. Solicitar screenshot del error
2. Pedir pasos para reproducir
3. Revisar Logs del backend
4. Verificar en consola del navegador (F12)
5. Contactar a equipo técnico si es necesario
```

### Problema 3: Proyecto Inapropiado

**Acción:**
```
1. Ir a Dashboard > Proyectos
2. Buscar proyecto problemático
3. Hacer click en "Rechazar"
4. Seleccionar razón: "Contenido inapropiado"
5. Escribir mensaje explicativo
6. Opcionalmente: Avisar a admin de plataforma
```

### Problema 4: Solicitud Fraudulenta

**Acción inmediata:**
```
1. Desactivar la solicitud
2. Revisar perfil del usuario
3. Verificar historial de transacciones
4. Si es necesario, banear usuario
5. Documentar el incidente
6. Contactar a usuario si es requerido

Banear Usuario:
├─ Dashboard > Usuarios
├─ Buscar usuario sospechoso
├─ Cambiar estado a "Baneado"
├─ Seleccionar razón: "Actividad fraudulenta"
└─ Documentar evidencia
```

### Problema 5: Sistema Lento

**Diagnóstico:**
```
1. Revisar CPU/Memory en servidor
2. Verificar respuesta del backend API
3. Revisar Logs
4. Comprobar conexión a BD

Si está saturado:
├─ Aumentar recursos (si es cloud)
├─ Optimizar queries
├─ Activar caching
└─ Limpieza de datos innecesarios
```

---

## 10. PROCEDIMIENTOS DE EMERGENCIA

### 10.1 Sistema Caído

⚠️ **EMERGENCIA: La aplicación no funciona**

**Paso 1: Verificar Status**
```
1. Revisar status del backend en Render
2. Revisar si hay incidents reportados
3. Revisar status de Vercel/hosting
4. Comprobar conexión a internet
```

**Paso 2: Reiniciar Servicio**
```bash
# Desplegar cambios a Vercel
vercel --prod

# Esperar 2-5 minutos
```

**Paso 3: Contactar Soporte**
```
Si sigue fallando:
1. Verificar logs en Render Dashboard
2. Revisar logs en Vercel
3. Contactar al equipo técnico
4. Restaurar desde backup si es necesario
```

### 10.2 Ataque de Seguridad

⚠️ **EMERGENCIA: Actividad sospechosa**

**Paso 1: Contener**
```
1. Ir a Dashboard > Seguridad
2. Activar "Modo seguro"
3. Revisar logs de acceso
4. Identificar IP/usuario atacante
```

**Paso 2: Bloquear**
```
1. Ir a Dashboard > Seguridad > IP Bloqueadas
2. Agregar IP del atacante
3. Revoke tokens de usuario comprometido
4. Notificar al usuario
```

**Paso 3: Investigar**
```
1. Revisar que datos fueron accesados
2. Buscar cambios sospechosos
3. Restaurar datos si fue modificado
4. Documentar el incidente
```

### 10.3 Pérdida de Datos

⚠️ **EMERGENCIA: Datos fueron eliminados**

**Paso 1: Confirmar Pérdida**
```
1. Verificar base de datos actual
2. Revisar histórico de cambios
3. Comprobar último backup disponible
```

**Paso 2: Restaurar**
```
1. Contactar al administrador de base de datos
2. Seleccionar backup anterior a pérdida
3. Restaurar desde backup
4. Confirmar restauración
5. Esperar completar (puede tomar horas)
```

**Paso 3: Verificar Integridad**
```
1. Revisar que datos se restauraron
2. Comprobar consistencia
3. Buscar causa de la pérdida
4. Implementar protecciones adicionales
```

### 10.4 Contactos de Emergencia

```
📞 CONTACTOS DE EMERGENCIA

Equipo Técnico:
├─ Lead Developer: contacto@team.com
├─ DevOps: devops@team.com
└─ Database Admin: dba@team.com

Soporte Backend (Render):
├─ Email: support@render.com
├─ Status: status.render.com
└─ Help: render.com/docs

Soporte Frontend (Vercel):
├─ Email: support@vercel.com
├─ Status: status.vercel.com
└─ Help: vercel.com/support
```

---

## 🆘 CHECKLIST ADMINISTRATIVO DIARIO

```
TAREAS DIARIAS:

Mañana (9:00 AM):
☐ Revisar logs de la noche
☐ Verificar usuarios nuevos
☐ Chequear alertas del sistema
☐ Revisar emails sin leer

Medio Día (1:00 PM):
☐ Revisar proyectos pendientes
☐ Resolver reportes de usuarios
☐ Monitorear sistema (CPU, Memory)
☐ Responder tickets de soporte

Tarde (5:00 PM):
☐ Revisar solicitudes pendientes
☐ Análisis de estadísticas del día
☐ Preparar backup
☐ Documentar incidentes

Antes de Salir (6:00 PM):
☐ Revisar estado del sistema
☐ Confirmar backup completado
☐ Documentar tareas pendientes
☐ Configurar alertas para la noche
```

---

**Documento Versión:** 1.0  
**Fecha de Última Actualización:** Diciembre 2025  
**Status:** ✅ Completado

*Para preguntas o soporte adicional, contactar al equipo de desarrollo o revisar la documentación técnica.*
