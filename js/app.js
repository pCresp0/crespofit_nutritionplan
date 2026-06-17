// ============================================================
// DIET DATA - Base amounts for 2500 kcal
// ============================================================
var BASE_KCAL = 2500;

var breakfastOptions = [
    { id:'yogur-qfb', name:'Yogur de proteínas / QFB con cereales', macros:[550,42,62,14],
      items:[{text:'Corn flakes / copos de avena / cereales sin azúcar',amount:55,unit:'g'},{text:'Queso fresco batido',amount:500,unit:'g'},{text:'Yogur 2% + proteína',amount:200,unit:'g',extra:'+ {10}g prot',extraBase:10,isAlt:true},{text:'Frutos secos / crema de cacahuete',amount:25,unit:'g'}]},
    { id:'tostadas', name:'Tostadas', macros:[470,28,52,17],
      items:[{text:'Pan integral trigo/espelta/centeno',amount:120,unit:'g'},{text:'Lomo',amount:50,unit:'g',extra:'+ {30}g queso semi/havarti light',extraBase:30},{text:'Guacamole o aguacate',amount:40,unit:'g'}]},
    { id:'cereales-leche', name:'Cereales con leche y proteína', macros:[430,33,50,13],
      items:[{text:'Corn flakes / copos de avena / cereales sin azúcar',amount:45,unit:'g'},{text:'Leche semidesnatada (un vaso)',amount:200,unit:'ml'},{text:'Whey protein',amount:25,unit:'g'},{text:'Frutos secos / crema de cacahuete',amount:25,unit:'g'}]},
    { id:'tortitas', name:'Tortitas de avena', macros:[340,22,30,16],
      items:[{text:'Harina de avena / copos de avena',amount:45,unit:'g'},{text:'2 Huevos + claras',amount:100,unit:'g'},{text:'Frutos secos / crema de cacahuete',amount:10,unit:'g'}]},
    { id:'yogures-proteicos', name:'Yogures proteicos', macros:[420,25,60,8],
      items:[{text:'2 yogures proteicos LIDL',amount:null,unit:''},{text:'Cereales',amount:15,unit:'g'},{text:'Miel',amount:20,unit:'g'},{text:'Frutos secos',amount:15,unit:'g'},{text:'Zumo de naranja',amount:200,unit:'ml'}]},
    { id:'bocadillo', name:'Bocadillo de pollo/pavo y queso/guacamole', macros:[520,38,55,16],
      items:[{text:'Pan integral trigo/espelta/centeno',amount:120,unit:'g'},{text:'Pollo / Pavo',amount:100,unit:'g'},{text:'Queso',amount:60,unit:'g',extra:'ó {80}g guacamole',extraBase:80}]}
];

var lunchCarbs = [
    {name:'Arroz blanco',base:130,tag:'seco',n:[130,2.7,28,0.3]},{name:'Patata boniato',base:590,altName:'Precongelada',altBase:370,tag:'crudo',n:[86,1.6,20,0.1]},
    {name:'Tortitas de arroz',base:130,n:[385,7,83,3]},{name:'Pasta',base:130,tag:'seco',n:[360,13,72,1.5]},{name:'Pan',base:180,n:[265,9,49,3.2]},
    {name:'Quinoa',base:130,tag:'seco',n:[368,14,64,6]},{name:'Cus-cus',base:130,tag:'seco',n:[376,12.8,77,0.6]},{name:'Gnocchis de patata',base:260,n:[165,4,34,1]},
    {name:'Legumbres cocidas',base:450,tag:'cocido',n:[115,8,18,0.8]}
];
var lunchProteins = [
    {name:'Pollo',base:200,n:[110,23,0,1.5]},{name:'Pescado blanco',base:250,n:[82,18,0,0.8]},{name:'Salmón',base:125,n:[208,20,0,13]},
    {name:'Pavo',base:220,n:[105,24,0,1]},{name:'Hamburguesa de pollo',base:180,n:[150,17,4,7]},{name:'Huevo (2 completos) + claras',base:100,unit:'ml claras',n:[85,11,0.7,4]},
    {name:'Lomo adobado',base:200,n:[150,20,1,7]},{name:'Ternera',base:160,n:[155,22,0,7]}
];
var dinnerCarbs = [
    {name:'Arroz blanco',base:100,tag:'seco',n:[130,2.7,28,0.3]},{name:'Patata boniato',base:450,altName:'Precongelada',altBase:300,tag:'crudo',n:[86,1.6,20,0.1]},
    {name:'Tortitas de arroz',base:100,n:[385,7,83,3]},{name:'Pasta',base:100,tag:'seco',n:[360,13,72,1.5]},{name:'Pan',base:140,n:[265,9,49,3.2]},
    {name:'Quinoa',base:100,tag:'seco',n:[368,14,64,6]},{name:'Cus-cus',base:100,tag:'seco',n:[376,12.8,77,0.6]},{name:'Gnocchis de patata',base:200,n:[165,4,34,1]},
    {name:'Legumbres cocidas',base:350,tag:'cocido',n:[115,8,18,0.8]}
];
var dinnerProteins = [
    {name:'Pollo',base:200,n:[110,23,0,1.5]},{name:'Pescado blanco',base:250,n:[82,18,0,0.8]},{name:'Pavo',base:220,n:[105,24,0,1]},
    {name:'Hamburguesa de pollo',base:180,n:[150,17,4,7]},{name:'Huevo (2 yemas) + claras',base:100,unit:'ml claras',n:[85,11,0.7,4]},
    {name:'Lomo adobado',base:200,n:[150,20,1,7]},{name:'Ternera',base:160,n:[155,22,0,7]}
];

var extrasNutr = { verduras:[25,2,4,0.3], aceite:[900,0,0,100], fruta:[80,0.5,20,0.2] };
var EXTRAS_OIL_ML = 5; // 5ml aceite oliva por comida (según entrenador)

var supplements = [
    {icon:'💪',title:'Creatina',desc:'8g todos los días',tip:'8g/día crónicos para mantener saturación intramuscular. Mejora resíntesis de ATP y fuerza. No es necesaria fase de carga.'},
    {icon:'🐟',title:'Omega 3',desc:'2 pastillas/día (1 desayuno + 1 comida)',tip:'Dosis de 2-3g/día EPA+DHA atenúan DOMS y reducen inflamación (ISSN 2024).'},
    {icon:'🧲',title:'Magnesio',desc:'2 pastillas antes de dormir (300mg)',tip:'300mg/día (2×150mg cáps. ESN). Cofactor del ATP, mejora calidad del sueño profundo y reduce lactato.'},
    {icon:'⚡',title:'Zinc',desc:'2 pastillas antes de dormir (30mg)',tip:'30mg/día (2×15mg cáps. ESN). Apoyo inmunitario, recuperación muscular y mantenimiento hormonal.'},
    {icon:'😴',title:'Melatonina',desc:'Opcional, para favorecer el descanso',tip:'Mejora sprint anaeróbico al día siguiente, acelera recuperación y reduce marcadores de daño muscular.'}
];

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
var selections = { breakfast:null, lunchCarb:null, lunchProtein:null, dinnerCarb:null, dinnerProtein:null };

function getExportFileName(prefix) {
    var parts = [prefix || 'Mi Plan Nutricional'];
    if (userGoal && goalLabels[userGoal]) parts.push(goalLabels[userGoal]);
    parts.push(currentKcal + 'kcal');
    return parts.join('_').replace(/\s+/g, ' ');
}

// ============================================================
// SCALING — dynamic ratio based on actual selection base kcal
// ============================================================

