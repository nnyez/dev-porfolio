# ❓ FAQ - Preguntas Frecuentes

## 🔧 Configuración y Instalación

### P: ¿Qué versión de Node.js necesito?
**R:** Node.js 18 o superior. Verifica con `node --version`. Descarga de https://nodejs.org/

### P: ¿Qué es pnpm? ¿Por qué no npm o yarn?
**R:** `pnpm` es un gestor de paquetes más rápido y eficiente. Es obligatorio para este proyecto.
Instala con: `npm install -g pnpm`

### P: ¿Dónde obtengo las credenciales de Firebase?
**R:** 
1. Ve a https://console.firebase.google.com/
2. Crea un proyecto o selecciona uno existente
3. Ve a **Configuración del Proyecto** (ícono de engranaje)
4. En pestaña **"Tus apps"**, copia el objeto `firebaseConfig`
5. Pégalo en `firebase.config.ts`

### P: ¿Es seguro poner credenciales de Firebase en el código?
**R:** **Sí**, las credenciales de Firebase son públicas. Se envían al navegador de todos modos. Lo que sí debes proteger son las **Firestore Rules** (validación de lectura/escritura) y cualquier **API Key privada**.

### P: ¿Puedo usar npm en lugar de pnpm?
**R:** No recomendado. Este proyecto está configurado para pnpm. Usa `pnpm install` para que funcione correctamente.

---

## 🚀 Ejecución y Desarrollo

### P: ¿Cómo inicio la aplicación en desarrollo?
**R:**
```bash
pnpm dev
# Abre http://localhost:3000 en tu navegador
```

### P: ¿Qué significa `"use client"` en los componentes?
**R:** Indica que ese componente React corre en el navegador (cliente), no en el servidor. Necesario para hooks como `useState`, `useEffect`, etc.

```tsx
"use client";  // ← Necesario para usar hooks
import { useState } from "react";
export default function MiComponente() {
  const [datos, setDatos] = useState([]);
  // ...
}
```

### P: ¿Dónde edito la página de inicio?
**R:** En `app/page.tsx`. Los cambios se reflejan automáticamente al guardar.

### P: ¿Cómo creo una nueva página?
**R:** Crea un archivo `page.tsx` en la carpeta deseada:
```
app/
└── nueva-seccion/
    └── page.tsx  ← Nueva página en /nueva-seccion
```

### P: ¿Cómo creo rutas dinámicas (ej: /usuario/123)?
**R:** Crea carpeta con `[id]`:
```
app/
└── usuario/
    └── [id]/
        └── page.tsx  ← Ruta: /usuario/123
```

En el componente accedes a `id`:
```tsx
export default function UsuarioPage({ params }: { params: { id: string } }) {
  const userId = params.id;  // "123"
  return <h1>Usuario {userId}</h1>;
}
```

### P: Recibo error "Hydration mismatch". ¿Qué significa?
**R:** El servidor y cliente renderizan diferente HTML. Solución: Agregar `"use client"` al componente:
```tsx
"use client";  // ← Esto lo fija
```

---

## 🔐 Autenticación y Usuarios

### P: ¿Cómo creo un usuario administrador?
**R:** Opción 1 (Recomendada):
1. Regístrate en la app (Google o Email)
2. Ve a Firebase Console → Firestore → Colección `users` → Tu documento
3. Cambia el campo `role` de `"standard"` a `"admin"`
4. Guarda y recarga la app

Opción 2 (Desde Firebase):
1. Firebase Console → Authentication → Crear usuario
2. Email: admin@ejemplo.com, Password: contraseña
3. Firestore → Colección `users` → Nuevo documento:
   ```json
   {
     "uid": "el-uid-del-usuario",
     "email": "admin@ejemplo.com",
     "displayName": "Admin",
     "role": "admin"
   }
   ```

### P: ¿Por qué Google Sign-In no funciona?
**R:** Posibles causas:
1. **Google no está habilitado** en Firebase Console → Authentication → Sign-in Methods
2. **Tu dominio no está autorizado** → Authentication → Authorized Domains → Agrega `localhost:3000`, `tu-dominio.com`, etc.
3. **Pop-up fue bloqueado** por el navegador

### P: ¿Cómo cambio la contraseña de un usuario?
**R:** El usuario mismo puede:
1. Ir a `/dashboard/profile`
2. Buscar opción "Cambiar Contraseña"
3. O: Firebase Console → Authentication → Seleccionar usuario → Reset Password

### P: ¿Cómo borro un usuario?
**R:** Solo admin puede:
1. Dashboard → Usuarios (solo visible para admin)
2. Busca el usuario
3. Haz clic en "Eliminar"
4. Confirma

