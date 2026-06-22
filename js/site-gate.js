// Site access gate — PIN verified via SHA-256 (plain PIN never stored in repo)
(function() {
    var GATE_STORAGE_KEY = 'dietAppGateV2';
    var GATE_SALT = 'crespofit_gate_v1';
    var GATE_HASH = 'd71409f5ab6d20ff93870f390b7377f8884eddd9f1f6416abd5b13968fa5679b';
    var GATE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
    var LONG_PRESS_MS = 650;
    var TRIPLE_CLICK_MS = 1500;

    var appInitCallback = null;
    var gateUiReady = false;

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
        setTimeout(function() { input.focus(); }, 50);
    }

    function hidePinModal() {
        var overlay = document.getElementById('site-gate-pin');
        if (overlay) overlay.classList.remove('is-open');
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

    function bindUnlockTrigger(el) {
        if (!el || el.dataset.gateBound === '1') return;
        el.dataset.gateBound = '1';

        var clickCount = 0;
        var clickTimer = null;
        var longPressTimer = null;
        var longPressDone = false;
        var lastTouchAt = 0;

        function resetClicks() {
            clickCount = 0;
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
            }
        }

        function registerClick() {
            clickCount++;
            if (clickTimer) clearTimeout(clickTimer);
            el.classList.add('site-gate-icon-pulse');
            setTimeout(function() { el.classList.remove('site-gate-icon-pulse'); }, 120);
            if (clickCount >= 3) {
                resetClicks();
                showPinModal();
                return;
            }
            clickTimer = setTimeout(resetClicks, TRIPLE_CLICK_MS);
        }

        el.addEventListener('touchstart', function() {
            lastTouchAt = Date.now();
            longPressDone = false;
            if (longPressTimer) clearTimeout(longPressTimer);
            longPressTimer = setTimeout(function() {
                longPressTimer = null;
                longPressDone = true;
                resetClicks();
                showPinModal();
            }, LONG_PRESS_MS);
        }, { passive: true });

        el.addEventListener('touchmove', function() {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });

        el.addEventListener('touchend', function() {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        });

        el.addEventListener('mouseup', function(e) {
            if (e.button !== 0) return;
            if (Date.now() - lastTouchAt < 400) return;
            if (longPressDone) {
                longPressDone = false;
                return;
            }
            registerClick();
        });

        el.addEventListener('click', function(e) {
            if (longPressDone) {
                e.preventDefault();
                longPressDone = false;
            }
        });
    }

    function initGateUi() {
        if (gateUiReady) return;
        gateUiReady = true;

        showSiteGate();

        var icon = document.getElementById('site-gate-icon');
        var card = document.getElementById('site-gate-card');
        bindUnlockTrigger(icon);
        if (card && card !== icon) {
            // Solo long-press en tarjeta; clics en PC van al emoji para no contar doble
            if (card.dataset.gateBound !== '1') {
                card.dataset.gateBound = '1';
                var lpTimer = null;
                card.addEventListener('touchstart', function() {
                    if (lpTimer) clearTimeout(lpTimer);
                    lpTimer = setTimeout(function() {
                        lpTimer = null;
                        showPinModal();
                    }, LONG_PRESS_MS);
                }, { passive: true });
                card.addEventListener('touchmove', function() {
                    if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; }
                });
                card.addEventListener('touchend', function() {
                    if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; }
                });
            }
        }

        var cancelBtn = document.getElementById('site-gate-pin-cancel');
        var submitBtn = document.getElementById('site-gate-pin-submit');
        var pinInput = document.getElementById('site-gate-pin-input');

        if (cancelBtn) cancelBtn.addEventListener('click', hidePinModal);
        if (submitBtn) submitBtn.addEventListener('click', verifyPin);
        if (pinInput) {
            pinInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') verifyPin();
                if (e.key === 'Escape') hidePinModal();
            });
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

    window.isSiteGateUnlocked = isSiteGateUnlocked;
    window.setupSiteGate = setupSiteGate;
    window.hideSiteGate = hideSiteGate;
})();
