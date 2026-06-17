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
    header.addEventListener('click', function() {
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
// INIT
// ============================================================
function init() {
    loadState();
    document.getElementById('kcal-display').textContent = currentKcal;
    document.getElementById('kcal-range').value = currentKcal;
    renderAll();
}

document.addEventListener('DOMContentLoaded', init);
