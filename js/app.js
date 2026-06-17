// ============================================================
// DIET DATA - Base amounts for 2500 kcal
// ============================================================
const BASE_KCAL = 2500;

// Template: {number} will be replaced with scaled value
const breakfastOptions = [
    {
        id: 'yogur-qfb',
        name: 'Yogur de proteínas / QFB con cereales',
        items: [
            { text: 'Corn flakes / cereales sin azúcar', amount: 55, unit: 'g' },
            { text: 'Queso fresco batido', amount: 500, unit: 'g' },
            { text: 'Yogur 2% + proteína', amount: 200, unit: 'g', extra: '+ {10}g prot', extraBase: 10, isAlt: true },
            { text: 'Frutos secos / crema de cacahuete', amount: 25, unit: 'g' }
        ]
    },
    {
        id: 'tostadas',
        name: 'Tostadas',
        items: [
            { text: 'Pan integral trigo/espelta/centeno', amount: 120, unit: 'g' },
            { text: 'Lomo', amount: 50, unit: 'g', extra: '+ {30}g queso semi/havarti light', extraBase: 30 },
            { text: 'Guacamole o aguacate', amount: 40, unit: 'g' }
        ]
    },
    {
        id: 'cereales-leche',
        name: 'Cereales con leche y proteína',
        items: [
            { text: 'Corn flakes / cereales sin azúcar', amount: 45, unit: 'g' },
            { text: 'Leche semi (un vaso)', amount: 200, unit: 'ml' },
            { text: 'Whey protein', amount: 25, unit: 'g' },
            { text: 'Frutos secos / crema de cacahuete', amount: 25, unit: 'g' }
        ]
    },
    {
        id: 'tortitas',
        name: 'Tortitas de avena',
        items: [
            { text: 'Harina de avena / copos de avena', amount: 45, unit: 'g' },
            { text: '2 Huevos + claras', amount: 100, unit: 'g' },
            { text: 'Frutos secos / crema de cacahuete', amount: 10, unit: 'g' }
        ]
    },
    {
        id: 'yogures-proteicos',
        name: 'Yogures proteicos',
        items: [
            { text: '2 yogures proteicos LIDL', amount: null, unit: '' },
            { text: 'Cereales', amount: 15, unit: 'g' },
            { text: 'Miel', amount: 20, unit: 'g' },
            { text: 'Frutos secos', amount: 15, unit: 'g' },
            { text: 'Zumo de naranja', amount: 200, unit: 'ml' }
        ]
    },
    {
        id: 'bocadillo',
        name: 'Bocadillo de pollo/pavo y queso/guacamole',
        items: [
            { text: 'Pan integral trigo/espelta/centeno', amount: 120, unit: 'g' },
            { text: 'Pollo / Pavo', amount: 100, unit: 'g' },
            { text: 'Queso', amount: 60, unit: 'g', extra: 'ó {80}g guacamole', extraBase: 80 }
        ]
    }
];

const lunchCarbs = [
    { name: 'Arroz blanco', base: 130 },
    { name: 'Patata boniato', base: 590, altName: 'Precongelada', altBase: 370 },
    { name: 'Tortitas de arroz', base: 130 },
    { name: 'Pasta', base: 130 },
    { name: 'Pan', base: 180 },
    { name: 'Quinoa', base: 130 },
    { name: 'Cus-cus', base: 130 },
    { name: 'Gnocchis de patata', base: 260 },
    { name: 'Legumbres cocidas', base: 450 }
];

const lunchProteins = [
    { name: 'Pollo', base: 200 },
    { name: 'Pescado blanco', base: 250 },
    { name: 'Salmón', base: 125 },
    { name: 'Pavo', base: 220 },
    { name: 'Hamburguesa de pollo', base: 180 },
    { name: 'Huevo (2 completos) + claras', base: 100, unit: 'ml claras' },
    { name: 'Lomo adobado', base: 200 },
    { name: 'Ternera', base: 160 }
];

