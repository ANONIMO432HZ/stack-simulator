# Stack Simulator (Pila)

Simulador interactivo de una Pila (Stack) con visualización moderna, i18n (es/en), Undo/Redo, exportar/importar JSON y PWA básica.

## Características
- Modos: Dinámica y Estática (con capacidad y barra de capacidad)
- Visualizaciones: ArrayList y Lista Enlazada
- UX: mensajes (toasts) traducidos, validaciones y estados disabled
- Tema: claro/oscuro con persistencia
- Idioma: selector accesible (teclado), portal al body para no quedar oculto
- Persistencia: estado/tema/idioma/enlaces en localStorage
- Undo/Redo, Exportar/Importar JSON
- Footer: enlace de GitHub y estrella al repo

## Estructura
- index.html — Estructura de UI y enlaces a CSS/JS/manifest
- css/style.css — Variables CSS (colores/sombras), modo oscuro, scrollbar, responsive
- js/script.js — IIFE, estado, render, i18n, accesibilidad y lógica de operaciones
- icons/ — Íconos para favicon y manifest (PWA)
- sw.js — Service Worker (versionado)

## Desarrollo
- Abrir index.html en navegador moderno.
- En caso de problemas de caché:
  1) Usar el botón "Reset" (limpia localStorage y desregistra SW)
  2) DevTools > Application > Service Workers > Unregister
  3) DevTools > Application > Clear storage > Clear site data
  4) Recarga forzada (Ctrl+F5 / Cmd+Shift+R)

## Service Worker y Cacheo
- Registro con versión: `navigator.serviceWorker.register('/sw.js?v=3')`
- Caché versionada: `stack-sim-v3`
- Estrategias:
  - HTML: network-first con fallback a cache
  - Estáticos (css/js/icons): cache-first con actualización
- Recomendaciones:
  - Cambiar el sufijo de cache y query del SW (v4, v5, ...) para invalidar versiones antiguas
  - En desarrollo, puedes desactivar el SW o usar el botón Reset

## Despliegue (Deploy)
- Opción 1: GitHub Pages (estático)
  - Publica todo el contenido del proyecto en la rama `gh-pages` o usa GitHub Pages desde `main`
  - Asegúrate de que las rutas del SW y assets empiecen con `/` o ajusta el `scope` si publicas en subcarpeta
- Opción 2: Netlify / Vercel
  - Importa el repositorio y despliega como sitio estático
  - Asegura que `sw.js` se sirva en la raíz del dominio (scope del SW)
- Opción 3: Servidor estático (Nginx, Apache)
  - Sirve el proyecto desde la raíz del host
  - MIME correcto para manifest y sw.js

## Accesibilidad
- Selector de idioma navegable con teclado (Enter/Espacio/Escape, Flechas, Home/End)
- Focus visible en elementos interactivos

## Internacionalización
- Español (es) e Inglés (en)
- `applyLang` actualiza textos y tooltips (GitHub/Star)

## Licencia
MIT