### P: ¿Cuál es la diferencia entre "Standard" y "Programmer"?
**R:**
- **Standard:** Usuario que busca solicitar asesorías. Puede explorar programadores y crear solicitudes.
- **Programmer:** Profesional que ofrece servicios. Puede crear portafolio, listar proyectos, configurar disponibilidad.

---

## 💾 Base de Datos (Firestore)

### P: ¿Dónde está la información del usuario?
**R:** En Firestore, colección `users`:
```
Firestore
└── users {collection}
    └── {uid} {document}
        ├── uid: "abc123"
        ├── email: "usuario@ejemplo.com"
        ├── displayName: "Juan García"
        ├── role: "standard"
        └── projects/ {subcollection}
            ├── proyecto1 {document}
            └── proyecto2 {document}
```

### P: ¿Cómo agrego datos manualmente a Firestore?
**R:** En Firebase Console:
1. Firestore Database
2. Botón "+ Iniciar colección"
3. Nombre: `users`
4. Botón "+ Agregar documento"
5. ID automático o personalizado
6. Agrega campos y valores

### P: ¿Cómo veo todos los usuarios registrados?
**R:** Firebase Console → Firestore Database → Colección `users` → Ver documentos

### P: ¿Puedo exportar datos de Firestore?
**R:** Sí, pero requiere script. Desde Firebase Console, no hay opción directa. Usa Google Cloud:
```bash
# Requisito: gcloud CLI instalado
gcloud firestore export gs://tu-bucket/export-$(date +%Y%m%d)
```

### P: ¿Qué es una "subcollection"?
**R:** Una colección dentro de un documento. Ejemplo: cada usuario tiene subcollection de `projects`:
```
users/{uid}/projects/{projectId}
```

Permite organizar datos jerárquicos.

---

## 🎨 Diseño y Estilos

### P: ¿Cómo cambio los colores principales?
**R:** En `app/globals.css`, busca variables CSS:
```css
:root {
  --color-primary: #6366f1;      /* Indigo */
  --color-secondary: #f3f4f6;    /* Gris */
  --color-accent: #ec4899;       /* Rosa */
}
```

Cambialos según necesites.

### P: ¿Cómo agrego una nueva fuente?
**R:** Next.js ya tiene fuentes optimizadas. Para agregar custom:
1. Descargar la fuente (TTF, WOFF2)
2. Colocar en `public/fonts/`
3. En `app/globals.css`:
```css
@font-face {
  font-family: 'MiFuente';
  src: url('/fonts/mifuente.woff2') format('woff2');
}

body {
  font-family: 'MiFuente', sans-serif;
}
```

### P: ¿Cómo agrego una imagen?
**R:**
```tsx
import Image from 'next/image';

export default function Componente() {
  return (
    <Image
      src="/images/mi-imagen.png"
      alt="Descripción"
      width={400}
      height={300}
    />
  );
}
```

Para URLs externas, agrégalas a `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'ejemplo.com' }
  ]
}
```

---

## 📦 Componentes y Reutilización

### P: ¿Dónde debo poner un nuevo componente?
**R:**
- **Reutilizable en múltiples páginas** → `app/ui/` o `app/ui/shared/`
- **Solo para un módulo** → Carpeta del módulo, subcarpeta `ui/`
  ```
  app/dashboard/projects/
  └── ui/
      ├── CellProject.tsx
      └── ModalProject.tsx
  ```

### P: ¿Cómo importo un componente desde otra carpeta?
**R:** Usa el alias `@/`:
```tsx
// ❌ Malo:
import Card from '../../../ui/Card';

// ✅ Bueno:
import Card from '@/app/ui/Card';
```

Esto está configurado en `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### P: ¿Cómo paso props entre componentes?
**R:**
```tsx
// Componente padre
<MiComponente titulo="Hola" cantidad={5} onClick={handleClick} />

// Componente hijo
interface Props {
  titulo: string;
  cantidad: number;
  onClick: () => void;
}