const dinnerCarbs = [
    { name: 'Arroz blanco', base: 100 },
    { name: 'Patata boniato', base: 450, altName: 'Precongelada', altBase: 300 },
    { name: 'Tortitas de arroz', base: 100 },
    { name: 'Pasta', base: 100 },
    { name: 'Pan', base: 140 },
    { name: 'Quinoa', base: 100 },
    { name: 'Cus-cus', base: 100 },
    { name: 'Gnocchis de patata', base: 200 },
    { name: 'Legumbres cocidas', base: 350 }
];

const dinnerProteins = [
    { name: 'Pollo', base: 200 },
    { name: 'Pescado blanco', base: 250 },
    { name: 'Pavo', base: 220 },
    { name: 'Hamburguesa de pollo', base: 180 },
    { name: 'Huevo (2 yemas) + claras', base: 100, unit: 'ml claras' },
    { name: 'Lomo adobado', base: 200 },
    { name: 'Ternera', base: 160 }
];

const supplements = [
    { icon: '💪', title: 'Creatina', desc: '8g todos los días' },
    { icon: '🐟', title: 'Omega 3', desc: '2 pastillas (1 desayuno + 1 comida)' },
    { icon: '🧲', title: 'Magnesio y Zinc', desc: '2 pastillas pre cama' },
    { icon: '😴', title: 'Melatonina', desc: 'Opcional, para favorecer el descanso' }
];

// ============================================================
// STATE
// ============================================================
let currentKcal = 2500;
let selections = {
    breakfast: null,
    lunchCarb: null,
    lunchProtein: null,
    dinnerCarb: null,
    dinnerProtein: null
};

// ============================================================
// SCALING
// ============================================================
function getRatio() {
    return currentKcal / BASE_KCAL;
}

