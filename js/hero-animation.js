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

// Precargar todas las imagenes
function preloadImages() {
    heroImages.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

// Llamar a la funcion de precarga cuando se carga la pagina
preloadImages();

function changeHeroBackground() {
    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    heroSection.style.backgroundImage = `url(${heroImages[currentImageIndex]})`;
}

setInterval(changeHeroBackground, 4000);