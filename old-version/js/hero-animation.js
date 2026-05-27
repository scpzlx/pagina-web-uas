const heroSection = document.querySelector('.hero');

const heroImages = [
    'images/EscuelaEntrada.jpg',
    'images/imageHero1.jpg',
    'images/imageHero2.jpg',
    'images/imageHero3.jpg',
    'images/imageHero4.jpg',
    'images/imageHero5.jpg',
    'images/imageHero6.jpg'
];

let currentImageIndex = 0;
let imagesLoaded = 0;

// Precargar todas las imagenes
function preloadImages() {

    let loadedCount = 0;
    const totalImages = heroImages.length;

    heroImages.forEach(imageSrc => {
        const img = new Image();
        img.onload = function () {
            loadedCount++;
            if (loadedCount === totalImages) {
                imagesLoaded = true;
                console.log('Todas las imagenes precargadas correctamente');
                // Iniciar el carrusel solo cuando todas las imagnes esten cargadas
                setInterval(changeHeroBackground, 4000)
            }
        };
        img.src = imageSrc;
    });
}

// Llamar a la funcion de precarga cuando se carga la pagina
preloadImages();

function changeHeroBackground() {
    if (!imagesLoaded) return;

    currentImageIndex = (currentImageIndex + 1) % heroImages.length;

    // Crear una nueva imagen para precargar antes de cambiar
    const newImg = new Image();
    newImg.onload = function() {
        heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
    };
    newImg.src = heroImages[currentImageIndex]
}
