/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

import { stays } from "./stays.js";
import { createCard } from "./utils.js";

const staysContainer = document.getElementById("stays-container");
const staysCount = document.getElementById("stays-count");

// Elementos de búsqueda
const locationInput = document.getElementById("location-input");
const guestsDisplay = document.getElementById("guests-display");
const adultsDisplay = document.getElementById("adults-display");
const childrenDisplay = document.getElementById("children-display");
const incrementAdults = document.getElementById("increment-adults");
const decrementAdults = document.getElementById("decrement-adults");
const incrementChildren = document.getElementById("increment-children");
const decrementChildren = document.getElementById("decrement-children");
const guestsPopup = document.getElementById("guests-popup");
const searchButton = document.getElementById("search-button");

// Elementos para móvil
const mobileSearchTrigger = document.getElementById("mobile-search-trigger");
const mobileSearchModal = document.getElementById("mobile-search-modal");
const closeMobileSearch = document.getElementById("close-mobile-search");
const locationInputMobile = document.getElementById("location-input-mobile");
const guestsDisplayMobile = document.getElementById("guests-display-mobile");
const adultsDisplayMobile = document.getElementById("adults-display-mobile");
const childrenDisplayMobile = document.getElementById("children-display-mobile");
const incrementAdultsMobile = document.getElementById("increment-adults-mobile");
const decrementAdultsMobile = document.getElementById("decrement-adults-mobile");
const incrementChildrenMobile = document.getElementById("increment-children-mobile");
const decrementChildrenMobile = document.getElementById("decrement-children-mobile");
const searchForm = document.getElementById("search-form");

// Listas de sugerencias
const suggestionsList = document.getElementById("suggestions");
const suggestionsListMobile = document.getElementById("suggestions-mobile");

// Modo oscuro
const darkModeToggle = document.getElementById("dark-mode-toggle");

let adults = 0;
let children = 0;
let totalGuests = 0;
let location = "";

function renderStays(filteredStays) {
  staysContainer.innerHTML = "";
  
  if (filteredStays.length === 0) {
    staysContainer.innerHTML = `
      <div class="col-span-full text-center py-10">
        <h3 class="text-xl font-semibold mb-2 dark:text-white">No se encontraron alojamientos</h3>
        <p class="text-gray-600 dark:text-gray-400">Intenta ajustar tus criterios de búsqueda</p>
      </div>
    `;
    staysCount.textContent = "0 stays";
    return;
  }
  
  staysCount.textContent = `${filteredStays.length}+ stays`;
  filteredStays.forEach((stay) => staysContainer.appendChild(createCard(stay)));
}

function filterStays(location, guests) {
  const filtered = stays.filter((stay) => {
    const locationMatch = location === "" || 
                         stay.city.toLowerCase().includes(location.toLowerCase()) || 
                         stay.country.toLowerCase().includes(location.toLowerCase());
    const guestsMatch = stay.maxGuests >= guests;
    return locationMatch && guestsMatch;
  });
  
  renderStays(filtered);
}

const uniqueCities = [...new Set(stays.map((stay) => stay.city))];

function showSuggestions(inputElement, suggestionsElement) {
  const query = inputElement.value.trim().toLowerCase();
  suggestionsElement.innerHTML = "";

  if (query === "") {
    suggestionsElement.classList.add("hidden");
    return;
  }

  const filteredCities = uniqueCities.filter((city) =>
    city.toLowerCase().includes(query)
  );

  if (filteredCities.length === 0) {
    suggestionsElement.classList.add("hidden");
    return;
  }

  filteredCities.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.className = "p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700";
    li.addEventListener("click", () => {
      inputElement.value = city;
      suggestionsElement.classList.add("hidden");
    });
    suggestionsElement.appendChild(li);
  });

  suggestionsElement.classList.remove("hidden");
}

function updateGuestsDisplay() {
  totalGuests = adults + children;
  const guestText =
    totalGuests === 0
      ? "Add guests"
      : `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
  guestsDisplay.textContent = guestText;
  guestsDisplayMobile.textContent = guestText;
  adultsDisplay.textContent = adults;
  adultsDisplayMobile.textContent = adults;
  childrenDisplay.textContent = children;
  childrenDisplayMobile.textContent = children;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
  darkModeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun text-yellow-300"></i>'
    : '<i class="fas fa-moon text-gray-600"></i>';
}

// Inicialización
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  darkModeToggle.innerHTML = '<i class="fas fa-sun text-yellow-300"></i>';
}

// Event listeners
darkModeToggle.addEventListener("click", toggleDarkMode);

// Desktop
locationInput.addEventListener("input", () =>
  showSuggestions(locationInput, suggestionsList)
);
guestsDisplay.addEventListener("click", () =>
  guestsPopup.classList.toggle("hidden")
);

incrementAdults.addEventListener("click", () => {
  adults++;
  updateGuestsDisplay();
});
decrementAdults.addEventListener("click", () => {
  if (adults > 0) adults--;
  updateGuestsDisplay();
});
incrementChildren.addEventListener("click", () => {
  children++;
  updateGuestsDisplay();
});
decrementChildren.addEventListener("click", () => {
  if (children > 0) children--;
  updateGuestsDisplay();
});

searchButton.addEventListener("click", () => {
  location = locationInput.value.trim();
  if (totalGuests === 0) {
    alert("Please enter at least one guest.");
    return;
  }
  filterStays(location, totalGuests);
  guestsPopup.classList.add("hidden");
});

// Mobile
mobileSearchTrigger.addEventListener("click", () =>
  mobileSearchModal.classList.remove("hidden")
);
closeMobileSearch.addEventListener("click", () =>
  mobileSearchModal.classList.add("hidden")
);
locationInputMobile.addEventListener("input", () =>
  showSuggestions(locationInputMobile, suggestionsListMobile)
);

incrementAdultsMobile.addEventListener("click", () => {
  adults++;
  updateGuestsDisplay();
});
decrementAdultsMobile.addEventListener("click", () => {
  if (adults > 0) adults--;
  updateGuestsDisplay();
});
incrementChildrenMobile.addEventListener("click", () => {
  children++;
  updateGuestsDisplay();
});
decrementChildrenMobile.addEventListener("click", () => {
  if (children > 0) children--;
  updateGuestsDisplay();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  location = locationInputMobile.value.trim();
  if (totalGuests === 0) {
    alert("Please enter at least one guest.");
    return;
  }
  filterStays(location, totalGuests);
  mobileSearchModal.classList.add("hidden");
});

// Cerrar popups al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!suggestionsList.contains(e.target) && e.target !== locationInput) {
    suggestionsList.classList.add("hidden");
  }
  if (
    !suggestionsListMobile.contains(e.target) &&
    e.target !== locationInputMobile
  ) {
    suggestionsListMobile.classList.add("hidden");
  }
  if (!guestsPopup.contains(e.target) && e.target !== guestsDisplay) {
    guestsPopup.classList.add("hidden");
  }
});

// Render inicial
renderStays(stays);
updateGuestsDisplay();