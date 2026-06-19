// ============================================================
// DIET DATA - Base amounts for 2500 kcal
// ============================================================

// HTML entity escaping to prevent XSS when inserting user input into innerHTML
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// App modal helpers (replace browser alert/confirm)
function showAppAlert(message, callback) {
    var overlay = document.getElementById('app-modal-overlay');
    var body = document.getElementById('app-modal-body');
    var actions = document.getElementById('app-modal-actions');
    body.innerHTML = message;
    actions.innerHTML = '<button class="app-modal-btn app-modal-btn-primary" id="app-modal-ok">Entendido</button>';
    overlay.style.display = '';
    document.getElementById('app-modal-ok').addEventListener('click', function() {
        overlay.style.display = 'none';
        if (callback) callback();
    });
    overlay.addEventListener('click', function handler(e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            overlay.removeEventListener('click', handler);
        }
    });
}

function showAppConfirm(message, onConfirm, onCancel) {
    var overlay = document.getElementById('app-modal-overlay');
    var body = document.getElementById('app-modal-body');
    var actions = document.getElementById('app-modal-actions');
    body.innerHTML = message;
    actions.innerHTML =
        '<button class="app-modal-btn app-modal-btn-secondary" id="app-modal-cancel">Cancelar</button>' +
        '<button class="app-modal-btn app-modal-btn-primary" id="app-modal-confirm">Continuar</button>';
    overlay.style.display = '';
    document.getElementById('app-modal-confirm').addEventListener('click', function() {
        overlay.style.display = 'none';
        if (onConfirm) onConfirm();
    });
    document.getElementById('app-modal-cancel').addEventListener('click', function() {
        overlay.style.display = 'none';
        if (onCancel) onCancel();
    });
    overlay.addEventListener('click', function handler(e) {
        if (e.target === overlay) {
            overlay.style.display = 'none';
            overlay.removeEventListener('click', handler);
            if (onCancel) onCancel();
        }
    });
}

var BASE_KCAL = 2500;

var breakfastOptions = [
    { id:'yogur-qfb', name:'Yogur de proteínas / QFB con cereales', macros:[550,42,62,14],
      items:[{text:'Corn flakes / copos de avena / cereales sin azúcar',amount:55,unit:'g'},{text:'Queso fresco batido / Yogur 2% + proteína',amount:500,unit:'g',extra:'ó {200}g yogur',extraBase:200,isAlt:true},{text:'Frutos secos / crema de cacahuete',amount:25,unit:'g'}]},
    { id:'tostadas', name:'Tostadas', macros:[470,28,52,17],
      items:[{text:'Pan integral trigo/espelta/centeno',amount:120,unit:'g'},{text:'Lomo',amount:50,unit:'g',extra:'+ {30}g queso semi/havarti light',extraBase:30},{text:'Guacamole o aguacate',amount:40,unit:'g'}]},
    { id:'cereales-leche', name:'Cereales con leche y proteína', macros:[500,33,52,17],
      items:[{text:'Corn flakes / copos de avena / cereales sin azúcar',amount:45,unit:'g'},{text:'Leche semidesnatada (un vaso)',amount:200,unit:'ml'},{text:'Whey protein',amount:25,unit:'g'},{text:'Frutos secos / crema de cacahuete',amount:25,unit:'g'}]},
    { id:'tortitas', name:'Tortitas de avena', macros:[340,22,30,16],
      items:[{text:'Harina de avena / copos de avena',amount:45,unit:'g'},{text:'2 Huevos + claras',amount:100,unit:'g'},{text:'Frutos secos / crema de cacahuete',amount:10,unit:'g'}]},
    { id:'yogures-proteicos', name:'Yogures proteicos', macros:[420,25,60,8],
      items:[{text:'2 yogures proteicos LIDL',amount:null,unit:''},{text:'Cereales',amount:15,unit:'g'},{text:'Miel',amount:20,unit:'g'},{text:'Frutos secos',amount:15,unit:'g'},{text:'Zumo de naranja',amount:200,unit:'ml'}]},
    { id:'bocadillo', name:'Bocadillo de pollo/pavo y queso/guacamole', macros:[520,38,55,16],
      items:[{text:'Pan integral trigo/espelta/centeno',amount:120,unit:'g'},{text:'Pollo / Pavo',amount:100,unit:'g'},{text:'Queso',amount:60,unit:'g',extra:'ó {80}g guacamole',extraBase:80}]},
    { id:'batido-proteinas', name:'Batido de avena y proteínas', macros:[540,37,50,21],
      items:[{text:'Corn flakes / copos de avena / cereales sin azúcar',amount:45,unit:'g'},{text:'Leche semidesnatada',amount:200,unit:'ml',glassHint:true},{text:'Whey protein',amount:35,unit:'g'},{text:'Aceite de oliva',amount:15,unit:'ml',spoonHint:true}]}
];

var lunchCarbs = [
    {name:'Arroz blanco',base:130,tag:'seco',n:[350,7,78,0.6]},
    {name:'Pasta',base:130,tag:'seco',n:[350,12,72,1.5]},
    {name:'Patata boniato',base:590,altName:'Precongelada',altBase:370,tag:'crudo',n:[86,1.6,20,0.1]},
    {name:'Tortitas de arroz',base:130,n:[385,7,83,3]},{name:'Pan',base:180,n:[265,9,49,3.2]},
    {name:'Quinoa',base:130,tag:'seco',n:[368,14,64,6]},{name:'Cus-cus',base:130,tag:'seco',n:[376,12.8,77,0.6]},{name:'Gnocchis de patata',base:260,n:[165,4,34,1]},
    {name:'Garbanzos cocidos',base:300,tag:'cocido',n:[164,9,27,2.6]},
    {name:'Lentejas cocidas',base:400,tag:'cocido',n:[116,9,20,0.4]}
];
var lunchProteins = [
    {name:'Pollo',base:200,n:[110,23,0,1.5]},{name:'Pavo',base:220,n:[105,24,0,1]},{name:'Hamburguesa de pollo',base:180,n:[150,17,4,7]},
    {name:'Huevo (2 completos) + claras',base:100,unit:'ml claras',n:[196,24,1.5,10]},
    {name:'Lomo adobado',base:200,n:[150,20,1,7]},{name:'Ternera',base:160,n:[155,22,0,7]},
    {name:'Merluza',base:250,n:[82,17,0,1]},{name:'Lenguado',base:250,n:[78,16,0,1.2]},{name:'Salmón',base:125,n:[208,20,0,13]},
    {name:'Atún claro al natural (3 latas)',base:180,n:[100,23,0,1]}
];
var dinnerCarbs = [
    {name:'Arroz blanco',base:100,tag:'seco',n:[350,7,78,0.6]},
    {name:'Pasta',base:100,tag:'seco',n:[350,12,72,1.5]},
    {name:'Patata boniato',base:450,altName:'Precongelada',altBase:300,tag:'crudo',n:[86,1.6,20,0.1]},
    {name:'Tortitas de arroz',base:100,n:[385,7,83,3]},{name:'Pan',base:140,n:[265,9,49,3.2]},
    {name:'Quinoa',base:100,tag:'seco',n:[368,14,64,6]},{name:'Cus-cus',base:100,tag:'seco',n:[376,12.8,77,0.6]},{name:'Gnocchis de patata',base:200,n:[165,4,34,1]},
    {name:'Garbanzos cocidos',base:230,tag:'cocido',n:[164,9,27,2.6]},
    {name:'Lentejas cocidas',base:315,tag:'cocido',n:[116,9,20,0.4]}
];
var dinnerProteins = [
    {name:'Pollo',base:200,n:[110,23,0,1.5]},{name:'Pavo',base:220,n:[105,24,0,1]},{name:'Hamburguesa de pollo',base:180,n:[150,17,4,7]},
    {name:'Huevo (2 yemas) + claras',base:100,unit:'ml claras',n:[196,24,1.5,10]},
    {name:'Lomo adobado',base:200,n:[150,20,1,7]},{name:'Ternera',base:160,n:[155,22,0,7]},
    {name:'Merluza',base:250,n:[82,17,0,1]},{name:'Lenguado',base:250,n:[78,16,0,1.2]},{name:'Salmón',base:125,n:[208,20,0,13]},
    {name:'Atún claro al natural (3 latas)',base:180,n:[100,23,0,1]}
];

var extrasNutr = { verduras:[25,2,4,0.3], aceite:[900,0,0,100], fruta:[80,0.5,20,0.2] };
var EXTRAS_OIL_ML = 5; // 5ml aceite oliva por comida (según entrenador)

var supplements = [
    {icon:'💪',title:'Creatina',desc:'5g todos los días',tip:'La creatina monohidrato (3-5g/día) es el suplemento con más evidencia para mejorar fuerza y masa muscular (Kreider et al., ISSN 2017). Solo tiene sentido si entrenas fuerza.',requiresTraining:true},
    {icon:'🐟',title:'Omega 3',desc:'2 pastillas/día (1 desayuno + 1 comida)',tip:'2-3g/día EPA+DHA. Beneficios cardiovasculares, antiinflamatorios y para la salud cognitiva en toda la población (Philpott et al., 2019; AHA 2019).'},
    {icon:'🧲',title:'Magnesio',desc:'2 pastillas antes de dormir (300mg)',tip:'El 50% de la población no alcanza la ingesta diaria recomendada. 300mg/día mejora calidad del sueño y función muscular (DiNicolantonio et al., 2018).'},
    {icon:'⚡',title:'Zinc',desc:'2 pastillas antes de dormir (30mg)',tip:'Apoya el sistema inmune y la recuperación. Deficiencia común en deportistas y en dietas restrictivas (Prasad, 2013). 30mg/día está dentro del rango seguro (<40mg UL).'},
    {icon:'😴',title:'Melatonina',desc:'Opcional, para favorecer el descanso',tip:'0.5-3mg antes de dormir. Útil si tienes problemas para conciliar el sueño. La evidencia muestra que mejora la latencia del sueño (Ferracioli-Oda et al., 2013).'}
];

// Protein category mapping: index → category (same order as lunchProteins/dinnerProteins)
// 0:Pollo, 1:Pavo, 2:Hamburguesa pollo, 3:Huevo, 4:Lomo, 5:Ternera, 6:Merluza, 7:Lenguado, 8:Salmón, 9:Atún
var proteinCategory = ['poultry','poultry','poultry','egg','redmeat','redmeat','fish','fish','fish','fish'];

function getProteinPrefs() {
    var prefs = {};
    var chips = document.querySelectorAll('#pref-protein .pref-chip:not(.pref-chip-all)');
    chips.forEach(function(chip) { prefs[chip.dataset.value] = chip.classList.contains('active'); });
    // If none selected or "all" is active, treat all as selected
    var anyChecked = Object.keys(prefs).some(function(k) { return prefs[k]; });
    if (!anyChecked) { Object.keys(prefs).forEach(function(k) { prefs[k] = true; }); }
    return prefs;
}

// Protein preference chip toggle logic
(function() {
    var container = document.getElementById('pref-protein');
    if (!container) return;
    container.addEventListener('click', function(e) {
        var chip = e.target.closest('.pref-chip');
        if (!chip) return;

        if (chip.classList.contains('pref-chip-all')) {
            // "Me da igual" → activate all
            var allActive = chip.classList.contains('active');
            container.querySelectorAll('.pref-chip').forEach(function(c) {
                if (allActive) {
                    c.classList.remove('active');
                } else {
                    c.classList.add('active');
                }
            });
        } else {
            // Toggle individual chip
            chip.classList.toggle('active');
            // Update "Me da igual" state
            var allChip = container.querySelector('.pref-chip-all');
            var individual = container.querySelectorAll('.pref-chip:not(.pref-chip-all)');
            var allOn = true;
            individual.forEach(function(c) { if (!c.classList.contains('active')) allOn = false; });
            if (allChip) {
                if (allOn) { allChip.classList.add('active'); }
                else { allChip.classList.remove('active'); }
            }
        }
    });
})();

var goalLabels = { cut:'Perder grasa', recomp:'Recomposición corporal', maintain:'Mantener peso', bulk:'Ganar masa muscular' };
var goalIcons = { cut:'🔥', recomp:'🔄', maintain:'⚖️', bulk:'💪' };

// kcal/min por tipo de ejercicio [baja, media, alta intensidad]
var trainBurnPerMin = {
    strength:[5,6.5,8],
    cardio:[8,10,12],
    hiit:[9,11.5,14],
    mixed:[7,9,11],
    yoga:[3,4,5],
    swimming:[7,9.5,12],
    cycling:[6,8.5,11],
    walking:[3.5,4.5,6],
    team:[6,8,10],
    martial:[7,9,12]
};

var tooltipData = {
    activity:{title:'Factor de Actividad',body:'<ul><li><strong>Sedentario (x1.2):</strong> Oficina, poco movimiento.</li><li><strong>Ligero (x1.375):</strong> Oficina + caminas algo.</li><li><strong>Moderado (x1.55):</strong> Trabajo de pie / >10k pasos.</li><li><strong>Muy activo (x1.725):</strong> Trabajo físico intenso.</li></ul>'},
    bmr:{title:'TMB (Tasa Metabólica Basal)',body:'<p>Calorías en <strong>reposo absoluto</strong>. Fórmula Mifflin-St Jeor.</p>'},
    neat:{title:'NEAT + Actividad',body:'<p>Calorías diarias <strong>sin contar entreno</strong>.</p>'},
    tdee:{title:'TDEE (Gasto Total)',body:'<p>Calorías totales incluyendo ejercicio.</p>'}
};

// ============================================================
// STATE
// ============================================================
var currentKcal = 2500;
var recommendedKcal = 2500;
var userGoal = null;
var userTdee = null;
var userName = '';
var userPath = null; // 'guided' or 'deadline'
var deadlineWeeks = null;
var selections = { breakfast:null, lunchCarb:null, lunchProtein:null, dinnerCarb:null, dinnerProtein:null };

function getExportFileName(prefix) {
    var parts = [prefix || 'Mi Plan Nutricional'];
    if (userGoal && goalLabels[userGoal]) parts.push(goalLabels[userGoal]);
    parts.push(currentKcal + 'kcal');
    return parts.join('_').replace(/\s+/g, ' ');
}

// ============================================================
// SCALING — protein-priority system
// ============================================================

// Protein targets per goal (g per kg body weight) — evidence-based:
// - Cut: 2.3-3.1 g/kg LBM ≈ 2.4 g/kg total BW (Helms 2014, ISSN Position Stand 2017)
// - Recomp: 2.0-2.4 g/kg (near maintenance + training stimulus, Stokes 2018)
// - Maintain: 1.6-2.2 g/kg (ISSN 2017 general athletes)
// - Bulk: 1.6-2.0 g/kg (surplus is protein-sparing, Iraki 2019)
var PROTEIN_TARGET_GPK = { cut:2.4, recomp:2.2, maintain:2.0, bulk:1.8 };
var DEFAULT_PROTEIN_GPK = 2.0;

// Reference kcal per slot (averages at base amounts) for unselected slots
var REF_SLOT_KCAL = { breakfast:467, lunchCarb:480, lunchProtein:241, dinnerCarb:370, dinnerProtein:241 };
// Reference protein per slot at base amounts (g)
var REF_SLOT_PROT = { breakfast:31, lunchCarb:9, lunchProtein:46, dinnerCarb:7, dinnerProtein:46 };
// Extras: verduras + aceite scale with ratio; fruta is fixed (1 piece per meal)
var EXTRAS_SCALED_BASE = extrasNutr.verduras[0]*200/100 + extrasNutr.aceite[0]*EXTRAS_OIL_ML/100; // ~95
var EXTRAS_FIXED_KCAL = extrasNutr.fruta[0]; // 80 per meal, not scaled
var EXTRAS_PROT_PER_MEAL = extrasNutr.verduras[1]*200/100 + extrasNutr.fruta[1]; // ~4.5g
var NUM_EXTRA_MEALS = 2; // lunch + dinner

// Get user's body weight (from calculator)
function getUserWeight() {
    var el = document.getElementById('calc-weight');
    var w = el ? parseFloat(el.value) : 0;
    return (w > 0) ? w : 0;
}

// Get target protein in grams based on goal and weight
function getProteinTargetG() {
    var w = getUserWeight();
    if (!w) return 0; // No weight entered, can't prioritize
    var gpk = userGoal ? (PROTEIN_TARGET_GPK[userGoal] || DEFAULT_PROTEIN_GPK) : DEFAULT_PROTEIN_GPK;
    return gpk * w;
}

// Calculate base kcal & protein at ratio=1 for the "carb" category (carbs + breakfast + extras)
// and "protein" category (protein sources) separately
function getBaseComponents(sel) {
    var carbKcal = 0, protKcal = 0, carbProt = 0, protProt = 0;

    // Breakfast goes into "carb" bucket (mixed macros, scales with carbRatio)
    if (sel.breakfast !== null) {
        carbKcal += breakfastOptions[sel.breakfast].macros[0];
        carbProt += breakfastOptions[sel.breakfast].macros[1];
    } else {
        carbKcal += REF_SLOT_KCAL.breakfast;
        carbProt += REF_SLOT_PROT.breakfast;
    }

    // Lunch carb
    if (sel.lunchCarb !== null) {
        var it = lunchCarbs[sel.lunchCarb];
        carbKcal += it.n[0] * it.base / 100;
        carbProt += it.n[1] * it.base / 100;
    } else {
        carbKcal += REF_SLOT_KCAL.lunchCarb;
        carbProt += REF_SLOT_PROT.lunchCarb;
    }

    // Lunch protein
    if (sel.lunchProtein !== null) {
        var it = lunchProteins[sel.lunchProtein];
        protKcal += it.n[0] * it.base / 100;
        protProt += it.n[1] * it.base / 100;
    } else {
        protKcal += REF_SLOT_KCAL.lunchProtein;
        protProt += REF_SLOT_PROT.lunchProtein;
    }

    // Dinner carb
    if (sel.dinnerCarb !== null) {
        var it = dinnerCarbs[sel.dinnerCarb];
        carbKcal += it.n[0] * it.base / 100;
        carbProt += it.n[1] * it.base / 100;
    } else {
        carbKcal += REF_SLOT_KCAL.dinnerCarb;
        carbProt += REF_SLOT_PROT.dinnerCarb;
    }

    // Dinner protein
    if (sel.dinnerProtein !== null) {
        var it = dinnerProteins[sel.dinnerProtein];
        protKcal += it.n[0] * it.base / 100;
        protProt += it.n[1] * it.base / 100;
    } else {
        protKcal += REF_SLOT_KCAL.dinnerProtein;
        protProt += REF_SLOT_PROT.dinnerProtein;
    }

    // Extras (scale with carbRatio): verduras + aceite
    carbKcal += EXTRAS_SCALED_BASE * NUM_EXTRA_MEALS;
    carbProt += EXTRAS_PROT_PER_MEAL * NUM_EXTRA_MEALS;

    return { carbKcal: carbKcal, protKcal: protKcal, carbProt: carbProt, protProt: protProt };
}

// Compute separate ratios for protein sources vs carb/breakfast/extras sources
function getScalingRatios(sel) {
    sel = sel || selections;
    var comp = getBaseComponents(sel);
    var totalBaseKcal = comp.carbKcal + comp.protKcal;
    if (totalBaseKcal <= 0) return { protein: 1, carb: 1 };

    var availableKcal = currentKcal - EXTRAS_FIXED_KCAL * NUM_EXTRA_MEALS;
    var uniformRatio = availableKcal / totalBaseKcal;

    // Check if we need protein priority
    var targetP = getProteinTargetG();
    if (!targetP) {
        // No weight entered — use uniform scaling
        return { protein: uniformRatio, carb: uniformRatio };
    }

    // Protein at uniform ratio
    var protAtUniform = (comp.protProt + comp.carbProt) * uniformRatio;

    if (protAtUniform >= targetP) {
        // Uniform ratio already meets protein target — no adjustment needed
        return { protein: uniformRatio, carb: uniformRatio };
    }

    // Need to boost protein: find proteinRatio so protein sources meet target
    // Total protein = carbProt * carbRatio + protProt * protRatio = targetP
    // Total kcal = carbKcal * carbRatio + protKcal * protRatio + fixedExtras = currentKcal
    // Solve: carbRatio = (availableKcal - protKcal * protRatio) / carbKcal
    // protProt * protRatio + carbProt * carbRatio = targetP

    // We fix protein sources to deliver enough and reduce carbs to compensate
    // protRatio = ratio that makes protein target achievable
    // Substituting: protProt * pR + carbProt * (availableKcal - protKcal * pR) / carbKcal = targetP
    // protProt * pR + carbProt * availableKcal / carbKcal - carbProt * protKcal * pR / carbKcal = targetP
    // pR * (protProt - carbProt * protKcal / carbKcal) = targetP - carbProt * availableKcal / carbKcal
    // pR = (targetP - carbProt * availableKcal / carbKcal) / (protProt - carbProt * protKcal / carbKcal)

    var a = comp.protProt - comp.carbProt * comp.protKcal / comp.carbKcal;
    var b = targetP - comp.carbProt * availableKcal / comp.carbKcal;

    var protRatio, carbRatio;
    if (Math.abs(a) < 0.01) {
        // Edge case: ratios would be degenerate, fall back to uniform
        return { protein: uniformRatio, carb: uniformRatio };
    }

    protRatio = b / a;

    // Cap proteinRatio: don't let protein go above 1.5x base (reasonable limit)
    // and don't let it go below 0.7 (would mean less protein than a severe cut)
    protRatio = Math.max(0.7, Math.min(1.5, protRatio));

    carbRatio = (availableKcal - comp.protKcal * protRatio) / comp.carbKcal;

    // Safety: carbRatio shouldn't go below 0.4 (extreme) or above 2.0
    if (carbRatio < 0.4) {
        carbRatio = 0.4;
        protRatio = (availableKcal - comp.carbKcal * carbRatio) / comp.protKcal;
    }
    if (carbRatio > 2.0) {
        carbRatio = 2.0;
        protRatio = (availableKcal - comp.carbKcal * carbRatio) / comp.protKcal;
    }

    return { protein: protRatio, carb: carbRatio };
}

// Legacy single-ratio for backward compatibility (uses carb ratio as default)
function getRatio() {
    var ratios = getScalingRatios();
    return ratios.carb;
}

// Per-selection ratio for weekly plan (uses split ratios)
function getRatioForSel(sel) {
    return getScalingRatios(sel).carb;
}

function getProteinRatioForSel(sel) {
    return getScalingRatios(sel).protein;
}

function scaleAmount(base, ratio) {
    if (base === null || base === undefined) return null;
    var scaled = base * (ratio !== undefined ? ratio : getRatio());
    return scaled < 10 ? Math.round(scaled) : Math.round(scaled / 5) * 5;
}

// Spoon equivalence for olive oil (ml)
// ~5ml = cucharada de postre rasa, ~10ml = cucharada sopera rasa, ~15ml = cucharada sopera colmada
function oilSpoonHint(ml) {
    if (ml <= 3) return '(menos de una cucharadita)';
    if (ml <= 5) return '(~1 cucharadita)';
    if (ml <= 8) return '(~1 cucharada de postre)';
    if (ml <= 10) return '(~1 cucharada sopera rasa)';
    if (ml <= 15) return '(~1 cucharada sopera)';
    if (ml <= 20) return '(~1½ cucharadas soperas)';
    if (ml <= 25) return '(~2 cucharadas soperas)';
    if (ml <= 30) return '(~2 cucharadas soperas)';
    return '(~' + Math.round(ml / 15) + ' cucharadas soperas)';
}

// Glass equivalence for milk (ml) — 1 vaso ≈ 200-250ml
function milkGlassHint(ml) {
    if (ml <= 125) return '(~½ vaso)';
    if (ml <= 200) return '(~1 vaso)';
    if (ml <= 300) return '(~1 vaso y medio)';
    if (ml <= 400) return '(~2 vasos)';
    if (ml <= 500) return '(~2 vasos y medio)';
    return '(~' + Math.round(ml / 200) + ' vasos)';
}

// ============================================================
// BMR / TDEE
// ============================================================
function calculateBMR() {
    var sex = document.getElementById('calc-sex').value;
    var age = parseFloat(document.getElementById('calc-age').value);
    var h = parseFloat(document.getElementById('calc-height').value);
    var w = parseFloat(document.getElementById('calc-weight').value);
    if (!age || !h || !w) return null;
    return sex === 'male' ? (10*w)+(6.25*h)-(5*age)+5 : (10*w)+(6.25*h)-(5*age)-161;
}

function calculateTDEE() {
    var bmr = calculateBMR();
    if (!bmr) return null;
    var af = parseFloat(document.getElementById('calc-activity').value);
    if (!af) return null;
    var neat = bmr * af;

    // Steps calorie bonus (~0.04 kcal per step, adjusted by weight)
    var stepsExtra = 0;
    var stepsUnknown = document.getElementById('calc-steps-unknown');
    var stepsInput = document.getElementById('calc-steps');
    if (stepsUnknown && !stepsUnknown.checked && stepsInput && stepsInput.value) {
        var steps = parseInt(stepsInput.value);
        var w = parseFloat(document.getElementById('calc-weight').value) || 70;
        // ~0.04 kcal/step for 70kg person, scale by weight
        stepsExtra = steps * 0.04 * (w / 70);
    }

    var trainExtra = 0;
    if (document.getElementById('calc-trains').value === 'yes') {
        var type = document.getElementById('calc-train-type').value;
        var days = parseInt(document.getElementById('calc-train-days').value);
        var dur = parseInt(document.getElementById('calc-train-duration').value);
        var int_ = document.getElementById('calc-train-intensity').value;
        var idx = int_ === 'low' ? 0 : int_ === 'medium' ? 1 : 2;
        trainExtra = (trainBurnPerMin[type][idx] * dur * days) / 7;
    }
    return { bmr:Math.round(bmr), neat:Math.round(neat), stepsKcal:Math.round(stepsExtra), tdee:Math.round(neat+trainExtra+stepsExtra) };
}

function getRecommendedKcal(tdee, goal) {
    // Adjust deficit aggressiveness based on profile
    var appetite = document.getElementById('calc-appetite') ? document.getElementById('calc-appetite').value : '';
    var dietHist = document.getElementById('calc-diet-history') ? document.getElementById('calc-diet-history').value : '';
    var conservative = (appetite === 'high') || (dietHist === 'yoyo') || (dietHist === 'tried');

    var kcal;
    if (goal === 'cut') {
        // Conservative: 12% deficit; Normal: 18% deficit
        var cutMult = conservative ? 0.88 : 0.82;
        kcal = tdee * cutMult;
    } else if (goal === 'recomp') {
        kcal = tdee * 0.95;
    } else if (goal === 'bulk') {
        kcal = tdee * 1.15;
    } else {
        kcal = tdee;
    }

    // Subtract estimated alcohol calories from food budget
    // Average drink: ~150 kcal (beer/wine/mixed)
    var alcoholKcal = getAlcoholKcalPerDay();
    kcal = kcal - alcoholKcal;

    return Math.round(kcal / 100) * 100;
}

// Estimated daily kcal from alcohol based on user's reported consumption
function getAlcoholKcalPerDay() {
    var alcohol = document.getElementById('calc-alcohol') ? document.getElementById('calc-alcohol').value : 'none';
    // ~150 kcal per standard drink (beer 330ml, wine 150ml, or mixed)
    if (alcohol === 'occasional') return Math.round((1.5 * 150 * 1.5) / 7); // ~1.5 drinks × 1.5 days/week
    if (alcohol === 'moderate') return Math.round((2 * 150 * 3.5) / 7);     // ~2 drinks × 3.5 days/week
    if (alcohol === 'frequent') return Math.round((2.5 * 150 * 5.5) / 7);   // ~2.5 drinks × 5.5 days/week
    return 0;
}

// ============================================================
// MACROS CALCULATION
// ============================================================
function calculateSelectedMacros() {
    var ratios = getScalingRatios();
    var carbRatio = ratios.carb;
    var protRatio = ratios.protein;
    var base = { kcal:0, protein:0, carbs:0, fat:0 };
    var chosen = { kcal:0, protein:0, carbs:0, fat:0 };

    if (selections.breakfast !== null) {
        var m = breakfastOptions[selections.breakfast].macros;
        chosen.kcal += m[0]*carbRatio; chosen.protein += m[1]*carbRatio; chosen.carbs += m[2]*carbRatio; chosen.fat += m[3]*carbRatio;
    }

    function addCarbFood(data, idx) {
        if (idx === null) return;
        var item = data[idx]; var g = scaleAmount(item.base, carbRatio);
        chosen.kcal += item.n[0]*g/100; chosen.protein += item.n[1]*g/100; chosen.carbs += item.n[2]*g/100; chosen.fat += item.n[3]*g/100;
    }
    function addProtFood(data, idx) {
        if (idx === null) return;
        var item = data[idx]; var g = scaleAmount(item.base, protRatio);
        chosen.kcal += item.n[0]*g/100; chosen.protein += item.n[1]*g/100; chosen.carbs += item.n[2]*g/100; chosen.fat += item.n[3]*g/100;
    }
    function addExtras() {
        var vg = scaleAmount(200, carbRatio); var om = scaleAmount(EXTRAS_OIL_ML, carbRatio);
        base.kcal += extrasNutr.verduras[0]*vg/100; base.protein += extrasNutr.verduras[1]*vg/100; base.carbs += extrasNutr.verduras[2]*vg/100; base.fat += extrasNutr.verduras[3]*vg/100;
        base.kcal += extrasNutr.aceite[0]*om/100; base.fat += extrasNutr.aceite[3]*om/100;
        base.kcal += extrasNutr.fruta[0]; base.protein += extrasNutr.fruta[1]; base.carbs += extrasNutr.fruta[2]; base.fat += extrasNutr.fruta[3];
    }

    addCarbFood(lunchCarbs, selections.lunchCarb); addProtFood(lunchProteins, selections.lunchProtein);
    addExtras();
    addCarbFood(dinnerCarbs, selections.dinnerCarb); addProtFood(dinnerProteins, selections.dinnerProtein);
    addExtras();
    return { base: base, chosen: chosen, total: { kcal: base.kcal+chosen.kcal, protein: base.protein+chosen.protein, carbs: base.carbs+chosen.carbs, fat: base.fat+chosen.fat } };
}

