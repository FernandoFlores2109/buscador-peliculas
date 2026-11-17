// ===== Configuración de la API =====
// TMDB API - The Movie Database (https://www.themoviedb.org/)
// ⚠️ INSTRUCCIONES PARA OBTENER TU API KEY GRATIS:
//    1. Ve a https://www.themoviedb.org/ y crea una cuenta gratuita
//    2. Verifica tu correo electrónico
//    3. Ve a tu perfil → Configuración → API
//    4. Haz clic en "Solicitar una clave de API" → opción "Developer"
//    5. Llena el formulario (Application URL: http://localhost, Summary: "Proyecto escolar")
//    6. Copia tu "API Key (v3 auth)" y pégala aquí abajo 👇

const API_KEY = "TU_API_KEY_AQUI";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w300";

// ===== Referencias al DOM =====
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

// ===== Event Listeners =====

// Buscar al hacer clic en el botón
searchBtn.addEventListener("click", handleSearch);

// Buscar al presionar Enter en el campo de texto
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// ===== Función principal de búsqueda =====
function handleSearch() {
  const query = searchInput.value.trim();

  // Validar que el campo no esté vacío
  if (query === "") {
    showError("Por favor, escribe el nombre de una película.");
    return;
  }

  // Verificar que la API Key esté configurada
  if (API_KEY === "TU_API_KEY_AQUI") {
    showError("⚠️ Debes configurar tu API Key de TMDB en el archivo app.js. Revisa las instrucciones al inicio del archivo.");
    return;
  }

  // Limpiar resultados anteriores y mostrar loading
  clearResults();
  hideError();
  showLoading();

  // Construir la URL de la API con el nombre de la película
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-ES&page=1`;

  // Realizar la solicitud con fetch()
  fetch(url)
    .then(function (response) {
      // Verificar que la respuesta del servidor sea exitosa
      if (!response.ok) {
        throw new Error("Error en la conexión con el servidor.");
      }
      // Convertir la respuesta a formato JSON
      return response.json();
    })
    .then(function (data) {
      hideLoading();

      // Verificar si la API encontró resultados
      if (data.results.length === 0) {
        showError("🎥 Película no encontrada. Intenta con otro nombre.");
        return;
      }

      // Mostrar las películas encontradas (máximo 6)
      const movies = data.results.slice(0, 6);
      displayMovies(movies);
    })
    .catch(function (error) {
      hideLoading();
      showError("⚠️ Error de conexión. Verifica tu conexión a internet e intenta de nuevo.");
      console.error("Error en fetch:", error);
    });
}

// ===== Mostrar películas en el DOM =====
function displayMovies(movies) {
  movies.forEach(function (movie) {
    // Crear la tarjeta de la película
    const card = document.createElement("div");
    card.className = "movie-card";

    // Verificar si tiene póster disponible
    const posterHTML = movie.poster_path
      ? `<img src="${IMG_URL}${movie.poster_path}" alt="Póster de ${movie.title}">`
      : `<div class="no-poster">📷 Sin imagen</div>`;

    // Extraer el año de la fecha de lanzamiento
    const year = movie.release_date
      ? movie.release_date.split("-")[0]
      : "Año desconocido";

    // Obtener la sinopsis
    const plot = movie.overview
      ? movie.overview
      : "Sinopsis no disponible.";

    // Construir el contenido HTML de la tarjeta
    card.innerHTML = `
      ${posterHTML}
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <span class="movie-year">📅 ${year}</span>
        <p class="movie-plot">${plot}</p>
      </div>
    `;

    // Agregar la tarjeta al contenedor de resultados
    resultsContainer.appendChild(card);
  });
}

// ===== Funciones de utilidad =====

function showLoading() {
  loadingEl.classList.remove("hidden");
}

function hideLoading() {
  loadingEl.classList.add("hidden");
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

function hideError() {
  errorEl.classList.add("hidden");
}

function clearResults() {
  resultsContainer.innerHTML = "";
}
