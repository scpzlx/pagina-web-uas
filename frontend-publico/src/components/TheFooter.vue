<template>
  <footer>
    <div class="yellow-top"></div>
    <div class="footer-wrap">
      <div class="footer-top">
        <div class="footer-logos">
          <img src="/images/LogoUas.png" alt="Logo UAS" class="logo-img" />
          <div class="logo-sep"></div>
          <img src="/images/logoEscuelaFooter.png" alt="Logo Escuela" class="logo-img" />
          <div class="logo-sep"></div>
          <img src="/images/logo_uas_futuro.png" alt="UAS vision futuro" class="logo-img" />
        </div>

        <div class="footer-center">
          <div class="uni-name">Universidad Autónoma de Sinaloa</div>
          <div class="uni-subtitle">Sursum Versus</div>
          <div class="social-row">
            <a class="social-btn" href="https://www.facebook.com/profile.php?id=100064772854058" target="_blank"
              rel="noopener noreferrer" aria-label="Facebook">
              <i class="ti ti-brand-facebook"></i>
            </a>
            <a class="social-btn" href="#" aria-label="WhatsApp">
              <i class="ti ti-brand-whatsapp"></i>
            </a>
            <a class="social-btn" href="https://www.instagram.com/edav_uas/" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram">
              <i class="ti ti-brand-instagram"></i>
            </a>
          </div>
        </div>

        <div class="footer-contact">
          <div class="contact-title">Contáctanos</div>
          <address>
            <div class="contact-row">
              <div class="contact-icon-wrap"><i class="ti ti-phone" aria-hidden="true"></i></div>
              <a class="contact-info" href="tel:+526677581400">+52 667 758 1400</a>
            </div>
            <div class="contact-row">
              <div class="contact-icon-wrap"><i class="ti ti-mail" aria-hidden="true"></i></div>
              <a class="contact-info" href="mailto:info@uas.edu.mx">sau.uas@uas.edu.mx</a>
            </div>
            <div class="contact-row">
              <div class="contact-icon-wrap"><i class="ti ti-map-pin" aria-hidden="true"></i></div>
              <a class="contact-info" href="https://maps.app.goo.gl/SuGR9hH1BfbpKvx2A" target="_blank"
                rel="noopener noreferrer">
                Blvd. Francisco Labastida Ochoa <br />
                Tres Ríos, Culiacán, Sinaloa - 80020
              </a>
            </div>
          </address>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2025 Facultad de Artes — Universidad Autónoma de Sinaloa</span>
        <span>Todos los derechos reservados</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

* {
  box-sizing: border-box;
}

.yellow-top {
  height: 3px;
  background: #ffd500;
}

.footer-wrap {
  font-family: 'Outfit', sans-serif;
  background: #0f1a8c;
  color: white;
  padding: 40px 48px 24px;
}

.footer-top {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 48px;
  align-items: start;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.footer-logos {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 12px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.2s;
}

.logo-img:hover {
  background: rgba(255, 255, 255, 0.18);
}

.logo-sep {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  margin: 0 4px;
}

.footer-center {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.uni-name {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
  margin-bottom: 2px;
}

.uni-subtitle {
  font-size: 13px;
  font-style: italic;
  opacity: 0.65;
  margin-bottom: 20px;
}

.social-row {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.social-btn {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  color: white;
  font-size: 16px;
}

.social-btn:hover {
  background: #ffd500;
  color: #0f1a8c;
  transform: translateY(-2px);
}

.footer-contact {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  padding-left: 40px;
}

.contact-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ffd500;
  margin-bottom: 16px;
}

.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  transition: transform 0.2s;
}

.contact-row:hover {
  transform: translateX(4px);
}

.contact-icon-wrap {
  width: 32px;
  height: 32px;
  background: rgba(255, 213, 0, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ffd500;
  font-size: 15px;
}

address {
  font-style: normal;
}

.contact-info {
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.85;
  color: white;
  text-decoration: none;
  padding-top: 6px;
}

.contact-info:hover {
  opacity: 1;
  text-decoration: underline;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  font-size: 12px;
  opacity: 0.45;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-logos {
    justify-content: center;
  }

  .footer-contact {
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    padding-left: 0;
    padding-top: 24px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 6px;
    text-align: center;
  }

  .footer-wrap {
    padding: 32px 24px 20px;
  }
}
</style>