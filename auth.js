(function () {
    'use strict';

    let authMode = 'register';
    let hasBeenShown = false;
    let dismissed = false;
    const SCROLL_TRIGGER_PX = 800;
    const STORAGE_KEY = 'nails1_auth_dismissed';

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

    function openAuthFromMenu() {
        if (typeof window.closeMenu === 'function') {
            window.closeMenu();
        }
        sessionStorage.removeItem(STORAGE_KEY);
        dismissed = false;
        openAuth();
    }

    function toggleAuthMode() {
        authMode = (authMode === 'register') ? 'login' : 'register';
        applyAuthMode();
    }

    function applyAuthMode() {
        const title = document.getElementById('authTitle');
        const subtitle = document.getElementById('authSubtitle');
        const nameGroup = document.getElementById('nameGroup');
        const professionalGroup = document.getElementById('professionalGroup');
        const submitBtn = document.getElementById('authSubmitBtn');
        const switchText = document.getElementById('authSwitchText');
        const switchBtn = document.getElementById('authSwitchBtn');
        const passwordInput = document.getElementById('authPassword');

        if (!title) return;

        if (authMode === 'register') {
            title.textContent = 'Csatlakozz hozzánk';
            subtitle.textContent = 'Regisztrálj, hogy elmenthesd kedvenc inspirációidat, és személyre szabott ajánlásokat kapj.';
            nameGroup.classList.remove('hidden');
            professionalGroup.classList.remove('hidden');
            submitBtn.textContent = 'Regisztráció';
            switchText.textContent = 'Már van fiókod?';
            switchBtn.textContent = 'Belépés';
            passwordInput.setAttribute('autocomplete', 'new-password');
        } else {
            title.textContent = 'Üdv újra!';
            subtitle.textContent = 'Lépj be, és folytasd ott, ahol abbahagytad.';
            nameGroup.classList.add('hidden');
            professionalGroup.classList.add('hidden');
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
            const accountTypeInput = document.querySelector('input[name="accountType"]:checked');
            if (!accountTypeInput) {
                alert('Kérlek válaszd ki, hogy vendégként vagy szolgáltatóként regisztrálsz!');
                return;
            }
            const accountType = accountTypeInput.value;
            const isProfessional = accountType === 'professional';

            console.log('Regisztráció:', { name, email, password, accountType, isProfessional });
        } else {
            console.log('Belépés:', { email, password });
        }
    }

    function socialAuth(provider) {
        console.log('Social auth:', provider);
    }

    function onScroll() {
        if (hasBeenShown || dismissed) return;
        if (window.scrollY >= SCROLL_TRIGGER_PX) {
            openAuth();
        }
    }

    window.openAuth = openAuth;
    window.closeAuth = closeAuth;
    window.openAuthFromMenu = openAuthFromMenu;
    window.toggleAuthMode = toggleAuthMode;
    window.handleAuthSubmit = handleAuthSubmit;
    window.socialAuth = socialAuth;

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('DOMContentLoaded', applyAuthMode);
})();