// Reference kcal per slot (averages at base amounts) for unselected slots
var REF_SLOT_KCAL = { breakfast:455, lunchCarb:448, lunchProtein:227, dinnerCarb:346, dinnerProtein:223 };
// Extras: verduras + aceite scale with ratio; fruta is fixed (1 piece per meal)
var EXTRAS_SCALED_BASE = extrasNutr.verduras[0]*200/100 + extrasNutr.aceite[0]*EXTRAS_OIL_ML/100; // ~95
var EXTRAS_FIXED_KCAL = extrasNutr.fruta[0]; // 80 per meal, not scaled
var NUM_EXTRA_MEALS = 2; // lunch + dinner

function getScaleableBaseKcal() {
    var t = 0;
    t += selections.breakfast !== null
        ? breakfastOptions[selections.breakfast].macros[0]
        : REF_SLOT_KCAL.breakfast;
    t += selections.lunchCarb !== null
        ? lunchCarbs[selections.lunchCarb].n[0] * lunchCarbs[selections.lunchCarb].base / 100
        : REF_SLOT_KCAL.lunchCarb;
    t += selections.lunchProtein !== null
        ? lunchProteins[selections.lunchProtein].n[0] * lunchProteins[selections.lunchProtein].base / 100
        : REF_SLOT_KCAL.lunchProtein;
    t += EXTRAS_SCALED_BASE; // lunch verduras + aceite
    t += selections.dinnerCarb !== null
        ? dinnerCarbs[selections.dinnerCarb].n[0] * dinnerCarbs[selections.dinnerCarb].base / 100
        : REF_SLOT_KCAL.dinnerCarb;
    t += selections.dinnerProtein !== null
        ? dinnerProteins[selections.dinnerProtein].n[0] * dinnerProteins[selections.dinnerProtein].base / 100
        : REF_SLOT_KCAL.dinnerProtein;
    t += EXTRAS_SCALED_BASE; // dinner verduras + aceite
    return t;
}

function getRatio() {
    var scaleBase = getScaleableBaseKcal();
    if (scaleBase <= 0) return 1;
    return (currentKcal - EXTRAS_FIXED_KCAL * NUM_EXTRA_MEALS) / scaleBase;
}

// Per-selection ratio for weekly plan (all slots filled)
function getRatioForSel(sel) {
    var t = 0;
    t += breakfastOptions[sel.breakfast].macros[0];
    t += lunchCarbs[sel.lunchCarb].n[0] * lunchCarbs[sel.lunchCarb].base / 100;
    t += lunchProteins[sel.lunchProtein].n[0] * lunchProteins[sel.lunchProtein].base / 100;
    t += EXTRAS_SCALED_BASE;
    t += dinnerCarbs[sel.dinnerCarb].n[0] * dinnerCarbs[sel.dinnerCarb].base / 100;
    t += dinnerProteins[sel.dinnerProtein].n[0] * dinnerProteins[sel.dinnerProtein].base / 100;
    t += EXTRAS_SCALED_BASE;
    if (t <= 0) return 1;
    return (currentKcal - EXTRAS_FIXED_KCAL * NUM_EXTRA_MEALS) / t;
}

function scaleAmount(base, ratio) {
    if (base === null || base === undefined) return null;
    var scaled = base * (ratio !== undefined ? ratio : getRatio());
    return scaled < 10 ? Math.round(scaled) : Math.round(scaled / 5) * 5;
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
    // cut: ~15% deficit (Helms 2014, Iraki 2019) - moderado para preservar músculo
    if (goal === 'cut') return Math.round((tdee * 0.85) / 100) * 100;
    if (goal === 'recomp') return Math.round((tdee * 0.95) / 100) * 100;
    if (goal === 'bulk') return Math.round((tdee * 1.15) / 100) * 100;
    return Math.round(tdee / 100) * 100;
}

// ============================================================
// MACROS CALCULATION
// ============================================================
function calculateSelectedMacros() {
    var ratio = getRatio();
    var base = { kcal:0, protein:0, carbs:0, fat:0 };
    var chosen = { kcal:0, protein:0, carbs:0, fat:0 };

    if (selections.breakfast !== null) {
        var m = breakfastOptions[selections.breakfast].macros;
        chosen.kcal += m[0]*ratio; chosen.protein += m[1]*ratio; chosen.carbs += m[2]*ratio; chosen.fat += m[3]*ratio;
    }

    function addFood(data, idx) {
        if (idx === null) return;
        var item = data[idx]; var g = scaleAmount(item.base, ratio);
        chosen.kcal += item.n[0]*g/100; chosen.protein += item.n[1]*g/100; chosen.carbs += item.n[2]*g/100; chosen.fat += item.n[3]*g/100;
    }
    function addExtras() {
        var vg = scaleAmount(200, ratio); var om = scaleAmount(EXTRAS_OIL_ML, ratio);
        base.kcal += extrasNutr.verduras[0]*vg/100; base.protein += extrasNutr.verduras[1]*vg/100; base.carbs += extrasNutr.verduras[2]*vg/100; base.fat += extrasNutr.verduras[3]*vg/100;
        base.kcal += extrasNutr.aceite[0]*om/100; base.fat += extrasNutr.aceite[3]*om/100;
        base.kcal += extrasNutr.fruta[0]; base.protein += extrasNutr.fruta[1]; base.carbs += extrasNutr.fruta[2]; base.fat += extrasNutr.fruta[3];
    }

    addFood(lunchCarbs, selections.lunchCarb); addFood(lunchProteins, selections.lunchProtein);
    addExtras();
    addFood(dinnerCarbs, selections.dinnerCarb); addFood(dinnerProteins, selections.dinnerProtein);
    addExtras();
    return { base: base, chosen: chosen, total: { kcal: base.kcal+chosen.kcal, protein: base.protein+chosen.protein, carbs: base.carbs+chosen.carbs, fat: base.fat+chosen.fat } };
}

// ============================================================
// RENDER
// ============================================================
function renderBreakfast() {
    var grid = document.getElementById('breakfast-grid');
    var ratio = getRatio();
    grid.innerHTML = breakfastOptions.map(function(opt, idx) {
        var sel = selections.breakfast === idx;
        var items = opt.items.map(function(it) {
            var cls = it.isAlt ? ' class="alt-item"' : '';
            var c = it.text;
            if (it.amount !== null) { c += ': <span class="amount">' + scaleAmount(it.amount,ratio) + it.unit + '</span>'; }
            if (it.extra) { c += ' <span style="color:#999">' + it.extra.replace(/\{(\d+)\}/, scaleAmount(it.extraBase,ratio)) + '</span>'; }
            return '<li' + cls + '>' + c + '</li>';
        }).join('');
        return '<div class="breakfast-card' + (sel?' selected':'') + '" data-index="'+idx+'"><div class="breakfast-card-title">'+opt.name+'</div><ul class="breakfast-card-items">'+items+'</ul></div>';
    }).join('');
}

function renderMealTable(cid, cd, pd, cs, ps, mt) {
    var container = document.getElementById(cid);
    var ratio = getRatio();
    var cr = cd.map(function(it,i) {
        var s = cs===i; var sc = scaleAmount(it.base,ratio); var u = it.unit||'g';
        var tagHtml = it.tag ? ' <span class="food-tag food-tag-'+it.tag+'">'+it.tag+'</span>' : '';
        var r = '<tr class="'+(s?'selected':'')+'" data-meal="'+mt+'" data-type="carb" data-index="'+i+'"><td>'+it.name+'</td><td>'+sc+' '+u+tagHtml+'</td></tr>';
        if (it.altName) { r += '<tr class="sub-row '+(s?'selected':'')+'" data-meal="'+mt+'" data-type="carb" data-index="'+i+'"><td>'+it.altName+'</td><td>'+scaleAmount(it.altBase,ratio)+' '+u+tagHtml+'</td></tr>'; }
        return r;
    }).join('');
    var pr = pd.map(function(it,i) {
        var s = ps===i; var sc = scaleAmount(it.base,ratio); var u = it.unit||'g';
        return '<tr class="'+(s?'selected':'')+'" data-meal="'+mt+'" data-type="protein" data-index="'+i+'"><td>'+it.name+'</td><td>'+sc+' '+u+'</td></tr>';
    }).join('');
    container.innerHTML = '<div class="meal-table-wrapper"><div class="meal-table-header carbs">🌾 Hidratos de Carbono</div><table class="meal-table"><tbody>'+cr+'</tbody></table></div>' +
        '<div class="meal-table-wrapper"><div class="meal-table-header protein">🥩 Proteínas</div><table class="meal-table"><tbody>'+pr+'<tr class="note-row"><td colspan="2">Escurrir bien las latas de aceite de oliva</td></tr></tbody></table></div>';
}