function scaleAmount(base, ratio) {
    if (base === null || base === undefined) return null;
    const scaled = base * (ratio !== undefined ? ratio : getRatio());
    if (scaled < 10) return Math.round(scaled);
    return Math.round(scaled / 5) * 5;
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderBreakfast() {
    const grid = document.getElementById('breakfast-grid');
    const ratio = getRatio();

    grid.innerHTML = breakfastOptions.map((option, idx) => {
        const isSelected = selections.breakfast === idx;
        const itemsHtml = option.items.map(item => {
            const cls = item.isAlt ? ' class="alt-item"' : '';
            let content = item.text;

            if (item.amount !== null) {
                const scaled = scaleAmount(item.amount, ratio);
                content += ': <span class="amount">' + scaled + item.unit + '</span>';
            }

            if (item.extra) {
                const extraScaled = scaleAmount(item.extraBase, ratio);
                const extraText = item.extra.replace(/\{(\d+)\}/, extraScaled);
                content += ' <span style="color:#999">' + extraText + '</span>';
            }

            return '<li' + cls + '>' + content + '</li>';
        }).join('');

        return '<div class="breakfast-card' + (isSelected ? ' selected' : '') + '" data-index="' + idx + '">' +
            '<div class="breakfast-card-title">' + option.name + '</div>' +
            '<ul class="breakfast-card-items">' + itemsHtml + '</ul>' +
            '</div>';
    }).join('');
}

function renderMealTable(containerId, carbsData, proteinsData, carbSelection, proteinSelection, mealType) {
    const container = document.getElementById(containerId);
    const ratio = getRatio();

    const carbsRows = carbsData.map((item, idx) => {
        const isSelected = carbSelection === idx;
        const scaled = scaleAmount(item.base, ratio);
        const unit = item.unit || 'g';
        let row = '<tr class="' + (isSelected ? 'selected' : '') + '" data-meal="' + mealType + '" data-type="carb" data-index="' + idx + '">' +
            '<td>' + item.name + '</td>' +
            '<td>' + scaled + unit + '</td>' +
            '</tr>';

        if (item.altName) {
            const altScaled = scaleAmount(item.altBase, ratio);
            row += '<tr class="sub-row ' + (isSelected ? 'selected' : '') + '" data-meal="' + mealType + '" data-type="carb" data-index="' + idx + '">' +
                '<td>' + item.altName + '</td>' +
                '<td>' + altScaled + unit + '</td>' +
                '</tr>';
        }
        return row;
    }).join('');

    const proteinRows = proteinsData.map((item, idx) => {
        const isSelected = proteinSelection === idx;
        const scaled = scaleAmount(item.base, ratio);
        const unit = item.unit || 'g';
        return '<tr class="' + (isSelected ? 'selected' : '') + '" data-meal="' + mealType + '" data-type="protein" data-index="' + idx + '">' +
            '<td>' + item.name + '</td>' +
            '<td>' + scaled + unit + '</td>' +
            '</tr>';
    }).join('');

    const noteText = mealType === 'lunch' || mealType === 'dinner'
        ? '**Escurrir muy bien las latas de aceite de oliva'
        : '';

    container.innerHTML =
        '<div class="meal-table-wrapper">' +
            '<div class="meal-table-header carbs">Hidratos de Carbono</div>' +
            '<table class="meal-table">' +
                '<thead><tr><th>Alimento</th><th>Gramos</th></tr></thead>' +
                '<tbody>' + carbsRows + '</tbody>' +
            '</table>' +
        '</div>' +
        '<div class="meal-table-wrapper">' +
            '<div class="meal-table-header protein">Proteínas</div>' +
            '<table class="meal-table">' +
                '<thead><tr><th>Alimento</th><th>Gramos</th></tr></thead>' +
                '<tbody>' + proteinRows +
                    '<tr class="note-row"><td colspan="2">' + noteText + '</td></tr>' +
                '</tbody>' +
            '</table>' +
        '</div>';
}

function renderSupplements() {
    const list = document.getElementById('supplements-list');
    list.innerHTML = supplements.map(s =>
        '<div class="supplement-card">' +
            '<span class="supplement-icon">' + s.icon + '</span>' +
            '<div class="supplement-text">' +
                '<strong>' + s.title + '</strong>' +
                s.desc +
            '</div>' +
        '</div>'
    ).join('');
}

function updateExtras() {
    const ratio = getRatio();
    const vegScaled = scaleAmount(200, ratio);
    const oilScaled = scaleAmount(5, ratio);

    document.querySelectorAll('.scaled-veg-lunch, .scaled-veg-dinner').forEach(el => {
        el.textContent = vegScaled;
    });
    document.querySelectorAll('.scaled-oil-lunch, .scaled-oil-dinner').forEach(el => {
        el.textContent = oilScaled;
    });
}

function renderAll() {
    renderBreakfast();
    renderMealTable('lunch-tables', lunchCarbs, lunchProteins, selections.lunchCarb, selections.lunchProtein, 'lunch');
    renderMealTable('dinner-tables', dinnerCarbs, dinnerProteins, selections.dinnerCarb, selections.dinnerProtein, 'dinner');
    renderSupplements();
    updateExtras();
}

// ============================================================
// EVENT HANDLERS
// ============================================================

function updateKcal(value) {
    currentKcal = Math.max(1500, Math.min(3500, value));
    document.getElementById('kcal-display').textContent = currentKcal;
    document.getElementById('kcal-range').value = currentKcal;
    renderAll();
    updateCalculatorResults();
    saveState();
}

// Kcal slider
document.getElementById('kcal-range').addEventListener('input', function(e) {
    updateKcal(parseInt(e.target.value));
});

// Kcal buttons
document.getElementById('kcal-minus').addEventListener('click', function() {
    updateKcal(currentKcal - 100);
});

document.getElementById('kcal-plus').addEventListener('click', function() {
    updateKcal(currentKcal + 100);
});

// Breakfast card selection
document.getElementById('breakfast-grid').addEventListener('click', function(e) {
    const card = e.target.closest('.breakfast-card');
    if (!card) return;
    const idx = parseInt(card.dataset.index);
    selections.breakfast = selections.breakfast === idx ? null : idx;
    renderBreakfast();
    saveState();
});

// Meal table selection (lunch & dinner)
document.addEventListener('click', function(e) {
    const row = e.target.closest('tr[data-meal]');
    if (!row) return;

    const meal = row.dataset.meal;
    const type = row.dataset.type;
    const idx = parseInt(row.dataset.index);
    const key = meal === 'lunch'
        ? (type === 'carb' ? 'lunchCarb' : 'lunchProtein')
        : (type === 'carb' ? 'dinnerCarb' : 'dinnerProtein');

    selections[key] = selections[key] === idx ? null : idx;

    if (meal === 'lunch') {
        renderMealTable('lunch-tables', lunchCarbs, lunchProteins, selections.lunchCarb, selections.lunchProtein, 'lunch');
    } else {
        renderMealTable('dinner-tables', dinnerCarbs, dinnerProteins, selections.dinnerCarb, selections.dinnerProtein, 'dinner');
    }
    saveState();
});

// Section toggle
document.querySelectorAll('[data-toggle]').forEach(header => {
    header.addEventListener('click', function(e) {
        // Don't toggle if clicking a tooltip trigger
        if (e.target.closest('.tooltip-trigger')) return;
        const section = this.dataset.toggle;
        const body = document.getElementById(section + '-body') ||
                     document.getElementById(section + 's-body');
        if (body) {
            body.classList.toggle('open');
        }
    });
});

// ============================================================
// PERSISTENCE (localStorage)
// ============================================================
function saveState() {
    try {
        localStorage.setItem('dietApp', JSON.stringify({
            kcal: currentKcal,
            selections: selections
        }));
    } catch (e) { /* ignore */ }
}

function loadState() {
    try {
        const saved = localStorage.getItem('dietApp');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.kcal >= 1500 && data.kcal <= 3500) {
                currentKcal = data.kcal;
            }
            if (data.selections) {
                selections = { ...selections, ...data.selections };
            }
        }
    } catch (e) { /* ignore */ }
}

