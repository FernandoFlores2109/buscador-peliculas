# 🎬 Buscador de Películas

Página web que permite buscar información sobre películas utilizando la API pública de TMDB (The Movie Database).

## ✨ Funcionalidades

- **Campo de búsqueda** para escribir el nombre de una película
- **Botón de Buscar** para iniciar la búsqueda (también funciona con Enter)
- **Resultados dinámicos** que muestran:
  - 🎥 Título de la película
  - 📅 Año de lanzamiento
  - 📝 Sinopsis / Descripción
  - 🖼️ Póster de la película
- **Manejo de errores**: mensajes claros si no se encuentra la película o hay problemas de conexión
- **Sin recarga del navegador**: toda la interacción es dinámica usando JavaScript

## 🛠️ Tecnologías Utilizadas

- **HTML5** — Estructura de la página
- **CSS3** — Estilos y diseño responsive
- **JavaScript (Vanilla)** — Lógica, `fetch()` para consumir la API, y manipulación del DOM

## 🔑 Configuración de la API Key

Para que el buscador funcione, necesitas una API Key gratuita de TMDB:

1. Ve a [https://www.themoviedb.org/](https://www.themoviedb.org/) y crea una cuenta gratuita
2. Verifica tu correo electrónico
3. Ve a tu perfil → Configuración → API
4. Haz clic en **"Solicitar una clave de API"** → opción **Developer**
5. Llena el formulario (Application URL: `http://localhost`, Summary: `"Proyecto escolar"`)
6. Copia tu **"API Key (v3 auth)"**
7. Abre el archivo `app.js` y reemplaza `"TU_API_KEY_AQUI"` con tu clave

## 🚀 Cómo Usar

1. Configura tu API Key (ver instrucciones arriba)
2. Abre el archivo `index.html` en tu navegador
3. Escribe el nombre de una película en el campo de búsqueda
4. Haz clic en **Buscar** o presiona **Enter**
5. ¡Listo! Se mostrarán los resultados

## 📡 API Utilizada

- [TMDB API](https://www.themoviedb.org/documentation/api) — The Movie Database

## 📁 Estructura del Proyecto

```
buscador-peliculas/
├── index.html    # Estructura HTML
├── styles.css    # Estilos CSS
├── app.js        # Lógica JavaScript
└── README.md     # Este archivo
```