// ============================================================
// RENDER
// ============================================================
function renderBreakfast() {
    var grid = document.getElementById('breakfast-grid');
    var ratio = getScalingRatios().carb; // breakfast scales with carb ratio
    grid.innerHTML = breakfastOptions.map(function(opt, idx) {
        var sel = selections.breakfast === idx;
        var items = opt.items.map(function(it) {
            var cls = it.isAlt ? ' class="alt-item"' : '';
            var c = it.text;
            var scaledAmt = scaleAmount(it.amount, ratio);
            if (it.amount !== null) { c += ': <span class="amount">' + scaledAmt + it.unit + '</span>'; }
            if (it.extra) { c += ' <span style="color:#999">' + it.extra.replace(/\{(\d+)\}/, scaleAmount(it.extraBase,ratio)) + '</span>'; }
            if (it.spoonHint) { c += ' <span style="color:#999">' + oilSpoonHint(scaledAmt) + '</span>'; }
            if (it.glassHint) { c += ' <span style="color:#999">' + milkGlassHint(scaledAmt) + '</span>'; }
            return '<li' + cls + '>' + c + '</li>';
        }).join('');
        return '<div class="breakfast-card' + (sel?' selected':'') + '" data-index="'+idx+'"><div class="breakfast-card-title">'+opt.name+'</div><ul class="breakfast-card-items">'+items+'</ul></div>';
    }).join('');
}

function renderMealTable(cid, cd, pd, cs, ps, mt) {
    var container = document.getElementById(cid);
    var ratios = getScalingRatios();
    var carbRatio = ratios.carb;
    var protRatio = ratios.protein;
    var cr = cd.map(function(it,i) {
        var s = cs===i; var sc = scaleAmount(it.base,carbRatio); var u = it.unit||'g';
        var tagHtml = it.tag ? ' <span class="food-tag food-tag-'+it.tag+'">'+it.tag+'</span>' : '';
        var r = '<tr class="'+(s?'selected':'')+'" data-meal="'+mt+'" data-type="carb" data-index="'+i+'"><td>'+it.name+'</td><td>'+sc+' '+u+tagHtml+'</td></tr>';
        if (it.altName) { r += '<tr class="sub-row '+(s?'selected':'')+'" data-meal="'+mt+'" data-type="carb" data-index="'+i+'"><td>'+it.altName+'</td><td>'+scaleAmount(it.altBase,carbRatio)+' '+u+tagHtml+'</td></tr>'; }
        return r;
    }).join('');
    var pr = pd.map(function(it,i) {
        var s = ps===i; var sc = scaleAmount(it.base,protRatio); var u = it.unit||'g';
        return '<tr class="'+(s?'selected':'')+'" data-meal="'+mt+'" data-type="protein" data-index="'+i+'"><td>'+it.name+'</td><td>'+sc+' '+u+'</td></tr>';
    }).join('');
    container.innerHTML = '<div class="meal-table-wrapper"><div class="meal-table-header carbs">🌾 Hidratos de Carbono</div><table class="meal-table"><tbody>'+cr+'</tbody></table></div>' +
        '<div class="meal-table-wrapper"><div class="meal-table-header protein">🥩 Proteínas</div><table class="meal-table"><tbody>'+pr+'</tbody></table></div>';
}

function renderSupplements() {
    var trains = document.getElementById('calc-trains') && document.getElementById('calc-trains').value === 'yes';
    var filtered = supplements.filter(function(s) {
        return !s.requiresTraining || trains;
    });
    var html = filtered.map(function(s) {
        var tipHtml = s.tip ? '<button class="supp-tooltip-btn" data-supptip="'+s.title+'">?</button>' : '';
        return '<div class="supplement-card"><span class="supplement-icon">'+s.icon+'</span><div class="supplement-text"><strong>'+s.title+'</strong>'+s.desc+tipHtml+'</div></div>';
    }).join('');
    if (!trains) {
        html += '<div class="supp-note">💡 <em>La creatina solo se recomienda si entrenas fuerza. Omega 3, magnesio y zinc tienen beneficios para la salud general independientemente del ejercicio.</em></div>';
    }
    document.getElementById('supplements-list').innerHTML = html;
}

function updateExtras() {
    var ratio = getScalingRatios().carb; var vg = scaleAmount(200,ratio); var ol = scaleAmount(EXTRAS_OIL_ML,ratio);
    document.querySelectorAll('.scaled-veg-lunch,.scaled-veg-dinner').forEach(function(e){e.textContent=vg;});
    document.querySelectorAll('.scaled-oil-lunch,.scaled-oil-dinner').forEach(function(e){e.textContent=ol;});
}

function renderInfoBanner() {
    var el = document.getElementById('info-banner');
    if (!userGoal || !userTdee) { el.innerHTML = ''; return; }

    var diff = recommendedKcal - userTdee;
    var absDiff = Math.abs(diff);
    var pctDiff = Math.abs(Math.round(diff / userTdee * 100));

    var namePrefix = userName ? escapeHtml(userName) + ', c' : 'C';
    var goalDescs = {
        cut: namePrefix + 'omes por debajo de lo que quemas para <strong>perder grasa</strong> manteniendo músculo.',
        recomp: namePrefix + 'omes ligeramente por debajo de lo que quemas para <strong>ganar músculo y perder grasa</strong> a la vez.',
        maintain: namePrefix + 'omes lo mismo que quemas para <strong>mantener tu peso</strong> y composición corporal.',
        bulk: namePrefix + 'omes por encima de lo que quemas para <strong>ganar masa muscular</strong> con mínima grasa.'
    };

    var diffLabel = '';
    if (diff < 0) {
        diffLabel = '<span class="info-diff deficit">−' + absDiff + ' kcal/día <span class="info-diff-pct">(déficit ~' + pctDiff + '%)</span></span>';
    } else if (diff > 0) {
        diffLabel = '<span class="info-diff surplus">+' + diff + ' kcal/día <span class="info-diff-pct">(superávit ~' + pctDiff + '%)</span></span>';
    } else {
        diffLabel = '<span class="info-diff maintain">= mantenimiento</span>';
    }

    el.innerHTML =
        '<div class="info-banner-card">' +
            '<div class="info-banner-metrics">' +
                '<div class="info-metric">' +
                    '<button class="info-metric-why" id="info-tdee-detail-btn" title="¿Qué es el TDEE y cómo se ha calculado?">ℹ️</button>' +
                    '<span class="info-metric-label">Lo que quemas</span>' +
                    '<span class="info-metric-value">' + userTdee + '</span>' +
                    '<span class="info-metric-sub">kcal/día (TDEE)</span>' +
                '</div>' +
                '<div class="info-metric-arrow">' +
                    (diff <= 0 ? '📉' : '📈') +
                '</div>' +
                '<div class="info-metric info-metric-highlight">' +
                    '<button class="info-metric-why" id="info-why-kcal-btn" title="¿Por qué estas kcal?">?</button>' +
                    '<span class="info-metric-label">Lo que deberías comer</span>' +
                    '<span class="info-metric-value">' + recommendedKcal + '</span>' +
                    '<span class="info-metric-sub">kcal/día recomendadas</span>' +
                '</div>' +
            '</div>' +
            diffLabel +
            '<p class="info-banner-explain">' + goalDescs[userGoal] + '</p>' +
        '</div>';

    // TDEE detail explainer with breakdown
    document.getElementById('info-tdee-detail-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        var result = calculateTDEE();
        var breakdownHTML = '<p>El <strong>TDEE</strong> (Total Daily Energy Expenditure) es el total de calorías que tu cuerpo gasta al día. Se calcula sumando varios componentes:</p>';
        if (result) {
            var trainExtra = result.tdee - result.neat - result.stepsKcal;
            breakdownHTML += '<div class="tooltip-breakdown">';
            breakdownHTML += '<div class="tooltip-bk-row"><span>🔥 Metabolismo basal (BMR)</span><strong>' + result.bmr + ' kcal</strong></div>';
            var neatExtra = result.neat - result.bmr;
            breakdownHTML += '<div class="tooltip-bk-row"><span>🚶 Actividad diaria (NEAT)</span><strong>+' + neatExtra + ' kcal</strong></div>';
            if (result.stepsKcal > 0) {
                breakdownHTML += '<div class="tooltip-bk-row"><span>👟 Pasos diarios</span><strong>+' + result.stepsKcal + ' kcal</strong></div>';
            }
            if (trainExtra > 0) {
                breakdownHTML += '<div class="tooltip-bk-row"><span>🏋️ Entrenamiento</span><strong>+' + Math.round(trainExtra) + ' kcal</strong></div>';
            }
            breakdownHTML += '<div class="tooltip-bk-row tooltip-bk-total"><span>= Tu TDEE total</span><strong>' + result.tdee + ' kcal/día</strong></div>';
            breakdownHTML += '</div>';
        }
        breakdownHTML += '<p style="margin-top:10px;opacity:0.8">Si comes <strong>por debajo</strong> de tu TDEE → pierdes peso (déficit).<br>Si comes <strong>por encima</strong> → ganas peso (superávit).<br>Si comes <strong>igual</strong> → mantienes peso.</p>';
        breakdownHTML += '<p class="tooltip-refs">Calculado con la fórmula <strong>Mifflin-St Jeor</strong>, la más precisa para población general (Frankenfield et al., 2005).</p>';
        document.getElementById('tooltip-title').textContent = '📊 Tu TDEE — Desglose completo';
        document.getElementById('tooltip-body').innerHTML = breakdownHTML;
        document.getElementById('tooltip-overlay').style.display = '';
    });

    // Why these kcal explainer
    document.getElementById('info-why-kcal-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        var goalExplanations = {
            cut: {
                title: '🔥 ¿Por qué ' + recommendedKcal + ' kcal para perder grasa?',
                body: '<p>Para tu objetivo de <strong>pérdida de grasa</strong>, se aplica un <strong>déficit calórico del 15-20%</strong> sobre tu TDEE (' + userTdee + ' kcal).</p>' +
                    '<h4>Base científica:</h4>' +
                    '<ul class="tooltip-list">' +
                    '<li><strong>Déficit moderado (15-25%):</strong> Maximiza la pérdida de grasa mientras minimiza la pérdida de masa muscular. Un déficit mayor aumenta el catabolismo proteico y la adaptación metabólica (Trexler et al., 2014).</li>' +
                    '<li><strong>Tasa de pérdida óptima:</strong> 0.5-1% del peso corporal/semana. Déficits mayores se asocian a mayor pérdida de masa muscular, especialmente en personas ya delgadas (Helms et al., 2014).</li>' +
                    '<li><strong>Preservación metabólica:</strong> Déficits agresivos (>25%) activan mecanismos de adaptación termogénica que reducen el NEAT y la T3 (Rosenbaum & Leibel, 2010).</li>' +
                    '<li><strong>Adherencia:</strong> La restricción moderada mejora la adherencia a largo plazo frente a dietas muy restrictivas (Stewart et al., 2021).</li>' +
                    '</ul>' +
                    '<p style="margin-top:10px"><strong>Tu cálculo:</strong> ' + userTdee + ' × 0.82 ≈ ' + recommendedKcal + ' kcal/día (déficit de ~' + Math.abs(diff) + ' kcal)</p>' +
                    '<p class="tooltip-refs">Refs: Helms et al. (2014) <em>JISSN</em>; Trexler et al. (2014) <em>JISSN</em>; Rosenbaum & Leibel (2010) <em>Int J Obes</em></p>'
            },
            recomp: {
                title: '🔄 ¿Por qué ' + recommendedKcal + ' kcal para recomposición?',
                body: '<p>Para <strong>recomposición corporal</strong> se usa un <strong>déficit leve del 5%</strong> sobre tu TDEE (' + userTdee + ' kcal).</p>' +
                    '<h4>Base científica:</h4>' +
                    '<ul class="tooltip-list">' +
                    '<li><strong>Recomposición simultánea:</strong> Es posible ganar músculo y perder grasa a la vez con un déficit mínimo (~5%) combinado con entrenamiento de fuerza y proteína alta (Barakat et al., 2020).</li>' +
                    '<li><strong>Particionamiento calórico:</strong> Con déficit leve, el cuerpo prioriza la oxidación de grasa mientras mantiene la síntesis proteica muscular si la ingesta proteica es ≥1.6g/kg (Morton et al., 2018).</li>' +
                    '<li><strong>Ideal para:</strong> Principiantes en entrenamiento, personas con sobrepeso, o tras un periodo de desentrenamiento (Ribeiro et al., 2022).</li>' +
                    '</ul>' +
                    '<p style="margin-top:10px"><strong>Tu cálculo:</strong> ' + userTdee + ' × 0.95 ≈ ' + recommendedKcal + ' kcal/día</p>' +
                    '<p class="tooltip-refs">Refs: Barakat et al. (2020) <em>Strength Cond J</em>; Morton et al. (2018) <em>Br J Sports Med</em></p>'
            },
            maintain: {
                title: '⚖️ ¿Por qué ' + recommendedKcal + ' kcal para mantenimiento?',
                body: '<p>Para <strong>mantener peso</strong> se igualan las calorías consumidas con las gastadas (TDEE = ' + userTdee + ' kcal).</p>' +
                    '<h4>Base científica:</h4>' +
                    '<ul class="tooltip-list">' +
                    '<li><strong>Balance energético:</strong> El peso corporal se mantiene estable cuando la ingesta calórica ≈ gasto calórico total durante periodos sostenidos (Hall et al., 2012).</li>' +
                    '<li><strong>Optimización del rendimiento:</strong> En mantenimiento, se maximiza la disponibilidad energética para el entrenamiento sin ganar ni perder peso (Thomas et al., 2016).</li>' +
                    '<li><strong>Flexibilidad metabólica:</strong> Periodos de mantenimiento entre fases de déficit permiten recuperar hormonas y reducir la adaptación metabólica (Peos et al., 2019).</li>' +
                    '</ul>' +
                    '<p style="margin-top:10px"><strong>Tu cálculo:</strong> TDEE = ' + recommendedKcal + ' kcal/día</p>' +
                    '<p class="tooltip-refs">Refs: Hall et al. (2012) <em>Am J Clin Nutr</em>; Thomas et al. (2016) <em>ACSM Position Stand</em></p>'
            },
            bulk: {
                title: '💪 ¿Por qué ' + recommendedKcal + ' kcal para ganar músculo?',
                body: '<p>Para <strong>ganancia muscular</strong> se aplica un <strong>superávit del 10-15%</strong> sobre tu TDEE (' + userTdee + ' kcal).</p>' +
                    '<h4>Base científica:</h4>' +
                    '<ul class="tooltip-list">' +
                    '<li><strong>Superávit moderado:</strong> Un exceso de 200-500 kcal/día es suficiente para maximizar la síntesis proteica muscular. Excesos mayores solo aumentan la ganancia de grasa (Slater et al., 2019).</li>' +
                    '<li><strong>Tasa de ganancia realista:</strong> 0.25-0.5% del peso/semana en intermedios/avanzados. Más rápido = más grasa acumulada (Iraki et al., 2019).</li>' +
                    '<li><strong>Disponibilidad energética:</strong> El exceso calórico mejora el entorno hormonal anabólico (testosterona, IGF-1) y la recuperación del entrenamiento (Huovinen et al., 2015).</li>' +
                    '<li><strong>"Lean bulk":</strong> Superávits controlados (10-15%) producen ratios músculo:grasa significativamente mejores que los "dirty bulks" (+25%+) (Garthe et al., 2013).</li>' +
                    '</ul>' +
                    '<p style="margin-top:10px"><strong>Tu cálculo:</strong> ' + userTdee + ' × 1.15 ≈ ' + recommendedKcal + ' kcal/día (superávit de ~' + Math.abs(diff) + ' kcal)</p>' +
                    '<p class="tooltip-refs">Refs: Slater et al. (2019) <em>JISSN</em>; Iraki et al. (2019) <em>JISSN</em>; Garthe et al. (2013) <em>Br J Sports Med</em></p>'
            }
        };
        var exp = goalExplanations[userGoal] || goalExplanations.maintain;
        document.getElementById('tooltip-title').textContent = exp.title;
        document.getElementById('tooltip-body').innerHTML = exp.body;
        document.getElementById('tooltip-overlay').style.display = '';
    });
}



function renderNutritionSummary() {
    var container = document.getElementById('nutrition-summary');
    var data = calculateSelectedMacros();
    var macros = data.total;
    container.style.display='';
    var kcal=Math.round(macros.kcal), p=Math.round(macros.protein), c=Math.round(macros.carbs), f=Math.round(macros.fat);
    var tg=p+c+f;
    var pp=tg>0?Math.round(p/tg*100):0, cp=tg>0?Math.round(c/tg*100):0, fp=tg>0?100-pp-cp:0;
    var meals=[];
    if (selections.breakfast!==null) meals.push('Desayuno');
    if (selections.lunchCarb!==null||selections.lunchProtein!==null) meals.push('Comida');
    if (selections.dinnerCarb!==null||selections.dinnerProtein!==null) meals.push('Cena');
    var complete = selections.breakfast!==null && selections.lunchCarb!==null && selections.lunchProtein!==null && selections.dinnerCarb!==null && selections.dinnerProtein!==null;
    var missingHtml = '';
    if (!complete) {
        var missingItems = [];
        if (selections.breakfast === null) missingItems.push('Desayuno');
        if (selections.lunchCarb === null) missingItems.push('Comida: hidrato');
        if (selections.lunchProtein === null) missingItems.push('Comida: prote\u00edna');
        if (selections.dinnerCarb === null) missingItems.push('Cena: hidrato');
        if (selections.dinnerProtein === null) missingItems.push('Cena: prote\u00edna');
        missingHtml = '<div class="nutrition-missing">\u26a0\ufe0f Falta: ' + missingItems.join(' \u00b7 ') + '</div>';
    }

    // g/kg body weight
    var bodyWeight = parseFloat(document.getElementById('calc-weight').value) || 0;
    var pPerKg = bodyWeight > 0 ? (p / bodyWeight).toFixed(1) : '--';
    var cPerKg = bodyWeight > 0 ? (c / bodyWeight).toFixed(1) : '--';
    var fPerKg = bodyWeight > 0 ? (f / bodyWeight).toFixed(1) : '--';

    // Stacked bar widths
    var pKcal = p * 4, cKcal = c * 4, fKcal = f * 9;
    var fromMacros = pKcal + cKcal + fKcal;
    var pKcalPct = fromMacros > 0 ? Math.round(pKcal / fromMacros * 100) : 0;
    var cKcalPct = fromMacros > 0 ? Math.round(cKcal / fromMacros * 100) : 0;
    var fKcalPct = fromMacros > 0 ? 100 - pKcalPct - cKcalPct : 0;

    container.innerHTML =
        '<div class="nutrition-header"><h3>\ud83d\udcca Resumen Nutricional</h3><button class="nutrition-info-btn" id="nutrition-info-btn">?</button><span class="nutrition-meals">'+meals.join(' + ')+(complete?'':' \u00b7 Incompleto')+'</span></div>' +
        missingHtml +
        '<div class="nutrition-body">' +
            '<div class="nutrition-kcal-row">' +
                '<span class="nutrition-kcal-number">'+kcal+'</span>' +
                '<span class="nutrition-kcal-unit">kcal</span>' +
            '</div>' +
            '<div class="nutrition-stacked-bar">' +
                '<div class="stacked-seg stacked-protein" style="width:'+pKcalPct+'%"></div>' +
                '<div class="stacked-seg stacked-carbs" style="width:'+cKcalPct+'%"></div>' +
                '<div class="stacked-seg stacked-fat" style="width:'+fKcalPct+'%"></div>' +
            '</div>' +
            '<div class="nutrition-macro-cards">' +
                renderMacroCard('Prote\u00ednas', 'protein', p, pp, pKcalPct, pPerKg) +
                renderMacroCard('Carbos', 'carbs', c, cp, cKcalPct, cPerKg) +
                renderMacroCard('Grasas', 'fat', f, fp, fKcalPct, fPerKg) +
            '</div>' +
            '<div class="macro-tap-hint">\ud83d\udc46 Pulsa sobre cada macro para ver recomendaciones</div>' +
        '</div>';
}

function renderMacroCard(name, cls, grams, pctWeight, pctKcal, perKg) {
    return '<div class="macro-card macro-card-'+cls+'" data-macro="'+cls+'">' +
        '<div class="macro-card-ring" style="--ring-pct:'+pctKcal+';--ring-color:var(--'+cls+'-accent)">' +
            '<span class="macro-card-ring-value">'+pctKcal+'%</span>' +
        '</div>' +
        '<div class="macro-card-info">' +
            '<span class="macro-card-grams">'+grams+'g</span>' +
            '<span class="macro-card-perkg">'+perKg+' g/kg</span>' +
            '<span class="macro-card-name">'+name+'</span>' +
        '</div>' +
    '</div>';
}

function renderAll() {
    renderBreakfast();
    renderMealTable('lunch-tables',lunchCarbs,lunchProteins,selections.lunchCarb,selections.lunchProtein,'lunch');
    renderMealTable('dinner-tables',dinnerCarbs,dinnerProteins,selections.dinnerCarb,selections.dinnerProtein,'dinner');
    renderSupplements(); updateExtras(); renderNutritionSummary(); renderInfoBanner(); renderValidator(); renderDietSummary();
}

// ============================================================
// TABS
// ============================================================
function activateTab(name, scroll) {
    document.querySelectorAll('.main-tab[data-tab]').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active');});
    var btn = document.querySelector('.main-tab[data-tab="'+name+'"]');
    var panel = document.getElementById('tab-'+name);
    if (btn) btn.classList.add('active');
    if (panel) panel.classList.add('active');

    // Scroll so the tab panel content is visible right below the sticky tabs nav
    if (scroll && panel) {
        var tabsNav = document.querySelector('.main-tabs-nav:not(.trainer-tabs-nav)');
        var navH = tabsNav ? tabsNav.offsetHeight : 0;
        var panelTop = panel.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: panelTop - navH - 4, behavior: 'smooth' });
    }
}
function getDefaultTab() { return 'breakfast'; }

// ============================================================
// ONBOARDING
// ============================================================
var currentStep = 1;

// Body fat silhouettes data: [label, bf% male, bf% female]
var silhouetteData = {
    male: [
        { label: 'Muy definido', bf: 10, desc: '~8-12%', icon: '🏆' },
        { label: 'Definido', bf: 15, desc: '~13-16%', icon: '💪' },
        { label: 'Normal', bf: 20, desc: '~17-22%', icon: '👤' },
        { label: 'Algo de grasa', bf: 26, desc: '~23-28%', icon: '🫄' },
        { label: 'Sobrepeso', bf: 33, desc: '~29-35%+', icon: '⬤' }
    ],
    female: [
        { label: 'Muy definida', bf: 18, desc: '~16-20%', icon: '🏆' },
        { label: 'Definida', bf: 23, desc: '~21-25%', icon: '💪' },
        { label: 'Normal', bf: 28, desc: '~26-30%', icon: '👤' },
        { label: 'Algo de grasa', bf: 34, desc: '~31-36%', icon: '🫄' },
        { label: 'Sobrepeso', bf: 40, desc: '~37-42%+', icon: '⬤' }
    ]
};

function renderSilhouettes() {
    var sex = document.getElementById('calc-sex').value;
    var data = silhouetteData[sex] || silhouetteData.male;
    var currentBf = document.getElementById('calc-bf').value;
    var grid = document.getElementById('silhouette-grid');
    if (!grid) return;

    grid.innerHTML = data.map(function(item, idx) {
        var selected = parseFloat(currentBf) === item.bf;
        return '<div class="silhouette-card' + (selected ? ' selected' : '') + '" data-bf="' + item.bf + '">' +
            '<div class="silhouette-icon">' + item.icon + '</div>' +
            '<div class="silhouette-bar"><div class="silhouette-bar-fill" style="width:' + Math.min(100, item.bf * (sex === 'female' ? 2.2 : 2.8)) + '%"></div></div>' +
            '<div class="silhouette-label">' + item.label + '</div>' +
            '<div class="silhouette-pct">' + item.desc + '</div>' +
        '</div>';
    }).join('');
}

// Init silhouettes on load and sex change
document.getElementById('calc-sex').addEventListener('change', function() {
    document.getElementById('calc-bf').value = '';
    renderSilhouettes();
    estimateBodyFatFromBMI();
});

document.getElementById('silhouette-grid').addEventListener('click', function(e) {
    var card = e.target.closest('.silhouette-card');
    if (!card) return;
    document.querySelectorAll('.silhouette-card').forEach(function(c) { c.classList.remove('selected', 'suggested'); });
    card.classList.add('selected');
    document.getElementById('calc-bf').value = card.dataset.bf;
    var hint = document.getElementById('silhouette-hint');
    if (hint) hint.textContent = 'Selecciona la silueta que más se parezca a tu cuerpo actual.';
});

function showStep(n) {
    currentStep = n;
    document.querySelectorAll('.onboarding-step').forEach(function(s){s.classList.remove('active');});
    var step = document.getElementById('step-'+n);
    if (step) step.classList.add('active');
    document.querySelectorAll('.progress-dot').forEach(function(d) {
        d.classList.toggle('active', parseInt(d.dataset.step) <= n);
        d.classList.toggle('current', parseInt(d.dataset.step) === n);
    });
    window.scrollTo(0, 0);
}

function highlightInvalidFields(ids) {
    ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.classList.add('field-error');
        el.addEventListener('change', function handler() {
            el.classList.remove('field-error');
            el.removeEventListener('change', handler);
        });
        el.addEventListener('input', function handler() {
            el.classList.remove('field-error');
            el.removeEventListener('input', handler);
        });
    });
}

function validateStep1() {
    var age = document.getElementById('calc-age').value;
    var h = document.getElementById('calc-height').value;
    var w = document.getElementById('calc-weight').value;
    var invalid = [];
    if (!age || parseFloat(age) < 18 || parseFloat(age) > 99) invalid.push('calc-age');
    if (!h || parseFloat(h) < 100 || parseFloat(h) > 230) invalid.push('calc-height');
    if (!w || parseFloat(w) <= 0) invalid.push('calc-weight');
    if (invalid.length) highlightInvalidFields(invalid);
    return invalid.length === 0;
}

// Age warnings
(function() {
    var ageInput = document.getElementById('calc-age');
    var hint = document.getElementById('age-hint');

    // Limit to 3 digits while typing
    ageInput.addEventListener('input', function() {
        if (this.value.length > 3) this.value = this.value.slice(0, 3);
        // Clear warning while typing so it doesn't flash
        hint.textContent = '';
        hint.classList.remove('age-warning', 'age-elder');
        estimateBodyFatFromBMI();
    });

    // Show warnings only on blur (when user finishes typing)
    ageInput.addEventListener('blur', function() {
        var val = parseInt(this.value);
        if (val && val > 0 && val < 18) {
            hint.innerHTML = '⚠️ Para menores de 18 años, el cuerpo está en pleno desarrollo y las necesidades nutricionales son diferentes. ' +
                'Te recomendamos consultar con un médico o nutricionista especializado en adolescentes antes de seguir cualquier plan de alimentación.';
            hint.classList.add('age-warning');
            hint.classList.remove('age-elder');
        } else if (val && val > 122) {
            hint.innerHTML = '🏆 ¡¿' + val + ' años?! ¡Madre mía! El récord mundial de longevidad lo tiene Jeanne Calment con 122 años (1875-1997). ' +
                '¡Deberías llamar al Libro Guinness de los Récords ahora mismo porque esto es histórico! 📞🎉 ' +
                'Mientras tanto, pon tu edad real para que pueda calcular bien tu plan 😄';
            hint.classList.add('age-warning');
            hint.classList.remove('age-elder');
        } else if (val && val > 99) {
            hint.innerHTML = '🎉 ¡' + val + ' años! Enhorabuena, de verdad — llegar hasta aquí es un logro increíble y dice mucho de ti. ' +
                'Ninguna app de nutrición puede mejorar lo que tus años de vida ya demuestran. ' +
                'Sigue disfrutando y haciéndole caso a tu médico. ¡Eres una inspiración! 💪';
            hint.classList.remove('age-warning');
            hint.classList.add('age-elder');
        } else {
            hint.textContent = '';
            hint.classList.remove('age-warning', 'age-elder');
        }
    });
})();

// BMI → Body Fat estimation (Deurenberg et al., 1991)
function estimateBodyFatFromBMI() {
    var age = parseFloat(document.getElementById('calc-age').value);
    var h = parseFloat(document.getElementById('calc-height').value);
    var w = parseFloat(document.getElementById('calc-weight').value);
    var sex = document.getElementById('calc-sex').value;
    if (!h || !w || h < 100 || w < 30) return;

    var muscEl = document.getElementById('calc-muscularity');
    var muscVal = muscEl ? muscEl.value : '';
    var expEl = document.getElementById('calc-experience');
    var expVal = expEl ? expEl.value : '';

    // Don't auto-estimate until experience and muscularity are filled
    if (!muscVal || !expVal) {
        // Clear any previous auto-suggestion
        document.getElementById('calc-bf').value = '';
        document.querySelectorAll('.silhouette-card').forEach(function(c) {
            c.classList.remove('selected', 'suggested');
        });
        var hint = document.getElementById('silhouette-hint');
        if (hint) hint.textContent = '';
        return;
    }

    var bmi = w / ((h / 100) * (h / 100));
    var sexFactor = sex === 'male' ? 1 : 0;
    // Deurenberg formula (age optional for estimate)
    var ageVal = (age && age >= 18) ? age : 25;
    var estimatedBf = (1.20 * bmi) + (0.23 * ageVal) - (10.8 * sexFactor) - 5.4;

    // Adjust for muscularity and training experience
    // BMI-based formulas overestimate BF% in muscular individuals by 3-5%
    // (Esco et al., 2015; Jackson et al., 2002; Piers et al., 2000)
    var muscAdj = 0;
    if (muscVal === 'low') muscAdj = 1.5;
    else if (muscVal === 'high') muscAdj = -3;
    else if (muscVal === 'very-high') muscAdj = -5;

    var expAdj = 0;
    if (expVal === 'intermediate') expAdj = -1;
    else if (expVal === 'advanced') expAdj = -2;

    estimatedBf += muscAdj + expAdj;
    estimatedBf = Math.max(5, Math.min(50, estimatedBf));

    // Find closest silhouette
    var data = silhouetteData[sex] || silhouetteData.male;
    var closest = data[0];
    var minDist = Math.abs(estimatedBf - data[0].bf);
    for (var i = 1; i < data.length; i++) {
        var dist = Math.abs(estimatedBf - data[i].bf);
        if (dist < minDist) { minDist = dist; closest = data[i]; }
    }

    // Auto-select the estimated silhouette
    document.getElementById('calc-bf').value = closest.bf;
    document.querySelectorAll('.silhouette-card').forEach(function(c) {
        c.classList.remove('selected', 'suggested');
        if (parseFloat(c.dataset.bf) === closest.bf) {
            c.classList.add('selected', 'suggested');
        }
    });

    var hint = document.getElementById('silhouette-hint');
    if (hint) {
        var factors = ['IMC ' + bmi.toFixed(1)];
        if (muscVal === 'high' || muscVal === 'very-high') factors.push('masa muscular');
        if (expVal === 'intermediate' || expVal === 'advanced') factors.push('experiencia');
        hint.innerHTML = 'Estimación según tus datos (' + factors.join(', ') + '). <strong>Puedes cambiarlo</strong> si no te representa.';
    }
}

