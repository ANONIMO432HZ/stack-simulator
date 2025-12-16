# Stack Simulator (Pila) 🚀

Simulador interactivo de una Pila (Stack) con visualización moderna, PWA completa y panel de configuraciones avanzado.

## ✨ Características Principales

### 🎛️ Panel de Configuraciones Unificado
- **Icono de engranaje animado** con rotaciones suaves
- **Panel desplegable estético** con sombras y animaciones
- **Toggle de tema personalizado** (Claro/Oscuro) con transiciones
- **Selector de idioma por radio buttons** (Español/English)
- **Posicionamiento responsive** centrado en móviles

### 🔄 Funcionalidades Core
- **Modos de Operación**: Dinámica y Estática con capacidad configurable
- **Visualizaciones TDA**: ArrayList y Lista Enlazada adaptables
- **Operaciones**: Push, Pop, Clear con validaciones inteligentes
- **Undo/Redo**: Sistema completo de historial de operaciones
- **Exportar/Importar**: Estado completo en formato JSON

### 🌐 Internacionalización Completa
- **Soporte bilingüe**: Español e Inglés
- **Cambio dinámico**: Todo el texto se actualiza instantáneamente
- **Persistencia automática**: Idioma guardado entre sesiones

### 🎨 Diseño y UX
- **Tema dual**: Modo claro/oscuro con persistencia
- **Responsive design**: Adaptable desde móviles hasta desktop
- **Animaciones suaves**: Transiciones CSS profesionales
- **Accesibilidad**: Navegación por teclado y ARIA labels

## 📁 Estructura del Proyecto

```
stack-simulator/
├── 📄 index.html          # Estructura principal con panel de configuraciones
├── 📄 manifest.json       # PWA manifest optimizado
├── 📄 sw.js              # Service Worker v12 con cache inteligente
├── 📁 css/
│   └── style.css         # Estilos responsive + panel configuraciones
├── 📁 js/
│   └── script.js         # Lógica completa + manejo de configuraciones
└── 📁 icons/
    ├── favicon.ico       # Iconos para PWA
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon.png
    ├── android-chrome-192x192.png
    └── android-chrome-512x512.png
```

### 🔧 Componentes Técnicos
- **HTML5**: Estructura semántica con accesibilidad ARIA
- **CSS3**: Variables personalizadas, Grid/Flexbox, animaciones CSS
- **JavaScript ES6+**: Módulos, localStorage, Service Worker
- **PWA**: Manifest completo, Service Worker con estrategias de cache
- **Responsive**: Breakpoints optimizados para todas las resoluciones

## 🛠️ Desarrollo Local

### Instalación Rápida
```bash
git clone https://github.com/tu-usuario/stack-simulator.git
cd stack-simulator
python -m http.server 8080
# Abre http://localhost:8080
```

### 🔧 Resolución de Problemas
Si experimentas problemas de caché:
1. **Reset completo**: Usar botón "Reset" en la aplicación
2. **DevTools**: Application > Service Workers > Unregister
3. **Clear Storage**: Application > Clear storage > Clear site data  
4. **Recarga forzada**: `Ctrl+F5` (Windows) / `Cmd+Shift+R` (Mac)

### 🎯 Funcionalidades de Desarrollo
- **Hot reload**: Service Worker con versionado automático
- **Debug mode**: Console logs para desarrollo
- **Responsive testing**: Breakpoints claros para testing

## ⚡ Service Worker y Rendimiento

### 🔄 Cache Inteligente (v12)
```javascript
// Registro con versionado automático
navigator.serviceWorker.register('/sw.js?v=12')

// Estrategias de cache optimizadas
- HTML: network-first con fallback
- CSS/JS: cache-first con actualización en background  
- Iconos: cache-first a largo plazo
- Manifest: network-first para actualizaciones PWA
```

### 📈 Optimizaciones de Performance
- **Versionado automático**: Cache se invalida con cada actualización
- **Estrategias híbridas**: Balance entre velocidad y actualización
- **Compresión**: Assets optimizados para carga rápida
- **Lazy loading**: Recursos cargados bajo demanda

## 🚀 Despliegue en Producción

### 📦 Preparación para Deploy
```bash
# 1. Verificar que todos los assets estén optimizados
# 2. Confirmar que las rutas sean relativas o absolutas según plataforma
# 3. Validar manifest.json y service worker
```

### 🌐 Plataformas Soportadas

#### 🔹 GitHub Pages (Recomendado)
```bash
# Deploy automático desde main branch
1. Settings > Pages > Source: Deploy from branch
2. Branch: main / (root)
3. URL: https://tu-usuario.github.io/stack-simulator
```

#### 🔹 Netlify / Vercel
```bash
# Deploy desde repositorio
1. Conectar repositorio GitHub
2. Build command: (ninguno - proyecto estático)  
3. Publish directory: . (raíz del proyecto)
4. Deploy automático en cada push
```

#### 🔹 Hosting Tradicional
```bash
# Para servidores Apache/Nginx
1. Subir todos los archivos a directorio público
2. Configurar MIME types para .webmanifest y .js
3. Asegurar HTTPS para Service Worker
```

## ♿ Accesibilidad y Usabilidad

### 🎯 Características de Accesibilidad
- **Navegación por teclado**: Tab, Enter, Escape para todos los controles
- **ARIA labels**: Descripción completa para lectores de pantalla  
- **Focus visible**: Indicadores claros de elemento activo
- **Contraste optimizado**: Cumple estándares WCAG 2.1
- **Responsive**: Usable en cualquier tamaño de pantalla

### 🌍 Soporte Internacional
- **Idiomas soportados**: Español (es) e Inglés (en)
- **Cambio dinámico**: Actualización completa de interfaz
- **Persistencia**: Idioma recordado entre sesiones
- **Localización completa**: Todos los textos, mensajes y tooltips

## 📱 PWA (Progressive Web App)

### ✨ Funcionalidades PWA
- **Instalable**: Agregar a pantalla de inicio
- **Offline**: Funciona sin conexión a internet
- **App-like**: Experiencia similar a aplicación nativa
- **Actualizaciones automáticas**: Service Worker gestiona versiones

### 🔧 Configuración PWA
```json
{
  "name": "Simulador de Pila (Stack)",
  "short_name": "StackSim", 
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#111827",
  "background_color": "#111827"
}
```

## 🎨 Personalización y Extensión

### 🎛️ Variables CSS Personalizables
```css
:root {
  --accent: #667eea;        /* Color principal */
  --accent-2: #764ba2;      /* Gradiente secundario */
  --panel-bg: #ffffff;      /* Fondo de paneles */
  --text: #374151;          /* Color de texto */
  --border: #e5e7eb;        /* Bordes */
}
```

### 🔧 Extensiones Posibles
- **Más estructuras de datos**: Cola, Lista, Árbol
- **Algoritmos de ordenamiento**: Visualización paso a paso
- **Modo educativo**: Tutoriales interactivos
- **Análisis de complejidad**: Big O notation

## 📄 Licencia
MIT License - Libre para uso personal y comercial

## 🤝 Contribuir
1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

---
Desarrollado con ❤️ para la comunidad educativa