function renderSupplements() {
    document.getElementById('supplements-list').innerHTML = supplements.map(function(s) {
        var tipHtml = s.tip ? '<button class="supp-tooltip-btn" data-supptip="'+s.title+'">?</button>' : '';
        return '<div class="supplement-card"><span class="supplement-icon">'+s.icon+'</span><div class="supplement-text"><strong>'+s.title+'</strong>'+s.desc+tipHtml+'</div></div>';
    }).join('');
}

function updateExtras() {
    var ratio = getRatio(); var vg = scaleAmount(200,ratio); var ol = scaleAmount(EXTRAS_OIL_ML,ratio);
    document.querySelectorAll('.scaled-veg-lunch,.scaled-veg-dinner').forEach(function(e){e.textContent=vg;});
    document.querySelectorAll('.scaled-oil-lunch,.scaled-oil-dinner').forEach(function(e){e.textContent=ol;});
}

function renderInfoBanner() {
    var el = document.getElementById('info-banner');
    if (!userGoal || !userTdee) { el.innerHTML = ''; return; }

    var diff = recommendedKcal - userTdee;
    var absDiff = Math.abs(diff);
    var pctDiff = Math.abs(Math.round(diff / userTdee * 100));

    var goalDescs = {
        cut: 'Comes por debajo de lo que quemas para <strong>perder grasa</strong> manteniendo músculo.',
        recomp: 'Comes ligeramente por debajo de lo que quemas para <strong>ganar músculo y perder grasa</strong> a la vez.',
        maintain: 'Comes lo mismo que quemas para <strong>mantener tu peso</strong> y composición corporal.',
        bulk: 'Comes por encima de lo que quemas para <strong>ganar masa muscular</strong> con mínima grasa.'
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
            '<div class="info-banner-goal" id="info-goal-picker">' +
                '<span class="info-goal-icon">' + goalIcons[userGoal] + '</span>' +
                '<span class="info-goal-text">' + goalLabels[userGoal] + ' ✎</span>' +
            '</div>' +
            '<div class="info-banner-metrics">' +
                '<div class="info-metric">' +
                    '<span class="info-metric-label">Lo que quemas</span>' +
                    '<span class="info-metric-value">' + userTdee + '</span>' +
                    '<span class="info-metric-sub">kcal/día (TDEE)</span>' +
                '</div>' +
                '<div class="info-metric-arrow">' +
                    (diff <= 0 ? '📉' : '📈') +
                '</div>' +
                '<div class="info-metric info-metric-highlight">' +
                    '<span class="info-metric-label">Lo que deberías comer</span>' +
                    '<span class="info-metric-value">' + recommendedKcal + '</span>' +
                    '<span class="info-metric-sub">kcal/día recomendadas</span>' +
                '</div>' +
            '</div>' +
            diffLabel +
            '<p class="info-banner-explain">' + goalDescs[userGoal] + '</p>' +
            '<button class="info-whatis-btn" id="info-whatis-btn">¿Qué es el TDEE?</button>' +
        '</div>';

    // Goal quick-change click
    document.getElementById('info-goal-picker').addEventListener('click', function(e) {
        showGoalPicker();
    });

    // TDEE explainer
    document.getElementById('info-whatis-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('tooltip-title').textContent = '¿Qué es el TDEE?';
        document.getElementById('tooltip-body').innerHTML =
            '<p>El <strong>TDEE</strong> (Total Daily Energy Expenditure) es el total de calorías que tu cuerpo gasta al día. Se calcula así:</p>' +
            '<ul class="tooltip-list">' +
            '<li><strong>TMB (Metabolismo Basal):</strong> Lo que quemas en reposo absoluto solo por estar vivo (respirar, bombear sangre, etc.).</li>' +
            '<li><strong>× Factor de actividad:</strong> Se multiplica por tu nivel de movimiento diario (trabajo, paseos, recados…) sin contar el entreno.</li>' +
            '<li><strong>+ Calorías de entreno:</strong> Lo que quemas en tus sesiones de ejercicio.</li>' +
            '</ul>' +
            '<p style="margin-top:10px;opacity:0.8">Si comes <strong>por debajo</strong> de tu TDEE → pierdes peso (déficit).<br>Si comes <strong>por encima</strong> → ganas peso (superávit).<br>Si comes <strong>igual</strong> → mantienes peso.</p>';
        document.getElementById('tooltip-overlay').style.display = '';
    });
}

function showGoalPicker() {
    var goals = ['cut', 'recomp', 'maintain', 'bulk'];
    var html = '<div class="goal-picker-title">Cambiar objetivo</div>';
    goals.forEach(function(g) {
        var sel = g === userGoal ? ' goal-picker-selected' : '';
        html += '<div class="goal-picker-option'+sel+'" data-goal="'+g+'">' +
            '<span class="goal-picker-icon">'+goalIcons[g]+'</span>' +
            '<div class="goal-picker-text"><strong>'+goalLabels[g]+'</strong></div>' +
            '</div>';
    });

    document.getElementById('tooltip-title').textContent = '';
    document.getElementById('tooltip-body').innerHTML = html;
    document.getElementById('tooltip-overlay').style.display = '';

    // Attach handlers
    document.querySelectorAll('.goal-picker-option').forEach(function(opt) {
        opt.addEventListener('click', function() {
            var newGoal = this.dataset.goal;
            if (newGoal === userGoal) {
                document.getElementById('tooltip-overlay').style.display = 'none';
                return;
            }
            userGoal = newGoal;
            recommendedKcal = getRecommendedKcal(userTdee, userGoal);
            currentKcal = recommendedKcal;
            document.getElementById('tooltip-overlay').style.display = 'none';
            document.getElementById('kcal-display').textContent = currentKcal;
            updateSliderRange();
            renderAll();
            saveAllState();
        });
    });
}

