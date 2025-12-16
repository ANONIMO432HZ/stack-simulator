# 🚀 Stack Simulator

![Release](https://img.shields.io/github/v/release/ANONIMO432HZ/stack-simulator?label=release) 
![Stars](https://img.shields.io/github/stars/ANONIMO432HZ/stack-simulator?style=social) 
![Issues](https://img.shields.io/github/issues/ANONIMO432HZ/stack-simulator) 
![License](https://img.shields.io/github/license/ANONIMO432HZ/stack-simulator)
![Netlify](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

¡Bienvenido a Stack Simulator! Una visualización interactiva y educativa de una pila (stack) construida con HTML, CSS y JavaScript. Ideal para estudiantes, profesores y cualquier persona que quiera entender las operaciones básicas de una pila mediante animaciones claras.

---

## 🔥 Demo en vivo
Visita la demo desplegada:
➡️ https://stack-simulator.netlify.app/

![Demo placeholder](https://via.placeholder.com/900x260.png?text=Stack+Simulator+Live+Demo)  
(Reemplaza esta imagen por un GIF real en `docs/demo.gif` o `assets/demo.gif` para mostrar la simulación en acción.)

---

## 📁 Estructura principal
- 📄 [index.html](https://github.com/ANONIMO432HZ/stack-simulator/blob/main/index.html) — Interfaz principal y demo.
- 🎨 [css/](https://github.com/ANONIMO432HZ/stack-simulator/tree/main/css) — Estilos.
- 🧩 [js/](https://github.com/ANONIMO432HZ/stack-simulator/tree/main/js) — Lógica y animaciones.
- 🖼️ [icons/](https://github.com/ANONIMO432HZ/stack-simulator/tree/main/icons) — Recursos gráficos.
- ⚡ [sw.js](https://github.com/ANONIMO432HZ/stack-simulator/blob/main/sw.js) — Service worker (PWA / caching).
- 📜 [LICENSE](https://github.com/ANONIMO432HZ/stack-simulator/blob/main/LICENSE) — Licencia MIT.

---

## ✨ Características
- 🧠 Visualización paso a paso de push / pop / peek.
- ▶️ Animaciones didácticas que muestran la transición de cada operación.
- ♻️ Código ligero y fácil de extender.
- ⚡ Preparado para PWA (service worker incluido).
- 🎯 Perfecto para demostraciones educativas o material de enseñanza.

---

## ⚙️ Cómo ejecutar localmente
Opciones rápidas:

1. Clona el repositorio:
   git clone https://github.com/ANONIMO432HZ/stack-simulator.git

2. Desde el directorio del proyecto:
   cd stack-simulator

3. Abrir localmente:
   - Opción rápida: abrir `index.html` directamente en el navegador (útil para pruebas estáticas).
   - Opción recomendada (servidor local):
     - Python 3: `python -m http.server 8000` → http://localhost:8000/
     - Node: `npx serve .` → usa la URL que indique la herramienta

4. (Opcional) Despliegue: puedes usar Netlify, Vercel o GitHub Pages para publicar la demo (ya está desplegada en Netlify).

---

## ▶️ Uso (interfaz)
La demo incluye controles en pantalla para:
- ➕ Push: insertar un valor en la pila con animación.
- ➖ Pop: eliminar el elemento superior y ver la transición.
- 👀 Peek: inspeccionar el tope sin modificar la pila.
- 🔁 Reset: reiniciar la simulación.

Revisa los elementos del DOM en `index.html` y la lógica en `js/` si quieres modificar los nombres de control o comportamiento.

---

## 🧩 Buenas prácticas para contribuir
1. Haz fork y crea una rama: `git checkout -b feat/nombre-funcion`.
2. Añade pruebas o una demo (captura/GIF) en `docs/` o `assets/`.
3. Documenta cambios relevantes en el README.
4. Abre PR explicando:
   - Qué se cambia y por qué.
   - Cómo probar localmente.
   - Capturas o GIFs si cambias la UI.

Pautas:
- HTML semántico, CSS modular y JS con funciones pequeñas y comentadas.
- Mantener compatibilidad móvil y considerar accesibilidad (contraste/teclas).

---

## 💡 Ideas de mejora
- Exportar/importar estado de la pila (JSON).
- Modo paso-a-paso con control de velocidad.
- Historial de operaciones con función "replay".
- Ajustes de accesibilidad (tema alto contraste, tamaños).
- Tests visuales con Playwright/Puppeteer.

---

## 🔗 Enlaces rápidos
- Repositorio: [ANONIMO432HZ/stack-simulator](https://github.com/ANONIMO432HZ/stack-simulator)  
- Demo en vivo: https://stack-simulator.netlify.app/  
- Archivo principal: [index.html](https://github.com/ANONIMO432HZ/stack-simulator/blob/main/index.html)  
- Directorios: [css/](https://github.com/ANONIMO432HZ/stack-simulator/tree/main/css) · [js/](https://github.com/ANONIMO432HZ/stack-simulator/tree/main/js) · [icons/](https://github.com/ANONIMO432HZ/stack-simulator/tree/main/icons)  
- Service Worker: [sw.js](https://github.com/ANONIMO432HZ/stack-simulator/blob/main/sw.js)  
- Issues: [Abrir/Ver Issues](https://github.com/ANONIMO432HZ/stack-simulator/issues)  
- PRs: [Pull Requests](https://github.com/ANONIMO432HZ/stack-simulator/pulls)

---

## 📄 Licencia
MIT — ver [LICENSE](https://github.com/ANONIMO432HZ/stack-simulator/blob/main/LICENSE).
