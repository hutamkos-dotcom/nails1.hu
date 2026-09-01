(function () {
    'use strict';

    let authMode = 'register'; // 'register' | 'login'
    let hasBeenShown = false;
    let dismissed = false;
    const SCROLL_TRIGGER_PX = 800; // ennyi px scroll után jelenik meg
    const STORAGE_KEY = 'nails1_auth_dismissed';

    // Ha korábban már bezárta a session-ben
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        dismissed = true;
    }

    function openAuth() {
        const modal = document.getElementById('authModal');
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        hasBeenShown = true;
    }

    function closeAuth() {
        const modal = document.getElementById('authModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        dismissed = true;
        sessionStorage.setItem(STORAGE_KEY, '1');
    }

    function toggleAuthMode() {
        authMode = (authMode === 'register') ? 'login' : 'register';
        applyAuthMode();
    }

    function applyAuthMode() {
        const title = document.getElementById('authTitle');
        const subtitle = document.getElementById('authSubtitle');
        const nameGroup = document.getElementById('nameGroup');
        const submitBtn = document.getElementById('authSubmitBtn');
        const switchText = document.getElementById('authSwitchText');
        const switchBtn = document.getElementById('authSwitchBtn');
        const passwordInput = document.getElementById('authPassword');

        if (authMode === 'register') {
            title.textContent = 'Csatlakozz hozzánk';
            subtitle.textContent = 'Regisztrálj, hogy elmenthesd kedvenc inspirációidat, és személyre szabott ajánlásokat kapj.';
            nameGroup.classList.remove('hidden');
            submitBtn.textContent = 'Regisztráció';
            switchText.textContent = 'Már van fiókod?';
            switchBtn.textContent = 'Belépés';
            passwordInput.setAttribute('autocomplete', 'new-password');
        } else {
            title.textContent = 'Üdv újra!';
            subtitle.textContent = 'Lépj be, és folytasd ott, ahol abbahagytad.';
            nameGroup.classList.add('hidden');
            submitBtn.textContent = 'Belépés';
            switchText.textContent = 'Még nincs fiókod?';
            switchBtn.textContent = 'Regisztráció';
            passwordInput.setAttribute('autocomplete', 'current-password');
        }
    }

    function handleAuthSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('authEmail').value.trim();
        const password = document.getElementById('authPassword').value;
        const name = document.getElementById('authName').value.trim();

        if (authMode === 'register') {
            console.log('Regisztráció:', { name, email, password });
            // ide jön a regisztrációs API hívás
        } else {
            console.log('Belépés:', { email, password });
            // ide jön a login API hívás
        }
    }

    function socialAuth(provider) {
        console.log('Social auth:', provider);
        // ide jön a Google / Facebook OAuth logika
        // pl. window.location.href = '/auth/' + provider;
    }

    function onScroll() {
        if (hasBeenShown || dismissed) return;
        if (window.scrollY >= SCROLL_TRIGGER_PX) {
            openAuth();
        }
    }

    // Globális elérés a HTML onclick-ekhez
    window.closeAuth = closeAuth;
    window.toggleAuthMode = toggleAuthMode;
    window.handleAuthSubmit = handleAuthSubmit;
    window.socialAuth = socialAuth;
    window.openAuth = openAuth; // opcionálisan manuálisan is nyitható

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('DOMContentLoaded', applyAuthMode);
})();
