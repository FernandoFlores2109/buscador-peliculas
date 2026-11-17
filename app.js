// Aqui configuro la conexion con la API de TMDB (The Movie Database)
// La pagina oficial es https://www.themoviedb.org/
// Para que funcione necesitas tu propia API key, es gratis y se saca en 2 minutos:
//    1. Entras a https://www.themoviedb.org/ y te creas una cuenta
//    2. Verificas tu correo
//    3. Vas a tu perfil, luego a Configuracion y buscas la seccion de API
//    4. Le das en "Solicitar una clave de API" y eliges la opcion Developer
//    5. Llenas el formulario (en URL puedes poner http://localhost y en resumen algo como "Proyecto escolar")
//    6. Te van a dar tu API Key (v3 auth), la copias y la pegas aqui abajo

const API_KEY = "d909cf9bf5670a8248c3fd65cfa7ffd3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w300";

// Aqui guardo las referencias a los elementos del HTML para poder usarlos despues
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");

// Le pongo un evento al boton para que cuando le den clic haga la busqueda
searchBtn.addEventListener("click", handleSearch);

// Tambien hago que funcione cuando el usuario presione Enter en el campo de texto
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// Esta es la funcion principal, se ejecuta cada vez que el usuario quiere buscar una pelicula
function handleSearch() {
  var query = searchInput.value.trim();

  // Primero reviso que el usuario haya escrito algo, si no le muestro un mensaje
  if (query === "") {
    showError("Por favor, escribe el nombre de una pelicula.");
    return;
  }

  // Tambien verifico que la API key este configurada, si no pues no va a funcionar
  if (API_KEY === "TU_API_KEY_AQUI") {
    showError("Debes configurar tu API Key de TMDB en el archivo app.js. Revisa las instrucciones al inicio del archivo.");
    return;
  }

  // Limpio lo que habia antes en pantalla y muestro el loading
  clearResults();
  hideError();
  showLoading();

  // Armo la URL para hacer la peticion a la API, le paso el nombre de la pelicula que escribio el usuario
  var url = BASE_URL + "/search/movie?api_key=" + API_KEY + "&query=" + encodeURIComponent(query) + "&language=es-ES&page=1";

  // Hago la peticion con fetch, esto se conecta a la API y me trae los datos
  fetch(url)
    .then(function (response) {
      // Reviso que la respuesta del servidor este bien, si no lanzo un error
      if (!response.ok) {
        throw new Error("Error en la conexion con el servidor.");
      }
      // Convierto la respuesta a JSON para poder trabajar con los datos
      return response.json();
    })
    .then(function (data) {
      hideLoading();

      // Si no se encontro ninguna pelicula le aviso al usuario
      if (data.results.length === 0) {
        showError("Pelicula no encontrada. Intenta con otro nombre.");
        return;
      }

      // Solo muestro las primeras 6 peliculas para que no se vea saturado
      var movies = data.results.slice(0, 6);
      displayMovies(movies);
    })
    .catch(function (error) {
      // Si algo falla con la conexion le muestro un mensaje al usuario
      hideLoading();
      showError("Error de conexion. Verifica tu conexion a internet e intenta de nuevo.");
      console.error("Error en fetch:", error);
    });
}

// Esta funcion se encarga de mostrar las peliculas en la pagina
function displayMovies(movies) {
  movies.forEach(function (movie) {
    // Creo un div que va a ser la tarjeta de cada pelicula
    var card = document.createElement("div");
    card.className = "movie-card";

    // Reviso si la pelicula tiene poster, si no pongo un mensaje de que no hay imagen
    var posterHTML;
    if (movie.poster_path) {
      posterHTML = '<img src="' + IMG_URL + movie.poster_path + '" alt="Poster de ' + movie.title + '">';
    } else {
      posterHTML = '<div class="no-poster">Sin imagen</div>';
    }

    // Saco el ano de la fecha de lanzamiento, solo me quedo con los primeros 4 caracteres
    var year;
    if (movie.release_date) {
      year = movie.release_date.split("-")[0];
    } else {
      year = "Ano desconocido";
    }

    // Reviso si tiene sinopsis, si no pongo un texto por defecto
    var plot;
    if (movie.overview) {
      plot = movie.overview;
    } else {
      plot = "Sinopsis no disponible.";
    }

    // Armo todo el HTML de la tarjeta con el poster, titulo, ano y sinopsis
    card.innerHTML =
      posterHTML +
      '<div class="movie-info">' +
        '<h2>' + movie.title + '</h2>' +
        '<span class="movie-year">' + year + '</span>' +
        '<p class="movie-plot">' + plot + '</p>' +
      '</div>';

    // Agrego la tarjeta al contenedor donde van los resultados
    resultsContainer.appendChild(card);
  });
}

// Estas son funciones auxiliares para mostrar y ocultar cosas en la pagina

// Muestra el spinner de carga
function showLoading() {
  loadingEl.classList.remove("hidden");
}

// Oculta el spinner de carga
function hideLoading() {
  loadingEl.classList.add("hidden");
}

// Muestra un mensaje de error al usuario
function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

// Oculta el mensaje de error
function hideError() {
  errorEl.classList.add("hidden");
}

// Borra todos los resultados que habia antes en pantalla
function clearResults() {
  resultsContainer.innerHTML = "";
}
