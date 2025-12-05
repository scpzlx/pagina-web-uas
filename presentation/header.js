
const headerHTML = `
    <header>
    <nav class="navbar">
      <div class="logoUas">
        <img src="images/LogoUas.png" alt="UAS logo" />
        <img src="images/logo_uas_futuro.png" alt="UAS visión futuro">
      </div>

      <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div class="menu" id="menu">
        <ul>
          <li><a href="index.html">Inicio</a></li>

          <li class="dropdown">
            <a href="#">Facultad</a>
            <ul class="dropdown-content">
              <li><a href="nuestra-historia.html">Nuestra Historia y Filosofia</a></li>
              <li><a href="infraestructura.html">Infraestructura</a></li>
              <li><a href="normatividad.html">Normativida</a></li>
              <li><a href="organigrama.html">Organigrama</a></li>
              <li><a href="#">Directorio</a></li>
              <li><a href="consejos-tecnicos.html">Consejos Tecnicos</a></li>
            </ul>
          </li>

          <li class="dropdown">
            <a href="#">Oferta educativa</a>
            <ul class="dropdown-content">
              <li><a href="artes-visuales.html">Artes Visuales</a></li>
              <li><a href="diseno-arte-multimedia.html">Diseño y Arte Multimedia</a></li>
              <li><a href="fotografia-produccion-video.html">Fotografía y Produccion de Video</a></li>
            </ul>
          </li>

          <li class="dropdown">
            <a href="#">Departamentos</a>
            <ul class="dropdown-content">
              <li><a href="servicio-social.html">Servicio social</a></li>
              <li><a href="control-escolar.html">Control escolar</a></li>
              <li><a href="biblioteca.html">Biblioteca</a></li>
              <li><a href="vinculacion.html">Vinculación</a></li>
              <li><a href="computo.html">Laboratorio de computo</a></li>
              <li><a href="taller-escultura.html">Taller de escultura</a></li>
              <li><a href="taller-grabado.html">Taller de grabado</a></li>
              <li><a href="secretaria-academica.html">Secretaria académica</a></li>
              <li><a href="#">Coordinaciones de carreras</a></li>
              <li><a href="secretaria-administrativa.html">Secretaria administrativa</a></li>
              <li><a href="ADIUAS.html">ADIUAS</a></li>
            </ul>
          </li>

          <li class="dropdown">
            <a href="#">Difusion</a>
            <ul class="dropdown-content">
              <li><a href="eventos.html">Eventos</a></li>
              <li><a href="noticias.html">Noticias</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="logoEscuelaNavbar">
        <img src="images/logoEscuelaIFooter.png" alt="Logo Escuela" />
      </div>
    </nav>
  </header>
`;

function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const dropdowns = document.querySelectorAll('.dropdown');

    // VALIDACION - Verificar que los elementos existen
    if (!hamburger || !menu || !overlay) {
      console.error('Error: No se encontraron los elementos necesarios');
      console.log('hamburger: ', hamburger);
      console.log('menu: ', menu);
      console.log('overlay: ', overlay);
      return;
    }

    console.log('Elementos encontrados correctamente');
    
    // Toggle menu hamburguersa
    hamburger.addEventListener('click', function() {
      console.log('Click en hamburguesa');
      hamburger.classList.toggle('active');
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Cerrar menu al hacer click en overlay
    overlay.addEventListener('click', function() {
      console.log('Click en overlay');
      hamburger.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Toogle dropdowns en movil
    dropdowns.forEach(function(dropdown) {
      const link = dropdown.querySelector('a');
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768){
          e.preventDefault();

          // Cerrar otros dropdowns
          dropdowns.forEach(function(other) {
            if (other !== dropdown) {
              other.classList.remove('active');
            }
          });

          dropdown.classList.toggle('active')
        }
      });
    });

    // Cerrar el menu al hacer click en un enlace
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

    // Resetear todo cuando la ventana se ridemensiona
    window.addEventListener('resize', function() {
      if  (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        dropdowns.forEach(function(dropdown) {
          dropdown.classList.remove('active');
        });
      }
    });
  }

    // Insertar el header e iniacilizar funcionalidad
    document.addEventListener('DOMContentLoaded', function() {
      const headerContainer = document.getElementById('header-container');

      if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        console.log('Header insertado correctamente');

        // Inicializar el menu hamburgesa despues de instertar el HTML
        initHamburgerMenu();
      } else {
        console.error('No se encontro el contenedor del header');
      }
    });
  