document.getElementById('calc-height').addEventListener('input', estimateBodyFatFromBMI);
document.getElementById('calc-weight').addEventListener('input', estimateBodyFatFromBMI);
document.getElementById('calc-muscularity').addEventListener('change', estimateBodyFatFromBMI);
document.getElementById('calc-experience').addEventListener('change', estimateBodyFatFromBMI);

function validateStep2() {
    var exp = document.getElementById('calc-experience').value;
    var musc = document.getElementById('calc-muscularity').value;
    var invalid = [];
    if (exp === '') invalid.push('calc-experience');
    if (musc === '') invalid.push('calc-muscularity');
    if (invalid.length) highlightInvalidFields(invalid);
    return invalid.length === 0;
}

function validateStep3() {
    var diet = document.getElementById('calc-diet-history').value;
    var appetite = document.getElementById('calc-appetite').value;
    var invalid = [];
    if (diet === '') invalid.push('calc-diet-history');
    if (appetite === '') invalid.push('calc-appetite');
    if (invalid.length) highlightInvalidFields(invalid);
    return invalid.length === 0;
}

function validateStep4() {
    var activity = document.getElementById('calc-activity').value;
    var stepsUnknown = document.getElementById('calc-steps-unknown').checked;
    var stepsVal = document.getElementById('calc-steps').value;
    var invalid = [];
    if (activity === '') invalid.push('calc-activity');
    if (!stepsUnknown && !stepsVal) invalid.push('calc-steps');
    if (invalid.length) highlightInvalidFields(invalid);
    return invalid.length === 0;
}

// Recommend goal based on body fat %
function getRecommendedGoal() {
    var bf = parseFloat(document.getElementById('calc-bf').value);
    if (!bf || bf <= 0) return null;
    var sex = document.getElementById('calc-sex').value;
    if (sex === 'male') {
        if (bf > 20) return 'cut';
        if (bf > 15) return 'recomp';
        if (bf > 12) return 'maintain';
        return 'bulk';
    } else {
        if (bf > 30) return 'cut';
        if (bf > 25) return 'recomp';
        if (bf > 20) return 'maintain';
        return 'bulk';
    }
}

function showGoalRecommendation() {
    var recommended = getRecommendedGoal();
    var recEl = document.getElementById('goal-recommendation');
    // Remove previous recommended badges (only in guided mode cards)
    document.querySelectorAll('#goal-cards .goal-card').forEach(function(c) { c.classList.remove('recommended'); });

    if (!recommended) {
        // If no BF selected, try to infer from experience + diet history
        var exp = document.getElementById('calc-experience').value;
        var dietHist = document.getElementById('calc-diet-history').value;
        if (exp === 'none' || exp === 'beginner') {
            if (dietHist === 'never' || dietHist === 'tried' || dietHist === 'yoyo') {
                recommended = 'recomp';
            }
        }
        if (!recommended) {
            recEl.style.display = 'none';
            return;
        }
        var recLabel = goalLabels[recommended];
        var msg = 'Según tu perfil, te recomendamos: <strong>' + goalIcons[recommended] + ' ' + recLabel + '</strong>';
        recEl.innerHTML = msg;
        recEl.style.display = '';
        var recCard = document.querySelector('#goal-cards .goal-card[data-goal="' + recommended + '"]');
        if (recCard) recCard.classList.add('recommended');
        return;
    }

    var bf = parseFloat(document.getElementById('calc-bf').value);
    var sex = document.getElementById('calc-sex').value;
    var sexLabel = sex === 'male' ? 'hombres' : 'mujeres';
    var recLabel = goalLabels[recommended];
    var msg = 'Con un <strong>' + bf + '% de grasa</strong> (' + sexLabel + '), te recomendamos: <strong>' + goalIcons[recommended] + ' ' + recLabel + '</strong>';
    recEl.innerHTML = msg;
    recEl.style.display = '';

    // Highlight the recommended card
    var recCard = document.querySelector('#goal-cards .goal-card[data-goal="' + recommended + '"]');
    if (recCard) recCard.classList.add('recommended');
}

// Training toggle
document.getElementById('calc-trains').addEventListener('change', function() {
    var details = document.getElementById('calc-training-details');
    if (this.value === 'yes') { details.classList.remove('hidden'); } else { details.classList.add('hidden'); }
});

// Steps unknown toggle
document.getElementById('calc-steps-unknown').addEventListener('change', function() {
    var stepsInput = document.getElementById('calc-steps');
    var hint = document.getElementById('steps-hint');
    if (this.checked) {
        stepsInput.disabled = true;
        stepsInput.value = '';
        hint.textContent = 'No pasa nada, se calculará sin pasos.';
    } else {
        stepsInput.disabled = false;
        hint.textContent = '';
        stepsInput.focus();
    }
});

// Steps hint
document.getElementById('calc-steps').addEventListener('input', function() {
    var hint = document.getElementById('steps-hint');
    var v = parseInt(this.value);
    if (!v || v <= 0) { hint.textContent = ''; hint.classList.remove('steps-joke'); return; }
    if (v > 50000) {
        var jokes = [
            '🚶‍♂️ ¿Haces el Camino de Santiago todos los días? Venga, pon los pasos reales 😄',
            '🌍 ¿Estás dando la vuelta al mundo andando? Sé sincero/a conmigo 😂',
            '🏃 Ni Forrest Gump hacía tantos pasos al día... ¡Ponme los de verdad!',
            '📍 ¿Vives en un aeropuerto y no paras de caminar? Pon algo más realista 😅',
            '🦶 50.000 pasos son unos 35-40km diarios... ¿Eres cartero en los Alpes? 🏔️'
        ];
        hint.innerHTML = jokes[Math.floor(Math.random() * jokes.length)];
        hint.classList.add('steps-joke');
        this.value = '';
        return;
    }
    hint.classList.remove('steps-joke');
    var w = parseFloat(document.getElementById('calc-weight').value) || 70;
    var kcal = Math.round(v * 0.04 * (w / 70));
    hint.textContent = '~' + kcal + ' kcal extra al día por caminar';
});

// Step navigation
document.getElementById('next-1').addEventListener('click', function() {
    var age = parseInt(document.getElementById('calc-age').value);
    if (age && age < 18) {
        showAppAlert('Este plan está diseñado para adultos (18+). Si eres menor de 18, tu cuerpo aún está en desarrollo y tus necesidades nutricionales son diferentes. Consulta con un médico o nutricionista antes de seguir cualquier dieta.');
        return;
    }
    if (age && age > 122) {
        showAppAlert('🏆 ¡¿' + age + ' años?! El récord mundial de longevidad lo tiene Jeanne Calment con 122 años (1875-1997). ¡Deberías llamar al Libro Guinness de los Récords porque acabas de batir el récord de la historia de la humanidad! 📞🎉<br><br>Pon tu edad real para que pueda calcular bien tu plan 😄');
        return;
    }
    if (age && age > 99) {
        showAppAlert('¡' + age + ' años! Eres un ejemplo de vida 🎉 Pero las fórmulas nutricionales no están validadas para mayores de 99 años — las estimaciones no serían fiables. Te recomendamos consultar con tu médico o nutricionista para un plan personalizado.');
        return;
    }
    var height = parseFloat(document.getElementById('calc-height').value);
    if (height && height < 100) {
        showAppAlert('📏 ¿' + height + ' cm? ¡No intentes engañarme! 😄 Ni el hobbit más pequeño de la Comarca mide menos de 1 metro. Pon tu altura real para que el plan tenga sentido.');
        highlightInvalidFields(['calc-height']);
        return;
    }
    if (height && height > 230) {
        showAppAlert('🦒 ¿' + height + ' cm? ¡No me engañes! El hombre más alto de la historia, Robert Wadlow, medía 272 cm y necesitaba ayuda para caminar. Si mides más de 2.30m deberías estar jugando en la NBA, no usando una app de nutrición 🏀😂<br><br>Pon tu altura real, anda.');
        highlightInvalidFields(['calc-height']);
        return;
    }
    if (!validateStep1()) { showAppAlert('Rellena todos los campos (edad, altura y peso) para continuar.'); return; }
    userName = (document.getElementById('calc-name').value || '').trim();
    showStep(2);
});

document.getElementById('back-2').addEventListener('click', function() { showStep(1); });
document.getElementById('next-2').addEventListener('click', function() {
    if (!validateStep2()) { showAppAlert('Rellena todos los campos para continuar: experiencia de entrenamiento y nivel de masa muscular.'); return; }
    showStep(3);
});

document.getElementById('back-3').addEventListener('click', function() { showStep(2); });
document.getElementById('next-3').addEventListener('click', function() {
    if (!validateStep3()) { showAppAlert('Rellena todos los campos para continuar: historial de dietas y nivel de apetito.'); return; }
    showStep(4);
});

document.getElementById('back-4').addEventListener('click', function() { showStep(3); });
document.getElementById('next-4').addEventListener('click', function() {
    if (!validateStep4()) {
        var activity = document.getElementById('calc-activity').value;
        if (activity === '') { showAppAlert('Rellena todos los campos para continuar.'); return; }
        showAppAlert('Indica tu media de pasos diarios o marca "No lo sé".'); return;
    }
    showStep(5);
});

document.getElementById('back-5').addEventListener('click', function() { showStep(4); });

// Path selector
document.getElementById('path-selector').addEventListener('click', function(e) {
    var card = e.target.closest('.path-card');
    if (!card) return;
    document.querySelectorAll('.path-card').forEach(function(c) { c.classList.remove('selected'); });
    card.classList.add('selected');
    userPath = card.dataset.path;

    var guidedMode = document.getElementById('guided-mode');
    var deadlineMode = document.getElementById('deadline-mode');
    var btn = document.getElementById('next-5');

    if (userPath === 'guided') {
        guidedMode.style.display = '';
        deadlineMode.style.display = 'none';
        showGoalRecommendation();
        btn.classList.toggle('disabled', !userGoal);
    } else {
        guidedMode.style.display = 'none';
        deadlineMode.style.display = '';
        btn.classList.add('disabled');
        // Check if already has selections
        if (userGoal && deadlineWeeks) btn.classList.remove('disabled');
    }
});

// Goal selection (guided mode)
document.getElementById('goal-cards').addEventListener('click', function(e) {
    var card = e.target.closest('.goal-card');
    if (!card) return;
    document.querySelectorAll('#goal-cards .goal-card').forEach(function(c){c.classList.remove('selected');});
    card.classList.add('selected');
    userGoal = card.dataset.goal;
    document.getElementById('next-5').classList.remove('disabled');
});

// Goal selection (deadline mode)
document.getElementById('deadline-goal-cards').addEventListener('click', function(e) {
    var card = e.target.closest('.goal-card');
    if (!card) return;
    document.querySelectorAll('#deadline-goal-cards .goal-card').forEach(function(c){c.classList.remove('selected');});
    card.classList.add('selected');
    userGoal = card.dataset.goal;
    document.getElementById('deadline-fields').style.display = '';
    updateDeadlineSummary();
    if (deadlineWeeks) document.getElementById('next-5').classList.remove('disabled');
});

// Deadline weeks change
document.getElementById('deadline-weeks').addEventListener('change', function() {
    deadlineWeeks = parseInt(this.value) || null;
    updateDeadlineSummary();
    if (userGoal && deadlineWeeks) document.getElementById('next-5').classList.remove('disabled');
    else document.getElementById('next-5').classList.add('disabled');
});

function updateDeadlineSummary() {
    var el = document.getElementById('deadline-summary');
    if (!userGoal || !deadlineWeeks) { el.innerHTML = ''; return; }

    var w = parseFloat(document.getElementById('calc-weight').value) || 75;
    var result = calculateTDEE();
    if (!result) { el.innerHTML = ''; return; }
    var tdee = result.tdee;

    var summary = '';
    if (userGoal === 'cut') {
        // Safe rate: 0.5-1% BW/week
        var safeRate = w * 0.007; // ~0.7% BW/week (middle ground)
        var expectedLoss = Math.round(safeRate * deadlineWeeks * 10) / 10;
        var deficit = Math.round(safeRate * 1100); // 7700/7 ≈ 1100
        var deficitPct = Math.round(deficit / tdee * 100);

        if (deficitPct > 25) {
            summary = '<span class="deadline-warning">⚠️ Para tu plazo de ' + deadlineWeeks + ' semanas, el déficit necesario (~' + deficitPct + '%) es agresivo.</span> ' +
                'Déficits mayores del 25% aumentan la pérdida de músculo y la fatiga. ' +
                '<strong>Puedes continuar</strong>, pero considera ampliar el plazo para mejores resultados. ' +
                '<br><br>Déficit aplicado: <strong>~' + deficit + ' kcal/día</strong> · Pérdida estimada: <strong>~' + expectedLoss + ' kg</strong> en ' + deadlineWeeks + ' semanas.';
        } else {
            summary = '📊 Con un déficit del <strong>~' + deficitPct + '%</strong> (~' + deficit + ' kcal/día), ' +
                'puedes perder aproximadamente <strong>' + expectedLoss + ' kg de grasa</strong> en ' + deadlineWeeks + ' semanas. ' +
                'Ritmo saludable y sostenible.';
        }
    } else if (userGoal === 'bulk') {
        var weeklyGain = 0.15; // ~0.15kg/week realista con grasa incluida
        var expectedGain = Math.round(weeklyGain * deadlineWeeks * 10) / 10;
        var muscleGain = Math.round(expectedGain * 0.5 * 10) / 10; // ~50% muscle
        var surplus = Math.round(weeklyGain * 1100);
        var surplusPct = Math.round(surplus / tdee * 100);

        if (deadlineWeeks < 8) {
            summary = '<span class="deadline-warning">⚠️ ' + deadlineWeeks + ' semanas es poco tiempo para ganar músculo significativo.</span> ' +
                'La ganancia muscular real es un proceso lento (~0.25kg músculo/semana max en principiantes). ' +
                '<strong>Puedes continuar</strong>, pero gestiona expectativas. ' +
                '<br><br>Superávit: <strong>~' + surplus + ' kcal/día</strong> · Ganancia estimada: <strong>~' + expectedGain + ' kg</strong> (' + muscleGain + ' kg músculo) en ' + deadlineWeeks + ' semanas.';
        } else {
            summary = '📊 Con un superávit del <strong>~' + surplusPct + '%</strong> (~' + surplus + ' kcal/día), ' +
                'puedes ganar aproximadamente <strong>' + expectedGain + ' kg</strong> (' + muscleGain + ' kg músculo) en ' + deadlineWeeks + ' semanas.';
        }
    } else if (userGoal === 'recomp') {
        summary = '📊 La recomposición corporal es un proceso gradual. En <strong>' + deadlineWeeks + ' semanas</strong> puedes esperar: ' +
            'reducción visible de grasa + aumento de fuerza y tono muscular. No esperes grandes cambios en la báscula — el progreso se mide en el espejo y las marcas del gym.';
        if (deadlineWeeks < 8) {
            summary = '<span class="deadline-warning">⚠️ La recomposición requiere más tiempo para ser visible.</span> ' +
                'Los primeros resultados claros suelen aparecer a partir de las 8-12 semanas. ' +
                '<strong>Puedes continuar</strong>, pero no esperes milagros en ' + deadlineWeeks + ' semanas.' +
                '<br><br>' + summary;
        }
    } else { // maintain
        summary = '📊 En <strong>' + deadlineWeeks + ' semanas</strong> a mantenimiento: peso estable, mejor digestión, más energía. ' +
            'Si entrenas fuerza, puedes mejorar ligeramente la composición corporal sin cambiar el peso.';
    }

    el.innerHTML = summary;
}

// Override getRecommendedKcal for deadline mode
function getDeadlineKcal(tdee, goal, weeks) {
    var w = parseFloat(document.getElementById('calc-weight').value) || 75;
    var appetite = document.getElementById('calc-appetite') ? document.getElementById('calc-appetite').value : '';
    var dietHist = document.getElementById('calc-diet-history') ? document.getElementById('calc-diet-history').value : '';
    var conservative = (appetite === 'high') || (dietHist === 'yoyo') || (dietHist === 'tried');

    if (goal === 'cut') {
        var safeRate = w * 0.007; // 0.7% BW/week
        var deficit = Math.round(safeRate * 1100);
        // Cap at 25% max deficit
        var maxDeficit = Math.round(tdee * 0.25);
        deficit = Math.min(deficit, maxDeficit);
        if (conservative) deficit = Math.round(deficit * 0.8); // softer for high-appetite/yoyo
        return Math.round((tdee - deficit) / 100) * 100;
    } else if (goal === 'bulk') {
        var surplus = Math.round(0.15 * 1100); // 0.15kg/week gain
        return Math.round((tdee + surplus) / 100) * 100;
    } else if (goal === 'recomp') {
        return Math.round(tdee * 0.95 / 100) * 100;
    } else {
        return Math.round(tdee / 100) * 100;
    }
}

function getGoalMismatchWarning(recommended, chosen) {
    var bf = parseFloat(document.getElementById('calc-bf').value) || 0;
    var sex = document.getElementById('calc-sex').value;
    var recLabel = goalLabels[recommended];
    var chosenLabel = goalLabels[chosen];

    var msg = '⚠️ Has elegido "' + chosenLabel + '" pero te recomendamos "' + recLabel + '".\n\n';

    // Specific warnings based on mismatch
    if (recommended === 'cut' && chosen === 'bulk') {
        msg += 'Con un ' + bf + '% de grasa corporal, hacer un bulk (superávit) ahora significa ganar aún más grasa. ' +
            'Los estudios muestran que por encima del ' + (sex === 'male' ? '20%' : '30%') + ' de grasa, ' +
            'la partición calórica empeora: una mayor proporción del exceso se almacena como grasa en vez de músculo (Forbes, 2000; Hall, 2007). ' +
            'Además, la sensibilidad a la insulina se reduce, lo que dificulta la ganancia muscular limpia.\n\n' +
            'Lo ideal sería primero reducir grasa (cut) y luego hacer un bulk desde un % más bajo.';
    } else if (recommended === 'cut' && chosen === 'maintain') {
        msg += 'Con un ' + bf + '% de grasa corporal, mantenerte significa quedarte en un rango que puede afectar tu salud metabólica a largo plazo. ' +
            'Un déficit moderado del 15-20% te permitiría perder grasa preservando músculo (Helms et al., 2014) y mejorar tu perfil hormonal y sensibilidad a la insulina.';
    } else if (recommended === 'cut' && chosen === 'recomp') {
        msg += 'La recomposición es viable, pero con un ' + bf + '% de grasa un déficit moderado (cut) sería más eficiente. ' +
            'La recomposición funciona mejor en rangos de grasa intermedios. Con tu % actual, un cut te dará resultados más rápidos y visibles, ' +
            'y luego puedes hacer recomp o bulk desde una mejor base (Barakat et al., 2020).';
    } else if (recommended === 'bulk' && chosen === 'cut') {
        msg += 'Con un ' + bf + '% de grasa ya estás bastante definido/a. Hacer un déficit ahora puede hacerte perder masa muscular ' +
            'sin mucho margen de grasa que eliminar. Los estudios indican que por debajo del ' + (sex === 'male' ? '12%' : '20%') + ' de grasa, ' +
            'los déficits aumentan significativamente la pérdida de tejido magro (Helms et al., 2014). ' +
            'Mejor aprovecha tu buena base para ganar músculo con un superávit controlado.';
    } else if (recommended === 'bulk' && chosen === 'maintain') {
        msg += 'Tu % de grasa es bastante bajo (' + bf + '%). Mantenerte aquí es una opción válida, pero si tu objetivo es ganar músculo, ' +
            'necesitas un superávit calórico para maximizar la síntesis proteica y la ganancia muscular (Slater et al., 2019). ' +
            'A mantenimiento la ganancia muscular será mínima o nula.';
    } else if (recommended === 'recomp' && chosen === 'bulk') {
        msg += 'Con tu ' + bf + '% de grasa actual, un bulk te hará acumular grasa adicional antes de estar en un punto óptimo. ' +
            'La recomposición te permite mejorar tu composición corporal (ganar músculo + perder grasa) sin pasar por una fase de exceso de grasa. ' +
            'Es más lenta pero más sostenible a medio plazo (Barakat et al., 2020).';
    } else if (recommended === 'recomp' && chosen === 'cut') {
        msg += 'Un cut no es mala opción, pero con tu % de grasa actual (' + bf + '%) la recomposición te daría mejores resultados estéticos: ' +
            'ganar algo de músculo mientras pierdes grasa, en vez de solo perder peso. ' +
            'Es ideal para tu rango y nivel de experiencia.';
    } else if (recommended === 'maintain' && chosen === 'cut') {
        msg += 'Ya tienes un buen % de grasa (' + bf + '%). Seguir perdiendo puede comprometer tu rendimiento, tu recuperación y tu bienestar hormonal. ' +
            'A estos niveles, mantener es la opción más saludable y sostenible.';
    } else if (recommended === 'maintain' && chosen === 'bulk') {
        msg += 'Tu % de grasa está en un buen punto (' + bf + '%). Un bulk moderado es viable desde aquí, pero ten en cuenta que ' +
            'inevitablemente ganarás algo de grasa junto con el músculo. Si te sientes bien donde estás, mantener puede ser lo ideal.';
    } else {
        msg += 'Según tus datos, "' + recLabel + '" sería la opción más adecuada para tu situación actual.';
    }

    msg += '\n\n¿Quieres continuar con "' + chosenLabel + '" igualmente?';
    return msg;
}

function proceedToStep6() {
    var result = calculateTDEE();
    if (!result) { showAppAlert('Error calculando TDEE.'); return false; }
    var btn = document.getElementById('next-5');
    delete btn.dataset.confirmed;
    userTdee = result.tdee;

    // Use deadline calc if in deadline mode
    if (userPath === 'deadline' && deadlineWeeks) {
        recommendedKcal = getDeadlineKcal(result.tdee, userGoal, deadlineWeeks);
    } else {
        recommendedKcal = getRecommendedKcal(result.tdee, userGoal);
    }

    document.getElementById('ob-tdee').textContent = result.tdee;
    document.getElementById('ob-recommended').textContent = recommendedKcal;

    // Populate TDEE breakdown
    var trainExtra = result.tdee - result.neat - result.stepsKcal;
    var breakdownHTML = '<div class="tdee-row"><span>🔥 Metabolismo basal (BMR)</span><strong>' + result.bmr + ' kcal</strong></div>';
    var neatExtra = result.neat - result.bmr;
    breakdownHTML += '<div class="tdee-row"><span>🚶 Actividad diaria (NEAT)</span><strong>+' + neatExtra + ' kcal</strong></div>';
    if (result.stepsKcal > 0) {
        breakdownHTML += '<div class="tdee-row"><span>👟 Pasos diarios</span><strong>+' + result.stepsKcal + ' kcal</strong></div>';
    }
    if (trainExtra > 0) {
        breakdownHTML += '<div class="tdee-row"><span>🏋️ Entrenamiento</span><strong>+' + Math.round(trainExtra) + ' kcal</strong></div>';
    }
    breakdownHTML += '<div class="tdee-row tdee-total"><span>= TDEE total</span><strong>' + result.tdee + ' kcal/día</strong></div>';
    document.getElementById('tdee-breakdown').innerHTML = breakdownHTML;

    return true;
}