function updateKcalWarning() {
    var w = document.getElementById('kcal-warning');
    if (!userGoal || !recommendedKcal) { w.style.display = 'none'; return; }
    var diff = currentKcal - recommendedKcal;
    var absDiff = Math.abs(diff);
    if (absDiff <= 200) { w.style.display = 'none'; return; }

    w.style.display = '';
    var goalName = goalLabels[userGoal];
    var severe = absDiff >= 400;
    var resetBtn = '<button class="kcal-warning-reset" onclick="updateKcal(recommendedKcal)">Volver a ' + recommendedKcal + ' kcal</button>';

    if (userGoal === 'cut') {
        if (diff > 0) {
            w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
            if (severe) {
                w.innerHTML = '🚫 <strong>'+currentKcal+' kcal NO es adecuado para '+goalName+'.</strong> Estás '+absDiff+' kcal por encima de las '+recommendedKcal+' recomendadas. A este nivel probablemente <strong>no estés en déficit calórico</strong> y no perderás grasa. Podrías incluso ganar peso. ' + resetBtn;
            } else {
                w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por encima</strong> de lo recomendado para '+goalName+'. Podrías no estar en déficit suficiente.';
            }
        } else {
            w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
            if (severe) {
                w.innerHTML = '🚫 <strong>'+currentKcal+' kcal es un déficit extremo.</strong> Estás '+absDiff+' kcal por debajo de las '+recommendedKcal+' recomendadas. Un déficit mayor al 25-30% <strong>aumenta la pérdida de masa muscular</strong>, baja el metabolismo, reduce el rendimiento y puede causar problemas hormonales. ' + resetBtn;
            } else {
                w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por debajo</strong>. Un déficit tan agresivo puede afectar al rendimiento y a la masa muscular.';
            }
        }
    } else if (userGoal === 'recomp') {
        if (diff > 0) {
            w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
            if (severe) {
                w.innerHTML = '🚫 <strong>'+currentKcal+' kcal NO es adecuado para '+goalName+'.</strong> Estás '+absDiff+' kcal por encima de las '+recommendedKcal+' recomendadas. La recomposición requiere un ligero déficit (~5%). Con un superávit así <strong>acumularás grasa sin ganar músculo extra</strong>. Si quieres comer tanto, cambia a volumen. ' + resetBtn;
            } else {
                w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por encima</strong> de lo recomendado para '+goalName+'. Podrías acumular algo de grasa.';
            }
        } else {
            w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
            if (severe) {
                w.innerHTML = '🚫 <strong>'+currentKcal+' kcal NO es adecuado para '+goalName+'.</strong> Estás '+absDiff+' kcal por debajo de las '+recommendedKcal+' recomendadas. Con un déficit tan grande <strong>perderás músculo además de grasa</strong> y no lograrás recomposición. Mejor elige "Perder grasa" si quieres un déficit agresivo. ' + resetBtn;
            } else {
                w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por debajo</strong>. Un déficit mayor puede dificultar ganar músculo.';
            }
        }
    } else if (userGoal === 'bulk') {
        if (diff < 0) {
            w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
            if (severe) {
                w.innerHTML = '🚫 <strong>'+currentKcal+' kcal NO es adecuado para '+goalName+'.</strong> Estás '+absDiff+' kcal por debajo de las '+recommendedKcal+' recomendadas. A este nivel <strong>no estás en superávit</strong>, así que no ganarás masa muscular. Podrías incluso perder peso. ' + resetBtn;
            } else {
                w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por debajo</strong> de lo recomendado para '+goalName+'. Podrías no estar en superávit.';
            }
        } else {
            w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
            if (severe) {
                w.innerHTML = '🚫 <strong>'+currentKcal+' kcal es un superávit excesivo.</strong> Estás '+absDiff+' kcal por encima de las '+recommendedKcal+' recomendadas. Un superávit mayor al 20% <strong>genera más grasa que músculo</strong>. El exceso de calorías no acelera la ganancia muscular, solo la ganancia de grasa. ' + resetBtn;
            } else {
                w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por encima</strong>. Un superávit tan alto puede generar más grasa que músculo.';
            }
        }
    } else { // maintain
        w.className = 'kcal-warning ' + (severe ? 'warn-danger' : 'warn-info');
        if (severe) {
            w.innerHTML = '🚫 <strong>'+currentKcal+' kcal NO es mantenimiento.</strong> Estás '+absDiff+' kcal '+(diff>0?'por encima':'por debajo')+' de las '+recommendedKcal+' recomendadas. '+(diff>0?'Con ese exceso <strong>ganarás peso</strong>. Si es lo que buscas, cambia a "Ganar masa muscular" para hacerlo de forma óptima.':'Con ese déficit <strong>perderás peso</strong>. Si es lo que buscas, cambia a "Perder grasa" para hacerlo preservando músculo.')+' ' + resetBtn;
        } else {
            w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal '+(diff>0?'por encima':'por debajo')+'</strong> del mantenimiento.'+(diff>0?' Ganarás peso.':' Perderás peso.');
        }
    }
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
    if (selections.lunchCarb!==null||selections.lunchProtein!==null) meals.push('Almuerzo');
    if (selections.dinnerCarb!==null||selections.dinnerProtein!==null) meals.push('Cena');
    var complete = selections.breakfast!==null && selections.lunchCarb!==null && selections.lunchProtein!==null && selections.dinnerCarb!==null && selections.dinnerProtein!==null;
    var missingHtml = '';
    if (!complete) {
        var missingItems = [];
        if (selections.breakfast === null) missingItems.push('Desayuno');
        if (selections.lunchCarb === null) missingItems.push('Almuerzo: hidrato');
        if (selections.lunchProtein === null) missingItems.push('Almuerzo: prote\u00edna');
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
    renderSupplements(); updateExtras(); renderNutritionSummary(); renderInfoBanner(); updateKcalWarning(); renderValidator(); renderDietSummary();
}

// ============================================================
// TABS
// ============================================================
function activateTab(name) {
    document.querySelectorAll('.main-tab').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.tab-panel').forEach(function(p){p.classList.remove('active');});
    var btn = document.querySelector('.main-tab[data-tab="'+name+'"]');
    var panel = document.getElementById('tab-'+name);
    if (btn) btn.classList.add('active');
    if (panel) panel.classList.add('active');

    // Scroll so the tab panel content is visible right below the sticky tabs nav
    if (panel) {
        var tabsNav = document.querySelector('.main-tabs-nav');
        var navH = tabsNav ? tabsNav.offsetHeight : 0;
        var panelTop = panel.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: panelTop - navH - 4, behavior: 'smooth' });
    }
}
function getDefaultTab() { var h = new Date().getHours(); return h<11?'breakfast':h<17?'lunch':'dinner'; }

// ============================================================
// ONBOARDING
// ============================================================
var currentStep = 1;

function showStep(n) {
    currentStep = n;
    document.querySelectorAll('.onboarding-step').forEach(function(s){s.classList.remove('active');});
    var step = document.getElementById('step-'+n);
    if (step) step.classList.add('active');
    document.querySelectorAll('.progress-dot').forEach(function(d) {
        d.classList.toggle('active', parseInt(d.dataset.step) <= n);
        d.classList.toggle('current', parseInt(d.dataset.step) === n);
    });
}

function validateStep1() {
    var age = document.getElementById('calc-age').value;
    var h = document.getElementById('calc-height').value;
    var w = document.getElementById('calc-weight').value;
    return age && h && w && parseFloat(age)>0 && parseFloat(h)>0 && parseFloat(w)>0;
}

function validateStep2() {
    return document.getElementById('calc-activity').value !== '';
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
    // Remove previous recommended badges
    document.querySelectorAll('.goal-card').forEach(function(c) { c.classList.remove('recommended'); });

    if (!recommended) {
        recEl.style.display = 'none';
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
    var recCard = document.querySelector('.goal-card[data-goal="' + recommended + '"]');
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
    if (!v || v <= 0) { hint.textContent = ''; return; }
    var w = parseFloat(document.getElementById('calc-weight').value) || 70;
    var kcal = Math.round(v * 0.04 * (w / 70));
    hint.textContent = '~' + kcal + ' kcal extra al día por caminar';
});

// Step navigation
document.getElementById('next-1').addEventListener('click', function() {
    if (!validateStep1()) { alert('Rellena todos los campos: edad, altura y peso.'); return; }
    showStep(2);
});

document.getElementById('back-2').addEventListener('click', function() { showStep(1); });
document.getElementById('next-2').addEventListener('click', function() {
    if (!validateStep2()) { alert('Selecciona tu nivel de actividad diaria.'); return; }
    showGoalRecommendation();
    showStep(3);
});

document.getElementById('back-3').addEventListener('click', function() { showStep(2); });

