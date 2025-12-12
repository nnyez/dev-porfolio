# 🌐 Desplegar en Vercel - Método Web (La Forma Más Fácil)

## ✨ Sin necesidad de instalar nada

Solo tu navegador + GitHub = ¡Deploy en 5 minutos!

---

## 📋 Paso a Paso

### PASO 1: Login en Vercel

```
🔗 Ir a: https://vercel.com

1. Click "Sign Up"
2. Elegir: "Continue with GitHub"
3. Autorizar conexión con GitHub
```

![Step 1](https://img.shields.io/badge/Step-1-blue)

---

### PASO 2: Importar tu Repositorio

```
Dashboard de Vercel:

1. Click en: "Add New"
2. Seleccionar: "Project"
3. Click en: "Import Git Repository"
4. Buscar: "proyect-app"
5. Click en el repositorio
6. Click: "Import"
```

**Vercel detectará automáticamente:**
- ✅ Framework: Next.js
- ✅ Root Directory: ./
- ✅ Build Command: pnpm build

![Step 2](https://img.shields.io/badge/Step-2-blue)

---

### PASO 3: Configurar Variables de Entorno

```
En el formulario de importación:

1. Bajar hasta: "Environment Variables"
2. Hacer click: "Add Environment Variable"
3. Agregar CADA una de estas:
```

| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Tu API Key de Firebase |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | tu-proyecto.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | tu-proyecto |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | tu-proyecto.appspot.com |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 123456789 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 1:123456789:web:abc123def456 |

**Dónde encontrar estos valores:**
```
Firebase Console:
├─ Ir a Project Settings (⚙️)
├─ Tab: "Apps"
├─ Copiar tu app Web
└─ Usar los valores en la tabla
```

![Step 3](https://img.shields.io/badge/Step-3-blue)

---

### PASO 4: Deploy!

```
En Vercel:

1. Asegurar que TODAS las variables estén agregadas
2. Click: "Deploy"
3. Esperar 2-5 minutos ⏳
4. ¡Listo! 🎉
```

**Vercel te mostrará:**
```
✅ Deployment successful
   Your app is live at: https://proyect-app.vercel.app
```

![Step 4](https://img.shields.io/badge/Step-4-blue)

---

## 🔄 Desde Ahora...

### Despliegues Automáticos

Cada vez que hagas `git push` a `main`:

```
GitHub → Vercel → Deploy Automático
```

**Ya no necesitas hacer nada más!**

```bash
# Solo hacer push
git push origin main

# Vercel detecta cambios y despliega automáticamente
# Tu app se actualiza en 2-3 minutos ⚡
```

---

## 🎯 Verificar que Funciona

```
Después de deploy:

1. Visita: https://proyect-app.vercel.app
2. Intenta login con Google
3. Si ves el home → ¡Está funcionando! ✅

Si da error de autenticación:
├─ Firebase Console > Authentication > Authorized Domains
├─ Agregar: proyect-app.vercel.app
└─ Esperar 10 min
```

---

## 📞 Preguntas Frecuentes

### ¿Cómo cambiar dominio?
```
Vercel Dashboard > Settings > Domains
├─ Add domain
├─ Ingresar: tu-dominio.com
└─ Seguir instrucciones DNS
```

### ¿Cómo revertir un deploy?
```
Vercel Dashboard > Deployments
├─ Buscar el deploy anterior
├─ Click en los 3 puntos (...)
└─ Seleccionar: "Promote to Production"
```

### ¿Cómo ver los logs?
```
Vercel Dashboard > Deployments
├─ Seleccionar deploy
├─ Click en: "Runtime Logs"
└─ Ver errores en tiempo real
```

---

## ✨ ¿Qué Sucede Cuando Haces Deploy?

```
1️⃣ GitHub detecta tu push
   ↓
2️⃣ Envía webhook a Vercel
   ↓
3️⃣ Vercel clona tu repositorio
   ↓
4️⃣ Ejecuta: pnpm install
   ↓
5️⃣ Ejecuta: pnpm build
   ↓
6️⃣ Sube archivos a CDN global
   ↓
7️⃣ Tu app está disponible en todo el mundo ✅
```

**Todo en 2-5 minutos automaticamente!**

---

## 🚀 Next Steps

- ✅ Tienes tu app deployada
- ⬜ Configurar dominio personalizado (opcional)
- ⬜ Agregar Google Analytics
- ⬜ Configurar CI/CD avanzado

---

## 📚 Más Información

- [Documentación Vercel](https://vercel.com/docs)
- [Documentación Next.js](https://nextjs.org/docs)
- [Guía Completa Deploy](VERCEL_DEPLOYMENT.md)

---

**¡Felicidades! Tu app está en producción! 🎉**