// TDEE info popup toggle
document.getElementById('tdee-info-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    var popup = document.getElementById('tdee-info-popup');
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('tdee-info-close').addEventListener('click', function() {
    document.getElementById('tdee-info-popup').style.display = 'none';
});

document.getElementById('next-5').addEventListener('click', function() {
    if (!userGoal) return;

    // Validate deadline mode
    if (userPath === 'deadline' && !deadlineWeeks) {
        showAppAlert('Selecciona el plazo de tiempo para tu objetivo.');
        highlightInvalidFields(['deadline-weeks']);
        return;
    }

    // Check if user chose a different goal than recommended (only in guided mode)
    if (userPath === 'guided') {
        var recommended = getRecommendedGoal();
        if (recommended && userGoal !== recommended && !this.dataset.confirmed) {
            var warnings = getGoalMismatchWarning(recommended, userGoal);
            if (warnings) {
                var self = this;
                showAppConfirm(warnings, function() {
                    self.dataset.confirmed = 'true';
                    self.click();
                });
                return;
            }
        }
    }

    if (!proceedToStep6()) return;

    var deficitAbs = userTdee - recommendedKcal;
    var surplusAbs = recommendedKcal - userTdee;
    var deadlineLabel = (userPath === 'deadline' && deadlineWeeks) ? ' · ' + deadlineWeeks + ' semanas' : '';

    if (userGoal === 'cut') {
        document.getElementById('ob-goal-label').textContent = '🔥 Recomendado';
        var defPct = Math.round(deficitAbs / userTdee * 100);
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Déficit del ~' + defPct + '%' + deadlineLabel;
        document.getElementById('ob-explanation').innerHTML =
            'Para <strong>perder grasa</strong> necesitas un <strong>déficit calórico</strong>: ingerir menos calorías de las que gastas. ' +
            'Te recomendamos un <strong>déficit moderado del 20%</strong> (~' + deficitAbs + ' kcal/día menos). ' +
            'La evidencia científica muestra que déficits del 15-25% son óptimos para perder grasa preservando masa muscular ' +
            '<em>(<a href="https://pubmed.ncbi.nlm.nih.gov/24864135/" target="_blank" rel="noopener noreferrer">Helms et al., 2014</a>; <a href="https://pubmed.ncbi.nlm.nih.gov/24571926/" target="_blank" rel="noopener noreferrer">Trexler et al., 2014</a>)</em>. ' +
            'Déficits más agresivos aumentan la pérdida de músculo y reducen la adherencia.';
    } else if (userGoal === 'recomp') {
        document.getElementById('ob-goal-label').textContent = '🔄 Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Déficit mínimo ~5%' + deadlineLabel;
        document.getElementById('ob-explanation').innerHTML =
            'La <strong>recomposición corporal</strong> busca ganar músculo y perder grasa a la vez. ' +
            'Se consigue con un <strong>déficit mínimo (~5%)</strong>, alta proteína (1.6-2.2g/kg) y entrenamiento de fuerza. ' +
            'Estudios demuestran que personas con experiencia intermedia pueden lograrlo con alta adherencia al entrenamiento ' +
            '<em>(<a href="https://doi.org/10.1519/SSC.0000000000000584" target="_blank" rel="noopener noreferrer">Barakat et al., 2020</a>)</em>. Es un proceso más lento que bulk+cut pero mejora la composición corporal sin fases extremas.';
    } else if (userGoal === 'bulk') {
        document.getElementById('ob-goal-label').textContent = '💪 Recomendado';
        var surPct = Math.round(surplusAbs / userTdee * 100);
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Superávit del ~' + surPct + '%' + deadlineLabel;
        document.getElementById('ob-explanation').innerHTML =
            'Para <strong>ganar masa muscular</strong> necesitas un <strong>superávit calórico</strong>: comer por encima de tu gasto. ' +
            'Te recomendamos un <strong>superávit moderado del 15%</strong> (~' + surplusAbs + ' kcal/día más). ' +
            'Un superávit controlado maximiza la síntesis proteica minimizando la ganancia de grasa ' +
            '<em>(<a href="https://pubmed.ncbi.nlm.nih.gov/31482093/" target="_blank" rel="noopener noreferrer">Slater et al., 2019</a>)</em>. Superávits excesivos no aceleran la ganancia muscular, solo acumulan más grasa.';
    } else {
        document.getElementById('ob-goal-label').textContent = '⚖️ Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Mantenimiento' + deadlineLabel;
        document.getElementById('ob-explanation').innerHTML =
            'Para <strong>mantener tu peso</strong>, come a tu nivel de gasto calórico (TDEE). ' +
            'Tu composición corporal se mantendrá estable. Si entrenas con intensidad suficiente, ' +
            'incluso a mantenimiento puedes mejorar ligeramente la relación músculo/grasa.';
    }

    // ---- Contextual tips based on training / steps ----
    var trains = document.getElementById('calc-trains').value === 'yes';
    var trainType = trains ? document.getElementById('calc-train-type').value : null;
    var stepsVal = parseInt(document.getElementById('calc-steps').value);
    var stepsUnknown = document.getElementById('calc-steps-unknown').checked;
    var lowSteps = stepsUnknown || !stepsVal || stepsVal < 8000;
    var isStrength = trainType === 'strength' || trainType === 'mixed';

    var tips = [];

    // Tip: strength training
    if (!trains) {
        tips.push({
            icon: '🏋️',
            title: 'Empieza a entrenar fuerza',
            text: 'El entrenamiento de fuerza es el <strong>estímulo más importante</strong> para mantener y ganar masa muscular, ' +
                  'especialmente en déficit calórico. Sin él, parte del peso perdido será músculo. ' +
                  'La OMS recomienda mínimo <strong>2 días/semana</strong> de ejercicio de fuerza. ' +
                  'Si nunca has entrenado, es el mejor momento para empezar: ganarás músculo incluso perdiendo grasa.'
        });
    } else if (!isStrength) {
        tips.push({
            icon: '🏋️',
            title: 'Añade entrenamiento de fuerza',
            text: 'Tu entreno actual (' + document.getElementById('calc-train-type').selectedOptions[0].text + ') es genial para la salud cardiovascular, ' +
                  'pero para <strong>preservar músculo</strong> (o ganarlo) es muy recomendable añadir al menos <strong>2 sesiones de fuerza/semana</strong>. ' +
                  'La combinación de fuerza + cardio da los mejores resultados para la composición corporal.'
        });
    }

    // Tip: walking / NEAT
    if (lowSteps) {
        tips.push({
            icon: '🚶',
            title: 'Camina más: la herramienta más infravalorada',
            text: 'Caminar es la forma más fácil y sostenible de aumentar tu gasto calórico diario (NEAT). ' +
                  'Una meta-análisis de 15 estudios (<em><a href="https://pubmed.ncbi.nlm.nih.gov/35247352/" target="_blank" rel="noopener noreferrer">Paluch et al., Lancet 2022</a></em>) demuestra que cada ' +
                  '<strong>2.000 pasos/día adicionales</strong> reducen la mortalidad un 8-11%. ' +
                  '<strong>10.000 pasos/día</strong> pueden suponer ~300-500 kcal extra sin estrés articular ni fatiga. ' +
                  'Intenta caminar al trabajo, usar escaleras o pasear 15-20 min después de comer (esto además mejora la glucosa postprandial).'
        });
    }

    // Tip: protein
    if (userGoal === 'cut' || userGoal === 'recomp') {
        tips.push({
            icon: '🥩',
            title: 'Proteína alta: clave en déficit',
            text: 'En déficit calórico, la proteína es tu mejor aliada para <strong>preservar masa muscular</strong>. ' +
                  'Se recomienda ingerir entre <strong>1.6-2.4g de proteína por kg</strong> de peso corporal al día ' +
                  '<em>(<a href="https://pubmed.ncbi.nlm.nih.gov/28642676/" target="_blank" rel="noopener noreferrer">Jäger et al., ISSN 2017</a>)</em>. Esta dieta ya está diseñada con alta proteína para proteger tu músculo.'
        });
    }

    // Tip: high appetite
    var appetite = document.getElementById('calc-appetite').value;
    if (appetite === 'high' && (userGoal === 'cut' || userGoal === 'recomp')) {
        tips.push({
            icon: '🥦',
            title: 'Control del hambre',
            text: 'Con apetito alto, prioriza alimentos con <strong>alto volumen y baja densidad calórica</strong>: verduras, frutas, proteínas magras y legumbres. ' +
                  'Beber agua antes de comer, incluir fibra y repartir la proteína en las 3 comidas ayuda a controlar la saciedad. ' +
                  'Este plan incluye abundante verdura y proteína en cada comida precisamente para esto.'
        });
    }

    // Tip: diet history (yoyo / tried before)
    var dietHistory = document.getElementById('calc-diet-history').value;
    if (dietHistory === 'yoyo' || dietHistory === 'tried') {
        tips.push({
            icon: '🔄',
            title: 'Evita el efecto rebote',
            text: 'Si antes no mantuviste la dieta o recuperaste peso, el problema no fuiste tú: probablemente el déficit era demasiado agresivo. ' +
                  'Este plan usa un <strong>déficit moderado y sostenible</strong> que no genera ansiedad ni hambre excesiva. ' +
                  'La clave es <strong>no tener prisa</strong>: perder 0.5-1% de peso corporal/semana es el rango óptimo para no perder músculo ni motivación.'
        });
    }

    // Tip: beginner gains
    var experience = document.getElementById('calc-experience').value;
    if ((experience === 'none' || experience === 'beginner') && trains) {
        tips.push({
            icon: '🚀',
            title: 'Ventaja de principiante',
            text: 'Al empezar a entrenar fuerza, tu cuerpo tiene un gran potencial de <strong>ganancia muscular rápida</strong> ("newbie gains"). ' +
                  'Incluso en déficit calórico puedes ganar músculo y perder grasa a la vez durante los primeros meses. Aprovéchalo al máximo.'
        });
    }

    // Tip: alcohol
    var alcoholLevel = document.getElementById('calc-alcohol') ? document.getElementById('calc-alcohol').value : 'none';
    if (alcoholLevel !== 'none') {
        var alcoholDailyKcal = getAlcoholKcalPerDay();
        var tipText = '';
        if (alcoholLevel === 'occasional') {
            tipText = 'Tu consumo es <strong>bajo-moderado</strong>. Aun así, el alcohol aporta ~' + alcoholDailyKcal + ' kcal/día de media ' +
                      'que este plan ya descuenta de tu presupuesto calórico de comida. El alcohol <strong>inhibe la oxidación de grasas</strong> temporalmente ' +
                      '<em>(<a href="https://pubmed.ncbi.nlm.nih.gov/1545851/" target="_blank" rel="noopener noreferrer">Suter et al., 1992</a>)</em> y reduce la síntesis proteica muscular un 24-37% ' +
                      '<em>(<a href="https://pubmed.ncbi.nlm.nih.gov/24533082/" target="_blank" rel="noopener noreferrer">Parr et al., 2014</a>)</em>. Si puedes reducirlo, mejor; si no, es preferible concentrarlo en 1-2 días sin entrenamiento.';
        } else {
            tipText = 'Tu consumo es <strong>' + (alcoholLevel === 'moderate' ? 'moderado' : 'frecuente') + '</strong>, lo que supone ~<strong>' + alcoholDailyKcal + ' kcal/día</strong> extra de media. ' +
                      'Hemos ajustado tu presupuesto de comida para compensar esas calorías. Pero el impacto va más allá de las calorías: ' +
                      'el alcohol <strong>inhibe la quema de grasa</strong> durante horas <em>(<a href="https://pubmed.ncbi.nlm.nih.gov/1545851/" target="_blank" rel="noopener noreferrer">Suter et al., 1992</a>)</em>, ' +
                      'reduce la <strong>síntesis proteica muscular</strong> un 24-37% <em>(<a href="https://pubmed.ncbi.nlm.nih.gov/24533082/" target="_blank" rel="noopener noreferrer">Parr et al., 2014</a>)</em>, ' +
                      'y empeora la calidad del sueño (que es clave para la recuperación). ' +
                      'Reducir a ≤2 días/semana con ≤2 bebidas por ocasión mejoraría significativamente tus resultados.';
        }
        tips.push({
            icon: '🍺',
            title: 'Sobre el alcohol',
            text: tipText
        });
    }

    // Tip: walking (age-adapted)
    var ageVal = parseInt(document.getElementById('calc-age').value) || 30;
    if (lowSteps && ageVal >= 60) {
        tips.push({
            icon: '🌳',
            title: 'Caminar es tu ejercicio estrella',
            text: 'A partir de los 60, caminar es la actividad con <strong>mejor relación beneficio/riesgo</strong>. ' +
                  'No necesitas 10.000 pasos: a partir de <strong>6.000-8.000 pasos/día</strong> ya se observan reducciones significativas ' +
                  'en mortalidad por todas las causas <em>(<a href="https://pubmed.ncbi.nlm.nih.gov/35247352/" target="_blank" rel="noopener noreferrer">Paluch et al., Lancet 2022</a>)</em>. ' +
                  'Empieza con paseos cortos (15-20 min) y ve aumentando gradualmente. Pasear después de comer además mejora la glucosa postprandial.'
        });
    }

    // Tip: adherence / patience
    tips.push({
        icon: '📅',
        title: 'La constancia es lo que funciona',
        text: (userName ? escapeHtml(userName) + ', no' : 'No') + ' existe la dieta perfecta, solo la que puedes <strong>mantener a largo plazo</strong>. ' +
              'Los cambios se ven en semanas, no en días. Pésate siempre en las mismas condiciones (mañana, en ayunas) ' +
              'y compara <strong>medias semanales</strong>, no el día a día. ' +
              'Si algún día te sales del plan, simplemente retómalo al día siguiente.'
    });

    var tipsHTML = tips.map(function(tip) {
        return '<div class="ob-tip-card">' +
            '<span class="ob-tip-icon">' + tip.icon + '</span>' +
            '<div class="ob-tip-content">' +
                '<strong class="ob-tip-title">' + tip.title + '</strong>' +
                '<p class="ob-tip-text">' + tip.text + '</p>' +
            '</div>' +
        '</div>';
    }).join('');

    document.getElementById('ob-tips').innerHTML =
        '<h3 class="ob-tips-heading">💡 Recomendaciones ' + (userName ? 'para ' + escapeHtml(userName) : 'para ti') + '</h3>' +
        '<div class="ob-tips-grid">' + tipsHTML + '</div>';

    showStep(6);
});

document.getElementById('back-6').addEventListener('click', function() { showStep(5); });

// ---- Disclaimer ----
function populateDisclaimer() {
    // Fill alcohol disclaimer block if applicable
    var alcoholEl = document.getElementById('disclaimer-alcohol');
    if (alcoholEl) {
        var alcohol = document.getElementById('calc-alcohol') ? document.getElementById('calc-alcohol').value : 'none';
        if (alcohol !== 'none') {
            var dailyKcal = getAlcoholKcalPerDay();
            alcoholEl.innerHTML = '<h4>🍺 Alcohol y composición corporal</h4>' +
                '<p>Tu consumo de alcohol supone aproximadamente <strong>~' + dailyKcal + ' kcal/día</strong> de media que hemos descontado de tu presupuesto de comida. ' +
                'La evidencia científica muestra que:</p>' +
                '<ul class="disclaimer-refs">' +
                '<li>El alcohol <strong>inhibe la oxidación de grasas</strong> durante 4-8 horas tras su consumo <em>(<a href="https://pubmed.ncbi.nlm.nih.gov/1545851/" target="_blank" rel="noopener noreferrer">Suter et al., Am J Clin Nutr 1992</a>)</em></li>' +
                '<li>Reduce la <strong>síntesis proteica muscular</strong> un 24-37% incluso con ingesta proteica adecuada <em>(<a href="https://pubmed.ncbi.nlm.nih.gov/24533082/" target="_blank" rel="noopener noreferrer">Parr et al., PLoS ONE 2014</a>)</em></li>' +
                '<li>El mayor estudio global (<a href="https://pubmed.ncbi.nlm.nih.gov/30146330/" target="_blank" rel="noopener noreferrer">GBD 2018, Lancet</a>) concluye que el nivel de consumo que <strong>minimiza riesgos para la salud es cero</strong></li>' +
                '<li>Si decides beber, limitar a <strong>≤2 bebidas, ≤2 días/semana</strong>, preferiblemente en días sin entrenamiento, minimiza el impacto</li>' +
                '</ul>';
        } else {
            alcoholEl.style.display = 'none';
        }
    }
}

// Disclaimer toggle (expand/collapse)
(function() {
    var header = document.querySelector('.disclaimer-header[data-toggle="disclaimer-details"]');
    if (header) {
        header.addEventListener('click', function() {
            var body = document.getElementById('disclaimer-details-body');
            var toggle = header.querySelector('.disclaimer-toggle');
            if (body.classList.contains('collapsed')) {
                body.classList.remove('collapsed');
                toggle.textContent = '▼';
            } else {
                body.classList.add('collapsed');
                toggle.textContent = '▶';
            }
        });
    }
})();

document.getElementById('start-plan').addEventListener('click', function() {
    currentKcal = recommendedKcal;
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('app-wrapper').style.display = '';
    document.getElementById('selection-validator').classList.remove('hidden');
    document.getElementById('kcal-display').textContent = currentKcal;
    window.scrollTo(0, 0);
    updateSliderRange();
    renderAll();
    activateTab(getDefaultTab());
    populateDisclaimer();
    populateBodyTimeline();
    saveAllState();
    setupPublicTabsVisibility();

    // Show welcome modal on first visit
    if (!localStorage.getItem('welcomeModalSeen')) {
        document.getElementById('welcome-modal').style.display = 'flex';
    }
});

// Dev skip button — fill dummy data and jump to app
document.getElementById('dev-skip-btn').addEventListener('click', function() {
    document.getElementById('calc-name').value = 'Pablo';
    document.getElementById('calc-sex').value = 'male';
    document.getElementById('calc-age').value = '32';
    document.getElementById('calc-height').value = '174';
    document.getElementById('calc-weight').value = '82';
    document.getElementById('calc-experience').value = 'intermediate';
    document.getElementById('calc-muscularity').value = 'normal';
    document.getElementById('calc-bf').value = '20';
    document.getElementById('calc-diet-history').value = 'tried';
    document.getElementById('calc-appetite').value = 'normal';
    document.getElementById('calc-alcohol').value = 'none';
    document.getElementById('calc-activity').value = '1.375';
    document.getElementById('calc-steps').value = '8000';
    document.getElementById('calc-trains').value = 'yes';
    document.getElementById('calc-training-details').classList.remove('hidden');
    document.getElementById('calc-train-type').value = 'strength';
    document.getElementById('calc-train-days').value = '4';
    document.getElementById('calc-train-duration').value = '60';
    document.getElementById('calc-train-intensity').value = 'medium';
    userName = 'Pablo';
    userGoal = 'recomp';
    var result = calculateTDEE();
    if (result) {
        userTdee = result.tdee;
        recommendedKcal = getRecommendedKcal(result.tdee, userGoal);
        currentKcal = recommendedKcal;
    }
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('app-wrapper').style.display = '';
    document.getElementById('selection-validator').classList.remove('hidden');
    document.getElementById('kcal-display').textContent = currentKcal;
    window.scrollTo(0, 0);
    updateSliderRange();
    renderAll();
    activateTab('breakfast');
    populateDisclaimer();
    populateBodyTimeline();
    saveAllState();
    setupPublicTabsVisibility();
});

document.getElementById('welcome-modal-ok').addEventListener('click', function() {
    document.getElementById('welcome-modal').style.display = 'none';
    localStorage.setItem('welcomeModalSeen', '1');
});

document.getElementById('welcome-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        localStorage.setItem('welcomeModalSeen', '1');
    }
});

// Reconfigure
document.getElementById('reconfigure-btn').addEventListener('click', function() {
    // Clear all fields EXCEPT: name, sex, age, height, weight
    // Step 1: silhouette, experience, muscularity, diet-history, appetite
    document.getElementById('calc-bf').value = '';
    document.querySelectorAll('.silhouette-option.selected').forEach(function(el) { el.classList.remove('selected'); });
    document.querySelectorAll('.silhouette-card').forEach(function(c) { c.classList.remove('selected', 'suggested'); });
    var silHint = document.getElementById('silhouette-hint');
    if (silHint) silHint.textContent = '';
    document.getElementById('calc-experience').value = '';
    document.getElementById('calc-muscularity').value = '';
    document.getElementById('calc-diet-history').value = '';
    document.getElementById('calc-appetite').value = '';

    // Step 2: activity, steps, training, alcohol
    document.getElementById('calc-activity').value = '';
    var stepsEl = document.getElementById('calc-steps');
    if (stepsEl) stepsEl.value = '';
    var stepsUnknown = document.getElementById('calc-steps-unknown');
    if (stepsUnknown) stepsUnknown.checked = false;
    var stepsHint = document.getElementById('steps-hint');
    if (stepsHint) stepsHint.textContent = '';
    document.getElementById('calc-trains').value = 'no';
    var trainingDetails = document.getElementById('calc-training-details');
    if (trainingDetails) trainingDetails.classList.add('hidden');
    document.getElementById('calc-train-type').value = 'strength';
    document.getElementById('calc-train-days').value = '4';
    document.getElementById('calc-train-duration').value = '60';
    document.getElementById('calc-train-intensity').value = 'medium';
    document.getElementById('calc-alcohol').value = 'none';
    var alcoholHint = document.getElementById('alcohol-hint');
    if (alcoholHint) alcoholHint.textContent = '';

    // Step 5: goal + path
    document.querySelectorAll('.goal-card.selected').forEach(function(el) { el.classList.remove('selected'); });
    document.querySelectorAll('.path-card.selected').forEach(function(el) { el.classList.remove('selected'); });
    userGoal = '';
    userPath = null;
    deadlineWeeks = null;
    document.getElementById('guided-mode').style.display = 'none';
    document.getElementById('deadline-mode').style.display = 'none';
    document.getElementById('deadline-fields').style.display = 'none';
    document.getElementById('deadline-weeks').value = '';
    document.getElementById('deadline-summary').innerHTML = '';
    document.getElementById('next-5').classList.add('disabled');

    // Clear all meal selections (breakfast, lunch, dinner)
    selections = { breakfast:null, lunchCarb:null, lunchProtein:null, dinnerCarb:null, dinnerProtein:null };

    // Show onboarding at step 1
    document.getElementById('app-wrapper').style.display = 'none';
    document.getElementById('onboarding').style.display = '';
    document.getElementById('selection-validator').classList.add('hidden');
    showStep(1);
});

// ============================================================
// KCAL CONTROLS
// ============================================================
function getSliderMin() {
    return Math.max(1200, Math.round((recommendedKcal - 400) / 100) * 100);
}
function getSliderMax() {
    return Math.round((recommendedKcal + 400) / 100) * 100;
}

function updateSliderRange() {
    // No slider — kcal is fixed from onboarding. Just update display.
    document.getElementById('kcal-display').textContent = currentKcal;
    var titleEl = document.getElementById('header-title');
    if (titleEl && userGoal) {
        var goalName = goalLabels[userGoal] || 'tu objetivo';
        if (userName) {
            var safeName = escapeHtml(userName);
            titleEl.innerHTML = '<span class="user-name">' + safeName + '</span>, tu plan de ' + goalName.toLowerCase();
        } else {
            titleEl.textContent = 'Tu plan de ' + goalName.toLowerCase();
        }
    }
}

function updateKcal(value) {
    currentKcal = Math.max(1200, Math.min(4000, value));
    document.getElementById('kcal-display').textContent = currentKcal;
    renderAll();
    saveAllState();
}

// ============================================================
// SELECTION HANDLERS
// ============================================================
document.getElementById('breakfast-grid').addEventListener('click', function(e) {
    var card = e.target.closest('.breakfast-card'); if (!card) return;
    var idx = parseInt(card.dataset.index);
    selections.breakfast = selections.breakfast === idx ? null : idx;
    renderAll(); saveAllState();
    checkAutoAdvancePublic();
});

document.addEventListener('click', function(e) {
    var row = e.target.closest('tr[data-meal]'); if (!row) return;
    var meal = row.dataset.meal, type = row.dataset.type, idx = parseInt(row.dataset.index);
    var key = meal==='lunch'?(type==='carb'?'lunchCarb':'lunchProtein'):(type==='carb'?'dinnerCarb':'dinnerProtein');
    selections[key] = selections[key]===idx?null:idx;
    renderAll(); saveAllState();
    checkAutoAdvancePublic();
});

document.querySelectorAll('[data-toggle]').forEach(function(h) {
    h.addEventListener('click', function(e) {
        if (e.target.closest('.tooltip-trigger')) return;
        var s = this.dataset.toggle;
        var b = document.getElementById(s+'-body') || document.getElementById(s+'s-body');
        if (b) b.classList.toggle('open');
    });
});

document.querySelectorAll('.main-tab[data-tab]').forEach(function(tab) {
    tab.addEventListener('click', function() {
        var target = this.dataset.tab;
        if (!target) return;
        var currentTab = document.querySelector('.main-tab[data-tab].active');
        var current = currentTab ? currentTab.dataset.tab : null;
        if (current && current !== target) {
            var warning = getTabIncompleteWarning(current);
            if (warning) showTabToast(warning);
        }
        activateTab(target, true);
    });
});

function getTabIncompleteWarning(tab) {
    if (tab === 'breakfast' && selections.breakfast === null) return 'No has elegido desayuno';
    if (tab === 'lunch') {
        var missing = [];
        if (selections.lunchCarb === null) missing.push('hidrato');
        if (selections.lunchProtein === null) missing.push('proteína');
        if (missing.length > 0) return 'Falta ' + missing.join(' y ') + ' en el comida';
    }
    if (tab === 'dinner') {
        var missing = [];
        if (selections.dinnerCarb === null) missing.push('hidrato');
        if (selections.dinnerProtein === null) missing.push('proteína');
        if (missing.length > 0) return 'Falta ' + missing.join(' y ') + ' en la cena';
    }
    return null;
}

function showTabToast(msg) {
    var existing = document.querySelector('.tab-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'tab-toast';
    toast.innerHTML = '⚠️ ' + msg;
    document.body.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() { toast.classList.remove('show'); setTimeout(function() { toast.remove(); }, 300); }, 3000);
}

function showMealCompleteToast(msg) {
    var existing = document.querySelector('.tab-toast');
    if (existing) existing.remove();
    var toast = document.createElement('div');
    toast.className = 'tab-toast tab-toast-success';
    toast.innerHTML = '✅ ' + msg;
    document.body.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() { toast.classList.remove('show'); setTimeout(function() { toast.remove(); }, 300); }, 3000);
}

function checkAutoAdvancePublic() {
    // Ordered sequence: breakfast → lunchCarb → lunchProtein → dinnerCarb → dinnerProtein
    var steps = [
        { key:'breakfast', tab:'breakfast', label:'Desayuno' },
        { key:'lunchCarb', tab:'lunch', label:'Comida HC', section:'carbs' },
        { key:'lunchProtein', tab:'lunch', label:'Comida Prot', section:'protein' },
        { key:'dinnerCarb', tab:'dinner', label:'Cena HC', section:'carbs' },
        { key:'dinnerProtein', tab:'dinner', label:'Cena Prot', section:'protein' }
    ];

    // Find the first unfilled step
    var nextStep = null;
    for (var i = 0; i < steps.length; i++) {
        if (selections[steps[i].key] === null) { nextStep = steps[i]; break; }
    }

    // All 5 complete → scroll to summary
    if (!nextStep) {
        setTimeout(function() {
            showMealCompleteToast('¡Dieta completa! Aquí tienes tu resumen');
            if (publicTabsScrollHandler) {
                window.removeEventListener('scroll', publicTabsScrollHandler);
            }
            var tabsNav = document.querySelector('.main-tabs-nav:not(.trainer-tabs-nav)');
            if (tabsNav) {
                tabsNav.style.transition = 'none';
                tabsNav.classList.add('tabs-hidden');
                tabsNav.offsetHeight;
                tabsNav.style.transition = '';
            }
            var summary = document.getElementById('nutrition-summary');
            if (summary) {
                var top = summary.getBoundingClientRect().top + window.pageYOffset - 16;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
            setTimeout(function() { setupPublicTabsVisibility(); }, 1000);
        }, 400);
        return;
    }

    // Get current public tab
    var activeTabEl = document.querySelector('.main-tab[data-tab].active');
    var currentTab = activeTabEl ? activeTabEl.dataset.tab : null;

    // Need to change tab?
    if (nextStep.tab !== currentTab) {
        var msgs = {
            'breakfast': 'Falta el desayuno',
            'lunch': nextStep.key === 'lunchCarb' ? 'Vamos con la comida' : 'Falta la proteína de la comida',
            'dinner': nextStep.key === 'dinnerCarb' ? 'Vamos con la cena' : 'Falta la proteína de la cena'
        };
        setTimeout(function() {
            showMealCompleteToast(msgs[nextStep.tab]);
            activateTab(nextStep.tab, true);
            if (nextStep.section === 'protein') {
                setTimeout(function() {
                    scrollToPublicSection(nextStep.tab, 'protein');
                }, 500);
            }
        }, 400);
    } else if (nextStep.section === 'protein') {
        // Same tab, scroll to protein section
        setTimeout(function() {
            scrollToPublicSection(nextStep.tab, 'protein');
        }, 100);
    }
}

function scrollToPublicSection(meal, sectionType) {
    var containerId = meal === 'lunch' ? 'lunch-tables' : 'dinner-tables';
    var container = document.getElementById(containerId);
    if (!container) return;
    var header = container.querySelector('.meal-table-header.' + sectionType);
    if (header) {
        var rect = header.getBoundingClientRect();
        var offset = 60;
        if (rect.top < offset || rect.top > window.innerHeight * 0.5) {
            window.scrollBy({ top: rect.top - offset, behavior: 'smooth' });
        }
    }
}

// Random diet
function randomDiet() {
    selections.breakfast = Math.floor(Math.random() * breakfastOptions.length);
    selections.lunchCarb = Math.floor(Math.random() * lunchCarbs.length);
    selections.lunchProtein = Math.floor(Math.random() * lunchProteins.length);
    selections.dinnerCarb = Math.floor(Math.random() * dinnerCarbs.length);
    selections.dinnerProtein = Math.floor(Math.random() * dinnerProteins.length);
    renderAll();
    saveAllState();

    // Scroll to diet summary
    setTimeout(function() {
        var summary = document.getElementById('diet-summary');
        if (summary && summary.innerHTML) {
            var top = summary.getBoundingClientRect().top + window.pageYOffset - 16;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    }, 100);
}

(function() {
    var btn = document.getElementById('random-diet-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            btn.classList.add('animating');
            setTimeout(function() { btn.classList.remove('animating'); }, 500);
            randomDiet();
        });
    }
})();

// How it works - collapsible
(function() {
    var section = document.getElementById('how-it-works');
    var toggle = document.getElementById('how-it-works-toggle');
    if (!section || !toggle) return;

    // Start collapsed unless user explicitly opened it before
    var stored = localStorage.getItem('howItWorksCollapsed');
    if (stored !== '0') {
        section.classList.add('collapsed');
    }

    toggle.addEventListener('click', function() {
        section.classList.toggle('collapsed');
        localStorage.setItem('howItWorksCollapsed', section.classList.contains('collapsed') ? '1' : '0');
    });
})();

// Body timeline - collapsible + dynamic content based on goal
(function() {
    var section = document.getElementById('body-timeline');
    var toggle = document.getElementById('body-timeline-toggle');
    var body = document.getElementById('body-timeline-body');
    if (!section || !toggle || !body) return;

    // Start collapsed
    var stored = localStorage.getItem('bodyTimelineCollapsed');
    if (stored !== '0') {
        section.classList.add('collapsed');
    }

    toggle.addEventListener('click', function() {
        section.classList.toggle('collapsed');
        localStorage.setItem('bodyTimelineCollapsed', section.classList.contains('collapsed') ? '1' : '0');
    });
})();