// Goal selection
document.getElementById('goal-cards').addEventListener('click', function(e) {
    var card = e.target.closest('.goal-card');
    if (!card) return;
    document.querySelectorAll('.goal-card').forEach(function(c){c.classList.remove('selected');});
    card.classList.add('selected');
    userGoal = card.dataset.goal;
    document.getElementById('next-3').classList.remove('disabled');
});

document.getElementById('next-3').addEventListener('click', function() {
    if (!userGoal) return;
    var result = calculateTDEE();
    if (!result) { alert('Error calculando TDEE.'); return; }
    userTdee = result.tdee;
    recommendedKcal = getRecommendedKcal(result.tdee, userGoal);

    document.getElementById('ob-tdee').textContent = result.tdee;
    document.getElementById('ob-recommended').textContent = recommendedKcal;

    if (userGoal === 'cut') {
        document.getElementById('ob-goal-label').textContent = '🔥 Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Déficit del ~20%';
        document.getElementById('ob-explanation').innerHTML = 'Para <strong>perder grasa</strong> necesitas comer por debajo de tu gasto calórico. Te recomendamos un <strong>déficit moderado del 20%</strong> (~' + (result.tdee - recommendedKcal) + ' kcal menos/día) para preservar masa muscular y no pasar hambre.';
    } else if (userGoal === 'recomp') {
        document.getElementById('ob-goal-label').textContent = '🔄 Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Déficit mínimo ~5%';
        document.getElementById('ob-explanation').innerHTML = 'La <strong>recomposición corporal</strong> busca ganar músculo y perder grasa a la vez. Se consigue con un <strong>déficit mínimo (~5%)</strong>, alta proteína (1.6-2.2g/kg) y entrenamiento de fuerza. Es más lento que un bulk+cut, pero mejora la composición corporal sin fases extremas.';
    } else if (userGoal === 'bulk') {
        document.getElementById('ob-goal-label').textContent = '💪 Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Superávit del ~15%';
        document.getElementById('ob-explanation').innerHTML = 'Para <strong>ganar masa muscular</strong> necesitas comer por encima de tu gasto. Te recomendamos un <strong>superávit moderado del 15%</strong> (~' + (recommendedKcal - result.tdee) + ' kcal más/día) para maximizar ganancia muscular con mínima grasa.';
    } else {
        document.getElementById('ob-goal-label').textContent = '⚖️ Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Mantenimiento';
        document.getElementById('ob-explanation').innerHTML = 'Para <strong>mantener tu peso</strong> actual, come a tu nivel de gasto calórico. Tu composición corporal se mantendrá estable.';
    }

    showStep(4);
});

document.getElementById('back-4').addEventListener('click', function() { showStep(3); });

document.getElementById('start-plan').addEventListener('click', function() {
    currentKcal = recommendedKcal;
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('app-wrapper').style.display = '';
    document.getElementById('kcal-display').textContent = currentKcal;
    updateSliderRange();
    renderAll();
    activateTab(getDefaultTab());
    saveAllState();
});

// Reconfigure
document.getElementById('reconfigure-btn').addEventListener('click', function() {
    document.getElementById('app-wrapper').style.display = 'none';
    document.getElementById('onboarding').style.display = '';
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
    var slider = document.getElementById('kcal-range');
    var minVal = getSliderMin();
    var maxVal = getSliderMax();
    slider.min = minVal;
    slider.max = maxVal;
    slider.value = currentKcal;
    document.getElementById('kcal-min-label').textContent = minVal;
    document.getElementById('kcal-max-label').textContent = maxVal;
    // Position recommended marker
    var marker = document.getElementById('kcal-rec-marker');
    var recLabel = document.getElementById('kcal-rec-label');
    if (recommendedKcal && userGoal) {
        var pct = ((recommendedKcal - minVal) / (maxVal - minVal)) * 100;
        marker.style.left = pct + '%';
        marker.style.display = '';
        recLabel.textContent = '▲ Recomendado: ' + recommendedKcal + ' kcal';
    } else {
        marker.style.display = 'none';
        recLabel.textContent = '';
    }
}

function updateKcal(value) {
    var minVal = getSliderMin();
    var maxVal = getSliderMax();
    currentKcal = Math.max(minVal, Math.min(maxVal, value));
    document.getElementById('kcal-display').textContent = currentKcal;
    document.getElementById('kcal-range').value = currentKcal;
    renderAll();
    saveAllState();
}

document.getElementById('kcal-range').addEventListener('input', function(e) { updateKcal(parseInt(e.target.value)); });
document.getElementById('kcal-minus').addEventListener('click', function() { updateKcal(currentKcal - 100); });
document.getElementById('kcal-plus').addEventListener('click', function() { updateKcal(currentKcal + 100); });

// ============================================================
// SELECTION HANDLERS
// ============================================================
document.getElementById('breakfast-grid').addEventListener('click', function(e) {
    var card = e.target.closest('.breakfast-card'); if (!card) return;
    var idx = parseInt(card.dataset.index);
    selections.breakfast = selections.breakfast === idx ? null : idx;
    renderAll(); saveAllState();
});

document.addEventListener('click', function(e) {
    var row = e.target.closest('tr[data-meal]'); if (!row) return;
    var meal = row.dataset.meal, type = row.dataset.type, idx = parseInt(row.dataset.index);
    var key = meal==='lunch'?(type==='carb'?'lunchCarb':'lunchProtein'):(type==='carb'?'dinnerCarb':'dinnerProtein');
    selections[key] = selections[key]===idx?null:idx;
    renderAll(); saveAllState();
});

document.querySelectorAll('[data-toggle]').forEach(function(h) {
    h.addEventListener('click', function(e) {
        if (e.target.closest('.tooltip-trigger')) return;
        var s = this.dataset.toggle;
        var b = document.getElementById(s+'-body') || document.getElementById(s+'s-body');
        if (b) b.classList.toggle('open');
    });
});

document.querySelectorAll('.main-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
        var target = this.dataset.tab;
        var currentTab = document.querySelector('.main-tab.active');
        var current = currentTab ? currentTab.dataset.tab : null;
        if (current && current !== target) {
            var warning = getTabIncompleteWarning(current);
            if (warning) showTabToast(warning);
        }
        activateTab(target);
    });
});

function getTabIncompleteWarning(tab) {
    if (tab === 'breakfast' && selections.breakfast === null) return 'No has elegido desayuno';
    if (tab === 'lunch') {
        var missing = [];
        if (selections.lunchCarb === null) missing.push('hidrato');
        if (selections.lunchProtein === null) missing.push('proteína');
        if (missing.length > 0) return 'Falta ' + missing.join(' y ') + ' en el almuerzo';
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
            summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            lunchProtein: pickRandom(lunchProteins, usedLunchProt, lpMax),
            dinnerCarb: pickRandom(dinnerCarbs, usedDinnerCarb, dcMax),
            dinnerProtein: pickRandom(dinnerProteins, usedDinnerProt, dpMax)
        };
        plan.push({ day: days[d], selections: sel });
    }

    // Also try to avoid same carb in lunch and dinner same day
    for (var d = 0; d < 7; d++) {
        if (lunchCarbs[plan[d].selections.lunchCarb].name === dinnerCarbs[plan[d].selections.dinnerCarb].name) {
            // Try swapping dinner carb with another day
            for (var other = 0; other < 7; other++) {
                if (other !== d && lunchCarbs[plan[other].selections.lunchCarb].name !== dinnerCarbs[plan[d].selections.dinnerCarb].name
                    && lunchCarbs[plan[d].selections.lunchCarb].name !== dinnerCarbs[plan[other].selections.dinnerCarb].name) {
                    var tmp = plan[d].selections.dinnerCarb;
                    plan[d].selections.dinnerCarb = plan[other].selections.dinnerCarb;
                    plan[other].selections.dinnerCarb = tmp;
                    break;
                }
            }
        }
    }

    return plan;
}

