# 🎬 Buscador de Películas

Página web que permite buscar información sobre películas utilizando la API pública de OMDB (Open Movie Database).

## ✨ Funcionalidades

- **Campo de búsqueda** para escribir el nombre de una película
- **Botón de Buscar** para iniciar la búsqueda
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

## 🚀 Cómo Usar

1. Abre el archivo `index.html` en tu navegador
2. Escribe el nombre de una película en el campo de búsqueda
3. Haz clic en **Buscar** o presiona **Enter**
4. ¡Listo! Se mostrarán los resultados

## 📡 API Utilizada

- [OMDB API](https://www.omdbapi.com/) — The Open Movie Database

## 📁 Estructura del Proyecto

```
buscador-peliculas/
├── index.html    # Estructura HTML
├── styles.css    # Estilos CSS
├── app.js        # Lógica JavaScript
└── README.md     # Este archivo
```