function populateBodyTimeline() {
    var body = document.getElementById('body-timeline-body');
    if (!body) return;

    var goal = userGoal || 'cut';
    var deficit = goal === 'cut' ? Math.round(userTdee * 0.175) : 0;
    var weeklyLoss = goal === 'cut' ? Math.round(deficit * 7 / 7700 * 10) / 10 : 0;

    var timelines = {
        cut: [
            { period: 'Días 1-3', icon: '🔄', title: 'Adaptación inicial',
              text: 'Tu cuerpo empieza a agotar el glucógeno muscular almacenado. Puedes notar <strong>más hambre de lo normal</strong>, algo de fatiga y leves dolores de cabeza. Es completamente normal — tu cuerpo está cambiando de combustible. Bebe mucha agua.' },
            { period: 'Días 4-7', icon: '💧', title: 'Bajada rápida de peso (agua)',
              text: 'Puedes perder <strong>1-2 kg en la primera semana</strong>, pero la mayor parte es agua y glucógeno, no grasa. Por cada gramo de glucógeno se retienen ~3g de agua. No te emociones demasiado ni te desanimes si luego "sube" algo.' },
            { period: 'Semanas 2-3', icon: '⚡', title: 'El cuerpo se adapta',
              text: 'El hambre se estabiliza, la energía vuelve a niveles normales. Empiezas a perder <strong>grasa real</strong>: unas <strong>' + weeklyLoss + ' kg/semana</strong> con tu déficit actual (~' + deficit + ' kcal/día). La ropa empieza a quedar más holgada antes de que la báscula lo refleje.' },
            { period: 'Semanas 4-6', icon: '🔥', title: 'Resultados visibles',
              text: 'Los cambios se notan en el espejo y en cómo te queda la ropa. El metabolismo se ajusta ligeramente (adaptación metabólica), así que el progreso puede ralentizarse un poco. Es un buen momento para medir con cinta métrica además de la báscula.' },
            { period: 'Semanas 7-12', icon: '💪', title: 'Consolidación',
              text: 'Si entrenas fuerza con alta proteína, mantienes la masa muscular mientras pierdes grasa. Los <strong>estancamientos de 1-2 semanas son normales</strong> — el cuerpo retiene agua temporalmente. No reduzcas calorías, confía en el proceso.' },
            { period: '⚠️ Importante', icon: '📊', title: 'La báscula miente',
              text: 'El peso fluctúa <strong>±1 kg al día</strong> por agua, sal, fibra e intestino. Pésate siempre en las mismas condiciones (mañana, en ayunas) y haz <strong>media semanal</strong>, no te fijes en un solo día.' }
        ],
        recomp: [
            { period: 'Semanas 1-2', icon: '🔄', title: 'Adaptación sin grandes cambios',
              text: 'El peso en la báscula puede <strong>no moverse casi nada</strong> — y eso es bueno. Estás perdiendo grasa y ganando músculo simultáneamente. Puedes notar ligera fatiga mientras el cuerpo se adapta a la nueva nutrición.' },
            { period: 'Semanas 3-6', icon: '💪', title: 'Cambios en composición corporal',
              text: 'La báscula puede no cambiar mucho, pero tu <strong>cuerpo sí</strong>: más definición, ropa que queda diferente, más fuerza en los entrenamientos. Mide con fotos y cinta métrica, no solo con la báscula.' },
            { period: 'Semanas 7-12', icon: '🎯', title: 'Resultados evidentes',
              text: 'Si mantienes la adherencia, verás <strong>menos grasa y más músculo</strong> con un peso similar al inicial. Es el proceso más lento pero más sostenible a largo plazo — sin fases extremas de bulk o cut.' },
            { period: '⚠️ Importante', icon: '⏳', title: 'Paciencia ante todo',
              text: 'La recomposición es <strong>más lenta</strong> que un cut o bulk, pero más saludable. Confía en el espejo y en tus marcas del gym, no en la báscula. Resultados reales a partir de las 8 semanas.' }
        ],
        bulk: [
            { period: 'Semanas 1-2', icon: '🔋', title: 'Más energía y rendimiento',
              text: 'Notarás <strong>más energía</strong> y mejor rendimiento en el gym casi inmediatamente. El superávit calórico rellena el glucógeno muscular — te sentirás más "lleno" y fuerte.' },
            { period: 'Semanas 2-4', icon: '💧', title: 'Subida rápida inicial',
              text: 'Puedes subir <strong>1-2 kg las primeras semanas</strong>, pero gran parte es agua, glucógeno y contenido intestinal — no grasa. Es normal y esperado.' },
            { period: 'Semanas 4-8', icon: '💪', title: 'Ganancia muscular real',
              text: 'Con entrenamiento de fuerza progresivo, ganarás <strong>~0.25-0.5 kg de músculo al mes</strong> (hombres) o ~0.12-0.25 kg (mujeres). El resto de la subida de peso es grasa necesaria para el proceso.' },
            { period: 'Semanas 8-16', icon: '📈', title: 'Progresión sostenida',
              text: 'Los progresos en fuerza y volumen se hacen evidentes. Si la grasa sube demasiado rápido, el superávit puede ser excesivo. Un <strong>aumento de 0.5-1% del peso corporal al mes</strong> es un buen ritmo.' },
            { period: '⚠️ Importante', icon: '🍽️', title: 'Más no es mejor',
              text: 'Comer mucho más de lo necesario <strong>no acelera la ganancia muscular</strong>, solo acumula más grasa. El superávit moderado (~15%) es lo óptimo.' }
        ],
        maintain: [
            { period: 'Semanas 1-2', icon: '⚖️', title: 'Estabilización',
              text: 'Comer limpio al mantenimiento puede hacer que <strong>pierdas algo de peso inicial</strong> si antes comías ultraprocesados — menos sal = menos retención de agua.' },
            { period: 'Semanas 3-6', icon: '🔋', title: 'Más energía y mejor digestión',
              text: 'Al comer alimentos de calidad notarás <strong>mejor digestión, más energía estable</strong> y menos bajones a lo largo del día. El azúcar en sangre se mantiene más estable sin picos.' },
            { period: 'Semanas 7-12', icon: '💪', title: 'Mejora de composición',
              text: 'Aunque mantengas el peso, si entrenas fuerza puedes <strong>recomponer ligeramente</strong> tu cuerpo — un poco más de músculo y un poco menos de grasa a largo plazo.' },
            { period: '⚠️ Importante', icon: '📊', title: 'Fluctuaciones normales',
              text: 'El peso puede <strong>variar ±1-1.5 kg</strong> de un día a otro. Si tu media semanal se mantiene estable, estás en el camino correcto.' }
        ]
    };

    var timeline = timelines[goal] || timelines.cut;
    var goalName = goalLabels[goal] || 'tu plan';

    var html = '<h4 style="margin:0 0 12px;color:var(--text-primary);">🗓️ Línea temporal — ' + goalName + '</h4>';
    html += '<div class="body-timeline-list">';
    timeline.forEach(function(item) {
        html += '<div class="bt-item">' +
            '<div class="bt-period">' + item.icon + ' <strong>' + item.period + '</strong></div>' +
            '<div class="bt-title">' + item.title + '</div>' +
            '<div class="bt-text">' + item.text + '</div>' +
            '</div>';
    });
    html += '</div>';

    body.innerHTML = html;
}

// Floating info tooltip for diet buttons (position: fixed to escape sticky stacking)
(function() {
    var floatingTip = document.createElement('div');
    floatingTip.className = 'btn-info-floating';
    document.body.appendChild(floatingTip);

    document.querySelectorAll('.random-diet-btn[data-info]').forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            var text = btn.getAttribute('data-info');
            if (!text) return;
            floatingTip.textContent = text;
            var rect = btn.getBoundingClientRect();
            floatingTip.style.top = (rect.bottom + 8) + 'px';
            floatingTip.style.left = (rect.left + rect.width / 2) + 'px';
            floatingTip.classList.add('visible');
        });
        btn.addEventListener('mouseleave', function() {
            floatingTip.classList.remove('visible');
        });
    });
})();

// Info tooltip on mobile (long press OR info button tap to show, tap elsewhere to hide)
(function() {
    var infoTimer = null;
    document.querySelectorAll('.random-diet-btn[data-info]').forEach(function(btn) {
        btn.addEventListener('touchstart', function(e) {
            infoTimer = setTimeout(function() {
                document.querySelectorAll('.random-diet-btn.show-info').forEach(function(b) { b.classList.remove('show-info'); });
                btn.classList.add('show-info');
                e.preventDefault();
            }, 400);
        });
        btn.addEventListener('touchend', function() { clearTimeout(infoTimer); });
        btn.addEventListener('touchmove', function() { clearTimeout(infoTimer); });
    });

    // Mobile info button (tap to toggle tooltip)
    document.querySelectorAll('.info-btn-mobile').forEach(function(infoBtn) {
        infoBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var targetId = infoBtn.getAttribute('data-info-target');
            var targetBtn = document.getElementById(targetId);
            if (!targetBtn) return;
            var isShowing = targetBtn.classList.contains('show-info');
            document.querySelectorAll('.random-diet-btn.show-info').forEach(function(b) { b.classList.remove('show-info'); });
            if (!isShowing) targetBtn.classList.add('show-info');
        });
    });

    document.addEventListener('touchstart', function(e) {
        if (!e.target.closest('.random-diet-btn[data-info]') && !e.target.closest('.info-btn-mobile')) {
            document.querySelectorAll('.random-diet-btn.show-info').forEach(function(b) { b.classList.remove('show-info'); });
        }
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.random-diet-btn[data-info]') && !e.target.closest('.info-btn-mobile')) {
            document.querySelectorAll('.random-diet-btn.show-info').forEach(function(b) { b.classList.remove('show-info'); });
        }
    });
})();

// ============================================================
// WEEKLY DIET GENERATION & EXPORT
// ============================================================
var weeklyPlan = null; // stored after generation

function generateWeeklyPlan() {
    var days = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    var plan = [];
    var usedBreakfast = [];
    var usedLunchCarb = [];
    var usedLunchProt = [];
    var usedDinnerCarb = [];
    var usedDinnerProt = [];
    var prefs = getProteinPrefs();

    function pickRandom(arr, used, maxRepeat) {
        // Try to avoid recent picks
        var available = [];
        for (var i = 0; i < arr.length; i++) {
            var count = 0;
            for (var j = 0; j < used.length; j++) { if (used[j] === i) count++; }
            if (count < (maxRepeat || 1)) available.push(i);
        }
        if (available.length === 0) {
            // All used at max, reset and pick any non-last
            available = [];
            for (var i = 0; i < arr.length; i++) {
                if (used.length === 0 || i !== used[used.length - 1]) available.push(i);
            }
            if (available.length === 0) available = [0];
        }
        var pick = available[Math.floor(Math.random() * available.length)];
        used.push(pick);
        return pick;
    }

    function pickProtein(arr, used, maxRepeat) {
        // Build available list (not over max repeat)
        var available = [];
        for (var i = 0; i < arr.length; i++) {
            var count = 0;
            for (var j = 0; j < used.length; j++) { if (used[j] === i) count++; }
            if (count < (maxRepeat || 1)) available.push(i);
        }
        if (available.length === 0) {
            available = [];
            for (var i = 0; i < arr.length; i++) {
                if (used.length === 0 || i !== used[used.length - 1]) available.push(i);
            }
            if (available.length === 0) available = [0];
        }
        // Filter by preferences: keep only preferred categories
        var preferred = available.filter(function(i) { return prefs[proteinCategory[i]]; });
        // Use preferred if any available, otherwise fall back to all available
        var pool = preferred.length > 0 ? preferred : available;
        var pick = pool[Math.floor(Math.random() * pool.length)];
        used.push(pick);
        return pick;
    }

    // Max repeats: allow each item at most ceil(7/arrayLength) times
    var bMax = Math.ceil(7 / breakfastOptions.length);
    var lcMax = Math.ceil(7 / lunchCarbs.length);
    var lpMax = Math.ceil(7 / lunchProteins.length);
    var dcMax = Math.ceil(7 / dinnerCarbs.length);
    var dpMax = Math.ceil(7 / dinnerProteins.length);

    for (var d = 0; d < 7; d++) {
        var sel = {
            breakfast: pickRandom(breakfastOptions, usedBreakfast, bMax),
            lunchCarb: pickRandom(lunchCarbs, usedLunchCarb, lcMax),
            lunchProtein: pickProtein(lunchProteins, usedLunchProt, lpMax),
            dinnerCarb: null,
            dinnerProtein: null
        };

        // Pick dinner carb avoiding same name as lunch carb
        var dinnerCarbCandidates = [];
        for (var ci = 0; ci < dinnerCarbs.length; ci++) {
            if (dinnerCarbs[ci].name !== lunchCarbs[sel.lunchCarb].name) dinnerCarbCandidates.push(ci);
        }
        if (dinnerCarbCandidates.length === 0) {
            for (var ci = 0; ci < dinnerCarbs.length; ci++) dinnerCarbCandidates.push(ci);
        }
        // Prefer less-used candidates
        var bestDC = dinnerCarbCandidates.filter(function(ci) {
            var count = 0;
            for (var j = 0; j < usedDinnerCarb.length; j++) { if (usedDinnerCarb[j] === ci) count++; }
            return count < dcMax;
        });
        if (bestDC.length === 0) bestDC = dinnerCarbCandidates;
        sel.dinnerCarb = bestDC[Math.floor(Math.random() * bestDC.length)];
        usedDinnerCarb.push(sel.dinnerCarb);

        // Pick dinner protein avoiding same name as lunch protein
        var dinnerProtCandidates = [];
        for (var pi = 0; pi < dinnerProteins.length; pi++) {
            if (dinnerProteins[pi].name !== lunchProteins[sel.lunchProtein].name) dinnerProtCandidates.push(pi);
        }
        if (dinnerProtCandidates.length === 0) {
            for (var pi = 0; pi < dinnerProteins.length; pi++) dinnerProtCandidates.push(pi);
        }
        // Filter by protein preferences
        var prefDP = dinnerProtCandidates.filter(function(pi) { return prefs[proteinCategory[pi]]; });
        if (prefDP.length > 0) dinnerProtCandidates = prefDP;
        // Prefer less-used candidates
        var bestDP = dinnerProtCandidates.filter(function(pi) {
            var count = 0;
            for (var j = 0; j < usedDinnerProt.length; j++) { if (usedDinnerProt[j] === pi) count++; }
            return count < dpMax;
        });
        if (bestDP.length === 0) bestDP = dinnerProtCandidates;
        sel.dinnerProtein = bestDP[Math.floor(Math.random() * bestDP.length)];
        usedDinnerProt.push(sel.dinnerProtein);

        plan.push({ day: days[d], selections: sel });
    }

    return plan;
}

function calcDayMacros(sel) {
    var ratios = getScalingRatios(sel);
    var carbRatio = ratios.carb;
    var protRatio = ratios.protein;
    var t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    // Breakfast (scales with carbRatio)
    var m = breakfastOptions[sel.breakfast].macros;
    t.kcal += m[0] * carbRatio; t.protein += m[1] * carbRatio; t.carbs += m[2] * carbRatio; t.fat += m[3] * carbRatio;

    function addCarbFood(data, idx) {
        var item = data[idx];
        var grams = scaleAmount(item.base, carbRatio);
        t.kcal += item.n[0] * grams / 100; t.protein += item.n[1] * grams / 100;
        t.carbs += item.n[2] * grams / 100; t.fat += item.n[3] * grams / 100;
    }
    function addProtFood(data, idx) {
        var item = data[idx];
        var grams = scaleAmount(item.base, protRatio);
        t.kcal += item.n[0] * grams / 100; t.protein += item.n[1] * grams / 100;
        t.carbs += item.n[2] * grams / 100; t.fat += item.n[3] * grams / 100;
    }

    function addExtras() {
        var vegG = scaleAmount(200, carbRatio);
        t.kcal += extrasNutr.verduras[0] * vegG / 100; t.protein += extrasNutr.verduras[1] * vegG / 100;
        t.carbs += extrasNutr.verduras[2] * vegG / 100; t.fat += extrasNutr.verduras[3] * vegG / 100;
        var oilMl = scaleAmount(EXTRAS_OIL_ML, carbRatio);
        t.kcal += extrasNutr.aceite[0] * oilMl / 100; t.fat += extrasNutr.aceite[3] * oilMl / 100;
        t.kcal += extrasNutr.fruta[0]; t.protein += extrasNutr.fruta[1];
        t.carbs += extrasNutr.fruta[2]; t.fat += extrasNutr.fruta[3];
    }

    addCarbFood(lunchCarbs, sel.lunchCarb); addProtFood(lunchProteins, sel.lunchProtein); addExtras();
    addCarbFood(dinnerCarbs, sel.dinnerCarb); addProtFood(dinnerProteins, sel.dinnerProtein); addExtras();

    return { kcal: Math.round(t.kcal), protein: Math.round(t.protein), carbs: Math.round(t.carbs), fat: Math.round(t.fat) };
}

function buildWeeklyExportCanvas(plan) {
    var bg = '#1B1F2E';
    var cardBg = '#242838';
    var accent = '#F0B840';
    var textWhite = '#FFFFFF';
    var textMuted = '#9CA3AF';
    var textLight = '#D1D5DB';
    var proteinColor = '#6366F1';
    var carbsColor = '#F59E0B';
    var fatColor = '#EF4444';

    var W = 1080;
    var pad = 40;
    var contentW = W - pad * 2;

    // Pre-compute all macros
    var allMacros = plan.map(function(day) { return calcDayMacros(day.selections); });
    var avgKcal = Math.round(allMacros.reduce(function(s, m) { return s + m.kcal; }, 0) / 7);
    var avgP = Math.round(allMacros.reduce(function(s, m) { return s + m.protein; }, 0) / 7);
    var avgC = Math.round(allMacros.reduce(function(s, m) { return s + m.carbs; }, 0) / 7);
    var avgF = Math.round(allMacros.reduce(function(s, m) { return s + m.fat; }, 0) / 7);

    // Calculate total height
    var y = 0;
    y += 100; // header
    y += 20;
    // summary card
    y += 180;
    y += 20;
    // 7 day cards with dynamic height
    for (var d = 0; d < 7; d++) {
        var bOptCalc = breakfastOptions[plan[d].selections.breakfast];
        var dayLines = 1 + bOptCalc.items.length + 1 + 3 + 1 + 3; // breakfast header + items + lunch header + 3 lines + dinner header + 3 lines
        y += (70 + dayLines * 28 + 20) + 16;
    }
    y += 50; // footer

    var H = y;

    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    function drawRoundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
    }

    function fillCard(x, y, w, h) {
        drawRoundRect(x, y, w, h, 12);
        ctx.fillStyle = cardBg;
        ctx.fill();
    }

    function drawText(text, x, yPos, color, font) {
        ctx.fillStyle = color || textWhite;
        ctx.font = font || '20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(text, x, yPos);
    }

    // ---- HEADER ----
    var grd = ctx.createLinearGradient(0, 0, W, 0);
    grd.addColorStop(0, '#7A5A10');
    grd.addColorStop(1, '#5A4005');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, 90);

    ctx.fillStyle = textWhite;
    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('📅 ' + (userName ? 'Plan de ' + userName : 'Mi Plan Semanal'), pad, 52);

    ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'right';
    ctx.fillText(currentKcal + ' kcal/día objetivo', W - pad, 52);
    ctx.textAlign = 'left';

    var curY = 110;

    // ---- WEEKLY SUMMARY CARD ----
    var sumH = 160;
    fillCard(pad, curY, contentW, sumH);

    ctx.fillStyle = accent;
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Resumen Semanal', pad + 20, curY + 34);

    // Average kcal big
    ctx.fillStyle = textWhite;
    ctx.font = 'bold 40px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText(avgKcal + ' kcal', pad + 20, curY + 82);
    ctx.fillStyle = textMuted;
    ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('media diaria', pad + 20, curY + 104);

    // Average macros
    var macroStartX = pad + 400;
    var macroItems = [
        { label: 'Prot', value: avgP + 'g', color: proteinColor },
        { label: 'Carbs', value: avgC + 'g', color: carbsColor },
        { label: 'Grasas', value: avgF + 'g', color: fatColor }
    ];
    macroItems.forEach(function(mi, i) {
        var mx = macroStartX + i * 200;
        ctx.fillStyle = mi.color;
        ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(mi.value, mx, curY + 82);
        ctx.fillStyle = textMuted;
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(mi.label, mx, curY + 104);
    });

    // Kcal range
    var minKcal = Math.min.apply(null, allMacros.map(function(m) { return m.kcal; }));
    var maxKcal = Math.max.apply(null, allMacros.map(function(m) { return m.kcal; }));
    ctx.fillStyle = textMuted;
    ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Rango: ' + minKcal + ' – ' + maxKcal + ' kcal', pad + 20, curY + 140);

    curY += sumH + 20;

    // ---- DAY CARDS ----
    for (var d = 0; d < 7; d++) {
        var day = plan[d];
        var sel = day.selections;
        var mac = allMacros[d];

        var bOpt = breakfastOptions[sel.breakfast];
        var lc = lunchCarbs[sel.lunchCarb];
        var lp = lunchProteins[sel.lunchProtein];
        var dc = dinnerCarbs[sel.dinnerCarb];
        var dp = dinnerProteins[sel.dinnerProtein];
        var dayRatios = getScalingRatios(sel);
        var dayCarbR = dayRatios.carb;
        var dayProtR = dayRatios.protein;

        // Calculate dynamic height for this day
        var dayContentLines = 0;
        dayContentLines += 1; // Desayuno header
        dayContentLines += bOpt.items.length; // Breakfast items
        dayContentLines += 1; // Comida header
        dayContentLines += 1; // Lunch carb
        dayContentLines += 1; // Lunch protein
        dayContentLines += 1; // Lunch extras
        dayContentLines += 1; // Cena header
        dayContentLines += 1; // Dinner carb
        dayContentLines += 1; // Dinner protein
        dayContentLines += 1; // Dinner extras
        var dayH = 70 + dayContentLines * 28 + 20;

        fillCard(pad, curY, contentW, dayH);

        // Day name + kcal
        ctx.fillStyle = accent;
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(day.day, pad + 20, curY + 32);

        ctx.fillStyle = textWhite;
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(mac.kcal + ' kcal', W - pad - 20, curY + 32);
        ctx.textAlign = 'left';

        // Macros row under header
        var macY = curY + 52;
        ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillStyle = proteinColor; ctx.fillText('P: ' + mac.protein + 'g', pad + 20, macY);
        ctx.fillStyle = carbsColor; ctx.fillText('C: ' + mac.carbs + 'g', pad + 140, macY);
        ctx.fillStyle = fatColor; ctx.fillText('G: ' + mac.fat + 'g', pad + 260, macY);

        // Meals detail
        var mealY = curY + 80;
        var lineH = 28;

        // Breakfast
        ctx.fillStyle = accent;
        ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('☀️ Desayuno — ' + bOpt.name, pad + 20, mealY);
        mealY += lineH;

        bOpt.items.forEach(function(item) {
            var line = '    • ' + item.text;
            if (item.amount !== null) {
                var scaled = scaleAmount(item.amount, dayCarbR);
                line += ': ' + scaled + (item.unit || 'g');
            }
            if (item.extra) {
                var extraScaled = scaleAmount(item.extraBase, dayCarbR);
                var extraText = item.extra.replace(/\{(\d+)\}/, extraScaled);
                line += ' ' + extraText;
            }
            if (item.spoonHint) { line += ' ' + oilSpoonHint(scaled); }
            if (item.glassHint) { line += ' ' + milkGlassHint(scaled); }
            ctx.fillStyle = textLight;
            ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            ctx.fillText(line, pad + 24, mealY);
            mealY += lineH;
        });

        // Lunch
        var lcScaled = scaleAmount(lc.base, dayCarbR);
        var lpScaled = scaleAmount(lp.base, dayProtR);
        var vegG = scaleAmount(200, dayCarbR);
        var oilMl = scaleAmount(EXTRAS_OIL_ML, dayCarbR);

        ctx.fillStyle = accent;
        ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('🍲 Comida', pad + 20, mealY);
        mealY += lineH;

        ctx.fillStyle = textLight;
        ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        var lcText = '    • ' + lc.name + ': ' + lcScaled + (lc.unit || 'g');
        if (lc.altName) lcText += '  (ó ' + lc.altName + ': ' + scaleAmount(lc.altBase, dayCarbR) + (lc.unit || 'g') + ')';
        ctx.fillText(lcText, pad + 24, mealY);
        mealY += lineH;
        ctx.fillText('    • ' + lp.name + ': ' + lpScaled + (lp.unit || 'g'), pad + 24, mealY);
        mealY += lineH;
        ctx.fillStyle = textMuted;
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('    + Verduras ~' + vegG + 'g · Aceite oliva ' + oilMl + 'ml · 1 fruta', pad + 24, mealY);
        mealY += lineH;

        // Dinner
        var dcScaled = scaleAmount(dc.base, dayCarbR);
        var dpScaled = scaleAmount(dp.base, dayProtR);

        ctx.fillStyle = accent;
        ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('🌙 Cena', pad + 20, mealY);
        mealY += lineH;

        ctx.fillStyle = textLight;
        ctx.font = '15px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        var dcText = '    • ' + dc.name + ': ' + dcScaled + (dc.unit || 'g');
        if (dc.altName) dcText += '  (ó ' + dc.altName + ': ' + scaleAmount(dc.altBase, dayCarbR) + (dc.unit || 'g') + ')';
        ctx.fillText(dcText, pad + 24, mealY);
        mealY += lineH;
        ctx.fillText('    • ' + dp.name + ': ' + dpScaled + (dp.unit || 'g'), pad + 24, mealY);
        mealY += lineH;
        ctx.fillStyle = textMuted;
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('    + Verduras ~' + vegG + 'g · Aceite oliva ' + oilMl + 'ml · 1 fruta', pad + 24, mealY);

        curY += dayH + 16;
    }

    // ---- FOOTER ----
    curY += 10;
    ctx.fillStyle = textMuted;
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Generado con Mi Plan Nutricional  \u2022  pcresp0.github.io/dieta_gym_PCB', W / 2, curY);
    ctx.textAlign = 'left';

    // Trim canvas
    var finalH = curY + 30;
    var trimmed = document.createElement('canvas');
    trimmed.width = W;
    trimmed.height = finalH;
    var tCtx = trimmed.getContext('2d');
    tCtx.drawImage(canvas, 0, 0);

    return trimmed;
}

function exportWeeklyDiet(format) {
    if (!weeklyPlan) return;
    var canvas = buildWeeklyExportCanvas(weeklyPlan);
    var fileName = getExportFileName('Mi Plan Semanal');

    if (format === 'pdf') {
        exportAsPdf(canvas, fileName);
    } else {
        canvas.toBlob(function(blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = fileName + '.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
        }, 'image/png');
    }
}

// Weekly button + modal
(function() {
    var btn = document.getElementById('weekly-diet-btn');
    if (!btn) return;

    btn.addEventListener('click', function() {
        btn.classList.add('animating');
        setTimeout(function() { btn.classList.remove('animating'); }, 500);
        weeklyPlan = generateWeeklyPlan();
        document.getElementById('weekly-export-modal').style.display = '';
    });

    document.getElementById('weekly-export-modal-cancel').addEventListener('click', function() {
        document.getElementById('weekly-export-modal').style.display = 'none';
    });
    document.getElementById('weekly-export-modal').addEventListener('click', function(e) {
        if (e.target === this) this.style.display = 'none';
    });
    document.getElementById('weekly-export-as-png').addEventListener('click', function() {
        document.getElementById('weekly-export-modal').style.display = 'none';
        exportWeeklyDiet('png');
    });
    document.getElementById('weekly-export-as-pdf').addEventListener('click', function() {
        document.getElementById('weekly-export-modal').style.display = 'none';
        exportWeeklyDiet('pdf');
    });
})();

// Macro tooltips data
var macroTooltips = {
    protein: {
        title: '🥩 Proteínas',
        body: function() {
            var goal = userGoal || 'maintain';
            var recs = {
                cut: { range: '2.0 – 2.4', detail: 'En <strong>déficit calórico</strong>, la proteína alta es crucial para <strong>preservar masa muscular</strong> mientras pierdes grasa. Cuanto mayor es el déficit, más proteína necesitas.' },
                recomp: { range: '1.8 – 2.2', detail: 'En <strong>recomposición</strong>, la proteína alta permite <strong>ganar músculo y perder grasa</strong> simultáneamente. Es el macronutriente más importante para este objetivo.' },
                maintain: { range: '1.6 – 2.0', detail: 'En <strong>mantenimiento</strong>, una ingesta moderada-alta de proteína ayuda a <strong>conservar la masa muscular</strong> y la composición corporal.' },
                bulk: { range: '1.6 – 2.0', detail: 'En <strong>volumen</strong>, no necesitas tanta proteína como en déficit porque el superávit calórico ya es anti-catabólico. Con 1.6-2.0g/kg es suficiente.' }
            };
            var rec = recs[goal];
            var w = parseFloat(document.getElementById('calc-weight').value) || 0;
            var rangeGrams = w > 0 ? ' (' + Math.round(parseFloat(rec.range.split('–')[0]) * w) + '–' + Math.round(parseFloat(rec.range.split('–')[1].trim()) * w) + 'g)' : '';
            return '<p>Las proteínas son los <strong>bloques de construcción del músculo</strong>. Están formadas por aminoácidos que reparan y construyen tejido muscular, producen enzimas y hormonas, y mantienen el sistema inmunitario.</p>' +
                '<p><strong>1g de proteína = 4 kcal</strong></p>' +
                '<h4 class="macro-tip-heading">Recomendación para tu objetivo</h4>' +
                '<p class="macro-tip-rec"><strong>' + rec.range + ' g/kg' + rangeGrams + '</strong></p>' +
                '<p>' + rec.detail + '</p>' +
                '<p class="macro-tip-source">📚 Estudios</p>' +
                '<ul class="macro-tip-links">' +
                '<li><a href="https://bjsm.bmj.com/content/52/6/376" target="_blank" rel="noopener noreferrer">Morton et al. 2018 – Protein &amp; muscle mass (BJSM)</a></li>' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/1550-2783-11-20" target="_blank" rel="noopener noreferrer">Helms et al. 2014 – Natural bodybuilding (JISSN)</a></li>' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8" target="_blank" rel="noopener noreferrer">Jäger et al. 2017 – ISSN Protein Position Stand</a></li>' +
                '</ul>';
        }
    },
    carbs: {
        title: '🌾 Carbohidratos',
        body: function() {
            var goal = userGoal || 'maintain';
            var recs = {
                cut: { range: '2.0 – 4.0', detail: 'En <strong>déficit</strong>, los carbohidratos se ajustan después de fijar proteína y grasa. Mantener suficientes carbos preserva el <strong>rendimiento en el entreno</strong> y evita fatiga.' },
                recomp: { range: '3.0 – 5.0', detail: 'En <strong>recomposición</strong>, los carbohidratos alimentan el entreno de fuerza. Son clave para el <strong>rendimiento</strong> y la <strong>recuperación</strong>.' },
                maintain: { range: '3.0 – 5.0', detail: 'En <strong>mantenimiento</strong>, los carbohidratos deben cubrir tus necesidades energéticas diarias y de entreno sin exceso ni déficit.' },
                bulk: { range: '4.0 – 7.0', detail: 'En <strong>volumen</strong>, los carbohidratos son el principal motor del superávit. Más glucógeno muscular = más volumen de entreno = más estímulo para <strong>hipertrofia</strong>.' }
            };
            var rec = recs[goal];
            var w = parseFloat(document.getElementById('calc-weight').value) || 0;
            var rangeGrams = w > 0 ? ' (' + Math.round(parseFloat(rec.range.split('–')[0]) * w) + '–' + Math.round(parseFloat(rec.range.split('–')[1].trim()) * w) + 'g)' : '';
            return '<p>Los carbohidratos son la <strong>fuente de energía principal</strong> del cuerpo, especialmente para ejercicio de alta intensidad. Se almacenan como glucógeno en músculos e hígado.</p>' +
                '<p><strong>1g de carbohidrato = 4 kcal</strong></p>' +
                '<h4 class="macro-tip-heading">Recomendación para tu objetivo</h4>' +
                '<p class="macro-tip-rec"><strong>' + rec.range + ' g/kg' + rangeGrams + '</strong></p>' +
                '<p>' + rec.detail + '</p>' +
                '<p class="macro-tip-source">📚 Estudios</p>' +
                '<ul class="macro-tip-links">' +
                '<li><a href="https://pubmed.ncbi.nlm.nih.gov/26891166/" target="_blank" rel="noopener noreferrer">Thomas et al. 2016 – ACSM Nutrition &amp; Performance</a></li>' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0189-4" target="_blank" rel="noopener noreferrer">Kerksick et al. 2017 – ISSN Nutrient Timing</a></li>' +
                '</ul>';
        }
    },
    fat: {
        title: '🫒 Grasas',
        body: function() {
            var goal = userGoal || 'maintain';
            var recs = {
                cut: { range: '0.7 – 1.0', detail: 'En <strong>déficit</strong>, no bajes de 0.7g/kg: las grasas por debajo de este umbral afectan la <strong>producción hormonal</strong> (testosterona, estrógenos) y el sistema inmunitario.' },
                recomp: { range: '0.8 – 1.2', detail: 'En <strong>recomposición</strong>, mantener grasas adecuadas asegura buena <strong>señalización hormonal</strong> y absorción de vitaminas liposolubles (A, D, E, K).' },
                maintain: { range: '0.8 – 1.2', detail: 'En <strong>mantenimiento</strong>, las grasas deben representar al menos un <strong>20-30% del TDEE</strong> para una salud óptima.' },
                bulk: { range: '0.8 – 1.5', detail: 'En <strong>volumen</strong>, las grasas tienen alta densidad calórica (9 kcal/g), útiles para alcanzar el superávit. Pero prioriza carbohidratos para el rendimiento.' }
            };
            var rec = recs[goal];
            var w = parseFloat(document.getElementById('calc-weight').value) || 0;
            var rangeGrams = w > 0 ? ' (' + Math.round(parseFloat(rec.range.split('–')[0]) * w) + '–' + Math.round(parseFloat(rec.range.split('–')[1].trim()) * w) + 'g)' : '';
            return '<p>Las grasas son <strong>esenciales</strong> para la producción hormonal, absorción de vitaminas, salud celular y función cerebral. No deben eliminarse nunca de la dieta.</p>' +
                '<p><strong>1g de grasa = 9 kcal</strong></p>' +
                '<h4 class="macro-tip-heading">Recomendación para tu objetivo</h4>' +
                '<p class="macro-tip-rec"><strong>' + rec.range + ' g/kg' + rangeGrams + '</strong></p>' +
                '<p>' + rec.detail + '</p>' +
                '<p class="macro-tip-source">📚 Estudios</p>' +
                '<ul class="macro-tip-links">' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8" target="_blank" rel="noopener noreferrer">Jäger et al. 2017 – ISSN Position Stand</a></li>' +
                '<li><a href="https://pubmed.ncbi.nlm.nih.gov/29182451/" target="_blank" rel="noopener noreferrer">Hector &amp; Phillips 2018 – Protein &amp; fat loss (IJSNEM)</a></li>' +
                '<li><a href="https://pubmed.ncbi.nlm.nih.gov/25275931/" target="_blank" rel="noopener noreferrer">Volek et al. 2015 – Dietary fat &amp; performance</a></li>' +
                '</ul>';
        }
    }
};

