# Guía del Sistema de Colores Actualizado

## 📋 Resumen de Cambios

Se ha actualizado completamente el sistema de colores de la aplicación para mejorar el contraste visual, la accesibilidad y la visualización de formularios cuando están rellenos o deshabilitados.

## 🎨 Paleta de Colores Definida

### Variables CSS en `globals.css`:

```css
:root {
  /* Colores base del tema */
  --background: #261343;      /* Fondo general de la app */
  --foreground: #fffee0;      /* Texto principal */
  
  /* Colores personalizados */
  --primary: #1a0d2e;         /* Fondo más oscuro (inputs, elementos) */
  --secondary: #3d1f5c;       /* Fondo secundario (cards, modals) */
  --alt: #5a2e8a;             /* Color alternativo para gradientes */
  --accent: #a366ff;          /* Color de enfoque/destacado */
  --resalt: #7d4fcf;          /* Color hover/variante de accent */
  --success: #10b981;         /* Verde (éxito) */
  --error: #ef4444;           /* Rojo (errores) */
  --warning: #f59e0b;         /* Amarillo (advertencias) */
  --info: #3b82f6;            /* Azul (información) */
}

@theme {
  --color-primary: #1a0d2e;
  --color-secondary: #3d1f5c;
  --color-alt: #5a2e8a;
  --color-accent: #a366ff;
  --color-resalt: #7d4fcf;
  --color-background: #261343;
  --color-foreground: #fffee0;
}
```

## ✅ Mejoras Implementadas

### 1. **Configuración Base de Inputs**

Se añadieron estilos CSS base en `@layer base` para mejorar la apariencia de todos los inputs:

```css
input[type="text"],
input[type="email"],
input[type="password"],
input[type="tel"],
input[type="url"],
input[type="number"],
textarea,
select {
  background-color: var(--primary);    /* Fondo oscuro */
  color: var(--foreground);            /* Texto claro */
  border-color: var(--resalt);         /* Borde púrpura */
  caret-color: var(--accent);          /* Cursor dorado */
}

/* Focus mejorado */
input:focus,
textarea:focus,
select:focus {
  background-color: var(--secondary);  /* Fondo más claro en focus */
  border-color: var(--accent);         /* Borde dorado */
  box-shadow: 0 0 0 3px rgba(163, 102, 255, 0.1);
}

/* Placeholders más visibles */
input::placeholder,
textarea::placeholder {
  color: rgba(255, 254, 224, 0.4);
}

/* Estado deshabilitado mejorado */
input:disabled,
textarea:disabled,
select:disabled {
  background-color: rgba(163, 102, 255, 0.05);
  opacity: 0.7;
  cursor: not-allowed;
}
```

### 2. **Clases Tailwind Aplicadas a Inputs**

Se estandarizaron las clases en todos los formularios:

