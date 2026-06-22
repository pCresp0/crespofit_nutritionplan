// Site access gate — PIN verified via SHA-256 (plain PIN never stored in repo)
(function() {
    var GATE_STORAGE_KEY = 'dietAppGateV2';
    var GATE_SALT = 'crespofit_gate_v1';
    // SHA-256(salt-applied PIN) — regenerate only if PIN changes
    var GATE_HASH = 'd71409f5ab6d20ff93870f390b7377f8884eddd9f1f6416abd5b13968fa5679b';
    var GATE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
    var LONG_PRESS_MS = 700;
    var TRIPLE_CLICK_MS = 900;

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

    function showPinModal() {
        var overlay = document.getElementById('site-gate-pin');
        var input = document.getElementById('site-gate-pin-input');
        var err = document.getElementById('site-gate-pin-error');
        if (!overlay || !input) return;
        err.textContent = '';
        input.value = '';
        overlay.style.display = '';
        setTimeout(function() { input.focus(); }, 80);
    }

    function hidePinModal() {
        var overlay = document.getElementById('site-gate-pin');
        if (overlay) overlay.style.display = 'none';
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

    function verifyPinAndUnlock(onUnlock) {
        var input = document.getElementById('site-gate-pin-input');
        if (!input) return;
        var pin = input.value.trim();
        if (!pin) {
            showPinError('Introduce el PIN.');
            return;
        }
        hashPin(pin).then(function(digest) {
            if (digest === GATE_HASH) {
                unlockSiteGate();
                hidePinModal();
                hideSiteGate();
                if (typeof onUnlock === 'function') onUnlock();
            } else {
                showPinError('PIN incorrecto.');
                input.value = '';
                input.focus();
            }
        }).catch(function() {
            showPinError('No se pudo verificar el PIN en este navegador.');
        });
    }

    function bindLongPress(el, onLongPress) {
        var timer = null;
        var triggered = false;
        function clear() {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }
        el.addEventListener('touchstart', function() {
            triggered = false;
            clear();
            timer = setTimeout(function() {
                timer = null;
                triggered = true;
                onLongPress();
            }, LONG_PRESS_MS);
        }, { passive: true });
        el.addEventListener('touchend', clear);
        el.addEventListener('touchmove', clear);
        el.addEventListener('touchcancel', clear);
        el.addEventListener('click', function(e) {
            if (triggered) {
                e.preventDefault();
                triggered = false;
            }
        });
    }

    function bindTripleClick(el, onTriple) {
        var count = 0;
        var resetTimer = null;
        el.addEventListener('click', function(e) {
            if (e.detail === 0) return;
            count++;
            if (resetTimer) clearTimeout(resetTimer);
            if (count >= 3) {
                count = 0;
                e.preventDefault();
                onTriple();
                return;
            }
            resetTimer = setTimeout(function() {
                count = 0;
                resetTimer = null;
            }, TRIPLE_CLICK_MS);
        });
    }

    function bindSecretTrigger(el) {
        bindLongPress(el, showPinModal);
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            bindTripleClick(el, showPinModal);
        }
    }

    function setupSiteGate(onUnlock) {
        var gate = document.getElementById('site-gate');
        if (!gate) {
            if (typeof onUnlock === 'function') onUnlock();
            return;
        }
        gate.classList.remove('site-gate-hidden');
        gate.setAttribute('aria-hidden', 'false');
        document.body.classList.add('site-gate-active');

        var icon = document.getElementById('site-gate-icon');
        if (icon) bindSecretTrigger(icon);

        var cancelBtn = document.getElementById('site-gate-pin-cancel');
        var submitBtn = document.getElementById('site-gate-pin-submit');
        var pinInput = document.getElementById('site-gate-pin-input');

        if (cancelBtn) cancelBtn.addEventListener('click', hidePinModal);
        if (submitBtn) submitBtn.addEventListener('click', function() { verifyPinAndUnlock(onUnlock); });
        if (pinInput) {
            pinInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') verifyPinAndUnlock(onUnlock);
                if (e.key === 'Escape') hidePinModal();
            });
        }
    }

    window.isSiteGateUnlocked = isSiteGateUnlocked;
    window.setupSiteGate = setupSiteGate;
})();
