// Site access gate — PIN verified via SHA-256 (plain PIN never stored in repo)
(function() {
    var GATE_STORAGE_KEY = 'dietAppGateV2';
    var GATE_SALT = 'crespofit_gate_v1';
    var GATE_HASH = 'd71409f5ab6d20ff93870f390b7377f8884eddd9f1f6416abd5b13968fa5679b';
    var GATE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

    var appInitCallback = null;
    var gateUiReady = false;
    var pinUiReady = false;

    function bufferToHex(buf) {
        var arr = new Uint8Array(buf);
        var hex = '';
        for (var i = 0; i < arr.length; i++) {
            var h = arr[i].toString(16);
            hex += h.length === 1 ? '0' + h : h;
        }
        return hex;
    }

    function hashPin(pin) {
        if (!window.crypto || !window.crypto.subtle) {
            return Promise.reject(new Error('crypto'));
        }
        var payload = pin + '|' + GATE_SALT;
        return crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload)).then(bufferToHex);
    }

    function readGateSession() {
        try {
            var raw = localStorage.getItem(GATE_STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    }

    function clearGateSession() {
        try {
            localStorage.removeItem(GATE_STORAGE_KEY);
            localStorage.removeItem('dietAppGateV1');
        } catch (e) {}
    }

    function isSiteGateUnlocked() {
        try {
            var data = readGateSession();
            if (!data || data.h !== GATE_HASH || !data.exp) {
                clearGateSession();
                return false;
            }
            if (Date.now() > data.exp) {
                clearGateSession();
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function unlockSiteGate() {
        try {
            localStorage.setItem(GATE_STORAGE_KEY, JSON.stringify({
                h: GATE_HASH,
                exp: Date.now() + GATE_TTL_MS
            }));
            localStorage.removeItem('dietAppGateV1');
        } catch (e) {}
    }

    function hideSiteGate() {
        var gate = document.getElementById('site-gate');
        if (gate) {
            gate.classList.add('site-gate-hidden');
            gate.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('site-gate-active');
    }

    function showSiteGate() {
        var gate = document.getElementById('site-gate');
        if (gate) {
            gate.classList.remove('site-gate-hidden');
            gate.setAttribute('aria-hidden', 'false');
        }
        document.body.classList.add('site-gate-active');
    }

    function showPinModal() {
        var overlay = document.getElementById('site-gate-pin');
        var input = document.getElementById('site-gate-pin-input');
        var err = document.getElementById('site-gate-pin-error');
        if (!overlay || !input) return;
        if (err) err.textContent = '';
        input.value = '';
        overlay.classList.add('is-open');
        overlay.removeAttribute('hidden');
        overlay.setAttribute('aria-hidden', 'false');
        overlay.style.setProperty('display', 'flex', 'important');
        overlay.style.setProperty('z-index', '100000', 'important');
        setTimeout(function() {
            try { input.focus({ preventScroll: true }); } catch (e) { input.focus(); }
        }, 50);
    }

    function hidePinModal() {
        var overlay = document.getElementById('site-gate-pin');
        if (!overlay) return;
        overlay.classList.remove('is-open');
        overlay.setAttribute('hidden', 'hidden');
        overlay.setAttribute('aria-hidden', 'true');
        overlay.style.removeProperty('display');
        overlay.style.removeProperty('z-index');
    }

    function showPinError(msg) {
        var err = document.getElementById('site-gate-pin-error');
        var input = document.getElementById('site-gate-pin-input');
        if (err) err.textContent = msg;
        if (input) {
            input.classList.add('site-gate-pin-shake');
            setTimeout(function() { input.classList.remove('site-gate-pin-shake'); }, 450);
        }
    }

    function finishUnlock() {
        unlockSiteGate();
        hidePinModal();
        hideSiteGate();
        if (typeof appInitCallback === 'function') appInitCallback();
    }

    function verifyPin() {
        var input = document.getElementById('site-gate-pin-input');
        if (!input) return;
        var pin = input.value.trim();
        if (!pin) {
            showPinError('Introduce el PIN.');
            return;
        }
        hashPin(pin).then(function(digest) {
            if (digest === GATE_HASH) finishUnlock();
            else {
                showPinError('PIN incorrecto.');
                input.value = '';
                input.focus();
            }
        }).catch(function() {
            showPinError('No se pudo verificar el PIN en este navegador.');
        });
    }

    function openPinFromAdmin(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        showPinModal();
    }

    function bindPinModalUi() {
        if (pinUiReady) return;
        pinUiReady = true;

        var cancelBtn = document.getElementById('site-gate-pin-cancel');
        var submitBtn = document.getElementById('site-gate-pin-submit');
        var pinInput = document.getElementById('site-gate-pin-input');
        var overlay = document.getElementById('site-gate-pin');

        if (cancelBtn) cancelBtn.addEventListener('click', hidePinModal);
        if (submitBtn) submitBtn.addEventListener('click', verifyPin);
        if (pinInput) {
            pinInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') verifyPin();
                if (e.key === 'Escape') hidePinModal();
            });
        }
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) hidePinModal();
            });
        }
    }

    function initGateUi() {
        if (gateUiReady) return;
        gateUiReady = true;

        showSiteGate();
        bindPinModalUi();

        var adminBtn = document.getElementById('site-gate-admin-btn');
        if (adminBtn) {
            adminBtn.addEventListener('click', openPinFromAdmin);
        }
    }

    function setupSiteGate(onUnlock) {
        appInitCallback = onUnlock;
        if (isSiteGateUnlocked()) {
            hideSiteGate();
            if (typeof onUnlock === 'function') onUnlock();
        } else {
            initGateUi();
        }
    }

    function bootstrapGate() {
        bindPinModalUi();
        if (isSiteGateUnlocked()) {
            hideSiteGate();
        } else {
            initGateUi();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootstrapGate);
    } else {
        bootstrapGate();
    }

    window.isSiteGateUnlocked = isSiteGateUnlocked;
    window.setupSiteGate = setupSiteGate;
    window.hideSiteGate = hideSiteGate;
})();