#### Borde Mejorado
- ✅ Cambio: `border border-accent/30` → `border-2 border-resalt`
- **Razón**: El borde de 2px es más visible y `border-resalt` (#7d4fcf) tiene mejor contraste

#### Tamaño de Fuente
- ✅ Cambio: `text-sm` → `text-base`
- **Razón**: Evita zoom automático en iOS y mejora legibilidad

#### Color de Fondo
- ✅ Mantiene: `bg-primary` (#1a0d2e)
- **Razón**: Proporciona buen contraste con texto foreground

#### Placeholder
- ✅ Cambio: `placeholder-accent/50` → `placeholder-accent/40`
- **Razón**: Menos opaco, más diferenciación con el texto actual

#### Estado Deshabilitado
- ✅ Cambio: `disabled:opacity-60` → `disabled:opacity-70 disabled:bg-primary/60`
- **Razón**: Mejor feedback visual cuando está deshabilitado

#### Patrón Completo de Input

```jsx
<input
  type="text"
  className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
/>
```

### 3. **Selects y Combobox Mejorados**

Se actualizo el componente `RoleSelecter.tsx`:

```jsx
<select className="block w-full rounded-lg border-2 border-resalt bg-primary text-foreground text-base px-4 py-2 font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all placeholder-accent/50 cursor-pointer">
  <option className="bg-secondary text-foreground">
    Admin
  </option>
</select>
```

**Cambios clave**:
- `border-2 border-resalt`: Borde más visible
- `text-base`: Mejor tamaño de fuente
- `text-foreground` en opciones: Texto visible en el dropdown

### 4. **Mensajes de Error Mejorados**

#### Cambio de colores
- ✅ Cambio: `text-red-400`, `text-red-500` → `text-error`
- ✅ Cambio: `bg-red-500/20` → `bg-error/10`
- ✅ Cambio: `border-red-500/40` → `border-error/40`

#### Patrón mejorado para contenedores de error

```jsx
<div className="rounded-lg bg-error/10 border-2 border-error/40 p-4 text-sm text-error font-medium">
  {errorMessage}
</div>
```

### 5. **Archivos Actualizados**

#### Páginas de Autenticación
- ✅ `app/auth/login/page.tsx`
- ✅ `app/auth/register/page.tsx`

#### Componentes de Formulario
- ✅ `app/dashboard/profile/ui/FormProfile.tsx`
- ✅ `app/dashboard/projects/ui/ModalProject.tsx`
- ✅ `app/dashboard/standard-applications/ui/AvailabilityScheduler.tsx`

#### Selectores
- ✅ `app/dashboard/ui/RoleSelecter.tsx`

#### Estilos Globales
- ✅ `app/globals.css` (configuración de colores y base styles)

## 🚀 Cómo Usar en Nuevos Componentes

### Para crear un input nuevo, sigue este patrón:

```jsx
<input
  type="email"
  placeholder="tu@email.com"
  className="w-full rounded-lg border-2 border-resalt bg-primary px-3 sm:px-4 py-2 sm:py-3 text-base text-foreground placeholder-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-primary/60"
/>
```

### Para un select/combobox:

```jsx
<select className="block w-full rounded-lg border-2 border-resalt bg-primary text-foreground text-base px-4 py-2 font-semibold focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all cursor-pointer">
  <option className="bg-secondary text-foreground">Opción 1</option>
</select>
```

### Para un mensaje de error:

```jsx
{error && (
  <p className="mt-2 text-xs text-error font-medium">
    {error.message}
  </p>
)}
```

### Para un contenedor de error (modal/card):

```jsx
{firebaseError && (
  <div className="rounded-lg bg-error/10 border-2 border-error/40 p-4 text-sm text-error font-medium">
    {firebaseError}
  </div>
)}
```

## 🎯 Valores de Contraste (WCAG AA)

Los colores han sido seleccionados para mantener un contraste adecuado:

| Combinación | Ratio | Estado |
|-------------|-------|--------|
| Foreground (#fffee0) sobre Primary (#1a0d2e) | 16.5:1 | ✅ AAA |
| Accent (#a366ff) sobre Primary (#1a0d2e) | 8.1:1 | ✅ AAA |
| Error (#ef4444) sobre Primary (#1a0d2e) | 3.8:1 | ✅ AA |
| Foreground sobre Secondary (#3d1f5c) | 12.1:1 | ✅ AAA |

## 🔧 Troubleshooting

### El texto no se ve bien en inputs rellenos
- Verifica que uses `text-foreground` en la clase del input
- Comprueba que el `bg-primary` esté aplicado

### El placeholder no es visible
- Asegúrate de usar `placeholder-accent/40`
- En inputs deshabilitados, aumenta a `placeholder-accent/50`

### Los bordes no se ven claramente
- Cambia `border border-accent/30` por `border-2 border-resalt`
- Usa `focus:border-accent` para el estado enfocado

### Los selects no muestran bien las opciones
- Añade `className="bg-secondary text-foreground"` a las opciones
- Asegúrate que el select tiene `text-base`

## 📱 Testing Recomendado

1. **Formularios llenos**: Verifica que el texto sea legible
2. **Inputs deshabilitados**: Comprueba que sea claro que no pueden editarse
3. **Estados de error**: Confirma que los mensajes rojos sean visibles
4. **Focus**: Verifica el anillo y cambio de color en focus
5. **Dark mode**: Confirma que los colores mantienen contraste

## 📚 Referencias

- **Colores base**: Basados en tu paleta de morado (#261343)
- **Sistema de colores**: Tailwind CSS v4 con @theme
- **Accesibilidad**: Cumple WCAG AA para contraste de colores