function calcDayMacros(sel) {
    var ratio = getRatioForSel(sel);
    var t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

    // Breakfast
    var m = breakfastOptions[sel.breakfast].macros;
    t.kcal += m[0] * ratio; t.protein += m[1] * ratio; t.carbs += m[2] * ratio; t.fat += m[3] * ratio;

    function addFood(data, idx) {
        var item = data[idx];
        var grams = scaleAmount(item.base, ratio);
        t.kcal += item.n[0] * grams / 100; t.protein += item.n[1] * grams / 100;
        t.carbs += item.n[2] * grams / 100; t.fat += item.n[3] * grams / 100;
    }

    function addExtras() {
        var vegG = scaleAmount(200, ratio);
        t.kcal += extrasNutr.verduras[0] * vegG / 100; t.protein += extrasNutr.verduras[1] * vegG / 100;
        t.carbs += extrasNutr.verduras[2] * vegG / 100; t.fat += extrasNutr.verduras[3] * vegG / 100;
        var oilMl = scaleAmount(EXTRAS_OIL_ML, ratio);
        t.kcal += extrasNutr.aceite[0] * oilMl / 100; t.fat += extrasNutr.aceite[3] * oilMl / 100;
        t.kcal += extrasNutr.fruta[0]; t.protein += extrasNutr.fruta[1];
        t.carbs += extrasNutr.fruta[2]; t.fat += extrasNutr.fruta[3];
    }

    addFood(lunchCarbs, sel.lunchCarb); addFood(lunchProteins, sel.lunchProtein); addExtras();
    addFood(dinnerCarbs, sel.dinnerCarb); addFood(dinnerProteins, sel.dinnerProtein); addExtras();

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
    // 7 day cards, each ~ 220px
    for (var d = 0; d < 7; d++) {
        y += 240 + 20;
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
    ctx.fillText('📅 Mi Plan Semanal', pad, 52);

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
        var dayH = 220;

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

        // Meals
        var mealY = curY + 80;
        var bOpt = breakfastOptions[sel.breakfast];
        var lc = lunchCarbs[sel.lunchCarb];
        var lp = lunchProteins[sel.lunchProtein];
        var dc = dinnerCarbs[sel.dinnerCarb];
        var dp = dinnerProteins[sel.dinnerProtein];

        // Breakfast
        ctx.fillStyle = textMuted;
        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('☀️ Desayuno', pad + 20, mealY);
        ctx.fillStyle = textLight;
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(bOpt.name, pad + 150, mealY);

        mealY += 32;
        // Lunch
        ctx.fillStyle = textMuted;
        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('🍲 Almuerzo', pad + 20, mealY);
        var dayRatio = getRatioForSel(sel);
        var lcScaled = scaleAmount(lc.base, dayRatio);
        var lpScaled = scaleAmount(lp.base, dayRatio);
        ctx.fillStyle = textLight;
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(lc.name + ' (' + lcScaled + 'g)  +  ' + lp.name + ' (' + lpScaled + (lp.unit || 'g') + ')', pad + 150, mealY);

        mealY += 32;
        // Extras
        var vegG = scaleAmount(200, dayRatio);
        var oilMl = scaleAmount(EXTRAS_OIL_ML, dayRatio);
        ctx.fillStyle = textMuted;
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('+ ' + vegG + 'g verduras · ' + oilMl + 'ml aceite · 1 fruta (por comida)', pad + 150, mealY);

        mealY += 32;
        // Dinner
        ctx.fillStyle = textMuted;
        ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText('🌙 Cena', pad + 20, mealY);
        var dcScaled = scaleAmount(dc.base, dayRatio);
        var dpScaled = scaleAmount(dp.base, dayRatio);
        ctx.fillStyle = textLight;
        ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(dc.name + ' (' + dcScaled + 'g)  +  ' + dp.name + ' (' + dpScaled + (dp.unit || 'g') + ')', pad + 150, mealY);

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
            if (navigator.share && navigator.canShare) {
                var file = new File([blob], fileName + '.png', { type: 'image/png' });
                var shareData = { files: [file], title: 'Mi Plan Semanal' };
                if (navigator.canShare(shareData)) {
                    navigator.share(shareData).catch(function() { openBlobInNewTab(blob); });
                    return;
                }
            }
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
                '<h4>Recomendación para tu objetivo</h4>' +
                '<p class="macro-tip-rec"><strong>' + rec.range + ' g/kg' + rangeGrams + '</strong></p>' +
                '<p>' + rec.detail + '</p>' +
                '<p class="macro-tip-source">📚 Estudios</p>' +
                '<ul class="macro-tip-links">' +
                '<li><a href="https://bjsm.bmj.com/content/52/6/376" target="_blank" rel="noopener">Morton et al. 2018 – Protein &amp; muscle mass (BJSM)</a></li>' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/1550-2783-11-20" target="_blank" rel="noopener">Helms et al. 2014 – Natural bodybuilding (JISSN)</a></li>' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8" target="_blank" rel="noopener">Jäger et al. 2017 – ISSN Protein Position Stand</a></li>' +
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
                '<h4>Recomendación para tu objetivo</h4>' +
                '<p class="macro-tip-rec"><strong>' + rec.range + ' g/kg' + rangeGrams + '</strong></p>' +
                '<p>' + rec.detail + '</p>' +
                '<p class="macro-tip-source">📚 Estudios</p>' +
                '<ul class="macro-tip-links">' +
                '<li><a href="https://pubmed.ncbi.nlm.nih.gov/26891166/" target="_blank" rel="noopener">Thomas et al. 2016 – ACSM Nutrition &amp; Performance</a></li>' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0189-4" target="_blank" rel="noopener">Kerksick et al. 2017 – ISSN Nutrient Timing</a></li>' +
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
                '<h4>Recomendación para tu objetivo</h4>' +
                '<p class="macro-tip-rec"><strong>' + rec.range + ' g/kg' + rangeGrams + '</strong></p>' +
                '<p>' + rec.detail + '</p>' +
                '<p class="macro-tip-source">📚 Estudios</p>' +
                '<ul class="macro-tip-links">' +
                '<li><a href="https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8" target="_blank" rel="noopener">Jäger et al. 2017 – ISSN Position Stand</a></li>' +
                '<li><a href="https://pubmed.ncbi.nlm.nih.gov/29182451/" target="_blank" rel="noopener">Hector &amp; Phillips 2018 – Protein &amp; fat loss (IJSNEM)</a></li>' +
                '<li><a href="https://pubmed.ncbi.nlm.nih.gov/25550171/" target="_blank" rel="noopener">Volek et al. 2015 – Dietary fat &amp; performance</a></li>' +
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
});

