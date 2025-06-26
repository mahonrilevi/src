/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
export function createCard(stay) {
  const card = document.createElement('div');
  card.className = 'flip-card bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800';
  
  const cardInner = document.createElement('div');
  cardInner.className = 'flip-card-inner relative w-full h-full';

  const isSmall = stay.maxGuests <= 2;
  const price = isSmall ? 2000 : 7000;
  const bedrooms = isSmall ? 1 : 3;
  const bathrooms = isSmall ? 1 : 2;
  const parking = isSmall ? 1 : 3;

  const front = document.createElement('div');
  front.className = 'flip-card-front bg-white dark:bg-gray-800';
  front.innerHTML = 
    `<img src="${stay.photo}" alt="${stay.title}" class="w-full h-48 object-cover">
    <div class="p-4">
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
        <div class="flex items-center gap-2">
          ${stay.superHost ? '<span class="border rounded-full px-2 py-1 text-xs font-bold text-gray-700 border-gray-700 dark:text-gray-300 dark:border-gray-300">SUPERHOST</span>' : ''}
          <span>${stay.type}${stay.beds ? ` · ${stay.beds} beds` : ''}</span>
        </div>
        <div class="flex items-center text-red-500 font-semibold">
          <svg class="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 0 0 .95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 0 0-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.371-2.448a1 1 0 0 0-1.175 0l-3.371 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 0 0-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 0 0 .95-.69l1.286-3.957z"/>
          </svg>
          ${stay.rating}
        </div>
      </div>
      <h2 class="text-md font-semibold dark:text-white">${stay.title}</h2>
    </div>`;

  const back = document.createElement('div');
  back.className = `flip-card-back ${isSmall ? 'bg-blue-50 dark:bg-blue-900' : 'bg-purple-50 dark:bg-purple-900'} p-6 flex flex-col justify-center`;
  back.innerHTML = 
    `<h3 class="text-lg font-bold mb-4 ${isSmall ? 'text-blue-600 dark:text-blue-300' : 'text-purple-600 dark:text-purple-300'}">Detalles</h3>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">Huéspedes máx:</p>
        <p class="font-semibold dark:text-white">${stay.maxGuests}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">Precio:</p>
        <p class="font-bold ${isSmall ? 'text-blue-600 dark:text-blue-300' : 'text-purple-600 dark:text-purple-300'}">$${price.toLocaleString()}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">Recámaras:</p>
        <p class="dark:text-white">${bedrooms}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">Baños:</p>
        <p class="dark:text-white">${bathrooms}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">Parking:</p>
        <p class="dark:text-white">${parking}</p>
      </div>
    </div>
    <p class="mt-4 text-sm ${isSmall ? 'text-blue-500 dark:text-blue-200' : 'text-purple-500 dark:text-purple-200'} italic">
      ${isSmall ? 'Ideal para 1-2 personas' : 'Perfecto para grupos de 3-10'}
    </p>`;

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  card.appendChild(cardInner);

  card.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });

  return card;
}