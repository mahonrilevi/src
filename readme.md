¡Estructura HTML!
En el archivo HTML definí toda la estructura visual: el encabezado con el logo, un buscador con campos para ciudad y huéspedes, y un botón para activar el modo oscuro. También incluí un modal que aparece en celulares para realizar búsquedas de forma más cómoda. Todo está diseñado con clases de Tailwind y estilos personalizados para lograr una apariencia limpia y moderna.

Lógica en JavaScript (main.js)
Toda la lógica de interacción está en main.js. Ahí programé el comportamiento del buscador, el contador de huéspedes (adultos y niños), el filtrado de los resultados según la búsqueda, y la visualización de las sugerencias mientras se escribe. También configuré el modo oscuro para que se active al hacer clic en el botón de la luna o el sol, y que recuerde la preferencia del usuario usando localStorage.

Además, hice que todo funcione igual en móviles y en escritorio. Si se está en móvil, al hacer clic en "Search", se abre un modal con los mismos campos para buscar.

Tarjetas Interactivas (utils.js)
Las tarjetas de cada alojamiento se crean con JavaScript desde utils.js. Usé una estructura llamada flip-card que permite que cada tarjeta se voltee al hacer clic, mostrando por detrás los detalles del alojamiento (precio, recámaras, baños, estacionamiento, etc.). También le puse estilos diferentes según si el alojamiento es pequeño o grande, para que se vea más dinámico.

Datos (stays.js)
Todos los alojamientos están en un archivo stays.js como un arreglo de objetos. Cada objeto tiene información como la ciudad, el país, si el anfitrión es superhost, cuántos huéspedes acepta, su calificación, tipo de alojamiento, número de camas y una foto. Esta información se usa para generar las tarjetas dinámicamente en la página.
