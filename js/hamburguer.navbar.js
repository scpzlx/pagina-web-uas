// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('overlay');
  const dropdowns = document.querySelectorAll('.dropdown');

  // VALIDACIÓN - Verificar que los elementos existen
  if (!hamburger || !menu || !overlay) {
    console.error('Error: No se encontraron los elementos necesarios');
    console.log('hamburger:', hamburger);
    console.log('menu:', menu);
    console.log('overlay:', overlay);
    return; // Ahora sí puede usar return porque está dentro de una función
  }

  console.log('✅ Elementos encontrados correctamente');

  // Toggle menú hamburguesa
  hamburger.addEventListener('click', function() {
    console.log('👆 Click en hamburguesa');
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Cerrar menú al hacer click en overlay
  overlay.addEventListener('click', function() {
    console.log('👆 Click en overlay');
    hamburger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Toggle dropdowns en móvil
  dropdowns.forEach(function(dropdown) {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        
        // Cerrar otros dropdowns
        dropdowns.forEach(function(other) {
          if (other !== dropdown) {
            other.classList.remove('active');
          }
        });
        
        dropdown.classList.toggle('active');
      }
    });
  });

  // Cerrar menú al hacer click en un enlace
  const menuLinks = document.querySelectorAll('.menu a');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (!link.parentElement.classList.contains('dropdown') || window.innerWidth > 768) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Resetear todo cuando la ventana se redimensiona
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
      dropdowns.forEach(function(dropdown) {
        dropdown.classList.remove('active');
      });
    }
  });

});