// ============================================================
// BMR / TDEE CALCULATOR
// ============================================================

// Tooltip content
const tooltipData = {
    activity: {
        title: 'Factor de Actividad Diaria',
        body: '<p>Este factor refleja tu gasto calórico por <strong>actividad diaria sin contar el entreno</strong> (NEAT: Non-Exercise Activity Thermogenesis).</p>' +
            '<ul>' +
            '<li><strong>Sedentario (×1.2):</strong> Trabajo de oficina/sentado, poca actividad fuera de casa.</li>' +
            '<li><strong>Ligeramente activo (×1.375):</strong> Trabajo de oficina pero caminas al trabajo, haces recados, etc.</li>' +
            '<li><strong>Moderadamente activo (×1.55):</strong> Trabajo de pie (hostelería, comercio, profesor) o caminas &gt;10.000 pasos/día.</li>' +
            '<li><strong>Muy activo (×1.725):</strong> Trabajo físico (construcción, mudanzas) o estás en movimiento todo el día.</li>' +
            '</ul>' +
            '<p>Este multiplicador se aplica sobre la TMB para obtener las calorías que gastas sin ejercicio planificado.</p>'
    },
    bmr: {
        title: 'Tasa Metabólica Basal (TMB)',
        body: '<p>La <strong>TMB</strong> (o BMR en inglés) son las calorías que tu cuerpo necesita <strong>en reposo absoluto</strong> para mantener funciones vitales: respirar, bombear sangre, regular temperatura, etc.</p>' +
            '<p>Se calcula con la <strong>fórmula de Mifflin-St Jeor</strong>, la más precisa actualmente:</p>' +
            '<p><strong>Hombres:</strong><br><code>TMB = (10 × peso kg) + (6.25 × altura cm) − (5 × edad) + 5</code></p>' +
            '<p><strong>Mujeres:</strong><br><code>TMB = (10 × peso kg) + (6.25 × altura cm) − (5 × edad) − 161</code></p>' +
            '<p>Es el mínimo calórico que consume tu cuerpo, <strong>sin contar ninguna actividad</strong>.</p>'
    },
    neat: {
        title: 'NEAT + Actividad Diaria',
        body: '<p>El <strong>NEAT</strong> (Non-Exercise Activity Thermogenesis) es la energía gastada en actividades diarias que <strong>no son ejercicio planificado</strong>: caminar, estar de pie, gesticular, subir escaleras, etc.</p>' +
            '<p>Se calcula multiplicando la TMB por el factor de actividad seleccionado:</p>' +
            '<p><code>Calorías diarias = TMB × Factor de actividad</code></p>' +
            '<p>Este valor representa las calorías que gastas en un día <strong>sin contar tus entrenamientos</strong>. Es útil para saber cuánto quemas en días de descanso.</p>'
    },
    tdee: {
        title: 'Gasto Energético Total (TDEE)',
        body: '<p>El <strong>TDEE</strong> (Total Daily Energy Expenditure) es el total de calorías que quemas al día <strong>incluyendo el ejercicio</strong>.</p>' +
            '<p>Se calcula sumando al NEAT las calorías extras quemadas por el entrenamiento:</p>' +
            '<p><code>TDEE = NEAT + (Calorías entreno × días/semana ÷ 7)</code></p>' +
            '<p>Las calorías de entreno se estiman según:</p>' +
            '<ul>' +
            '<li><strong>Tipo de entreno:</strong> Fuerza (~5-8 kcal/min), Cardio (~8-12 kcal/min), HIIT (~9-14 kcal/min), Mixto (~7-11 kcal/min)</li>' +
            '<li><strong>Duración e intensidad</strong> de la sesión</li>' +
            '</ul>' +
            '<p>Si tu dieta está <strong>por debajo del TDEE</strong>, estás en <strong>déficit calórico</strong> (perder grasa). Si está por encima, en <strong>superávit</strong> (ganar peso).</p>'
    }
};