// Tooltip
document.addEventListener('click', function(e) {
    // Nutrition info button
    var nutritionInfoBtn = e.target.closest('#nutrition-info-btn');
    if (nutritionInfoBtn) {
        e.preventDefault(); e.stopPropagation();
        var goal = userGoal || 'maintain';
        var goalName = goalLabels[goal] || 'Mantener peso';
        document.getElementById('tooltip-title').textContent = '¿Qué son los macronutrientes?';
        document.getElementById('tooltip-body').innerHTML =
            '<p>Los <strong>macronutrientes</strong> son los tres grandes grupos de nutrientes que aportan energía: <strong>proteínas, carbohidratos y grasas</strong>. Cada uno cumple funciones diferentes y su proporción varía según tu objetivo.</p>' +
            '<h4>' + goalIcons[goal] + ' Tu objetivo: ' + goalName + '</h4>' +
            '<table class="macro-tip-table">' +
            '<tr><td class="macro-tip-dot" style="color:var(--protein-accent)">●</td><td><strong>Proteínas</strong></td><td>Construyen y reparan músculo</td><td><strong>4 kcal/g</strong></td></tr>' +
            '<tr><td class="macro-tip-dot" style="color:var(--carbs-accent)">●</td><td><strong>Carbohidratos</strong></td><td>Energía para el entreno</td><td><strong>4 kcal/g</strong></td></tr>' +
            '<tr><td class="macro-tip-dot" style="color:var(--fat-accent)">●</td><td><strong>Grasas</strong></td><td>Hormonas y salud celular</td><td><strong>9 kcal/g</strong></td></tr>' +
            '</table>' +
            '<p style="margin-top:12px;opacity:0.8">Pulsa sobre cada macronutriente en el resumen para ver recomendaciones detalladas para tu objetivo.</p>';
        document.getElementById('tooltip-overlay').style.display = '';
        return;
    }
    // Macro card click
    var macroCard = e.target.closest('.macro-card[data-macro]');
    if (macroCard) {
        e.preventDefault(); e.stopPropagation();
        var macro = macroCard.dataset.macro;
        var tip = macroTooltips[macro];
        if (tip) {
            document.getElementById('tooltip-title').textContent = tip.title;
            document.getElementById('tooltip-body').innerHTML = tip.body();
            document.getElementById('tooltip-overlay').style.display = '';
        }
        return;
    }
    var trigger = e.target.closest('.tooltip-trigger');
    if (trigger) { e.preventDefault(); e.stopPropagation(); var d = tooltipData[trigger.dataset.tooltip]; if(d){document.getElementById('tooltip-title').textContent=d.title;document.getElementById('tooltip-body').innerHTML=d.body;document.getElementById('tooltip-overlay').style.display='';} return; }
    // Supplement tooltip
    var suppBtn = e.target.closest('.supp-tooltip-btn');
    if (suppBtn) {
        e.preventDefault(); e.stopPropagation();
        var name = suppBtn.dataset.supptip;
        var supp = supplements.find(function(s){ return s.title === name; });
        if (supp && supp.tip) {
            document.getElementById('tooltip-title').textContent = supp.title;
            document.getElementById('tooltip-body').innerHTML = '<p>'+supp.tip+'</p>';
            document.getElementById('tooltip-overlay').style.display = '';
        }
        return;
    }
    // Extras tooltip
    var extrasBtn = e.target.closest('.extras-tooltip-btn');
    if (extrasBtn) {
        e.preventDefault(); e.stopPropagation();
        document.getElementById('tooltip-title').textContent = 'Base obligatoria por comida';
        document.getElementById('tooltip-body').innerHTML =
            '<ul class="tooltip-list">' +
            '<li><strong>Verduras (~200g):</strong> Fibra, micronutrientes y volumen saciante con mínimas calorías.</li>' +
            '<li><strong>Aceite de oliva virgen extra (5ml):</strong> El oleocantal del AOVE inhibe COX-1 y COX-2 como el ibuprofeno, reduciendo inflamación y agujetas (DOMS). Dosis mínima eficaz: 30-45ml/día (Beauchamp et al.).</li>' +
            '<li><strong>1 fruta:</strong> Aporta vitaminas, antioxidantes y carbohidratos de bajo IG para recuperación.</li>' +
            '<li><strong>Grasas nunca &lt;20% del TDEE</strong> para mantener síntesis hormonal (testosterona) y salud inmunitaria (ISSN 2017).</li>' +
            '</ul>';
        document.getElementById('tooltip-overlay').style.display = '';
        return;
    }
    if (e.target.id==='tooltip-overlay'){document.getElementById('tooltip-overlay').style.display='none';return;}
    if (e.target.id==='tooltip-close'||e.target.closest('#tooltip-close')){document.getElementById('tooltip-overlay').style.display='none';return;}
    // Apply macro fix suggestion
    var fixItem = e.target.closest('.macro-fix-selectable');
    if (fixItem) {
        var key = fixItem.dataset.fixKey;
        var idx = parseInt(fixItem.dataset.fixIdx);
        if (key && !isNaN(idx)) {
            trainerSelections[key] = idx;
            document.getElementById('tooltip-overlay').style.display = 'none';
            renderTrainerContent();
        }
        return;
    }
});

// ============================================================
// PERSISTENCE
// ============================================================
function saveAllState() {
    try {
        var calcData = {};
        ['calc-name','calc-sex','calc-age','calc-height','calc-weight','calc-bf','calc-activity','calc-trains','calc-train-type','calc-train-days','calc-train-duration','calc-train-intensity','calc-steps','calc-experience','calc-diet-history','calc-appetite','calc-alcohol'].forEach(function(id) {
            var el = document.getElementById(id); if (el) calcData[id] = el.value;
        });
        calcData['calc-steps-unknown'] = document.getElementById('calc-steps-unknown').checked ? 'true' : 'false';
        // Save protein preferences
        var protPrefs = {};
        document.querySelectorAll('#pref-protein .pref-chip:not(.pref-chip-all)').forEach(function(chip) {
            protPrefs[chip.dataset.value] = chip.classList.contains('active');
        });
        calcData['pref-protein'] = protPrefs;
        localStorage.setItem('dietAppV2', JSON.stringify({
            kcal: currentKcal,
            recommended: recommendedKcal,
            goal: userGoal,
            tdee: userTdee,
            name: userName,
            path: userPath,
            deadlineWeeks: deadlineWeeks,
            selections: selections,
            calc: calcData
        }));
    } catch(e) {}
}

function loadState() {
    try {
        var saved = localStorage.getItem('dietAppV2');
        if (!saved) return false;
        var data = JSON.parse(saved);
        if (!data.goal || !data.tdee) return false;
        recommendedKcal = data.recommended || 2500;
        var minVal = Math.max(1200, Math.round((recommendedKcal - 400) / 100) * 100);
        var maxVal = Math.round((recommendedKcal + 400) / 100) * 100;
        if (data.kcal >= minVal && data.kcal <= maxVal) currentKcal = data.kcal;
        else currentKcal = recommendedKcal;
        userGoal = data.goal;
        userTdee = data.tdee;
        userName = data.name || '';
        userPath = data.path || 'guided';
        deadlineWeeks = data.deadlineWeeks || null;
        if (userName) {
            var nameEl = document.getElementById('calc-name');
            if (nameEl) nameEl.value = userName;
        }
        if (data.selections) {
            selections = { breakfast:null, lunchCarb:null, lunchProtein:null, dinnerCarb:null, dinnerProtein:null };
            Object.keys(data.selections).forEach(function(k) { if (k in selections) selections[k] = data.selections[k]; });
        }
        if (data.calc) {
            Object.keys(data.calc).forEach(function(id) {
                if (id === 'calc-steps-unknown') return; // handle below
                var el = document.getElementById(id); if (el && data.calc[id]) el.value = data.calc[id];
            });
            // Restore steps unknown checkbox
            if (data.calc['calc-steps-unknown'] === 'true') {
                document.getElementById('calc-steps-unknown').checked = true;
                document.getElementById('calc-steps').disabled = true;
                document.getElementById('steps-hint').textContent = 'No pasa nada, se calculará sin pasos.';
            }
            // Restore protein preferences
            if (data.calc['pref-protein']) {
                var pp = data.calc['pref-protein'];
                document.querySelectorAll('#pref-protein .pref-chip:not(.pref-chip-all)').forEach(function(chip) {
                    if (pp.hasOwnProperty(chip.dataset.value)) {
                        if (pp[chip.dataset.value]) chip.classList.add('active');
                        else chip.classList.remove('active');
                    }
                });
                // Update "Me da igual" state
                var allChip = document.querySelector('#pref-protein .pref-chip-all');
                if (allChip) {
                    var allOn = true;
                    document.querySelectorAll('#pref-protein .pref-chip:not(.pref-chip-all)').forEach(function(c) {
                        if (!c.classList.contains('active')) allOn = false;
                    });
                    if (allOn) allChip.classList.add('active');
                    else allChip.classList.remove('active');
                }
            }
        }
        return true;
    } catch(e) { return false; }
}

// ============================================================
// THEME TOGGLE
// ============================================================
function getTheme() {
    return localStorage.getItem('dietTheme') || 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
    if (theme !== 'dark') document.documentElement.removeAttribute('data-theme');
    var icon = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    document.querySelectorAll('.theme-toggle').forEach(function(btn) { btn.textContent = icon; });
    var metaColor = document.querySelector('meta[name="theme-color"]');
    if (metaColor) metaColor.content = theme === 'dark' ? '#1A1510' : '#D4A017';
}

function toggleTheme() {
    var current = document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('dietTheme', next);
}

document.querySelectorAll('.theme-toggle').forEach(function(btn) {
    btn.addEventListener('click', toggleTheme);
});

// Apply theme immediately
applyTheme(getTheme());

// ============================================================
// INIT
// ============================================================
function init() {
    var hasState = loadState();
    renderSilhouettes();
    if (hasState) {
        document.getElementById('onboarding').style.display = 'none';
        document.getElementById('app-wrapper').style.display = '';
        document.getElementById('selection-validator').classList.remove('hidden');
        document.getElementById('kcal-display').textContent = currentKcal;
        updateSliderRange();
        renderAll();
        activateTab(getDefaultTab());
        populateDisclaimer();
        populateBodyTimeline();
        setupPublicTabsVisibility();
        window.scrollTo(0, 0);
    } else {
        document.getElementById('onboarding').style.display = '';
        document.getElementById('app-wrapper').style.display = 'none';
        document.getElementById('selection-validator').classList.add('hidden');
        showStep(1);
    }
}

// ============================================================
// SELECTION VALIDATOR BAR
// ============================================================
function renderValidator() {
    var bar = document.getElementById('selection-validator');
    if (!bar) return;

    // Don't show during onboarding or trainer mode
    var onboarding = document.getElementById('onboarding');
    if (trainerModeActive || (onboarding && onboarding.style.display !== 'none')) {
        bar.classList.add('hidden');
        return;
    }

    var checks = [
        { key: 'breakfast', label: 'Desayuno', done: selections.breakfast !== null },
        { key: 'lunchCarb', label: 'Comida HC', done: selections.lunchCarb !== null },
        { key: 'lunchProtein', label: 'Comida Prot', done: selections.lunchProtein !== null },
        { key: 'dinnerCarb', label: 'Cena HC', done: selections.dinnerCarb !== null },
        { key: 'dinnerProtein', label: 'Cena Prot', done: selections.dinnerProtein !== null }
    ];

    var allDone = checks.every(function(c) { return c.done; });
    var noneDone = checks.every(function(c) { return !c.done; });

    if (noneDone) {
        bar.classList.add('hidden');
        return;
    }

    bar.classList.remove('hidden');

    if (allDone) {
        bar.classList.add('complete');
        var macros = calculateSelectedMacros();
        var kcal = macros ? Math.round(macros.total.kcal) : currentKcal;
        bar.innerHTML = '<div class="validator-complete">' +
            '<span>✅ Plan completo</span>' +
            '<span class="vc-kcal">— ' + kcal + ' kcal</span>' +
            '</div>';
    } else {
        bar.classList.remove('complete');
        var items = checks.map(function(c) {
            var cls = c.done ? 'validator-item done' : 'validator-item missing';
            var icon = c.done ? '✓' : '○';
            var tab = c.key === 'breakfast' ? 'breakfast' : (c.key.indexOf('lunch') === 0 ? 'lunch' : 'dinner');
            return '<span class="' + cls + '" data-goto-tab="' + tab + '" style="cursor:pointer"><span class="vi-icon">' + icon + '</span>' + c.label + '</span>';
        }).join('');
        bar.innerHTML = '<div class="validator-items">' + items + '</div>';
    }

    // Enable/disable export button
    var exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.disabled = !allDone;
    var waBtn = document.getElementById('share-whatsapp-btn');
    if (waBtn) waBtn.disabled = !allDone;

    // Render diet summary when complete
    renderDietSummary();
}

// Validator bar: click to navigate to tab
document.getElementById('selection-validator').addEventListener('click', function(e) {
    var item = e.target.closest('[data-goto-tab]');
    if (item) activateTab(item.getAttribute('data-goto-tab'), true);
});

// ============================================================
// DIET SUMMARY (shown when all meals selected)
// ============================================================
var mealSupplements = {
    breakfast: [{icon:'💪',title:'Creatina',desc:'8g'},{icon:'🐟',title:'Omega 3',desc:'1 pastilla'}],
    lunch: [{icon:'🐟',title:'Omega 3',desc:'1 pastilla'}],
    dinner: [],
    sleep: [{icon:'🧲',title:'Magnesio',desc:'2 pastillas (300mg)'},{icon:'⚡',title:'Zinc',desc:'2 pastillas (30mg)'},{icon:'😴',title:'Melatonina',desc:'Opcional'}]
};

function buildMealSummaryHTML(selObj, ratio, isTrainer) {
    var r = ratio || 1;
    // For public view: use split ratios; for trainer: ratio=1 passed in
    var ratios = isTrainer ? null : getScalingRatios(selObj);
    var carbR = isTrainer ? r : ratios.carb;
    var protR = isTrainer ? r : ratios.protein;

    function getBreakfastItems() {
        if (selObj.breakfast === null) return null;
        var opt = breakfastOptions[selObj.breakfast];
        var items = opt.items.map(function(item) {
            var line = item.text;
            if (item.amount !== null) {
                var scaled = isTrainer ? item.amount : scaleAmount(item.amount, carbR);
                line += ': <strong>' + scaled + (item.unit || 'g') + '</strong>';
            }
            if (item.extra) {
                var extraScaled = isTrainer ? item.extraBase : scaleAmount(item.extraBase, carbR);
                var extraText = item.extra.replace(/\{(\d+)\}/, extraScaled);
                line += ' <span class="summary-extra">' + extraText + '</span>';
            }
            if (item.spoonHint) {
                var hintAmt = isTrainer ? item.amount : scaleAmount(item.amount, carbR);
                line += ' <span class="summary-extra">' + oilSpoonHint(hintAmt) + '</span>';
            }
            if (item.glassHint) {
                var glassAmt = isTrainer ? item.amount : scaleAmount(item.amount, carbR);
                line += ' <span class="summary-extra">' + milkGlassHint(glassAmt) + '</span>';
            }
            return line;
        });
        return { name: opt.name, items: items };
    }

    function getMealItems(carbsData, protsData, carbIdx, protIdx) {
        var items = [];
        if (carbIdx !== null) {
            var carb = carbsData[carbIdx];
            var cg = isTrainer ? carb.base : scaleAmount(carb.base, carbR);
            items.push(carb.name + ': <strong>' + cg + (carb.unit || 'g') + '</strong>');
        }
        if (protIdx !== null) {
            var prot = protsData[protIdx];
            var pg = isTrainer ? prot.base : scaleAmount(prot.base, protR);
            items.push(prot.name + ': <strong>' + pg + (prot.unit || 'g') + '</strong>');
        }
        var vegG = isTrainer ? 200 : scaleAmount(200, carbR);
        var oilMl = isTrainer ? EXTRAS_OIL_ML : scaleAmount(EXTRAS_OIL_ML, carbR);
        items.push('Verduras/ensalada: <strong>~' + vegG + 'g</strong>');
        items.push('Aceite de oliva: <strong>' + oilMl + 'ml</strong>');
        items.push('1 pieza de fruta');
        return items;
    }

    var bk = getBreakfastItems();
    var lunchItems = (selObj.lunchCarb !== null || selObj.lunchProtein !== null)
        ? getMealItems(lunchCarbs, lunchProteins, selObj.lunchCarb, selObj.lunchProtein) : null;
    var dinnerItems = (selObj.dinnerCarb !== null || selObj.dinnerProtein !== null)
        ? getMealItems(dinnerCarbs, dinnerProteins, selObj.dinnerCarb, selObj.dinnerProtein) : null;

    var complete = bk && lunchItems && dinnerItems;
    if (!complete) return '';

    // Calculate kcal per meal
    function calcBreakfastKcal() {
        if (selObj.breakfast === null) return 0;
        var m = breakfastOptions[selObj.breakfast].macros;
        return Math.round(m[0] * carbR);
    }
    function calcMealKcal(carbsData, protsData, carbIdx, protIdx) {
        var kcal = 0;
        if (carbIdx !== null) {
            var carb = carbsData[carbIdx];
            var cg = isTrainer ? carb.base : scaleAmount(carb.base, carbR);
            kcal += carb.n[0] * cg / 100;
        }
        if (protIdx !== null) {
            var prot = protsData[protIdx];
            var pg = isTrainer ? prot.base : scaleAmount(prot.base, protR);
            kcal += prot.n[0] * pg / 100;
        }
        var vegG = isTrainer ? 200 : scaleAmount(200, carbR);
        var oilMl = isTrainer ? EXTRAS_OIL_ML : scaleAmount(EXTRAS_OIL_ML, carbR);
        kcal += extrasNutr.verduras[0] * vegG / 100;
        kcal += extrasNutr.aceite[0] * oilMl / 100;
        kcal += extrasNutr.fruta[0];
        return Math.round(kcal);
    }

    var bkKcal = calcBreakfastKcal();
    var lunchKcal = calcMealKcal(lunchCarbs, lunchProteins, selObj.lunchCarb, selObj.lunchProtein);
    var dinnerKcal = calcMealKcal(dinnerCarbs, dinnerProteins, selObj.dinnerCarb, selObj.dinnerProtein);

    function suppHTML(mealKey) {
        var supps = mealSupplements[mealKey] || [];
        if (!supps.length) return '';
        var pills = supps.map(function(s) {
            return '<span class="summary-supp">' + s.icon + ' ' + s.title + ' — ' + s.desc + '</span>';
        }).join('');
        return '<div class="summary-supps">' + pills + '</div>';
    }

    var html = '<div class="diet-summary-card">' +
        '<h3>🍽️ Tu dieta de hoy</h3>';

    // Breakfast
    html += '<div class="summary-meal">' +
        '<div class="summary-meal-header">☀️ Desayuno <span class="summary-meal-kcal">' + bkKcal + ' kcal</span></div>' +
        '<div class="summary-meal-name">' + bk.name + '</div>' +
        '<ul class="summary-meal-items">' + bk.items.map(function(i){ return '<li>'+i+'</li>'; }).join('') + '</ul>' +
        suppHTML('breakfast') +
        '</div>';

    // Lunch
    html += '<div class="summary-meal">' +
        '<div class="summary-meal-header">🍲 Comida <span class="summary-meal-kcal">' + lunchKcal + ' kcal</span></div>' +
        '<ul class="summary-meal-items">' + lunchItems.map(function(i){ return '<li>'+i+'</li>'; }).join('') + '</ul>' +
        suppHTML('lunch') +
        '</div>';

    // Dinner
    html += '<div class="summary-meal">' +
        '<div class="summary-meal-header">🌙 Cena <span class="summary-meal-kcal">' + dinnerKcal + ' kcal</span></div>' +
        '<ul class="summary-meal-items">' + dinnerItems.map(function(i){ return '<li>'+i+'</li>'; }).join('') + '</ul>' +
        '</div>';

    // Before sleep
    html += '<div class="summary-meal summary-meal-sleep">' +
        '<div class="summary-meal-header">😴 Antes de dormir</div>' +
        suppHTML('sleep') +
        '</div>';

    html += '</div>';
    return html;
}

function renderDietSummary() {
    var container = document.getElementById('diet-summary');
    if (!container) return;
    container.innerHTML = buildMealSummaryHTML(selections, getRatio(), false);
}

function renderTrainerDietSummary() {
    var container = document.getElementById('trainer-diet-summary');
    if (!container) return;
    container.innerHTML = buildMealSummaryHTML(trainerSelections, 1, true);
}

// ============================================================
// TRAINER MODE (hidden, long-press on title)
// ============================================================
var trainerModeActive = false;
var trainerSelections = {
    breakfast: null,
    lunchCarb: null,
    lunchProtein: null,
    dinnerCarb: null,
    dinnerProtein: null
};
var trainerExtraFoods = []; // [{catalogIdx, grams}]

// Consolidated food catalog for extra foods picker (per 100g/100ml)
var trainerFoodCatalog = [
    // Hidratos
    {name:'Arroz blanco',cat:'Hidratos',n:[350,7,78,0.6],unit:'g'},
    {name:'Pasta',cat:'Hidratos',n:[350,12,72,1.5],unit:'g'},
    {name:'Patata / boniato',cat:'Hidratos',n:[86,1.6,20,0.1],unit:'g'},
    {name:'Tortitas de arroz',cat:'Hidratos',n:[385,7,83,3],unit:'g'},
    {name:'Pan',cat:'Hidratos',n:[265,9,49,3.2],unit:'g'},
    {name:'Quinoa',cat:'Hidratos',n:[368,14,64,6],unit:'g'},
    {name:'Cus-cus',cat:'Hidratos',n:[376,12.8,77,0.6],unit:'g'},
    {name:'Gnocchis de patata',cat:'Hidratos',n:[165,4,34,1],unit:'g'},
    {name:'Garbanzos cocidos',cat:'Hidratos',n:[164,9,27,2.6],unit:'g'},
    {name:'Lentejas cocidas',cat:'Hidratos',n:[116,9,20,0.4],unit:'g'},
    // Proteínas
    {name:'Pollo',cat:'Proteínas',n:[110,23,0,1.5],unit:'g'},
    {name:'Pavo',cat:'Proteínas',n:[105,24,0,1],unit:'g'},
    {name:'Hamburguesa de pollo',cat:'Proteínas',n:[150,17,4,7],unit:'g'},
    {name:'Huevo + claras',cat:'Proteínas',n:[196,24,1.5,10],unit:'g'},
    {name:'Lomo adobado',cat:'Proteínas',n:[150,20,1,7],unit:'g'},
    {name:'Ternera',cat:'Proteínas',n:[155,22,0,7],unit:'g'},
    {name:'Merluza',cat:'Proteínas',n:[82,17,0,1],unit:'g'},
    {name:'Lenguado',cat:'Proteínas',n:[78,16,0,1.2],unit:'g'},
    {name:'Salmón',cat:'Proteínas',n:[208,20,0,13],unit:'g'},
    {name:'Atún claro al natural',cat:'Proteínas',n:[100,23,0,1],unit:'g'},
    // Otros
    {name:'Verduras',cat:'Otros',n:[25,2,4,0.3],unit:'g'},
    {name:'Fruta',cat:'Otros',n:[80,0.5,20,0.2],unit:'g'},
    {name:'Aceite de oliva',cat:'Otros',n:[900,0,0,100],unit:'ml'},
    {name:'Corn flakes / cereales',cat:'Otros',n:[378,7,84,1],unit:'g'},
    {name:'Copos de avena',cat:'Otros',n:[372,13,60,7],unit:'g'},
    {name:'Whey protein',cat:'Otros',n:[400,80,7,5],unit:'g'},
    {name:'Leche semidesnatada',cat:'Otros',n:[46,3,5,1.5],unit:'ml'},
    {name:'Queso fresco batido',cat:'Otros',n:[63,10,4,0.8],unit:'g'},
    {name:'Frutos secos',cat:'Otros',n:[600,20,15,52],unit:'g'},
    {name:'Crema de cacahuete',cat:'Otros',n:[600,25,12,50],unit:'g'}
];

// Target kcal for trainer plan (based on avg combo analysis: median ~2150)
var TRAINER_TARGET_KCAL = 2200;
var TRAINER_KCAL_TOLERANCE = 100; // ±100 kcal
// Target macro split (based on trainer plan average: 27% P, 52% C, 21% F)
var TRAINER_MACRO_TARGETS = { protein: 27, carbs: 52, fat: 21 };

function getTrainerTabByTime() {
    var h = new Date().getHours();
    if (h >= 1 && h < 12) return 'breakfast';
    if (h >= 12 && h < 18) return 'lunch';
    return 'dinner'; // 18-24 or 0
}

var currentTrainerTab = getTrainerTabByTime();

function switchTrainerTab(tab) {
    currentTrainerTab = tab;
    // Update tab buttons
    document.querySelectorAll('.trainer-tabs-nav [data-trainer-tab]').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.trainerTab === tab);
    });
    // Update tab panels
    document.querySelectorAll('.trainer-tab-panel').forEach(function(panel) {
        panel.classList.toggle('active', panel.dataset.trainerPanel === tab);
    });
    // Scroll to top of the panel content
    var activePanel = document.querySelector('.trainer-tab-panel.active');
    if (activePanel) {
        var tabsNav = document.querySelector('.trainer-tabs-nav');
        var navH = tabsNav ? tabsNav.offsetHeight : 0;
        var panelTop = activePanel.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: panelTop - navH - 4, behavior: 'smooth' });
    }
}

function enterTrainerMode() {
    trainerModeActive = true;
    currentTrainerTab = getTrainerTabByTime();
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    document.getElementById('trainer-mode').style.display = '';
    document.getElementById('selection-validator').classList.add('hidden');
    renderTrainerContent();
}

function exitTrainerMode() {
    trainerModeActive = false;
    document.querySelector('.main').style.display = '';
    document.querySelector('.header').style.display = '';
    document.getElementById('trainer-mode').style.display = 'none';
    document.getElementById('selection-validator').classList.remove('hidden');
    renderValidator();
}

function calculateTrainerMacros() {
    var t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    var has = false;

    // Desayuno: kcal reales de los macros del desayuno tal cual
    if (trainerSelections.breakfast !== null) {
        has = true;
        var m = breakfastOptions[trainerSelections.breakfast].macros;
        t.kcal += m[0]; t.protein += m[1]; t.carbs += m[2]; t.fat += m[3];
    }

    // Comida/cena: kcal reales de los gramos base que dice el entrenador
    function addFood(data, idx) {
        if (idx === null) return;
        has = true;
        var item = data[idx];
        var g = item.base;
        t.kcal += item.n[0]*g/100; t.protein += item.n[1]*g/100; t.carbs += item.n[2]*g/100; t.fat += item.n[3]*g/100;
    }
    // Extras por comida: 200g verduras + 5ml aceite + 1 fruta
    function addExtras() {
        t.kcal += extrasNutr.verduras[0]*200/100; t.protein += extrasNutr.verduras[1]*200/100; t.carbs += extrasNutr.verduras[2]*200/100; t.fat += extrasNutr.verduras[3]*200/100;
        t.kcal += extrasNutr.aceite[0]*EXTRAS_OIL_ML/100; t.fat += extrasNutr.aceite[3]*EXTRAS_OIL_ML/100;
        t.kcal += extrasNutr.fruta[0]; t.protein += extrasNutr.fruta[1]; t.carbs += extrasNutr.fruta[2]; t.fat += extrasNutr.fruta[3];
    }

    addFood(lunchCarbs, trainerSelections.lunchCarb); addFood(lunchProteins, trainerSelections.lunchProtein);
    if (trainerSelections.lunchCarb !== null || trainerSelections.lunchProtein !== null) addExtras();
    addFood(dinnerCarbs, trainerSelections.dinnerCarb); addFood(dinnerProteins, trainerSelections.dinnerProtein);
    if (trainerSelections.dinnerCarb !== null || trainerSelections.dinnerProtein !== null) addExtras();

    // Alimentos adicionales
    trainerExtraFoods.forEach(function(extra) {
        has = true;
        var food = trainerFoodCatalog[extra.catalogIdx];
        t.kcal += food.n[0] * extra.grams / 100;
        t.protein += food.n[1] * extra.grams / 100;
        t.carbs += food.n[2] * extra.grams / 100;
        t.fat += food.n[3] * extra.grams / 100;
    });

    return has ? t : null;
}