// ============================================================
// PERSISTENCE
// ============================================================
function saveAllState() {
    try {
        var calcData = {};
        ['calc-sex','calc-age','calc-height','calc-weight','calc-bf','calc-activity','calc-trains','calc-train-type','calc-train-days','calc-train-duration','calc-train-intensity','calc-steps'].forEach(function(id) {
            var el = document.getElementById(id); if (el) calcData[id] = el.value;
        });
        calcData['calc-steps-unknown'] = document.getElementById('calc-steps-unknown').checked ? 'true' : 'false';
        localStorage.setItem('dietAppV2', JSON.stringify({
            kcal: currentKcal,
            recommended: recommendedKcal,
            goal: userGoal,
            tdee: userTdee,
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
    if (hasState) {
        document.getElementById('onboarding').style.display = 'none';
        document.getElementById('app-wrapper').style.display = '';
        document.getElementById('kcal-display').textContent = currentKcal;
        updateSliderRange();
        renderAll();
        activateTab(getDefaultTab());
    } else {
        document.getElementById('onboarding').style.display = '';
        document.getElementById('app-wrapper').style.display = 'none';
        showStep(1);
    }
}

// ============================================================
// SELECTION VALIDATOR BAR
// ============================================================
function renderValidator() {
    var bar = document.getElementById('selection-validator');
    if (!bar) return;

    var checks = [
        { key: 'breakfast', label: 'Desayuno', done: selections.breakfast !== null },
        { key: 'lunchCarb', label: 'Almuerzo HC', done: selections.lunchCarb !== null },
        { key: 'lunchProtein', label: 'Almuerzo Prot', done: selections.lunchProtein !== null },
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
            return '<span class="' + cls + '"><span class="vi-icon">' + icon + '</span>' + c.label + '</span>';
        }).join('');
        bar.innerHTML = '<div class="validator-items">' + items + '</div>';
    }

    // Enable/disable export button
    var exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.disabled = !allDone;

    // Render diet summary when complete
    renderDietSummary();
}

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

    function getBreakfastItems() {
        if (selObj.breakfast === null) return null;
        var opt = breakfastOptions[selObj.breakfast];
        var items = opt.items.map(function(item) {
            var line = item.text;
            if (item.amount !== null) {
                var scaled = isTrainer ? item.amount : scaleAmount(item.amount, r);
                line += ': <strong>' + scaled + (item.unit || 'g') + '</strong>';
            }
            if (item.extra) {
                var extraScaled = isTrainer ? item.extraBase : scaleAmount(item.extraBase, r);
                var extraText = item.extra.replace(/\{(\d+)\}/, extraScaled);
                line += ' <span class="summary-extra">' + extraText + '</span>';
            }
            return line;
        });
        return { name: opt.name, items: items };
    }

    function getMealItems(carbsData, protsData, carbIdx, protIdx) {
        var items = [];
        if (carbIdx !== null) {
            var carb = carbsData[carbIdx];
            var cg = isTrainer ? carb.base : scaleAmount(carb.base, r);
            items.push(carb.name + ': <strong>' + cg + (carb.unit || 'g') + '</strong>');
        }
        if (protIdx !== null) {
            var prot = protsData[protIdx];
            var pg = isTrainer ? prot.base : scaleAmount(prot.base, r);
            items.push(prot.name + ': <strong>' + pg + (prot.unit || 'g') + '</strong>');
        }
        var vegG = isTrainer ? 200 : scaleAmount(200, r);
        var oilMl = isTrainer ? EXTRAS_OIL_ML : scaleAmount(EXTRAS_OIL_ML, r);
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
        '<div class="summary-meal-header">☀️ Desayuno</div>' +
        '<div class="summary-meal-name">' + bk.name + '</div>' +
        '<ul class="summary-meal-items">' + bk.items.map(function(i){ return '<li>'+i+'</li>'; }).join('') + '</ul>' +
        suppHTML('breakfast') +
        '</div>';

    // Lunch
    html += '<div class="summary-meal">' +
        '<div class="summary-meal-header">🍲 Almuerzo</div>' +
        '<ul class="summary-meal-items">' + lunchItems.map(function(i){ return '<li>'+i+'</li>'; }).join('') + '</ul>' +
        suppHTML('lunch') +
        '</div>';

    // Dinner
    html += '<div class="summary-meal">' +
        '<div class="summary-meal-header">🌙 Cena</div>' +
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

function enterTrainerMode() {
    trainerModeActive = true;
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    document.getElementById('trainer-mode').style.display = '';
    renderTrainerContent();
}

function exitTrainerMode() {
    trainerModeActive = false;
    document.querySelector('.main').style.display = '';
    document.querySelector('.header').style.display = '';
    document.getElementById('trainer-mode').style.display = 'none';
}

function calculateTrainerMacros() {
    var t = { kcal: 0, protein: 0, carbs: 0, fat: 0 };
    var has = false;

    if (trainerSelections.breakfast !== null) {
        has = true;
        var m = breakfastOptions[trainerSelections.breakfast].macros;
        t.kcal += m[0]; t.protein += m[1]; t.carbs += m[2]; t.fat += m[3];
    }

    function addFood(data, idx) {
        if (idx === null) return;
        has = true;
        var item = data[idx];
        var g = item.base; // base grams (2500 kcal)
        t.kcal += item.n[0]*g/100; t.protein += item.n[1]*g/100; t.carbs += item.n[2]*g/100; t.fat += item.n[3]*g/100;
    }
    function addExtras() {
        t.kcal += extrasNutr.verduras[0]*200/100; t.protein += extrasNutr.verduras[1]*200/100; t.carbs += extrasNutr.verduras[2]*200/100; t.fat += extrasNutr.verduras[3]*200/100;
        t.kcal += extrasNutr.aceite[0]*EXTRAS_OIL_ML/100; t.fat += extrasNutr.aceite[3]*EXTRAS_OIL_ML/100;
        t.kcal += extrasNutr.fruta[0]; t.protein += extrasNutr.fruta[1]; t.carbs += extrasNutr.fruta[2]; t.fat += extrasNutr.fruta[3];
    }

    addFood(lunchCarbs, trainerSelections.lunchCarb); addFood(lunchProteins, trainerSelections.lunchProtein);
    if (trainerSelections.lunchCarb !== null || trainerSelections.lunchProtein !== null) addExtras();
    addFood(dinnerCarbs, trainerSelections.dinnerCarb); addFood(dinnerProteins, trainerSelections.dinnerProtein);
    if (trainerSelections.dinnerCarb !== null || trainerSelections.dinnerProtein !== null) addExtras();

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
    if (trainerSelections.lunchCarb !== null || trainerSelections.lunchProtein !== null) meals.push('Almuerzo');
    if (trainerSelections.dinnerCarb !== null || trainerSelections.dinnerProtein !== null) meals.push('Cena');
    var complete = trainerSelections.breakfast !== null && trainerSelections.lunchCarb !== null && trainerSelections.lunchProtein !== null && trainerSelections.dinnerCarb !== null && trainerSelections.dinnerProtein !== null;

    container.innerHTML =
        '<div class="nutrition-header"><h3>\ud83d\udcca Resumen Nutricional</h3><span class="nutrition-meals">'+meals.join(' + ')+(complete?'':' \u00b7 Incompleto')+'</span></div>' +
        '<div class="nutrition-body">' +
            '<div class="nutrition-kcal-row"><span class="nutrition-kcal-number">'+kcal+'</span><span class="nutrition-kcal-unit">kcal</span></div>' +
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
        '</div>';
}

function renderTrainerContent() {
    var html = '';

    // Desayunos
    html += '<div class="trainer-section"><h3>\u2600\ufe0f Desayunos (elige 1)</h3>';
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
            html += '<li>' + line + '</li>';
        });
        html += '</ul></div>';
    });
    html += '</div>';

    // Almuerzo
    html += '<div class="trainer-section"><h3>\ud83c\udf72 Almuerzo</h3>';
    html += '<div class="trainer-subsection"><h4>\ud83c\udf3e Hidratos (elige 1)</h4><table class="trainer-table"><tbody>';
    lunchCarbs.forEach(function(item, idx) {
        var sel = trainerSelections.lunchCarb === idx ? ' class="trainer-row-selected"' : '';
        html += '<tr'+sel+' data-trainer-meal="lunch" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>' + item.name + '</td><td><strong>' + item.base + (item.unit || 'g') + '</strong></td></tr>';
        if (item.altName) {
            var altSel = trainerSelections.lunchCarb === idx ? ' class="trainer-alt trainer-row-selected"' : ' class="trainer-alt"';
            html += '<tr'+altSel+' data-trainer-meal="lunch" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>' + item.altName + '</td><td><strong>' + item.altBase + (item.unit || 'g') + '</strong></td></tr>';
        }
    });
    html += '</tbody></table></div>';
    html += '<div class="trainer-subsection"><h4>\ud83e\udd69 Prote\u00ednas (elige 1)</h4><table class="trainer-table"><tbody>';
    lunchProteins.forEach(function(item, idx) {
        var sel = trainerSelections.lunchProtein === idx ? ' class="trainer-row-selected"' : '';
        html += '<tr'+sel+' data-trainer-meal="lunch" data-trainer-type="protein" data-trainer-index="'+idx+'"><td>' + item.name + '</td><td><strong>' + item.base + (item.unit || 'g') + '</strong></td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<div class="trainer-extras">+ ~200g verduras | '+EXTRAS_OIL_ML+'ml AOVE | 1 fruta</div>';
    html += '</div>';

    // Cena
    html += '<div class="trainer-section"><h3>\ud83c\udf19 Cena</h3>';
    html += '<div class="trainer-subsection"><h4>\ud83c\udf3e Hidratos (elige 1)</h4><table class="trainer-table"><tbody>';
    dinnerCarbs.forEach(function(item, idx) {
        var sel = trainerSelections.dinnerCarb === idx ? ' class="trainer-row-selected"' : '';
        html += '<tr'+sel+' data-trainer-meal="dinner" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>' + item.name + '</td><td><strong>' + item.base + (item.unit || 'g') + '</strong></td></tr>';
        if (item.altName) {
            var altSel = trainerSelections.dinnerCarb === idx ? ' class="trainer-alt trainer-row-selected"' : ' class="trainer-alt"';
            html += '<tr'+altSel+' data-trainer-meal="dinner" data-trainer-type="carb" data-trainer-index="'+idx+'"><td>' + item.altName + '</td><td><strong>' + item.altBase + (item.unit || 'g') + '</strong></td></tr>';
        }
    });
    html += '</tbody></table></div>';
    html += '<div class="trainer-subsection"><h4>\ud83e\udd69 Prote\u00ednas (elige 1)</h4><table class="trainer-table"><tbody>';
    dinnerProteins.forEach(function(item, idx) {
        var sel = trainerSelections.dinnerProtein === idx ? ' class="trainer-row-selected"' : '';
        html += '<tr'+sel+' data-trainer-meal="dinner" data-trainer-type="protein" data-trainer-index="'+idx+'"><td>' + item.name + '</td><td><strong>' + item.base + (item.unit || 'g') + '</strong></td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<div class="trainer-extras">+ ~200g verduras | '+EXTRAS_OIL_ML+'ml AOVE | 1 fruta</div>';
    html += '</div>';

    // Suplementos
    html += '<div class="trainer-section"><h3>\ud83d\udc8a Suplementaci\u00f3n</h3><div class="trainer-supps">';
    supplements.forEach(function(s) {
        html += '<div class="trainer-supp">' + s.icon + ' <strong>' + s.title + '</strong> \u2014 ' + s.desc + '</div>';
    });
    html += '</div></div>';

    document.getElementById('trainer-content').innerHTML = html;
    renderTrainerNutrition();
    renderTrainerDietSummary();
}

// Trainer toggle button
document.getElementById('trainer-toggle').addEventListener('click', function() {
    enterTrainerMode();
});

// Trainer selection clicks
document.addEventListener('click', function(e) {
    // Breakfast cards
    var card = e.target.closest('[data-trainer-type="breakfast"]');
    if (card) {
        var idx = parseInt(card.dataset.trainerIndex);
        trainerSelections.breakfast = trainerSelections.breakfast === idx ? null : idx;
        renderTrainerContent();
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
        return;
    }
});

// Exit trainer mode button
document.addEventListener('click', function(e) {
    if (e.target.id === 'trainer-exit-btn' || e.target.closest('#trainer-exit-btn')) {
        exitTrainerMode();
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

function buildExportCanvas() {
    var ratio = getRatio();
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
        var lunchItemCount = 1; // extras row
        if (selections.lunchCarb !== null) lunchItemCount++;
        if (selections.lunchProtein !== null) lunchItemCount++;
        y += 56 + lunchItemCount * 34 + 24;
        y += 24;
    }
    // dinner
    if (selections.dinnerCarb !== null || selections.dinnerProtein !== null) {
        var dinnerItemCount = 1;
        if (selections.dinnerCarb !== null) dinnerItemCount++;
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
    ctx.fillText('Mi Plan Nutricional', pad, 52);

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
            var amt = it.amount !== null ? scaleAmount(it.amount, ratio) + it.unit : '';
            return { name: it.text, amount: amt };
        });
        curY = drawMealSection('Desayuno  -  ' + bOpt.name, bItems, curY);
    }

    // Lunch
    if (selections.lunchCarb !== null || selections.lunchProtein !== null) {
        var lItems = [];
        if (selections.lunchCarb !== null) {
            var lc = lunchCarbs[selections.lunchCarb];
            lItems.push({ name: lc.name + (lc.tag ? ' (' + lc.tag + ')' : ''), amount: scaleAmount(lc.base, ratio) + (lc.unit || 'g') });
        }
        if (selections.lunchProtein !== null) {
            var lp = lunchProteins[selections.lunchProtein];
            lItems.push({ name: lp.name, amount: scaleAmount(lp.base, ratio) + (lp.unit || 'g') });
        }
        var vegG = scaleAmount(200, ratio);
        var oilMl = scaleAmount(EXTRAS_OIL_ML, ratio);
        lItems.push({ name: '+ Verduras / Aceite oliva / 1 Fruta', amount: vegG + 'g / ' + oilMl + 'ml' });
        curY = drawMealSection('Almuerzo', lItems, curY);
    }

    // Dinner
    if (selections.dinnerCarb !== null || selections.dinnerProtein !== null) {
        var dItems = [];
        if (selections.dinnerCarb !== null) {
            var dc = dinnerCarbs[selections.dinnerCarb];
            dItems.push({ name: dc.name + (dc.tag ? ' (' + dc.tag + ')' : ''), amount: scaleAmount(dc.base, ratio) + (dc.unit || 'g') });
        }
        if (selections.dinnerProtein !== null) {
            var dp = dinnerProteins[selections.dinnerProtein];
            dItems.push({ name: dp.name, amount: scaleAmount(dp.base, ratio) + (dp.unit || 'g') });
        }
        var vegGd = scaleAmount(200, ratio);
        var oilMld = scaleAmount(EXTRAS_OIL_ML, ratio);
        dItems.push({ name: '+ Verduras / Aceite oliva / 1 Fruta', amount: vegGd + 'g / ' + oilMld + 'ml' });
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
        // PNG export — mobile-compatible
        canvas.toBlob(function(blob) {
            // Try Web Share API first (works on mobile)
            if (navigator.share && navigator.canShare) {
                var dName = getExportFileName('Mi Plan Nutricional');
                var file = new File([blob], dName + '.png', { type: 'image/png' });
                var shareData = { files: [file], title: dName };
                if (navigator.canShare(shareData)) {
                    navigator.share(shareData).catch(function() {
                        // User cancelled share — open in new tab as fallback
                        openBlobInNewTab(blob);
                    });
                    return;
                }
            }
            // Desktop fallback: standard download
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
    var w = window.open(url, '_blank');
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

    // Mobile: use share or open in new tab; Desktop: standard save
    if (navigator.share && navigator.canShare) {
        var pdfBlob = doc.output('blob');
        var file = new File([pdfBlob], pdfName + '.pdf', { type: 'application/pdf' });
        var shareData = { files: [file], title: 'Mi Plan Nutricional' };
        if (navigator.canShare(shareData)) {
            navigator.share(shareData).catch(function() {
                openBlobInNewTab(pdfBlob);
            });
            return;
        }
    }
    doc.save(pdfName + '.pdf');
}

document.getElementById('export-btn').addEventListener('click', showExportModal);

document.addEventListener('DOMContentLoaded', init);
