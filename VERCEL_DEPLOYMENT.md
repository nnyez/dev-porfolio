# 🚀 Guía Rápida: Despliegue en Vercel

## 2️⃣ Opciones de Despliegue

### OPCIÓN 1: Desde la Web (Más Fácil) ⭐ RECOMENDADO

**Sin necesidad de CLI, solo conectar GitHub:**

#### Paso 1: Ir a Vercel
1. Abre https://vercel.com
2. Haz login (o crea cuenta con GitHub)

#### Paso 2: Importar Proyecto
1. Click en **Add New > Project**
2. Click en **Import Git Repository**
3. Busca y selecciona: `proyect-app` (o el nombre de tu repo)
4. Click **Import**

#### Paso 3: Configurar Proyecto
1. **Project Name:** `proyect-app` (o como prefieras)
2. **Framework Preset:** Next.js (automático)
3. **Root Directory:** `./` (automático)

#### Paso 4: Agregar Variables de Entorno
1. Click en **Environment Variables**
2. Agregar una por una:

```
NEXT_PUBLIC_FIREBASE_API_KEY = tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = tu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID = tu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = tu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID = tu_app_id
```

3. Asegurar que estén marcadas para **Production**, **Preview** y **Development**

#### Paso 5: Deploy
1. Click en **Deploy**
2. ¡Listo! Esperar 2-5 minutos

**URL Result:** `https://proyect-app.vercel.app`

✅ **Desde ahora cada `git push` a main hará deploy automático**

---

### OPCIÓN 2: Desde la CLI

Si prefieres usar terminal:

#### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

#### Paso 2: Conectar Repositorio
```bash
# Desde la carpeta del proyecto
vercel

# Seguir instrucciones
```

#### Paso 3: Configurar Variables
En Vercel Dashboard:
1. **Project Settings > Environment Variables**
2. Agregar variables Firebase

#### Paso 4: Desplegar
```bash
# Deploy a producción
vercel --prod

# O hacer push a main (automático)
git push origin main
```

## 🔄 Despliegues Automáticos

Una vez conectado a GitHub (Opción 1 o 2):
- **Cada push a main** → Deploy automático a producción ✅
- **Cada PR** → Preview automático ✅
- **Sin pasos manuales** → Solo push y listo ✅

---

## 📋 Checklist Pre-Despliegue

- [ ] Firebase rules actualizadas
- [ ] Variables de entorno configuradas en Vercel
- [ ] Build local sin errores: `pnpm build`
- [ ] Conectado a repositorio GitHub
- [ ] next.config.ts optimizado para Vercel

---

## 🆘 Troubleshooting

### Error: "Build failed"
```bash
# Limpiar caché local
rm -rf .next

# Intentar build de nuevo
pnpm build
```

### Variables no reconocidas
```
1. Vercel Dashboard > Settings > Environment Variables
2. Verificar que NEXT_PUBLIC_ estén agregadas
3. Reiniciar deployment
```

### Preview no funciona
```
1. Vercel > Domains > View Deployment
2. Verificar URLs en Firebase Console > Authorized Domains
3. Agregar: https://tu-proyecto.vercel.app
```

---

## 📚 Documentación Completa

👉 [docs/SETUP_Y_DEPLOYMENT.md](docs/SETUP_Y_DEPLOYMENT.md#despliegue-en-vercel)