export default function MiComponente({ titulo, cantidad, onClick }: Props) {
  return <div>{titulo} - {cantidad}</div>;
}
```

---

## 🔄 Validación de Formularios

### P: ¿Cómo valido un formulario?
**R:** Usando Zod + React Hook Form:
```tsx
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define esquema
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  // 2. Usa hook form
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 3. Handler al enviar
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" placeholder="Contraseña" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Enviar</button>
    </form>
  );
}
```

### P: ¿Cómo valido un campo contra la base de datos?
**R:** Usa `refine()` en Zod:
```typescript
const schema = z.object({
  email: z.string().email(),
}).refine(async (data) => {
  const exists = await checkEmailExists(data.email);
  return !exists;  // true = válido, false = inválido
}, {
  message: 'Este email ya está registrado',
  path: ['email'],
});
```

---

## 🚨 Errores y Debugging

### P: ¿Cómo veo los logs?
**R:**
- **Navegador:** Abre DevTools (`F12`) → Tab **Console**
- **Servidor:** Verifica la terminal donde corre `pnpm dev`

### P: ¿Cómo debuggeo componentes React?
**R:**
```tsx
"use client";
import { useEffect, useState } from 'react';

export default function MiComponente() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    console.log('El componente montó');
    console.log('Datos actuales:', datos);
    
    return () => {
      console.log('El componente se desmontó');
    };
  }, [datos]);

  return <div>Mi componente</div>;
}
```

Abre DevTools (`F12`) y revisa **Console**.

### P: ¿Cómo veo errores de TypeScript?
**R:**
```bash
# En terminal:
pnpm tsc --noEmit

# O en VS Code:
# Instala extension "TypeScript Vue Plugin"
# Los errores aparecerán con squiggly lines rojos
```

### P: ¿Cómo veo errores de ESLint?
**R:**
```bash
pnpm lint
```

O en VS Code, instala extension **ESLint** de Microsoft.

---

## 📱 Responsive Design

### P: ¿Cómo hago que mi componente sea responsive?
**R:** Tailwind CSS tiene breakpoints:
```tsx
<div className="
  w-full              // Mobile: 100% ancho
  md:w-1/2            // Tablet: 50% ancho
  lg:w-1/3            // Desktop: 33% ancho
  px-4 md:px-8 lg:px-12  // Padding diferente
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
  Contenido
</div>
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### P: ¿Cómo test en dispositivos móviles?
**R:**
```bash
# Ver en móvil en LAN
pnpm dev

# En móvil, abre: http://IP-TU-COMPUTADORA:3000
# Ej: http://192.168.1.100:3000

# O usa Chrome DevTools (F12) → Toggle Device Toolbar
```

---

## 🚀 Despliegue

### P: ¿Cómo despliego en GitHub Pages?
**R:**
```bash
# 1. Asegurar que next.config.ts tiene: output: "export"

# 2. Crear workflow GitHub Actions (.github/workflows/deploy.yml)
#    Ver GUIA_RAPIDA.md para template

# 3. Push a main
git push origin main

# GitHub hace el deploy automáticamente
# URL: https://tu-usuario.github.io/portfolio-dev
```

### P: ¿Cómo despliego en Firebase Hosting?
**R:**
```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Build
pnpm build

# 4. Deploy
firebase deploy

# URL: https://portfolio-dev.web.app
```

### P: ¿Cuánto cuesta desplegar?
**R:**
- **GitHub Pages:** Gratis
- **Firebase Hosting:** Gratis hasta 1GB/mes
- **Firestore:** Gratis hasta 50K lecturas/día

---

## 👥 Contribución y Mantenimiento

### P: ¿Cómo clono el proyecto en otra máquina?
**R:**
```bash
# 1. Clonar
git clone https://github.com/tu-usuario/portfolio-dev.git
cd portfolio-dev

# 2. Instalar dependencias
pnpm install

# 3. Configurar Firebase (firebase.config.ts)

# 4. Ejecutar
pnpm dev
```

### P: ¿Cómo hago un commit apropiado?
**R:**
```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Agregar página de proyectos"
# o
git commit -m "fix: Corregir error de autenticación"
# o
git commit -m "docs: Actualizar README"

# Push
git push origin main
```

Convención de commits:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formato/estilos
- `refactor:` Refactorización
- `test:` Tests

### P: ¿Cómo uso ramas (branches)?
**R:**
```bash
# Crear rama
git checkout -b feature/nueva-funcionalidad

# Trabajar y hacer commits
git add .
git commit -m "feat: Agregar nueva funcionalidad"

# Subir rama
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
# Después de revisión, merge a main
```

---

## 🆘 Soporte Adicional

### ¿No encuentro la respuesta?

1. **Busca en la documentación completa:** [INFORME_DESARROLLO.md](INFORME_DESARROLLO.md)
2. **Stack Overflow:** Etiqueta con `next.js`, `firebase`, `react`
3. **Documentación oficial:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Firebase Docs](https://firebase.google.com/docs)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)
4. **GitHub Issues:** Si encuentras un bug, reporta en el repositorio

---

**Última actualización:** 12 Diciembre 2025  
**Versión:** 0.1.0