function renderTrainerNutrition() {
    var container = document.getElementById('trainer-nutrition');
    var macros = calculateTrainerMacros();
    if (!macros) { container.innerHTML = ''; return; }

    var kcal = Math.round(macros.kcal), p = Math.round(macros.protein), c = Math.round(macros.carbs), f = Math.round(macros.fat);
    var tg = p + c + f;
    var pp = tg>0 ? Math.round(p/tg*100) : 0, cp = tg>0 ? Math.round(c/tg*100) : 0, fp = tg>0 ? 100-pp-cp : 0;
    var pKcal = p*4, cKcal = c*4, fKcal = f*9, fromM = pKcal+cKcal+fKcal;
    var pKp = fromM>0 ? Math.round(pKcal/fromM*100) : 0;
    var cKp = fromM>0 ? Math.round(cKcal/fromM*100) : 0;
    var fKp = fromM>0 ? 100-pKp-cKp : 0;

    var bodyWeight = parseFloat(document.getElementById('calc-weight').value) || 0;
    var pPerKg = bodyWeight > 0 ? (p/bodyWeight).toFixed(1) : '--';
    var cPerKg = bodyWeight > 0 ? (c/bodyWeight).toFixed(1) : '--';
    var fPerKg = bodyWeight > 0 ? (f/bodyWeight).toFixed(1) : '--';

    var meals = [];
    if (trainerSelections.breakfast !== null) meals.push('Desayuno');
    if (trainerSelections.lunchCarb !== null || trainerSelections.lunchProtein !== null) meals.push('Comida');
    if (trainerSelections.dinnerCarb !== null || trainerSelections.dinnerProtein !== null) meals.push('Cena');
    var complete = trainerSelections.breakfast !== null && trainerSelections.lunchCarb !== null && trainerSelections.lunchProtein !== null && trainerSelections.dinnerCarb !== null && trainerSelections.dinnerProtein !== null;

    // Target info
    var targetMin = TRAINER_TARGET_KCAL - TRAINER_KCAL_TOLERANCE;
    var targetMax = TRAINER_TARGET_KCAL + TRAINER_KCAL_TOLERANCE;
    var kcalDiff = kcal - TRAINER_TARGET_KCAL;
    var inRange = kcal >= targetMin && kcal <= targetMax;
    var kcalStatusClass = inRange ? 'trainer-target-ok' : (kcal < targetMin ? 'trainer-target-low' : 'trainer-target-high');
    var kcalStatusIcon = inRange ? '\u2705' : (kcal < targetMin ? '\u26a0\ufe0f' : '\u26a0\ufe0f');
    var kcalStatusText = inRange ? 'En rango objetivo' : (kcal < targetMin ? 'Faltan ' + Math.abs(Math.round(targetMin - kcal)) + ' kcal m\u00edn.' : 'Exceso de ' + Math.round(kcal - targetMax) + ' kcal');

    // Macro targets in grams (from % of target kcal)
    var targetPg = Math.round(TRAINER_TARGET_KCAL * TRAINER_MACRO_TARGETS.protein / 100 / 4);
    var targetCg = Math.round(TRAINER_TARGET_KCAL * TRAINER_MACRO_TARGETS.carbs / 100 / 4);
    var targetFg = Math.round(TRAINER_TARGET_KCAL * TRAINER_MACRO_TARGETS.fat / 100 / 9);
    var remainP = targetPg - p;
    var remainC = targetCg - c;
    var remainF = targetFg - f;

    container.innerHTML =
        '<div class="nutrition-header"><h3>\ud83d\udcca Resumen Nutricional</h3><span class="nutrition-meals">'+meals.join(' + ')+(complete?'':' \u00b7 Incompleto')+'</span></div>' +
        '<div class="nutrition-body">' +
            '<div class="nutrition-kcal-row"><span class="nutrition-kcal-number">'+kcal+'</span><span class="nutrition-kcal-unit">kcal</span></div>' +
            '<div class="trainer-target-bar ' + kcalStatusClass + '">' +
                '<span>' + kcalStatusIcon + ' ' + kcalStatusText + '</span>' +
                '<span class="trainer-target-range">Objetivo: ' + targetMin + '–' + targetMax + ' kcal</span>' +
            '</div>' +
            '<div class="nutrition-stacked-bar">' +
                '<div class="stacked-seg stacked-protein" style="width:'+pKp+'%"></div>' +
                '<div class="stacked-seg stacked-carbs" style="width:'+cKp+'%"></div>' +
                '<div class="stacked-seg stacked-fat" style="width:'+fKp+'%"></div>' +
            '</div>' +
            '<div class="nutrition-macro-cards">' +
                renderMacroCard('Prote\u00ednas','protein',p,pp,pKp,pPerKg) +
                renderMacroCard('Carbos','carbs',c,cp,cKp,cPerKg) +
                renderMacroCard('Grasas','fat',f,fp,fKp,fPerKg) +
            '</div>' +
            '<div class="trainer-macro-targets">' +
                '<h4>Objetivo de macros <span class="trainer-macro-targets-sub">(para ' + TRAINER_TARGET_KCAL + ' kcal)</span></h4>' +
                '<div class="trainer-macro-target-row">' +
                    renderMacroTargetItem('Prote\u00ednas', 'protein', p, targetPg, remainP) +
                    renderMacroTargetItem('Carbos', 'carbs', c, targetCg, remainC) +
                    renderMacroTargetItem('Grasas', 'fat', f, targetFg, remainF) +
                '</div>' +
            '</div>' +
        '</div>';
}

function renderMacroTargetItem(label, cls, current, target, remain) {
    var pct = target > 0 ? Math.min(100, Math.round(current / target * 100)) : 100;
    var statusCls = remain <= 0 ? 'target-reached' : 'target-pending';
    var remainText = remain > 0 ? 'Faltan ' + Math.round(remain) + 'g' : '\u2713 Alcanzado';
    var fixBtn = remain > 0 ? ' <button class="tmti-fix-btn" data-macro="' + cls + '" title="Ver cómo cuadrarlo">💡</button>' : '';
    return '<div class="trainer-macro-target-item ' + statusCls + '">' +
        '<div class="tmti-label">' + label + '</div>' +
        '<div class="tmti-bar-wrap"><div class="tmti-bar tmti-bar-' + cls + '" style="width:' + pct + '%"></div></div>' +
        '<div class="tmti-values"><span>' + Math.round(current) + 'g</span><span class="tmti-target">/ ' + target + 'g</span></div>' +
        '<div class="tmti-remain ' + statusCls + '">' + remainText + fixBtn + '</div>' +
    '</div>';
}

function getMacroIndex(macro) {
    if (macro === 'protein') return 1;
    if (macro === 'carbs') return 2;
    if (macro === 'fat') return 3;
    return -1;
}

function generateMacroSuggestions(macro) {
    var mi = getMacroIndex(macro);
    var macroLabel = macro === 'protein' ? 'proteína' : (macro === 'carbs' ? 'carbohidratos' : 'grasas');
    var suggestions = [];

    // Get names of currently selected foods to avoid duplicates (variety)
    var usedNames = [];
    if (trainerSelections.lunchCarb !== null) usedNames.push(lunchCarbs[trainerSelections.lunchCarb].name.toLowerCase());
    if (trainerSelections.lunchProtein !== null) usedNames.push(lunchProteins[trainerSelections.lunchProtein].name.toLowerCase());
    if (trainerSelections.dinnerCarb !== null) usedNames.push(dinnerCarbs[trainerSelections.dinnerCarb].name.toLowerCase());
    if (trainerSelections.dinnerProtein !== null) usedNames.push(dinnerProteins[trainerSelections.dinnerProtein].name.toLowerCase());

    // Helper: calculate kcal and all macros for a food item (per its base grams)
    function itemKcal(item) { return item.n[0] * item.base / 100; }
    function itemMacro(item, idx) { return item.n[idx] * item.base / 100; }

    // Helper: check if a food name is already used in another meal slot
    function isDuplicate(name, currentMeal) {
        var lower = name.toLowerCase();
        // Check if this food name matches any other slot (not the current one being swapped)
        if (currentMeal === 'lunch') {
            if (trainerSelections.dinnerCarb !== null && dinnerCarbs[trainerSelections.dinnerCarb].name.toLowerCase() === lower) return true;
            if (trainerSelections.dinnerProtein !== null && dinnerProteins[trainerSelections.dinnerProtein].name.toLowerCase() === lower) return true;
        }
        if (currentMeal === 'dinner') {
            if (trainerSelections.lunchCarb !== null && lunchCarbs[trainerSelections.lunchCarb].name.toLowerCase() === lower) return true;
            if (trainerSelections.lunchProtein !== null && lunchProteins[trainerSelections.lunchProtein].name.toLowerCase() === lower) return true;
        }
        return false;
    }

    // Evaluate swaps for a given slot
    function evalSwaps(data, currentIdx, meal, slotName, mealKey, selKey) {
        if (currentIdx === null) return;
        var currentItem = data[currentIdx];
        var curKcal = itemKcal(currentItem);
        var curMacro = itemMacro(currentItem, mi);
        data.forEach(function(alt, idx) {
            if (idx === currentIdx) return;
            // Skip if this would duplicate food already in another meal
            if (isDuplicate(alt.name, mealKey)) return;
            var altKcal = itemKcal(alt);
            var altMacro = itemMacro(alt, mi);
            var macroDiff = altMacro - curMacro;
            var kcalDiff = altKcal - curKcal;
            if (macroDiff > 1) {
                suggestions.push({
                    type: 'swap', meal: meal, slot: slotName,
                    from: currentItem.name, to: alt.name,
                    toIdx: idx, selKey: selKey,
                    diff: Math.round(macroDiff),
                    kcalDiff: Math.round(kcalDiff)
                });
            }
        });
    }

    // Evaluate breakfast swaps
    if (trainerSelections.breakfast !== null) {
        var currentBrk = breakfastOptions[trainerSelections.breakfast];
        var curKcal = currentBrk.macros[0];
        var curMacro = currentBrk.macros[mi];
        breakfastOptions.forEach(function(alt, idx) {
            if (idx === trainerSelections.breakfast) return;
            var macroDiff = alt.macros[mi] - curMacro;
            var kcalDiff = alt.macros[0] - curKcal;
            if (macroDiff > 1) {
                suggestions.push({
                    type: 'swap', meal: 'Desayuno', slot: '',
                    from: currentBrk.name, to: alt.name,
                    toIdx: idx, selKey: 'breakfast',
                    diff: Math.round(macroDiff),
                    kcalDiff: Math.round(kcalDiff)
                });
            }
        });
    }

    evalSwaps(lunchCarbs, trainerSelections.lunchCarb, 'Comida', 'hidrato', 'lunch', 'lunchCarb');
    evalSwaps(lunchProteins, trainerSelections.lunchProtein, 'Comida', 'proteína', 'lunch', 'lunchProtein');
    evalSwaps(dinnerCarbs, trainerSelections.dinnerCarb, 'Cena', 'hidrato', 'dinner', 'dinnerCarb');
    evalSwaps(dinnerProteins, trainerSelections.dinnerProtein, 'Cena', 'proteína', 'dinner', 'dinnerProtein');

    // Score and sort swaps: prefer high macro gain with low kcal change
    suggestions.forEach(function(s) {
        // Score = macro gain - penalty for kcal change (penalize more if kcal increases a lot)
        var kcalPenalty = Math.abs(s.kcalDiff) / 20; // every 20 kcal deviation = 1 point penalty
        s.score = s.diff - kcalPenalty;
    });
    suggestions.sort(function(a, b) { return b.score - a.score; });

    // 6. Suggest adding extra food to fill the gap
    var targetMacros = calculateTrainerMacros();
    var targetPg = Math.round(TRAINER_TARGET_KCAL * TRAINER_MACRO_TARGETS.protein / 100 / 4);
    var targetCg = Math.round(TRAINER_TARGET_KCAL * TRAINER_MACRO_TARGETS.carbs / 100 / 4);
    var targetFg = Math.round(TRAINER_TARGET_KCAL * TRAINER_MACRO_TARGETS.fat / 100 / 9);
    var targetG = macro === 'protein' ? targetPg : (macro === 'carbs' ? targetCg : targetFg);
    var currentG = macro === 'protein' ? targetMacros.protein : (macro === 'carbs' ? targetMacros.carbs : targetMacros.fat);
    var deficit = targetG - currentG;

    var addSuggestions = [];
    if (deficit > 0) {
        trainerFoodCatalog.forEach(function(food) {
            var macroPerG = food.n[mi];
            if (macroPerG > 5) {
                var gramsNeeded = Math.round(deficit / macroPerG * 100);
                var extraKcal = Math.round(food.n[0] * gramsNeeded / 100);
                if (gramsNeeded > 0 && gramsNeeded <= 500) {
                    addSuggestions.push({ type: 'add', food: food.name, grams: gramsNeeded, diff: Math.round(deficit), kcalAdd: extraKcal });
                }
            }
        });
        addSuggestions.sort(function(a, b) { return a.kcalAdd - b.kcalAdd; });
    }

    // Combine: top 3 swaps per meal + top 3 adds
    var mealGroups = {};
    suggestions.forEach(function(s) {
        if (!mealGroups[s.meal]) mealGroups[s.meal] = [];
        mealGroups[s.meal].push(s);
    });
    var finalSwaps = [];
    Object.keys(mealGroups).forEach(function(meal) {
        mealGroups[meal].sort(function(a, b) { return b.score - a.score; });
        finalSwaps = finalSwaps.concat(mealGroups[meal].slice(0, 3));
    });
    var finalAdds = addSuggestions.slice(0, 3);

    return { macro: macroLabel, deficit: Math.round(deficit), swaps: finalSwaps, adds: finalAdds };
}

function showMacroFixTooltip(macro) {
    var data = generateMacroSuggestions(macro);
    var title = '\ud83d\udca1 C\u00f3mo conseguir ' + data.deficit + 'g m\u00e1s de ' + data.macro;
    var html = '';

    if (data.swaps.length === 0 && data.adds.length === 0) {
        html = '<p>No hay sugerencias disponibles con la selecci\u00f3n actual.</p>';
    } else {
        if (data.swaps.length > 0) {
            // Group swaps by meal
            var meals = ['Desayuno', 'Comida', 'Cena'];
            meals.forEach(function(mealName) {
                var mealSwaps = data.swaps.filter(function(s) { return s.meal === mealName; });
                if (mealSwaps.length === 0) return;
                var emoji = mealName === 'Desayuno' ? '\u2600\ufe0f' : (mealName === 'Comida' ? '\ud83c\udf5d' : '\ud83c\udf19');
                html += '<h4 style="margin-top:' + (mealName === 'Desayuno' ? '0' : '12px') + '">' + emoji + ' ' + mealName + '</h4><div class="macro-fix-list">';
                mealSwaps.forEach(function(s) {
                    var kcalLabel = s.kcalDiff === 0 ? '<span class="macro-fix-kcal neutral">=kcal</span>' :
                        (Math.abs(s.kcalDiff) <= 30 ? '<span class="macro-fix-kcal neutral">' + (s.kcalDiff > 0 ? '+' : '') + s.kcalDiff + ' kcal</span>' :
                        '<span class="macro-fix-kcal ' + (s.kcalDiff > 0 ? 'high' : 'low') + '">' + (s.kcalDiff > 0 ? '+' : '') + s.kcalDiff + ' kcal</span>');
                    html += '<div class="macro-fix-item macro-fix-selectable" data-fix-key="' + s.selKey + '" data-fix-idx="' + s.toIdx + '">' +
                        '<span class="macro-fix-swap">' + s.from + ' \u2192 <strong>' + s.to + '</strong>' + (s.slot ? ' <small>(' + s.slot + ')</small>' : '') + '</span>' +
                        '<span class="macro-fix-stats"><span class="macro-fix-diff">+' + s.diff + 'g</span>' + kcalLabel + '</span></div>';
                });
                html += '</div>';
            });
        }

        if (data.adds.length > 0) {
            html += '<h4 style="margin-top:12px">\u2795 A\u00f1adir alimento extra</h4><div class="macro-fix-list">';
            data.adds.forEach(function(s) {
                html += '<div class="macro-fix-item"><span class="macro-fix-add">A\u00f1adir <strong>' + s.grams + 'g ' + s.food + '</strong></span>' +
                    '<span class="macro-fix-stats"><span class="macro-fix-diff">+' + s.diff + 'g</span><span class="macro-fix-kcal">' + (s.kcalAdd > 0 ? '+' : '') + s.kcalAdd + ' kcal</span></span></div>';
            });
            html += '</div>';
        }
    }

    document.getElementById('tooltip-title').textContent = title;
    document.getElementById('tooltip-body').innerHTML = html;
    document.getElementById('tooltip-overlay').style.display = '';
}

function renderTrainerContent() {
    var html = '';

    // ===== TAB: Desayuno =====
    var brkActive = currentTrainerTab === 'breakfast' ? ' active' : '';
    html += '<div class="trainer-tab-panel' + brkActive + '" data-trainer-panel="breakfast">';

    // Desayunos
    html += '<div class="trainer-section"><h3>☀️ Desayunos (elige 1)</h3>';
    breakfastOptions.forEach(function(opt, idx) {
        var sel = trainerSelections.breakfast === idx ? ' trainer-card-selected' : '';
        html += '<div class="trainer-card'+sel+'" data-trainer-type="breakfast" data-trainer-index="'+idx+'"><div class="trainer-card-title">' + opt.name + '</div><ul>';
        opt.items.forEach(function(item) {
            var line = item.text;
            if (item.amount !== null) line += ': <strong>' + item.amount + (item.unit || 'g') + '</strong>';
            if (item.extra) {
                var extraText = item.extra.replace(/\{(\d+)\}/, item.extraBase);
                line += ' <span class="trainer-extra">' + extraText + '</span>';
            }
            if (item.spoonHint && item.amount !== null) {
                var spoonTxt = (function(ml) {
                    if (ml <= 3) return '(menos de una cucharadita)';
                    if (ml <= 5) return '(~1 cucharadita)';
                    if (ml <= 8) return '(~1 cucharada de postre)';
                    if (ml <= 10) return '(~1 cucharada sopera rasa)';
                    if (ml <= 15) return '(~1 cucharada sopera)';
                    if (ml <= 20) return '(~1½ cucharadas soperas)';
                    if (ml <= 25) return '(~2 cucharadas soperas)';
                    if (ml <= 30) return '(~2 cucharadas soperas)';
                    return '(~' + Math.round(ml / 15) + ' cucharadas soperas)';
                })(item.amount);
                line += ' <span class="trainer-extra">' + spoonTxt + '</span>';
            }
            html += '<li>' + line + '</li>';
        });
        html += '</ul></div>';
    });
    html += '</div>';

    html += '</div>'; // end breakfast panel

    // ===== TAB: Comida =====
    var lunchActive = currentTrainerTab === 'lunch' ? ' active' : '';
    html += '<div class="trainer-tab-panel' + lunchActive + '" data-trainer-panel="lunch">';

    // Comida - using same visual structure as public mode
    html += '<div class="meal-card">';
    html += '<div class="tab-subtitle">Elige un hidrato y una proteína.</div>';
    html += '<div class="extras-banner"><span>\ud83e\udd57 + ~200g verduras &nbsp;|&nbsp; '+EXTRAS_OIL_ML+'ml aceite oliva &nbsp;|&nbsp; 1 fruta</span></div>';
    html += '<div class="meal-tables">';
    // Carbs
    html += '<div class="meal-table-wrapper"><div class="meal-table-header carbs">\ud83c\udf3e Hidratos de Carbono</div><table class="meal-table"><tbody>';
    lunchCarbs.forEach(function(item, idx) {
        var s = trainerSelections.lunchCarb === idx;
        var u = item.unit || 'g';
        var tagHtml = item.tag ? ' <span class="food-tag food-tag-'+item.tag+'">'+item.tag+'</span>' : '';
        html += '<tr class="'+(s?'selected':'')+'" data-trainer-meal="lunch" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>'+item.name+'</td><td>'+item.base+' '+u+tagHtml+'</td></tr>';
        if (item.altName) {
            html += '<tr class="sub-row '+(s?'selected':'')+'" data-trainer-meal="lunch" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>'+item.altName+'</td><td>'+item.altBase+' '+u+tagHtml+'</td></tr>';
        }
    });
    html += '</tbody></table></div>';
    // Proteins
    html += '<div class="meal-table-wrapper"><div class="meal-table-header protein">\ud83e\udd69 Prote\u00ednas</div><table class="meal-table"><tbody>';
    lunchProteins.forEach(function(item, idx) {
        var s = trainerSelections.lunchProtein === idx;
        var u = item.unit || 'g';
        html += '<tr class="'+(s?'selected':'')+'" data-trainer-meal="lunch" data-trainer-type="protein" data-trainer-index="'+idx+'"><td>'+item.name+'</td><td>'+item.base+' '+u+'</td></tr>';
    });
    html += '</tbody></table></div>';
    html += '</div></div>'; // end meal-tables + meal-card

    html += '</div>'; // end lunch panel

    // ===== TAB: Cena =====
    var dinnerActive = currentTrainerTab === 'dinner' ? ' active' : '';
    html += '<div class="trainer-tab-panel' + dinnerActive + '" data-trainer-panel="dinner">';

    // Cena - using same visual structure as public mode
    html += '<div class="meal-card">';
    html += '<div class="tab-subtitle">Elige un hidrato y una proteína.</div>';
    html += '<div class="extras-banner"><span>\ud83e\udd57 + ~200g verduras &nbsp;|&nbsp; '+EXTRAS_OIL_ML+'ml aceite oliva &nbsp;|&nbsp; 1 fruta</span></div>';
    html += '<div class="meal-tables">';
    // Carbs
    html += '<div class="meal-table-wrapper"><div class="meal-table-header carbs">\ud83c\udf3e Hidratos de Carbono</div><table class="meal-table"><tbody>';
    dinnerCarbs.forEach(function(item, idx) {
        var s = trainerSelections.dinnerCarb === idx;
        var u = item.unit || 'g';
        var tagHtml = item.tag ? ' <span class="food-tag food-tag-'+item.tag+'">'+item.tag+'</span>' : '';
        html += '<tr class="'+(s?'selected':'')+'" data-trainer-meal="dinner" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>'+item.name+'</td><td>'+item.base+' '+u+tagHtml+'</td></tr>';
        if (item.altName) {
            html += '<tr class="sub-row '+(s?'selected':'')+'" data-trainer-meal="dinner" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>'+item.altName+'</td><td>'+item.altBase+' '+u+tagHtml+'</td></tr>';
        }
    });
    html += '</tbody></table></div>';
    // Proteins
    html += '<div class="meal-table-wrapper"><div class="meal-table-header protein">\ud83e\udd69 Prote\u00ednas</div><table class="meal-table"><tbody>';
    dinnerProteins.forEach(function(item, idx) {
        var s = trainerSelections.dinnerProtein === idx;
        var u = item.unit || 'g';
        html += '<tr class="'+(s?'selected':'')+'" data-trainer-meal="dinner" data-trainer-type="protein" data-trainer-index="'+idx+'"><td>'+item.name+'</td><td>'+item.base+' '+u+'</td></tr>';
    });
    html += '</tbody></table></div>';
    html += '</div></div>'; // end meal-tables + meal-card

    html += '</div>'; // end dinner panel

    // Alimentos adicionales (siempre visible, fuera de tabs)
    var extrasOpen = trainerExtraFoods.length > 0 ? ' open' : '';
    var extrasOpenClass = trainerExtraFoods.length > 0 ? ' extras-open' : '';
    html += '<div class="trainer-section trainer-extras-section' + extrasOpenClass + '">';
    html += '<div class="trainer-extras-toggle" id="trainer-extras-toggle">';
    html += '<span class="trainer-extras-toggle-icon">🍽️</span>';
    html += '<span class="trainer-extras-toggle-text">¿Has comido algún alimento adicional?</span>';
    if (trainerExtraFoods.length > 0) {
        html += '<span class="trainer-extras-badge">' + trainerExtraFoods.length + '</span>';
    }
    html += '<span class="trainer-extras-chevron">▾</span>';
    html += '</div>';
    html += '<div class="trainer-extras-body' + extrasOpen + '" id="trainer-extras-body">';
    html += '<div class="trainer-extra-form">';
    html += '<select class="trainer-extra-select" id="trainer-extra-food">';
    var lastCat = '';
    trainerFoodCatalog.forEach(function(f, i) {
        if (f.cat !== lastCat) {
            if (lastCat) html += '</optgroup>';
            html += '<optgroup label="' + f.cat + '">';
            lastCat = f.cat;
        }
        html += '<option value="' + i + '">' + f.name + ' (' + f.n[0] + ' kcal/100' + f.unit + ')</option>';
    });
    html += '</optgroup>';
    html += '</select>';
    html += '<div class="trainer-extra-grams-row">';
    html += '<input type="number" id="trainer-extra-grams" class="trainer-extra-grams" min="1" max="2000" placeholder="Gramos" value="100">';
    html += '<button class="trainer-extra-add-btn" id="trainer-extra-add">+ Añadir</button>';
    html += '</div></div>';
    if (trainerExtraFoods.length > 0) {
        html += '<div class="trainer-extra-list">';
        trainerExtraFoods.forEach(function(extra, i) {
            var food = trainerFoodCatalog[extra.catalogIdx];
            var ek = Math.round(food.n[0]*extra.grams/100);
            var ep = Math.round(food.n[1]*extra.grams/100);
            var ec = Math.round(food.n[2]*extra.grams/100);
            var ef = Math.round(food.n[3]*extra.grams/100);
            html += '<div class="trainer-extra-item" data-extra-idx="'+i+'">';
            html += '<div class="trainer-extra-item-info">';
            html += '<strong>' + food.name + '</strong> — ' + extra.grams + food.unit;
            html += '<span class="trainer-extra-item-macros">' + ek + ' kcal · P:' + ep + ' C:' + ec + ' G:' + ef + '</span>';
            html += '</div>';
            html += '<button class="trainer-extra-remove" data-extra-remove="'+i+'">✕</button>';
            html += '</div>';
        });
        html += '</div>';
    }
    html += '</div>'; // end body
    html += '</div>'; // end section

    // Suplementos (siempre visible, fuera de tabs)
    html += '<div class="trainer-section trainer-supplements-section"><h3>\ud83d\udc8a Suplementación</h3><div class="trainer-supps">';
    supplements.forEach(function(s) {
        html += '<div class="trainer-supp">' + s.icon + ' <strong>' + s.title + '</strong> — ' + s.desc + '</div>';
    });
    html += '</div></div>';

    document.getElementById('trainer-content').innerHTML = html;
    // Sync tab button active states
    document.querySelectorAll('.trainer-tabs-nav [data-trainer-tab]').forEach(function(btn) {
        btn.classList.toggle('active', btn.dataset.trainerTab === currentTrainerTab);
    });
    renderTrainerNutrition();
    renderTrainerDietSummary();
    renderTrainerValidator();
    setupTrainerTabsVisibility();
}

var trainerTabsScrollHandler = null;
function setupTrainerTabsVisibility() {
    if (trainerTabsScrollHandler) window.removeEventListener('scroll', trainerTabsScrollHandler);
    var extrasSection = document.querySelector('.trainer-extras-section');
    var tabsNav = document.querySelector('.trainer-tabs-nav');
    if (!tabsNav || !extrasSection) return;
    // Get the nav's sticky top position (where it sits when visible)
    var navHeight = tabsNav.offsetHeight;
    trainerTabsScrollHandler = function() {
        var sectionTop = extrasSection.getBoundingClientRect().top;
        // Hide tabs when the section reaches the bottom edge of where tabs would be
        if (sectionTop <= navHeight + 10) {
            tabsNav.classList.add('tabs-hidden');
        } else {
            tabsNav.classList.remove('tabs-hidden');
        }
    };
    window.addEventListener('scroll', trainerTabsScrollHandler, { passive: true });
    trainerTabsScrollHandler();
}

var publicTabsScrollHandler = null;
function setupPublicTabsVisibility() {
    if (publicTabsScrollHandler) window.removeEventListener('scroll', publicTabsScrollHandler);
    var nutritionSection = document.getElementById('nutrition-summary');
    var tabsNav = document.querySelector('.main-tabs-nav:not(.trainer-tabs-nav)');
    if (!tabsNav || !nutritionSection) return;
    var navHeight = tabsNav.offsetHeight;
    publicTabsScrollHandler = function() {
        var sectionTop = nutritionSection.getBoundingClientRect().top;
        if (sectionTop <= navHeight + 10) {
            tabsNav.classList.add('tabs-hidden');
        } else {
            tabsNav.classList.remove('tabs-hidden');
        }
    };
    window.addEventListener('scroll', publicTabsScrollHandler, { passive: true });
    publicTabsScrollHandler();
}

function renderTrainerValidator() {
    var bar = document.getElementById('trainer-validator');
    if (!bar) return;

    var checks = [
        { label: 'Desayuno', done: trainerSelections.breakfast !== null },
        { label: 'Comida HC', done: trainerSelections.lunchCarb !== null },
        { label: 'Comida Prot', done: trainerSelections.lunchProtein !== null },
        { label: 'Cena HC', done: trainerSelections.dinnerCarb !== null },
        { label: 'Cena Prot', done: trainerSelections.dinnerProtein !== null }
    ];

    var allDone = checks.every(function(c) { return c.done; });
    var noneDone = checks.every(function(c) { return !c.done; });

    if (noneDone) {
        bar.classList.add('hidden');
        return;
    }

    bar.classList.remove('hidden');

    if (allDone) {
        bar.classList.add('complete');
        var macros = calculateTrainerMacros();
        var kcal = macros ? Math.round(macros.kcal) : 2500;
        bar.innerHTML = '<div class="validator-complete"><span>✅ Plan completo</span><span class="vc-kcal">— ' + kcal + ' kcal</span></div>';
    } else {
        bar.classList.remove('complete');
        var items = checks.map(function(c) {
            var cls = c.done ? 'validator-item done' : 'validator-item missing';
            var icon = c.done ? '✓' : '○';
            var tab = c.label === 'Desayuno' ? 'breakfast' : (c.label.indexOf('Comida') === 0 ? 'lunch' : 'dinner');
            return '<span class="' + cls + '" data-goto-tab="' + tab + '" style="cursor:pointer"><span class="vi-icon">' + icon + '</span>' + c.label + '</span>';
        }).join('');
        bar.innerHTML = '<div class="validator-items">' + items + '</div>';
    }
}

