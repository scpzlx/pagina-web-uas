const headerHTML = `
    <header>
    <nav class="navbar">
      <div class="logoUas">
        <img src="images/LogoUas.png" alt="UAS logo" />
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
              <li><a href="#">Nuestra Historia y Filosofia</a></li>
              <li><a href="#">Infraestructura</a></li>
              <li><a href="#">Normativa</a></li>
              <li><a href="organigrama.html">Organigrama</a></li>
              <li><a href="#">Directorio</a></li>
              <li><a href="#">Consejos Tecnicos</a></li>
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
              <li><a href="#">Servicio social</a></li>
              <li><a href="#">Control escolar</a></li>
              <li><a href="biblioteca.html">Biblioteca</a></li>
              <li><a href="#">Vinculación</a></li>
              <li><a href="#">Difusion cultural</a></li>
              <li><a href="computo.html">Laboratorio de computo</a></li>
              <li><a href="taller-escultura.html">Taller de escultura</a></li>
              <li><a href="taller-grabado.html">Taller de grabado</a></li>
              <li><a href="#">Secretaria académica</a></li>
              <li><a href="#">Coordinaciones de carreras</a></li>
              <li><a href="#">Secretaria administrativa</a></li>
              <li><a href="#">ADIUAS</a></li>
            </ul>
          </li>

          <li class="dropdown">
            <a href="#">Difusion</a>
            <ul class="dropdown-content">
              <li><a href="#">Eventos</a></li>
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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('header-container').innerHTML = headerHTML;
});