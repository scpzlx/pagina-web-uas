/* ============================================================
   ADMIN SHELL - logica compartida
   - Toggle sidebar mobile
   - Marcar item activo
   - Logout centralizado
   - Fecha en topbar
   ============================================================ */
(function () {
    'use strict';

    /* ---- Marcar nav item activo segun la pagina actual ---- */
    function markActiveNavItem() {
        var path = window.location.pathname.split('/').pop() || 'dashboard.html';
        var items = document.querySelectorAll('.admin-sidebar .nav-item[data-page]');
        items.forEach(function (item) {
            if (item.getAttribute('data-page') === path) {
                item.classList.add('is-active');
                item.setAttribute('aria-current', 'page');
            } else {
                item.classList.remove('is-active');
                item.removeAttribute('aria-current');
            }
        });
    }

    /* ---- Sidebar toggle (mobile) ---- */
    function setupSidebarToggle() {
        var sidebar = document.querySelector('.admin-sidebar');
        var toggle = document.querySelector('.sidebar-toggle');
        if (!sidebar || !toggle) return;

        var backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);

        function open() {
            sidebar.classList.add('is-open');
            backdrop.classList.add('is-open');
        }
        function close() {
            sidebar.classList.remove('is-open');
            backdrop.classList.remove('is-open');
        }

        toggle.addEventListener('click', function () {
            if (sidebar.classList.contains('is-open')) close();
            else open();
        });

        backdrop.addEventListener('click', close);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') close();
        });

        sidebar.querySelectorAll('a.nav-item').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 768) close();
            });
        });
    }

    /* ---- Fecha en topbar ---- */
    function setTopbarDate() {
        var el = document.getElementById('topbarDate');
        if (!el) return;
        var d = new Date();
        try {
            el.textContent = d.toLocaleDateString('es-MX', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch (e) {
            el.textContent = d.toDateString();
        }
    }

    /* ---- Logout global ---- */
    window.logout = function () {
        if (!confirm('Deseas cerrar sesion?')) return;
        try {
            var formData = new FormData();
            formData.append('action', 'logout');
            fetch('api/auth.php', {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            }).finally(function () {
                window.location.href = 'login.html';
            });
        } catch (e) {
            window.location.href = 'login.html';
        }
    };

    /* ---- Init ---- */
    document.addEventListener('DOMContentLoaded', function () {
        markActiveNavItem();
        setupSidebarToggle();
        setTopbarDate();
    });
})();