// Calorie burn per minute by training type and intensity [low, medium, high]
const trainBurnPerMin = {
    strength: [5, 6.5, 8],
    cardio: [8, 10, 12],
    hiit: [9, 11.5, 14],
    mixed: [7, 9, 11]
};

function calculateBMR() {
    const sex = document.getElementById('calc-sex').value;
    const age = parseFloat(document.getElementById('calc-age').value);
    const height = parseFloat(document.getElementById('calc-height').value);
    const weight = parseFloat(document.getElementById('calc-weight').value);

    if (!age || !height || !weight) return null;

    // Mifflin-St Jeor
    if (sex === 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
}

function calculateTDEE() {
    const bmr = calculateBMR();
    if (!bmr) return null;

    const activityFactor = parseFloat(document.getElementById('calc-activity').value);
    if (!activityFactor) return null;

    const neat = bmr * activityFactor;

    const trains = document.getElementById('calc-trains').value === 'yes';
    let trainingExtra = 0;

    if (trains) {
        const type = document.getElementById('calc-train-type').value;
        const days = parseInt(document.getElementById('calc-train-days').value);
        const duration = parseInt(document.getElementById('calc-train-duration').value);
        const intensity = document.getElementById('calc-train-intensity').value;

        const intensityIdx = intensity === 'low' ? 0 : intensity === 'medium' ? 1 : 2;
        const burnPerMin = trainBurnPerMin[type][intensityIdx];
        const sessionCals = burnPerMin * duration;
        trainingExtra = (sessionCals * days) / 7;
    }

    return { bmr: Math.round(bmr), neat: Math.round(neat), tdee: Math.round(neat + trainingExtra) };
}

function updateCalculatorResults() {
    const result = calculateTDEE();
    const resultsDiv = document.getElementById('calc-results');

    if (!result) {
        resultsDiv.style.display = 'none';
        return;
    }

    resultsDiv.style.display = '';
    document.getElementById('result-bmr').textContent = result.bmr;
    document.getElementById('result-neat').textContent = result.neat;
    document.getElementById('result-tdee').textContent = result.tdee;

    // Balance calculation
    const diff = currentKcal - result.tdee;
    const pct = diff / result.tdee * 100;

    const marker = document.getElementById('balance-bar-marker');
    // Map diff to position: -30% = 0%, 0% = 50%, +30% = 100%
    const pos = Math.max(0, Math.min(100, 50 + (pct / 30 * 50)));
    marker.style.left = pos + '%';

    const verdict = document.getElementById('balance-verdict');
    if (diff < -100) {
        const absDiff = Math.abs(diff);
        verdict.className = 'balance-verdict deficit';
        verdict.innerHTML = '📉 <strong>Déficit de ' + absDiff + ' kcal/día</strong> (' + Math.abs(pct).toFixed(1) + '%) — Ideal para perder grasa';
    } else if (diff > 100) {
        verdict.className = 'balance-verdict surplus';
        verdict.innerHTML = '📈 <strong>Superávit de +' + diff + ' kcal/día</strong> (+' + pct.toFixed(1) + '%) — Ganarás peso';
    } else {
        verdict.className = 'balance-verdict maintenance';
        verdict.innerHTML = '⚖️ <strong>Mantenimiento</strong> (±' + Math.abs(diff) + ' kcal) — Peso estable';
    }

    saveCalcState();
}

// Toggle training details visibility
function toggleTrainingDetails() {
    const trains = document.getElementById('calc-trains').value === 'yes';
    const details = document.getElementById('calc-training-details');
    if (trains) {
        details.classList.remove('hidden');
    } else {
        details.classList.add('hidden');
    }
    updateCalculatorResults();
}

// Tooltip handlers
function openTooltip(key) {
    const data = tooltipData[key];
    if (!data) return;
    document.getElementById('tooltip-title').textContent = data.title;
    document.getElementById('tooltip-body').innerHTML = data.body;
    document.getElementById('tooltip-overlay').style.display = '';
}

function closeTooltip() {
    document.getElementById('tooltip-overlay').style.display = 'none';
}

// Calculator event listeners
document.addEventListener('click', function(e) {
    const trigger = e.target.closest('.tooltip-trigger');
    if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        openTooltip(trigger.dataset.tooltip);
        return;
    }

    if (e.target.id === 'tooltip-overlay') {
        closeTooltip();
        return;
    }

    if (e.target.id === 'tooltip-close' || e.target.closest('#tooltip-close')) {
        closeTooltip();
        return;
    }
});

