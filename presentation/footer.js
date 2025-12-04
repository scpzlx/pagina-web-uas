const footerHTML = `
    <footer class="footer">
    <section class="footer-left">
      <img src="images/LogoUas.png" alt="Logo UAS" class="logoUas" />
      <img src="images/logoEscuelaIFooter.png" alt="Logo Secundario" class="logoEscuela" />
      <img src="images/logo_uas_futuro.png" alt="UAS visión futuro" class="logoFuturo">
    </section>

    <section class="footer-center">
      <h3 class="university-name">Universidad Autónoma de Sinaloa</h3>
      <p class="university-subtitle">Sursum Versus</p>
      <div class="social-icons">
        <a class="social-icon" href="https://www.facebook.com/profile.php?id=100064772854058&locale=es_LA"
          target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src="images/facebook.svg" alt="Facebook de la Universidad Autónoma de Sinaloa" />
        </a>
        <a class="social-icon" href="#" aria-label="WhatsApp">
          <img src="images/whatsapp.svg" alt="WhatsApp de la Universidad Autónoma de Sinaloa" />
        </a>
        <a class="social-icon" href="https://www.instagram.com/edav_uas/" aria-label="Instagram" target="_blank">
          <img src="images/ig.svg" alt="Instagram de la Universidad Autónoma de Sinaloa" />
        </a>
      </div>
    </section>

    <section class="footer-right">
      <h2 class="contact-title">Contáctanos</h2>
      <address>
        <div class="contact-item">
          <div class="contact-icon">
            <img src="images/telefono.svg" alt="Teléfono" />
          </div>
          <a class="contact-text" href="tel:+526677581400" aria-label="Llamar al +52 667 758 1400">+52 667 758 1400</a>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <img src="images/correo.svg" alt="Email" />
          </div>
          <a class="contact-text" href="mailto:sau.uas@uas.edu.mx"
            aria-label="Enviar correo a sau.uas@uas.edu.mx">sau.uas@uas.edu.mx</a>
        </div>

        <div class="contact-item">
          <div class="contact-icon">
            <img src="images/ubicacion.svg" alt="Ubicación" />
          </div>
          <a class="contact-text" href="https://maps.app.goo.gl/SuGR9hH1BfbpKvx2A" target="_blank"
            rel="noopener noreferrer">
            Blvd. Francisco Labastida Ochoa<br />
            Desarrollo Urbano Tres Ríos<br />
            Culiacán, Sinaloa - 80020
          </a>
        </div>
      </address>
    </section>
  </footer>
`;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('footer-container').innerHTML = footerHTML;
});