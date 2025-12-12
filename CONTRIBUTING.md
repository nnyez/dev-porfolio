# 🤝 GUÍA DE CONTRIBUCIÓN Y MANTENIMIENTO

**Portfolio Dev**  
**Fecha:** 12 de Diciembre de 2025  
**Versión:** 0.1.0

---

## 📋 Tabla de Contenidos

1. [Código de Conducta](#código-de-conducta)
2. [Cómo Contribuir](#cómo-contribuir)
3. [Flujo de Git](#flujo-de-git)
4. [Estándares de Código](#estándares-de-código)
5. [Pruebas](#pruebas)
6. [Documentación](#documentación)
7. [Proceso de Review](#proceso-de-review)
8. [Mantener la Calidad](#mantener-la-calidad)
9. [Reportar Bugs](#reportar-bugs)
10. [Solicitar Nuevas Funcionalidades](#solicitar-nuevas-funcionalidades)

---

## 🤝 Código de Conducta

### Nuestros Valores

- 🤝 **Respeto:** Tratamos a todos con respeto y profesionalismo
- 🎯 **Calidad:** Mantenemos altos estándares de código
- 📚 **Documentación:** Documentamos todo apropiadamente
- 🔒 **Seguridad:** Priorizamos la seguridad en todas las decisiones
- 🚀 **Innovación:** Buscamos soluciones mejores continuamente

### Comportamiento Esperado

✅ **HACER:**
- Ser respetuoso y constructivo en comments
- Aceptar crítica constructiva
- Documentar cambios significativos
- Ayudar a otros contributors
- Probar tu código antes de hacer PR

❌ **NO HACER:**
- Lenguaje ofensivo o insultante
- Acoso o discriminación
- Spam de issues o PRs
- Código sin probar
- Ignorar feedback

---

## 🛠️ Cómo Contribuir

### Tipos de Contribuciones

#### 1. **Reportar Bugs**
Encontraste un error → Abre un [Issue](https://github.com/repo/issues)

#### 2. **Solicitar Features**
Tienes una idea → Abre una [Discusión](https://github.com/repo/discussions)

#### 3. **Mejorar Documentación**
La documentación no está clara → Mejórala y abre un PR

#### 4. **Contribuir Código**
Quieres agregar funcionalidad → Sigue el flujo de Git

---

## 📊 Flujo de Git

### 1. Fork y Clonar

```bash
# 1. Fork en GitHub (botón "Fork" arriba a la derecha)

# 2. Clonar tu fork
git clone https://github.com/tu-usuario/portfolio-dev.git
cd portfolio-dev

# 3. Agregar upstream para mantener sincronizado
git remote add upstream https://github.com/original-usuario/portfolio-dev.git
```

### 2. Crear Rama

```bash
# Traer cambios del upstream
git fetch upstream
git checkout main
git pull upstream main

# Crear rama nueva (nombra según el tipo de cambio)
git checkout -b feature/nueva-funcionalidad

# O para bugfix:
git checkout -b fix/corregir-error

# O para documentación:
git checkout -b docs/actualizar-guia
```

**Convención de Nombres:**
- `feature/descripcion-corta` - Nueva funcionalidad
- `fix/descripcion-corta` - Corrección de bug
- `docs/descripcion-corta` - Documentación
- `refactor/descripcion-corta` - Refactorización
- `style/descripcion-corta` - Formato/estilos
- `test/descripcion-corta` - Tests

### 3. Hacer Cambios

```bash
# Edita archivos normalmente
# ...código...

# Ver cambios
git status
git diff

# Agregr cambios
git add .

# O solo archivos específicos:
git add app/componentes/MiComponente.tsx
```

### 4. Commits

```bash
# Commit con mensaje descriptivo
git commit -m "feat: Agregar componente de búsqueda"

# O más detallado:
git commit -m "feat: Agregar componente de búsqueda

- Implementa búsqueda en tiempo real
- Integra con Firestore queries
- Añade validación con Zod
- Incluye tests unitarios"
```

**Formato de Commits:**
```
<tipo>: <descripción corta>

<descripción detallada opcional>

Fixes #123
```

**Tipos válidos:**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formato (no cambia lógica)
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Cambios de build, dependencies, etc.

### 5. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Ve a GitHub y abre Pull Request
```

**Plantilla de PR:**
```markdown
## Descripción
Qué cambiaste y por qué.

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Cambios Realizados
- Cambio 1
- Cambio 2
- Cambio 3

## Testing
Cómo probaste esto:
1. Paso 1
2. Paso 2
3. Paso 3

## Checklist
- [ ] Mi código sigue los estándares
- [ ] He probado los cambios
- [ ] He actualizado la documentación
- [ ] No hay breaking changes
- [ ] Los tests pasan
```

### 6. Review y Merge

- **Reviewers** revisarán tu código
- **Feedback** será proporcionado
- **Cambios** puedes hacer fácilmente editando commits
- **Merge** se hará cuando esté aprobado

```bash
# Si necesitas actualizar tu rama con cambios del main:
git fetch upstream
git rebase upstream/main
git push origin feature/nueva-funcionalidad --force-with-lease
```

---

## 📝 Estándares de Código

### TypeScript

**✅ HACER:**

```typescript
// 1. Usar tipos explícitos
function getUserData(uid: string): Promise<User> {
  // ...
}

// 2. Usar interfaces para objetos
interface Props {
  user: User;
  onSelect: (user: User) => void;
}

// 3. Usar enums para opciones
enum UserRole {
  Standard = 'standard',
  Programmer = 'programmer',
  Admin = 'admin',
}

// 4. Typed imports
import type { User } from '@/app/lib/types';

// 5. Usar const assertions
const roles = ['admin', 'user'] as const;
type Role = typeof roles[number];
```

**❌ NO HACER:**

```typescript
// ❌ Evita any
function getUserData(uid: any): any {
  // ...
}

// ❌ Evita implicit returns
const getData = (id) => fetch(`/api/${id}`);

// ❌ Evita tipos redundantes
const user: User = getUserData(uid) as User;  // Ya retorna User

// ❌ Evita nombres genéricos
const data = fetchData();
const handleClick = () => {};
```

### React/TSX

**✅ HACER:**

```tsx
// 1. Usar "use client" cuando sea necesario
"use client";

// 2. Componentes con tipo
interface CardProps {
  title: string;
  onClick?: () => void;
}

export default function Card({ title, onClick }: CardProps) {
  // ...
}

// 3. Usar hooks correctamente
export default function Form() {
  const [name, setName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // effect
  }, [user.id]);  // ← Dependencias correctas

  return <form>{/* */}</form>;
}

// 4. Memo para optimizar
const UserCard = React.memo(function UserCard({ user }: Props) {
  return <card>{user.name}</card>;
});

// 5. Destructuración clara
const { user, loading, error } = useAuth();
```

**❌ NO HACER:**

```tsx
// ❌ Components sin tipo
export default function Card(props) {
  return <div>{props.title}</div>;
}

// ❌ Missing dependencies
useEffect(() => {
  console.log(user.id);
}, []);  // user.id no está en dependencias

// ❌ Inline handlers innecesarios
<button onClick={() => handleClick(id)}>Click</button>

// ❌ Props anidadas profundas
<Component level1={{level2: {level3: value}}} />
```

### Tailwind CSS

**✅ HACER:**

```tsx
// 1. Usar clases de Tailwind
<div className="flex gap-4 items-center justify-between p-4">

// 2. Breakpoints responsivos
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// 3. Agrupar estilos relacionados
className="
  rounded-lg
  border border-gray-200
  shadow-md
  hover:shadow-lg
  transition-shadow duration-200
"

// 4. Variables CSS para colores personalizados
// En globals.css
:root {
  --color-primary: #6366f1;
}

// En TSX
className="text-[var(--color-primary)]"
```

**❌ NO HACER:**

```tsx
// ❌ Mezclar Tailwind con CSS inline
className="flex" style={{ color: 'red' }}

// ❌ Clases condicionales complejas
className={`
  ${isActive ? 'bg-blue-500' : 'bg-gray-500'}
  ${isDark ? 'text-white' : 'text-black'}
`}

// Mejor:
const bgColor = isActive ? 'bg-blue-500' : 'bg-gray-500';
className={`${bgColor} ...`}
```

---

## ✅ Pruebas

### Ejecución de Tests

```bash
# Ejecutar tests (cuando estén implementados)
pnpm test

# Tests en modo watch
pnpm test --watch

# Coverage de tests
pnpm test --coverage
```

### Checklist Pre-Commit

Antes de hacer commit:

- [ ] Código compila sin errores TypeScript
  ```bash
  pnpm tsc --noEmit
  ```

- [ ] No hay errores de linting
  ```bash
  pnpm lint
  ```

- [ ] Has probado los cambios localmente
  ```bash
  pnpm dev
  # Prueba manualmente en navegador
  ```

- [ ] Documentación está actualizada

- [ ] Mensajes de commit son claros

---

## 📚 Documentación

### Comentarios en Código

```typescript
// ✅ BUENO: Explica por qué, no qué
// switchMap cancela suscripciones previas si llega nuevo usuario
.pipe(
  switchMap(user => getUserData(user.uid))
)

// ❌ MALO: Redunda con el código
// Itera sobre usuarios
users.forEach(user => {
  // ...
})
```

### Actualizar Documentación

Si haces cambios significativos, actualiza:

1. **README.md** - Si hay cambios de instalación
2. **INFORME_DESARROLLO.md** - Sección relevante
3. **GUIA_RAPIDA.md** - Si afecta flujo rápido
4. **ARQUITECTURA_TECNICA.md** - Si hay cambios técnicos
5. **FAQ.md** - Si hay preguntas nuevas

---

## 👀 Proceso de Review

### Cómo un Reviewer Evaluará tu PR

**Checklist de Review:**

1. **Propósito Claro**
   - ¿El PR tiene descripción clara?
   - ¿Está relacionado con un issue?

2. **Código de Calidad**
   - ¿Sigue estándares?
   - ¿Hay tipos TypeScript?
   - ¿Hay código muerto/comentado?

3. **Testing**
   - ¿Se probó localmente?
   - ¿Hay posibles side effects?
   - ¿Qué browsers se probaron?

4. **Seguridad**
   - ¿Hay validación de datos?
   - ¿Se valida en Firestore Rules?
   - ¿Se exponen datos sensibles?

5. **Performance**
   - ¿Hay re-renders innecesarios?
   - ¿Se usan Observables correctamente?
   - ¿Las queries de Firestore son eficientes?

6. **Documentación**
   - ¿Está documentado el código?
   - ¿Se actualizaron los docs?
   - ¿Hay ejemplos de uso?

---

## 🧹 Mantener la Calidad

### Linting Automático

```bash
# ESLint revisa estilo
pnpm lint

# Prettier formatea código
pnpm lint --fix

# TypeScript verifica tipos
pnpm tsc --noEmit
```

### Pre-commit Hook (Futuro)

Cuando se implemente, se ejecutará automáticamente antes de commit:
```bash
# husky + lint-staged
npm run precommit
```

---

## 🐛 Reportar Bugs

### Cómo Abrir un Issue

**Vé a:** GitHub → Issues → New Issue

**Plantilla de Bug Report:**

```markdown
## Descripción
Descripción clara del bug.

## Pasos para Reproducir
1. Abre la página /dashboard/projects
2. Haz click en "Nuevo Proyecto"
3. ...

## Comportamiento Esperado
Qué debería pasar.

## Comportamiento Actual
Qué realmente pasa.

## Capturas de Pantalla
[Si aplica]

## Información del Sistema
- SO: Windows/Mac/Linux
- Navegador: Chrome/Firefox
- Versión de Node: 18.x

## Logs de Error
```
console errors aquí
```

## Contexto Adicional
Anything else?
```

### Estándar de Severidad

| Severidad | Ejemplo | Respuesta |
|-----------|---------|-----------|
| **Crítica** | App no inicia | Inmediata |
| **Alta** | Feature core no funciona | < 24 horas |
| **Media** | UI deformada | < 1 semana |
| **Baja** | Typo en texto | < 2 semanas |

---

## 💡 Solicitar Nuevas Funcionalidades

### Cómo Abrir una Feature Request

**Vé a:** GitHub → Discussions → New Discussion

**Plantilla de Feature Request:**

```markdown
## Descripción
Descripción clara de la feature.

## Motivación
Por qué necesitas esta feature.

## Solución Propuesta
Cómo podrías hacerlo.

## Alternativas Consideradas
Otros approaches.

## Contexto Adicional
Anything else?
```

### Proceso de Feature

1. **Propuesta** → Discusión
2. **Validación** → ¿Está alineada con el roadmap?
3. **Aprobación** → Se convierte en Issue
4. **Implementación** → PR
5. **Review** → Feedback
6. **Merge** → Incluida en release

---

## 📦 Releases y Versionado

### Semantic Versioning

Formato: `MAJOR.MINOR.PATCH`

- **MAJOR:** Breaking changes (incrementar cuando hay cambios incompatibles)
- **MINOR:** Nuevas features (incrementar cuando se agrega funcionalidad)
- **PATCH:** Bug fixes (incrementar para correcciones)

**Ejemplo:**
- `0.1.0` → Versión inicial
- `0.2.0` → Se agregó nueva feature
- `0.2.1` → Bug fix
- `1.0.0` → Versión estable lista para producción

### Changelog

Se mantiene un `CHANGELOG.md` (futuro) documentando:
- Nuevas features
- Bug fixes
- Breaking changes
- Deprecations

---

## 🚀 Deployment

### Antes de Deployar

```bash
# 1. Asegurar que todo funciona
pnpm tsc --noEmit
pnpm lint
pnpm build

# 2. Mergear a main
git checkout main
git pull origin main

# 3. Crear tag de versión
git tag -a v0.2.0 -m "Release version 0.2.0"
git push origin v0.2.0

# 4. Deploy automático (GitHub Actions)
# Si está configurado, deployará automáticamente a GitHub Pages
```

---

## 🎓 Recursos para Contribuidores

### Documentación
- [INFORME_DESARROLLO.md](INFORME_DESARROLLO.md) - Documentación completa
- [ARQUITECTURA_TECNICA.md](ARQUITECTURA_TECNICA.md) - Diseño técnico
- [FAQ.md](FAQ.md) - Preguntas frecuentes

### Guías Oficiales
- [Next.js Contributing](https://github.com/vercel/next.js/blob/canary/CONTRIBUTING.md)
- [React Contributing](https://react.dev/community/how-to-contribute)
- [Firebase Contributing](https://firebase.google.com/community)

### Herramientas Recomendadas
- VS Code
- ESLint extension
- TypeScript extension
- Prettier extension
- GitHub Copilot (opcional)

---

## ✨ Tips para Contribuidores

### 🎯 Buenas Prácticas

1. **Commits Pequeños**
   - Un cambio lógico por commit
   - Fáciles de revisar y revertir

2. **Testing Local**
   - Prueba antes de PR
   - Prueba en móvil también

3. **Comunicación**
   - Abre issue antes de trabajar feature grande
   - Comenta en issue qué estás haciendo
   - Pide feedback temprano

4. **Keep it Simple**
   - No sobre-engineerices
   - Legibilidad > Cleverness
   - Documenta lo complejo

### 🚀 Acelera tu Contribución

```bash
# 1. Setup local rápido
git clone <repo>
cd portfolio-dev
pnpm install

# 2. Ver cambios en tiempo real
pnpm dev

# 3. Formatear automáticamente
pnpm lint --fix

# 4. Sync con upstream frecuentemente
git fetch upstream
git rebase upstream/main
```

---

## 🙏 Agradecimientos

Apreciamos toda contribución, grande o pequeña:
- 🐛 Reportando bugs
- 💡 Sugiriendo features
- 📝 Mejorando documentación
- 💻 Contribuyendo código
- 🤝 Ayudando a otros

---

## 📞 Preguntas?

Si tienes dudas:
1. Busca en [FAQ.md](FAQ.md)
2. Abre una [Discusión](https://github.com/repo/discussions)
3. Contacta a los mantenedores

---

**¡Gracias por contribuir a Portfolio Dev!** 🎉

---

**Documento de contribución.**  
Última revisión: 12 Diciembre 2025