['calc-sex', 'calc-age', 'calc-height', 'calc-weight', 'calc-activity',
 'calc-trains', 'calc-train-type', 'calc-train-days', 'calc-train-duration', 'calc-train-intensity'].forEach(function(id) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('change', function() {
            if (id === 'calc-trains') {
                toggleTrainingDetails();
            } else {
                updateCalculatorResults();
            }
        });
        if (el.type === 'number') {
            el.addEventListener('input', updateCalculatorResults);
        }
    }
});

// Save/load calculator state
function saveCalcState() {
    try {
        const calcData = {};
        ['calc-sex', 'calc-age', 'calc-height', 'calc-weight', 'calc-activity',
         'calc-trains', 'calc-train-type', 'calc-train-days', 'calc-train-duration', 'calc-train-intensity'].forEach(function(id) {
            const el = document.getElementById(id);
            if (el) calcData[id] = el.value;
        });
        localStorage.setItem('dietAppCalc', JSON.stringify(calcData));
    } catch (e) { /* ignore */ }
}

function loadCalcState() {
    try {
        const saved = localStorage.getItem('dietAppCalc');
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(function(id) {
                const el = document.getElementById(id);
                if (el && data[id]) {
                    el.value = data[id];
                }
            });
            toggleTrainingDetails();
        }
    } catch (e) { /* ignore */ }
}

// ============================================================
// INIT
// ============================================================
function init() {
    loadState();
    loadCalcState();
    document.getElementById('kcal-display').textContent = currentKcal;
    document.getElementById('kcal-range').value = currentKcal;
    renderAll();
    updateCalculatorResults();
}

document.addEventListener('DOMContentLoaded', init);
