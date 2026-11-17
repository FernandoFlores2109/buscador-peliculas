// ===== Configuración de la API =====
// OMDB API - API pública de películas (https://www.omdbapi.com/)
// API Key gratuita para uso educativo
const API_KEY = "4a3b711b";
const API_URL = "https://www.omdbapi.com/";

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

  // Limpiar resultados anteriores y mostrar loading
  clearResults();
  hideError();
  showLoading();

  // Construir la URL de la API con el nombre de la película
  const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`;

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
      if (data.Response === "False") {
        showError("🎥 Película no encontrada. Intenta con otro nombre.");
        return;
      }

      // Obtener los detalles de cada película encontrada
      fetchMovieDetails(data.Search);
    })
    .catch(function (error) {
      hideLoading();
      showError("⚠️ Error de conexión. Verifica tu conexión a internet e intenta de nuevo.");
      console.error("Error en fetch:", error);
    });
}

// ===== Obtener detalles de cada película =====
function fetchMovieDetails(movies) {
  // Limitar a 6 resultados para no saturar la página
  const moviesToShow = movies.slice(0, 6);

  // Crear una solicitud fetch por cada película para obtener su sinopsis
  const detailPromises = moviesToShow.map(function (movie) {
    const detailUrl = `${API_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`;
    return fetch(detailUrl).then(function (res) {
      return res.json();
    });
  });

  // Esperar a que todas las solicitudes terminen
  Promise.all(detailPromises)
    .then(function (detailedMovies) {
      displayMovies(detailedMovies);
    })
    .catch(function (error) {
      showError("⚠️ Error al obtener los detalles de las películas.");
      console.error("Error en detalles:", error);
    });
}

// ===== Mostrar películas en el DOM =====
function displayMovies(movies) {
  movies.forEach(function (movie) {
    // Crear la tarjeta de la película
    const card = document.createElement("div");
    card.className = "movie-card";

    // Verificar si tiene póster disponible
    const posterHTML =
      movie.Poster && movie.Poster !== "N/A"
        ? `<img src="${movie.Poster}" alt="Póster de ${movie.Title}">`
        : `<div class="no-poster">📷 Sin imagen</div>`;

    // Construir el contenido HTML de la tarjeta
    card.innerHTML = `
      ${posterHTML}
      <div class="movie-info">
        <h2>${movie.Title}</h2>
        <span class="movie-year">📅 ${movie.Year}</span>
        <p class="movie-plot">${movie.Plot !== "N/A" ? movie.Plot : "Sinopsis no disponible."}</p>
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