// Trainer toggle button
document.getElementById('trainer-toggle').addEventListener('click', function() {
    enterTrainerMode();
});

// Trainer tab switching
document.addEventListener('click', function(e) {
    var tabBtn = e.target.closest('[data-trainer-tab]');
    if (tabBtn && tabBtn.dataset.trainerTab) {
        switchTrainerTab(tabBtn.dataset.trainerTab);
    }
});

function checkAutoAdvanceTrainer() {
    // Ordered sequence of steps: breakfast → lunchCarb → lunchProtein → dinnerCarb → dinnerProtein
    var steps = [
        { key:'breakfast', tab:'breakfast', label:'Desayuno' },
        { key:'lunchCarb', tab:'lunch', label:'Comida HC', section:'carbs' },
        { key:'lunchProtein', tab:'lunch', label:'Comida Prot', section:'protein' },
        { key:'dinnerCarb', tab:'dinner', label:'Cena HC', section:'carbs' },
        { key:'dinnerProtein', tab:'dinner', label:'Cena Prot', section:'protein' }
    ];

    // Find the first unfilled step
    var nextStep = null;
    for (var i = 0; i < steps.length; i++) {
        if (trainerSelections[steps[i].key] === null) { nextStep = steps[i]; break; }
    }

    // All 5 complete → scroll to summary
    if (!nextStep) {
        setTimeout(function() {
            showMealCompleteToast('¡Dieta completa! Aquí tienes tu resumen');
            if (trainerTabsScrollHandler) {
                window.removeEventListener('scroll', trainerTabsScrollHandler);
            }
            var tabsNav = document.querySelector('.trainer-tabs-nav');
            if (tabsNav) {
                tabsNav.style.transition = 'none';
                tabsNav.classList.add('tabs-hidden');
                tabsNav.offsetHeight;
                tabsNav.style.transition = '';
            }
            var summary = document.getElementById('trainer-nutrition');
            if (summary) {
                var top = summary.getBoundingClientRect().top + window.pageYOffset - 16;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
            setTimeout(function() { setupTrainerTabsVisibility(); }, 1000);
        }, 400);
        return;
    }

    // Need to change tab?
    if (nextStep.tab !== currentTrainerTab) {
        var msgs = {
            'breakfast': 'Falta el desayuno',
            'lunch': nextStep.key === 'lunchCarb' ? 'Vamos con la comida' : 'Falta la proteína de la comida',
            'dinner': nextStep.key === 'dinnerCarb' ? 'Vamos con la cena' : 'Falta la proteína de la cena'
        };
        setTimeout(function() {
            showMealCompleteToast(msgs[nextStep.tab]);
            switchTrainerTab(nextStep.tab);
            // After tab switch, scroll to the right section if it's protein
            if (nextStep.section === 'protein') {
                setTimeout(function() {
                    scrollToTrainerSection(nextStep.tab, 'protein');
                }, 500);
            }
        }, 400);
    } else if (nextStep.section === 'protein') {
        // Same tab, but need to scroll down to protein section
        setTimeout(function() {
            scrollToTrainerSection(nextStep.tab, 'protein');
        }, 100);
    }
}

function scrollToTrainerSection(meal, sectionType) {
    var panel = document.querySelector('.trainer-tab-panel[data-trainer-panel="' + meal + '"]');
    if (!panel) return;
    var wrappers = panel.querySelectorAll('.meal-table-wrapper');
    // carbs = first wrapper, protein = second wrapper
    var target = sectionType === 'protein' ? wrappers[1] : wrappers[0];
    if (target) {
        var rect = target.getBoundingClientRect();
        var offset = 60;
        if (rect.top < offset || rect.top > window.innerHeight * 0.5) {
            window.scrollBy({ top: rect.top - offset, behavior: 'smooth' });
        }
    }
}

// Trainer selection — prevent scroll-triggered selections on mobile
var trainerTouchStartY = 0;
var trainerTouchMoved = false;

document.getElementById('trainer-mode').addEventListener('touchstart', function(e) {
    trainerTouchStartY = e.touches[0].clientY;
    trainerTouchMoved = false;
}, { passive: true });

document.getElementById('trainer-mode').addEventListener('touchmove', function(e) {
    if (Math.abs(e.touches[0].clientY - trainerTouchStartY) > 10) {
        trainerTouchMoved = true;
    }
}, { passive: true });

document.addEventListener('click', function(e) {
    // Skip if this was a scroll gesture on mobile
    if (trainerTouchMoved) { trainerTouchMoved = false; return; }

    // Toggle extras collapsible
    var toggle = e.target.closest('#trainer-extras-toggle');
    if (toggle) {
        var body = document.getElementById('trainer-extras-body');
        var section = toggle.closest('.trainer-extras-section');
        if (body) body.classList.toggle('open');
        if (section) section.classList.toggle('extras-open');
        return;
    }

    // Extra foods: add button
    if (e.target.id === 'trainer-extra-add' || e.target.closest('#trainer-extra-add')) {
        var foodSelect = document.getElementById('trainer-extra-food');
        var gramsInput = document.getElementById('trainer-extra-grams');
        if (foodSelect && gramsInput) {
            var catalogIdx = parseInt(foodSelect.value);
            var grams = parseInt(gramsInput.value);
            if (!isNaN(catalogIdx) && grams > 0 && catalogIdx >= 0 && catalogIdx < trainerFoodCatalog.length) {
                trainerExtraFoods.push({ catalogIdx: catalogIdx, grams: grams });
                renderTrainerContent();
            }
        }
        return;
    }

    // Extra foods: remove button
    var removeBtn = e.target.closest('[data-extra-remove]');
    if (removeBtn) {
        var removeIdx = parseInt(removeBtn.dataset.extraRemove);
        if (!isNaN(removeIdx) && removeIdx >= 0 && removeIdx < trainerExtraFoods.length) {
            trainerExtraFoods.splice(removeIdx, 1);
            renderTrainerContent();
        }
        return;
    }

    // Breakfast cards
    var card = e.target.closest('[data-trainer-type="breakfast"]');
    if (card) {
        var idx = parseInt(card.dataset.trainerIndex);
        trainerSelections.breakfast = trainerSelections.breakfast === idx ? null : idx;
        renderTrainerContent();
        checkAutoAdvanceTrainer();
        return;
    }
    // Meal table rows
    var row = e.target.closest('tr[data-trainer-meal]');
    if (row) {
        var meal = row.dataset.trainerMeal;
        var type = row.dataset.trainerType;
        var idx2 = parseInt(row.dataset.trainerIndex);
        var key = meal === 'lunch'
            ? (type === 'carb' ? 'lunchCarb' : 'lunchProtein')
            : (type === 'carb' ? 'dinnerCarb' : 'dinnerProtein');
        trainerSelections[key] = trainerSelections[key] === idx2 ? null : idx2;
        renderTrainerContent();
        checkAutoAdvanceTrainer();
        return;
    }
});

// Exit trainer mode button
document.addEventListener('click', function(e) {
    if (e.target.id === 'trainer-exit-btn' || e.target.closest('#trainer-exit-btn')) {
        exitTrainerMode();
    }
    // Macro fix button
    var fixBtn = e.target.closest('.tmti-fix-btn');
    if (fixBtn) {
        e.stopPropagation();
        showMacroFixTooltip(fixBtn.dataset.macro);
    }
    // About modal
    if (e.target.id === 'footer-about-btn' || e.target.closest('#footer-about-btn')) {
        document.getElementById('about-overlay').style.display = '';
    }
    if (e.target.id === 'about-overlay' || e.target.id === 'about-close' || e.target.closest('#about-close')) {
        document.getElementById('about-overlay').style.display = 'none';
    }
});

// ============================================================
// EXPORT DIET AS IMAGE / PDF
// ============================================================

function showExportModal() {
    document.getElementById('export-modal').style.display = '';
}

function hideExportModal() {
    document.getElementById('export-modal').style.display = 'none';
}

document.getElementById('export-modal-cancel').addEventListener('click', hideExportModal);
document.getElementById('export-modal').addEventListener('click', function(e) {
    if (e.target === this) hideExportModal();
});

document.getElementById('export-as-png').addEventListener('click', function() {
    hideExportModal();
    exportDiet('png');
});

document.getElementById('export-as-pdf').addEventListener('click', function() {
    hideExportModal();
    exportDiet('pdf');
});

// ============================================================
// WHATSAPP SHARE
// ============================================================
function buildWhatsAppText() {
    var ratios = getScalingRatios();
    var carbR = ratios.carb;
    var protR = ratios.protein;

    function getBreakfastText() {
        if (selections.breakfast === null) return '';
        var opt = breakfastOptions[selections.breakfast];
        var lines = opt.items.map(function(item) {
            var line = '  • ' + item.text;
            if (item.amount !== null) {
                var scaled = scaleAmount(item.amount, carbR);
                line += ': *' + scaled + (item.unit || 'g') + '*';
            }
            if (item.extra) {
                var extraScaled = scaleAmount(item.extraBase, carbR);
                var extraText = item.extra.replace(/\{(\d+)\}/, extraScaled);
                line += ' ' + extraText;
            }
            if (item.spoonHint) { line += ' ' + oilSpoonHint(scaled); }
            if (item.glassHint) { line += ' ' + milkGlassHint(scaled); }
            return line;
        });
        var bkKcal = Math.round(opt.macros[0] * carbR);
        return '☀️ *DESAYUNO* — ' + bkKcal + ' kcal\n_' + opt.name + '_\n' + lines.join('\n');
    }

    function getMealText(title, emoji, carbsData, protsData, carbIdx, protIdx) {
        var lines = [];
        var kcal = 0;
        if (carbIdx !== null) {
            var carb = carbsData[carbIdx];
            var cg = scaleAmount(carb.base, carbR);
            lines.push('  • ' + carb.name + ': *' + cg + (carb.unit || 'g') + '*');
            kcal += carb.n[0] * cg / 100;
        }
        if (protIdx !== null) {
            var prot = protsData[protIdx];
            var pg = scaleAmount(prot.base, protR);
            lines.push('  • ' + prot.name + ': *' + pg + (prot.unit || 'g') + '*');
            kcal += prot.n[0] * pg / 100;
        }
        var vegG = scaleAmount(200, carbR);
        var oilMl = scaleAmount(EXTRAS_OIL_ML, carbR);
        lines.push('  • Verduras/ensalada: *~' + vegG + 'g*');
        lines.push('  • Aceite de oliva: *' + oilMl + 'ml*');
        lines.push('  • 1 pieza de fruta');
        kcal += extrasNutr.verduras[0] * vegG / 100;
        kcal += extrasNutr.aceite[0] * oilMl / 100;
        kcal += extrasNutr.fruta[0];
        return emoji + ' *' + title + '* — ' + Math.round(kcal) + ' kcal\n' + lines.join('\n');
    }

    var macroData = calculateSelectedMacros();
    var macros = macroData.total || macroData;
    var totalKcal = Math.round(macros.kcal);
    var p = Math.round(macros.protein);
    var c = Math.round(macros.carbs);
    var f = Math.round(macros.fat);

    var goalName = goalLabels[userGoal] || 'Mi dieta';
    var goalIcon = goalIcons[userGoal] || '🍽️';

    var text = '🍽️ *' + (userName ? 'PLAN DE ' + userName.toUpperCase() : 'MI PLAN NUTRICIONAL') + '*\n';
    text += goalIcon + ' Objetivo: *' + goalName + '*\n';
    text += '📊 *' + totalKcal + ' kcal*\n';
    text += '  • Proteínas: ' + p + 'g\n';
    text += '  • Carbohidratos: ' + c + 'g\n';
    text += '  • Grasas: ' + f + 'g\n';
    text += '\n━━━━━━━━━━━━━━━━━━━━\n\n';

    text += getBreakfastText() + '\n\n';
    text += getMealText('COMIDA', '🍲', lunchCarbs, lunchProteins, selections.lunchCarb, selections.lunchProtein) + '\n\n';
    text += getMealText('CENA', '🌙', dinnerCarbs, dinnerProteins, selections.dinnerCarb, selections.dinnerProtein) + '\n\n';

    text += '━━━━━━━━━━━━━━━━━━━━\n\n';
    text += '💊 *SUPLEMENTOS*\n';
    var waTrains = document.getElementById('calc-trains') && document.getElementById('calc-trains').value === 'yes';
    if (waTrains) {
        text += '  • 💪 Creatina: 5g/día\n';
    }
    text += '  • 🐟 Omega 3: 2 pastillas/día\n';
    text += '  • 🧲 Magnesio: 300mg antes de dormir\n';
    text += '  • ⚡ Zinc: 30mg antes de dormir\n';

    // Recommendations summary
    text += '\n━━━━━━━━━━━━━━━━━━━━\n\n';
    text += '💡 *RECOMENDACIONES*\n';
    var trains = waTrains;
    var stepsEl = document.getElementById('calc-steps');
    var stepsUnknown = document.getElementById('calc-steps-unknown');
    var lowSteps = (!stepsEl || !stepsEl.value || parseInt(stepsEl.value) < 8000) || (stepsUnknown && stepsUnknown.checked);

    if (!trains) {
        text += '  • 🏋️ Empieza a entrenar fuerza: mínimo 2 días/semana para preservar músculo\n';
    }
    if (lowSteps) {
        text += '  • 🚶 Camina al menos 8.000-10.000 pasos/día: quema ~300-500 kcal extra sin esfuerzo\n';
    }
    if (userGoal === 'cut' || userGoal === 'recomp') {
        text += '  • 🥩 Prioriza proteína alta (1.6-2.4g/kg): clave para no perder músculo en déficit\n';
    }
    var alcoholEl = document.getElementById('calc-alcohol');
    if (alcoholEl && alcoholEl.value !== 'none') {
        text += '  • 🍺 Reduce el alcohol: inhibe la quema de grasa y la síntesis muscular\n';
    }
    text += '  • 📅 Constancia > perfección: la mejor dieta es la que puedes mantener en el tiempo\n';
    text += '  • 🥦 Incluye verduras en cada comida para saciarte con pocas calorías\n';

    text += '\n━━━━━━━━━━━━━━━━━━━━\n\n';
    text += '¿Qué te parece esta dieta? 💪\n';
    text += 'Hecha con 👉 https://pcresp0.github.io/dieta_gym_PCB/';

    return text;
}

document.getElementById('share-whatsapp-btn').addEventListener('click', function() {
    var text = buildWhatsAppText();
    var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
    window.open(url, '_blank', 'noopener,noreferrer');
});

function buildExportCanvas() {
    var ratios = getScalingRatios();
    var carbRatio = ratios.carb;
    var protRatio = ratios.protein;
    var macroData = calculateSelectedMacros();
    var macros = macroData.total;
    var kcal = Math.round(macros.kcal);
    var p = Math.round(macros.protein);
    var c = Math.round(macros.carbs);
    var f = Math.round(macros.fat);

    // Colors
    var bg = '#1B1F2E';
    var cardBg = '#242838';
    var accent = '#F0B840';
    var textWhite = '#FFFFFF';
    var textMuted = '#9CA3AF';
    var textLight = '#D1D5DB';
    var proteinColor = '#6366F1';
    var carbsColor = '#F59E0B';
    var fatColor = '#EF4444';

    var W = 1080;
    var pad = 40;
    var contentW = W - pad * 2;

    // Pre-calculate height
    var y = 0;
    y += 100; // header
    y += 28; // gap after header
    // profile card
    var profileRowCount = 4; // sex, age, height, weight
    var bf = document.getElementById('calc-bf').value;
    if (bf) profileRowCount++;
    if (userGoal) profileRowCount++;
    if (userTdee) profileRowCount++;
    profileRowCount++; // kcal
    y += 52 + profileRowCount * 36 + 24;
    y += 24;
    // breakfast
    if (selections.breakfast !== null) {
        var bOpt = breakfastOptions[selections.breakfast];
        y += 56 + bOpt.items.length * 34 + 24;
    }
    y += 24;
    // lunch
    if (selections.lunchCarb !== null || selections.lunchProtein !== null) {
        var lunchItemCount = 3; // verduras + aceite + fruta
        if (selections.lunchCarb !== null) {
            lunchItemCount++;
            if (lunchCarbs[selections.lunchCarb].altName) lunchItemCount++;
        }
        if (selections.lunchProtein !== null) lunchItemCount++;
        y += 56 + lunchItemCount * 34 + 24;
        y += 24;
    }
    // dinner
    if (selections.dinnerCarb !== null || selections.dinnerProtein !== null) {
        var dinnerItemCount = 3; // verduras + aceite + fruta
        if (selections.dinnerCarb !== null) {
            dinnerItemCount++;
            if (dinnerCarbs[selections.dinnerCarb].altName) dinnerItemCount++;
        }
        if (selections.dinnerProtein !== null) dinnerItemCount++;
        y += 56 + dinnerItemCount * 34 + 24;
        y += 24;
    }
    // supplements
    y += 56 + supplements.length * 36 + 24;
    y += 24;
    // macros section (new cleaner layout)
    y += 260;
    y += 24;
    // footer
    y += 50;
    y += 40;

    var H = Math.max(y, 900);

    var canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    var ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Drawing helpers
    function drawRoundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
    }

    function fillCard(x, y, w, h) {
        drawRoundRect(x, y, w, h, 12);
        ctx.fillStyle = cardBg;
        ctx.fill();
    }

    function drawText(text, x, yPos, color, font) {
        ctx.fillStyle = color || textWhite;
        ctx.font = font || '20px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(text, x, yPos);
    }

    // ---- HEADER BAR ----
    var grd = ctx.createLinearGradient(0, 0, W, 0);
    grd.addColorStop(0, '#7A5A10');
    grd.addColorStop(1, '#5A4005');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, 90);

    ctx.fillStyle = textWhite;
    ctx.font = 'bold 32px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText(userName ? 'Plan de ' + userName : 'Mi Plan Nutricional', pad, 52);

    var today = new Date();
    var dateStr = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'right';
    ctx.fillText(dateStr, W - pad, 52);
    ctx.textAlign = 'left';

    var curY = 118;

    // ---- PROFILE CARD ----
    var sex = document.getElementById('calc-sex').value;
    var age = document.getElementById('calc-age').value;
    var height = document.getElementById('calc-height').value;
    var weight = document.getElementById('calc-weight').value;
    var sexLabel = sex === 'male' ? 'Hombre' : 'Mujer';

    var profileRows = [];
    profileRows.push(['Sexo', sexLabel]);
    profileRows.push(['Edad', age + ' anos']);
    profileRows.push(['Altura', height + ' cm']);
    profileRows.push(['Peso', weight + ' kg']);
    if (bf) profileRows.push(['Grasa corporal', bf + '%']);
    if (userGoal) profileRows.push(['Objetivo', goalIcons[userGoal] + ' ' + goalLabels[userGoal]]);
    if (userTdee) profileRows.push(['TDEE', userTdee + ' kcal/dia']);
    profileRows.push(['Calorias diarias', currentKcal + ' kcal']);

    var profileH = 52 + profileRows.length * 36 + 20;
    fillCard(pad, curY, contentW, profileH);

    ctx.fillStyle = accent;
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Tu Perfil', pad + 20, curY + 34);

    var pY = curY + 64;
    profileRows.forEach(function(row) {
        drawText(row[0], pad + 20, pY, textMuted, '18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
        ctx.textAlign = 'right';
        drawText(row[1], W - pad - 20, pY, textWhite, 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
        ctx.textAlign = 'left';
        pY += 36;
    });
    curY += profileH + 24;

    // ---- MEALS ----
    function drawMealSection(title, items, startY) {
        var sectionH = 56 + items.length * 34 + 20;
        fillCard(pad, startY, contentW, sectionH);
        ctx.fillStyle = accent;
        ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(title, pad + 20, startY + 34);

        var iY = startY + 64;
        items.forEach(function(item) {
            drawText(item.name, pad + 24, iY, textLight, '18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
            if (item.amount) {
                ctx.textAlign = 'right';
                drawText(item.amount, W - pad - 20, iY, accent, 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
                ctx.textAlign = 'left';
            }
            iY += 34;
        });
        return startY + sectionH + 24;
    }

    // Breakfast
    if (selections.breakfast !== null) {
        var bOpt = breakfastOptions[selections.breakfast];
        var bItems = bOpt.items.map(function(it) {
            var amt = it.amount !== null ? scaleAmount(it.amount, carbRatio) + (it.unit || 'g') : '';
            var name = it.text;
            if (it.extra) {
                var extraScaled = scaleAmount(it.extraBase, carbRatio);
                var extraText = it.extra.replace(/\{(\d+)\}/, extraScaled);
                name += '  ' + extraText;
            }
            if (it.spoonHint) {
                var spAmt = it.amount !== null ? scaleAmount(it.amount, carbRatio) : 0;
                name += '  ' + oilSpoonHint(spAmt);
            }
            if (it.glassHint) {
                var glAmt = it.amount !== null ? scaleAmount(it.amount, carbRatio) : 0;
                name += '  ' + milkGlassHint(glAmt);
            }
            return { name: name, amount: amt };
        });
        curY = drawMealSection('Desayuno  —  ' + bOpt.name, bItems, curY);
    }

    // Lunch
    if (selections.lunchCarb !== null || selections.lunchProtein !== null) {
        var lItems = [];
        if (selections.lunchCarb !== null) {
            var lc = lunchCarbs[selections.lunchCarb];
            var lcAmt = scaleAmount(lc.base, carbRatio) + (lc.unit || 'g');
            lItems.push({ name: lc.name, amount: lcAmt });
            if (lc.altName) {
                var lcAltAmt = scaleAmount(lc.altBase, carbRatio) + (lc.unit || 'g');
                lItems.push({ name: '  ↳ ó ' + lc.altName, amount: lcAltAmt });
            }
        }
        if (selections.lunchProtein !== null) {
            var lp = lunchProteins[selections.lunchProtein];
            lItems.push({ name: lp.name, amount: scaleAmount(lp.base, protRatio) + (lp.unit || 'g') });
        }
        var vegG = scaleAmount(200, carbRatio);
        var oilMl = scaleAmount(EXTRAS_OIL_ML, carbRatio);
        lItems.push({ name: 'Verduras / ensalada', amount: '~' + vegG + 'g' });
        lItems.push({ name: 'Aceite de oliva', amount: oilMl + 'ml' });
        lItems.push({ name: '1 pieza de fruta', amount: '' });
        curY = drawMealSection('Comida', lItems, curY);
    }

    // Dinner
    if (selections.dinnerCarb !== null || selections.dinnerProtein !== null) {
        var dItems = [];
        if (selections.dinnerCarb !== null) {
            var dc = dinnerCarbs[selections.dinnerCarb];
            var dcAmt = scaleAmount(dc.base, carbRatio) + (dc.unit || 'g');
            dItems.push({ name: dc.name, amount: dcAmt });
            if (dc.altName) {
                var dcAltAmt = scaleAmount(dc.altBase, carbRatio) + (dc.unit || 'g');
                dItems.push({ name: '  ↳ ó ' + dc.altName, amount: dcAltAmt });
            }
        }
        if (selections.dinnerProtein !== null) {
            var dp = dinnerProteins[selections.dinnerProtein];
            dItems.push({ name: dp.name, amount: scaleAmount(dp.base, protRatio) + (dp.unit || 'g') });
        }
        var vegGd = scaleAmount(200, carbRatio);
        var oilMld = scaleAmount(EXTRAS_OIL_ML, carbRatio);
        dItems.push({ name: 'Verduras / ensalada', amount: '~' + vegGd + 'g' });
        dItems.push({ name: 'Aceite de oliva', amount: oilMld + 'ml' });
        dItems.push({ name: '1 pieza de fruta', amount: '' });
        curY = drawMealSection('Cena', dItems, curY);
    }

    // ---- SUPPLEMENTS ----
    var suppItems = supplements.map(function(s) {
        return { name: s.icon + '  ' + s.title, amount: s.desc };
    });
    curY = drawMealSection('Suplementacion', suppItems, curY);

    // ---- MACROS SECTION (improved layout) ----
    var macroSectionH = 240;
    fillCard(pad, curY, contentW, macroSectionH);

    // Title
    ctx.fillStyle = accent;
    ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.fillText('Macronutrientes', pad + 20, curY + 34);

    // Total kcal - right aligned in header area
    ctx.fillStyle = textWhite;
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(kcal + ' kcal', W - pad - 20, curY + 36);
    ctx.textAlign = 'left';

    // Stacked bar
    var barX = pad + 20;
    var barY = curY + 60;
    var barW = contentW - 40;
    var barH = 24;
    var totalG = p + c + f;
    var pPct = totalG > 0 ? p / totalG : 0;
    var cPct = totalG > 0 ? c / totalG : 0;
    var fPct = totalG > 0 ? f / totalG : 0;

    // Rounded stacked bar
    drawRoundRect(barX, barY, barW, barH, 12);
    ctx.save();
    ctx.clip();
    if (pPct > 0) { ctx.fillStyle = proteinColor; ctx.fillRect(barX, barY, barW * pPct, barH); }
    if (cPct > 0) { ctx.fillStyle = carbsColor; ctx.fillRect(barX + barW * pPct, barY, barW * cPct, barH); }
    if (fPct > 0) { ctx.fillStyle = fatColor; ctx.fillRect(barX + barW * (pPct + cPct), barY, barW * fPct, barH); }
    ctx.restore();

    // 3 Macro cards below bar
    var cardGap = 20;
    var cardW = (contentW - 40 - cardGap * 2) / 3;
    var cardH = 110;
    var cardY = barY + barH + 24;
    var cardStartX = pad + 20;

    var macroCards = [
        { label: 'Proteinas', grams: p, pct: Math.round(pPct * 100), color: proteinColor },
        { label: 'Carbohidratos', grams: c, pct: Math.round(cPct * 100), color: carbsColor },
        { label: 'Grasas', grams: f, pct: Math.round(fPct * 100), color: fatColor }
    ];

    macroCards.forEach(function(mc, i) {
        var cx = cardStartX + i * (cardW + cardGap);

        // Card background
        drawRoundRect(cx, cardY, cardW, cardH, 10);
        ctx.fillStyle = '#1B1F2E';
        ctx.fill();

        // Color accent bar at top of card
        drawRoundRect(cx, cardY, cardW, 5, 0);
        ctx.fillStyle = mc.color;
        ctx.fill();
        // Fix top corners
        drawRoundRect(cx, cardY, cardW, cardH, 10);
        ctx.save();
        ctx.clip();
        ctx.fillStyle = mc.color;
        ctx.fillRect(cx, cardY, cardW, 5);
        ctx.restore();

        // Label
        ctx.textAlign = 'center';
        drawText(mc.label, cx + cardW / 2, cardY + 34, textMuted, '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');

        // Grams
        drawText(mc.grams + 'g', cx + cardW / 2, cardY + 68, textWhite, 'bold 30px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');

        // Percentage
        drawText(mc.pct + '%', cx + cardW / 2, cardY + 94, textMuted, '18px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif');
        ctx.textAlign = 'left';
    });

    curY += macroSectionH + 24;

    // ---- FOOTER ----
    ctx.fillStyle = textMuted;
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Generado con Mi Plan Nutricional  \u2022  pcresp0.github.io/dieta_gym_PCB', W / 2, curY + 16);
    ctx.textAlign = 'left';

    // Trim canvas to actual height
    var finalH = curY + 40;
    var trimmed = document.createElement('canvas');
    trimmed.width = W;
    trimmed.height = finalH;
    var tCtx = trimmed.getContext('2d');
    tCtx.drawImage(canvas, 0, 0);

    return trimmed;
}

function exportDiet(format) {
    var canvas = buildExportCanvas();

    if (format === 'pdf') {
        exportAsPdf(canvas);
    } else {
        // PNG export — direct download
        canvas.toBlob(function(blob) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = getExportFileName('Mi Plan Nutricional') + '.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(function() { URL.revokeObjectURL(url); }, 5000);
        }, 'image/png');
    }
}

function openBlobInNewTab(blob) {
    var url = URL.createObjectURL(blob);
    var w = window.open(url, '_blank', 'noopener');
    if (!w) {
        // Popup blocked — try direct location
        window.location.href = url;
    }
}

function exportAsPdf(canvas, fileName) {
    var pdfName = fileName || getExportFileName('Mi Plan Nutricional');
    // Use canvas as a full-page image in a PDF via jsPDF
    var script = document.getElementById('jspdf-script');
    if (!script) {
        script = document.createElement('script');
        script.id = 'jspdf-script';
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = function() { generatePdf(canvas, pdfName); };
        document.head.appendChild(script);
    } else {
        generatePdf(canvas, pdfName);
    }
}

function generatePdf(canvas, pdfName) {
    pdfName = pdfName || getExportFileName('Mi Plan Nutricional');
    var jsPDF = window.jspdf.jsPDF;
    var imgData = canvas.toDataURL('image/png');
    var cW = canvas.width;
    var cH = canvas.height;

    // A4 width in mm, scale canvas proportionally
    var pageW = 210;
    var pageH = 297;
    var imgW = pageW - 20; // 10mm margin each side
    var imgH = (cH / cW) * imgW;

    // If image is taller than one page, use a single long page
    var pdfH = Math.max(pageH, imgH + 20);

    var doc = new jsPDF({ unit: 'mm', format: [pageW, pdfH] });
    doc.addImage(imgData, 'PNG', 10, 10, imgW, imgH);
    doc.save(pdfName + '.pdf');
}

document.getElementById('export-btn').addEventListener('click', showExportModal);

document.addEventListener('DOMContentLoaded', init);
