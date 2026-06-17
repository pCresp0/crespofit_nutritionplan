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
      items:[{text:'Corn flakes / copos de avena / cereales sin azúcar',amount:45,unit:'g'},{text:'Leche semi (un vaso)',amount:200,unit:'ml'},{text:'Whey protein',amount:25,unit:'g'},{text:'Frutos secos / crema de cacahuete',amount:25,unit:'g'}]},
    { id:'tortitas', name:'Tortitas de avena', macros:[340,22,30,16],
      items:[{text:'Harina de avena / copos de avena',amount:45,unit:'g'},{text:'2 Huevos + claras',amount:100,unit:'g'},{text:'Frutos secos / crema de cacahuete',amount:10,unit:'g'}]},
    { id:'yogures-proteicos', name:'Yogures proteicos', macros:[420,25,60,8],
      items:[{text:'2 yogures proteicos LIDL',amount:null,unit:''},{text:'Cereales',amount:15,unit:'g'},{text:'Miel',amount:20,unit:'g'},{text:'Frutos secos',amount:15,unit:'g'},{text:'Zumo de naranja',amount:200,unit:'ml'}]},
    { id:'bocadillo', name:'Bocadillo de pollo/pavo y queso/guacamole', macros:[520,38,55,16],
      items:[{text:'Pan integral trigo/espelta/centeno',amount:120,unit:'g'},{text:'Pollo / Pavo',amount:100,unit:'g'},{text:'Queso',amount:60,unit:'g',extra:'ó {80}g guacamole',extraBase:80}]}
];

var lunchCarbs = [
    {name:'Arroz blanco',base:130,n:[130,2.7,28,0.3]},{name:'Patata boniato',base:590,altName:'Precongelada',altBase:370,n:[86,1.6,20,0.1]},
    {name:'Tortitas de arroz',base:130,n:[385,7,83,3]},{name:'Pasta',base:130,n:[360,13,72,1.5]},{name:'Pan',base:180,n:[265,9,49,3.2]},
    {name:'Quinoa',base:130,n:[368,14,64,6]},{name:'Cus-cus',base:130,n:[376,12.8,77,0.6]},{name:'Gnocchis de patata',base:260,n:[165,4,34,1]},
    {name:'Legumbres cocidas',base:450,n:[115,8,18,0.8]}
];
var lunchProteins = [
    {name:'Pollo',base:200,n:[110,23,0,1.5]},{name:'Pescado blanco',base:250,n:[82,18,0,0.8]},{name:'Salmón',base:125,n:[208,20,0,13]},
    {name:'Pavo',base:220,n:[105,24,0,1]},{name:'Hamburguesa de pollo',base:180,n:[150,17,4,7]},{name:'Huevo (2 completos) + claras',base:100,unit:'ml claras',n:[85,11,0.7,4]},
    {name:'Lomo adobado',base:200,n:[150,20,1,7]},{name:'Ternera',base:160,n:[155,22,0,7]}
];
var dinnerCarbs = [
    {name:'Arroz blanco',base:100,n:[130,2.7,28,0.3]},{name:'Patata boniato',base:450,altName:'Precongelada',altBase:300,n:[86,1.6,20,0.1]},
    {name:'Tortitas de arroz',base:100,n:[385,7,83,3]},{name:'Pasta',base:100,n:[360,13,72,1.5]},{name:'Pan',base:140,n:[265,9,49,3.2]},
    {name:'Quinoa',base:100,n:[368,14,64,6]},{name:'Cus-cus',base:100,n:[376,12.8,77,0.6]},{name:'Gnocchis de patata',base:200,n:[165,4,34,1]},
    {name:'Legumbres cocidas',base:350,n:[115,8,18,0.8]}
];
var dinnerProteins = [
    {name:'Pollo',base:200,n:[110,23,0,1.5]},{name:'Pescado blanco',base:250,n:[82,18,0,0.8]},{name:'Pavo',base:220,n:[105,24,0,1]},
    {name:'Hamburguesa de pollo',base:180,n:[150,17,4,7]},{name:'Huevo (2 yemas) + claras',base:100,unit:'ml claras',n:[85,11,0.7,4]},
    {name:'Lomo adobado',base:200,n:[150,20,1,7]},{name:'Ternera',base:160,n:[155,22,0,7]}
];

var extrasNutr = { verduras:[25,2,4,0.3], aceite:[900,0,0,100], fruta:[80,0.5,20,0.2] };

var supplements = [
    {icon:'💪',title:'Creatina',desc:null},
    {icon:'🐟',title:'Omega 3',desc:'2 pastillas (1 desayuno + 1 comida)'},
    {icon:'🧲',title:'Magnesio',desc:'1 pastilla antes de dormir'},
    {icon:'⚡',title:'Zinc',desc:'1 pastilla antes de dormir'},
    {icon:'😴',title:'Melatonina',desc:'Opcional, para favorecer el descanso'}
];

function getCreatineDose() {
    var el = document.getElementById('calc-weight');
    var w = el ? parseFloat(el.value) : 0;
    if (!w || w < 40) return 5;
    var dose = w / 10;
    return (dose % 1 > 0.5) ? Math.ceil(dose) : Math.floor(dose);
}

var goalLabels = { cut:'Perder grasa', maintain:'Mantener peso', bulk:'Ganar masa muscular' };
var goalIcons = { cut:'🔥', maintain:'⚖️', bulk:'💪' };

var trainBurnPerMin = { strength:[5,6.5,8], cardio:[8,10,12], hiit:[9,11.5,14], mixed:[7,9,11] };

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

// ============================================================
// SCALING
// ============================================================
function getRatio() { return currentKcal / BASE_KCAL; }

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
    var extra = 0;
    if (document.getElementById('calc-trains').value === 'yes') {
        var type = document.getElementById('calc-train-type').value;
        var days = parseInt(document.getElementById('calc-train-days').value);
        var dur = parseInt(document.getElementById('calc-train-duration').value);
        var int_ = document.getElementById('calc-train-intensity').value;
        var idx = int_ === 'low' ? 0 : int_ === 'medium' ? 1 : 2;
        extra = (trainBurnPerMin[type][idx] * dur * days) / 7;
    }
    return { bmr:Math.round(bmr), neat:Math.round(neat), tdee:Math.round(neat+extra) };
}

function getRecommendedKcal(tdee, goal) {
    if (goal === 'cut') return Math.round((tdee * 0.80) / 100) * 100;
    if (goal === 'bulk') return Math.round((tdee * 1.15) / 100) * 100;
    return Math.round(tdee / 100) * 100;
}

// ============================================================
// MACROS CALCULATION
// ============================================================
function calculateSelectedMacros() {
    var ratio = getRatio();
    var t = { kcal:0, protein:0, carbs:0, fat:0 };
    var has = false;

    if (selections.breakfast !== null) {
        has = true;
        var m = breakfastOptions[selections.breakfast].macros;
        t.kcal += m[0]*ratio; t.protein += m[1]*ratio; t.carbs += m[2]*ratio; t.fat += m[3]*ratio;
    }

    function addFood(data, idx) {
        if (idx === null) return; has = true;
        var item = data[idx]; var g = scaleAmount(item.base, ratio);
        t.kcal += item.n[0]*g/100; t.protein += item.n[1]*g/100; t.carbs += item.n[2]*g/100; t.fat += item.n[3]*g/100;
    }
    function addExtras(hasAny) {
        if (!hasAny) return;
        var vg = scaleAmount(200, ratio); var om = scaleAmount(5, ratio);
        t.kcal += extrasNutr.verduras[0]*vg/100; t.protein += extrasNutr.verduras[1]*vg/100; t.carbs += extrasNutr.verduras[2]*vg/100; t.fat += extrasNutr.verduras[3]*vg/100;
        t.kcal += extrasNutr.aceite[0]*om/100; t.fat += extrasNutr.aceite[3]*om/100;
        t.kcal += extrasNutr.fruta[0]; t.protein += extrasNutr.fruta[1]; t.carbs += extrasNutr.fruta[2]; t.fat += extrasNutr.fruta[3];
    }

    addFood(lunchCarbs, selections.lunchCarb); addFood(lunchProteins, selections.lunchProtein);
    addExtras(selections.lunchCarb !== null || selections.lunchProtein !== null);
    addFood(dinnerCarbs, selections.dinnerCarb); addFood(dinnerProteins, selections.dinnerProtein);
    addExtras(selections.dinnerCarb !== null || selections.dinnerProtein !== null);
    return has ? t : null;
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
        var r = '<tr class="'+(s?'selected':'')+'" data-meal="'+mt+'" data-type="carb" data-index="'+i+'"><td>'+it.name+'</td><td>'+sc+' '+u+'</td></tr>';
        if (it.altName) { r += '<tr class="sub-row '+(s?'selected':'')+'" data-meal="'+mt+'" data-type="carb" data-index="'+i+'"><td>'+it.altName+'</td><td>'+scaleAmount(it.altBase,ratio)+' '+u+'</td></tr>'; }
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
    var creatineDose = getCreatineDose();
    document.getElementById('supplements-list').innerHTML = supplements.map(function(s) {
        var desc = s.desc;
        if (s.title === 'Creatina') desc = creatineDose + 'g todos los días';
        return '<div class="supplement-card"><span class="supplement-icon">'+s.icon+'</span><div class="supplement-text"><strong>'+s.title+'</strong>'+desc+'</div></div>';
    }).join('');
}

function updateExtras() {
    var ratio = getRatio(); var vg = scaleAmount(200,ratio); var ol = scaleAmount(5,ratio);
    document.querySelectorAll('.scaled-veg-lunch,.scaled-veg-dinner').forEach(function(e){e.textContent=vg;});
    document.querySelectorAll('.scaled-oil-lunch,.scaled-oil-dinner').forEach(function(e){e.textContent=ol;});
}

function renderInfoBanner() {
    var el = document.getElementById('info-banner');
    if (!userGoal || !userTdee) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="info-item"><span class="info-icon">'+goalIcons[userGoal]+'</span><div><span class="info-label">Objetivo</span><span class="info-value">'+goalLabels[userGoal]+'</span></div></div>' +
        '<div class="info-item"><span class="info-icon">📊</span><div><span class="info-label">TDEE</span><span class="info-value">'+userTdee+' kcal/día</span></div></div>' +
        '<div class="info-item"><span class="info-icon">🎯</span><div><span class="info-label">Recomendado</span><span class="info-value">'+recommendedKcal+' kcal/día</span></div></div>';
}

function updateKcalWarning() {
    var w = document.getElementById('kcal-warning');
    if (!userGoal || !recommendedKcal) { w.style.display = 'none'; return; }
    var diff = currentKcal - recommendedKcal;
    var absDiff = Math.abs(diff);
    if (absDiff <= 200) { w.style.display = 'none'; return; }

    w.style.display = '';
    if (userGoal === 'cut') {
        if (diff > 200) {
            w.className = 'kcal-warning warn-danger';
            w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por encima</strong> de lo recomendado para perder grasa. Podrías no estar en déficit.';
        } else {
            w.className = 'kcal-warning warn-info';
            w.innerHTML = 'ℹ️ Estás <strong>'+absDiff+' kcal por debajo</strong>. Un déficit tan agresivo puede afectar al rendimiento y a la masa muscular.';
        }
    } else if (userGoal === 'bulk') {
        if (diff < -200) {
            w.className = 'kcal-warning warn-danger';
            w.innerHTML = '⚠️ Estás <strong>'+absDiff+' kcal por debajo</strong> de lo recomendado para ganar masa. Podrías no estar en superávit.';
        } else {
            w.className = 'kcal-warning warn-info';
            w.innerHTML = 'ℹ️ Estás <strong>'+absDiff+' kcal por encima</strong>. Un superávit tan alto puede generar más grasa que músculo.';
        }
    } else {
        w.className = 'kcal-warning warn-info';
        w.innerHTML = 'ℹ️ Estás <strong>'+absDiff+' kcal '+(diff>0?'por encima':'por debajo')+'</strong> del mantenimiento.'+(diff>0?' Ganarás peso.':' Perderás peso.');
    }
}

function renderNutritionSummary() {
    var container = document.getElementById('nutrition-summary');
    var macros = calculateSelectedMacros();
    if (!macros) { container.innerHTML=''; container.style.display='none'; return; }
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
        if (selections.lunchProtein === null) missingItems.push('Almuerzo: proteína');
        if (selections.dinnerCarb === null) missingItems.push('Cena: hidrato');
        if (selections.dinnerProtein === null) missingItems.push('Cena: proteína');
        missingHtml = '<div class="nutrition-missing">⚠️ Falta: ' + missingItems.join(' · ') + '</div>';
    }
    container.innerHTML = '<div class="nutrition-header"><h3>📊 Resumen Nutricional Estimado</h3><span class="nutrition-meals">'+meals.join(' + ')+(complete?'':' · Incompleto')+'</span></div>' + missingHtml +
        '<div class="nutrition-body"><div class="nutrition-kcal"><span class="nutrition-kcal-number">'+kcal+'</span><span class="nutrition-kcal-unit">kcal</span></div>' +
        '<div class="nutrition-macros">' +
        '<div class="macro-bar-group"><div class="macro-info"><span class="macro-dot protein-dot"></span><span class="macro-name">Proteínas</span><strong>'+p+'g</strong><span class="macro-pct">'+pp+'%</span></div><div class="macro-bar"><div class="macro-bar-fill protein-fill" style="width:'+pp+'%"></div></div></div>' +
        '<div class="macro-bar-group"><div class="macro-info"><span class="macro-dot carbs-dot"></span><span class="macro-name">Carbohidratos</span><strong>'+c+'g</strong><span class="macro-pct">'+cp+'%</span></div><div class="macro-bar"><div class="macro-bar-fill carbs-fill" style="width:'+cp+'%"></div></div></div>' +
        '<div class="macro-bar-group"><div class="macro-info"><span class="macro-dot fat-dot"></span><span class="macro-name">Grasas</span><strong>'+f+'g</strong><span class="macro-pct">'+fp+'%</span></div><div class="macro-bar"><div class="macro-bar-fill fat-fill" style="width:'+fp+'%"></div></div></div>' +
        '</div></div>';
}

function renderAll() {
    renderBreakfast();
    renderMealTable('lunch-tables',lunchCarbs,lunchProteins,selections.lunchCarb,selections.lunchProtein,'lunch');
    renderMealTable('dinner-tables',dinnerCarbs,dinnerProteins,selections.dinnerCarb,selections.dinnerProtein,'dinner');
    renderSupplements(); updateExtras(); renderNutritionSummary(); renderInfoBanner(); updateKcalWarning(); renderValidator();
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

// Training toggle
document.getElementById('calc-trains').addEventListener('change', function() {
    var details = document.getElementById('calc-training-details');
    if (this.value === 'yes') { details.classList.remove('hidden'); } else { details.classList.add('hidden'); }
});

// Step navigation
document.getElementById('next-1').addEventListener('click', function() {
    if (!validateStep1()) { alert('Rellena todos los campos: edad, altura y peso.'); return; }
    showStep(2);
});

document.getElementById('back-2').addEventListener('click', function() { showStep(1); });
document.getElementById('next-2').addEventListener('click', function() {
    if (!validateStep2()) { alert('Selecciona tu nivel de actividad diaria.'); return; }
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
    } else if (userGoal === 'bulk') {
        document.getElementById('ob-goal-label').textContent = '💪 Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Superávit del ~15%';
        document.getElementById('ob-explanation').innerHTML = 'Para <strong>ganar masa muscular</strong> necesitas comer por encima de tu gasto. Te recomendamos un <strong>superávit moderado del 15%</strong> (~' + (recommendedKcal - result.tdee) + ' kcal más/día) para maximizar ganancia muscular con mínima grasa.';
    } else {
        document.getElementById('ob-goal-label').textContent = '⚖️ Recomendado';
        document.getElementById('ob-rec-sub').textContent = 'kcal/día · Mantenimiento';
        document.getElementById('ob-explanation').innerHTML = 'Para <strong>mantener tu peso</strong> actual, come a tu nivel de gasto calórico. Ideal para <strong>recomposición corporal</strong> (ganar músculo y perder grasa simultáneamente, de forma más lenta).';
    }

    showStep(4);
});

document.getElementById('back-4').addEventListener('click', function() { showStep(3); });

document.getElementById('start-plan').addEventListener('click', function() {
    currentKcal = recommendedKcal;
    document.getElementById('onboarding').style.display = 'none';
    document.getElementById('app-wrapper').style.display = '';
    document.getElementById('kcal-display').textContent = currentKcal;
    document.getElementById('kcal-range').value = currentKcal;
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
function updateKcal(value) {
    currentKcal = Math.max(1500, Math.min(3500, value));
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
    renderBreakfast(); renderNutritionSummary(); renderValidator(); saveAllState();
});

document.addEventListener('click', function(e) {
    var row = e.target.closest('tr[data-meal]'); if (!row) return;
    var meal = row.dataset.meal, type = row.dataset.type, idx = parseInt(row.dataset.index);
    var key = meal==='lunch'?(type==='carb'?'lunchCarb':'lunchProtein'):(type==='carb'?'dinnerCarb':'dinnerProtein');
    selections[key] = selections[key]===idx?null:idx;
    if (meal==='lunch') renderMealTable('lunch-tables',lunchCarbs,lunchProteins,selections.lunchCarb,selections.lunchProtein,'lunch');
    else renderMealTable('dinner-tables',dinnerCarbs,dinnerProteins,selections.dinnerCarb,selections.dinnerProtein,'dinner');
    renderNutritionSummary(); renderValidator(); saveAllState();
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

// Tooltip
document.addEventListener('click', function(e) {
    var trigger = e.target.closest('.tooltip-trigger');
    if (trigger) { e.preventDefault(); e.stopPropagation(); var d = tooltipData[trigger.dataset.tooltip]; if(d){document.getElementById('tooltip-title').textContent=d.title;document.getElementById('tooltip-body').innerHTML=d.body;document.getElementById('tooltip-overlay').style.display='';} return; }
    if (e.target.id==='tooltip-overlay'){document.getElementById('tooltip-overlay').style.display='none';return;}
    if (e.target.id==='tooltip-close'||e.target.closest('#tooltip-close')){document.getElementById('tooltip-overlay').style.display='none';return;}
});

// ============================================================
// PERSISTENCE
// ============================================================
function saveAllState() {
    try {
        var calcData = {};
        ['calc-sex','calc-age','calc-height','calc-weight','calc-activity','calc-trains','calc-train-type','calc-train-days','calc-train-duration','calc-train-intensity'].forEach(function(id) {
            var el = document.getElementById(id); if (el) calcData[id] = el.value;
        });
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
        if (data.kcal >= 1500 && data.kcal <= 3500) currentKcal = data.kcal;
        recommendedKcal = data.recommended || 2500;
        userGoal = data.goal;
        userTdee = data.tdee;
        if (data.selections) {
            selections = { breakfast:null, lunchCarb:null, lunchProtein:null, dinnerCarb:null, dinnerProtein:null };
            Object.keys(data.selections).forEach(function(k) { if (k in selections) selections[k] = data.selections[k]; });
        }
        if (data.calc) {
            Object.keys(data.calc).forEach(function(id) {
                var el = document.getElementById(id); if (el && data.calc[id]) el.value = data.calc[id];
            });
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
        document.getElementById('kcal-range').value = currentKcal;
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
        var kcal = macros ? Math.round(macros.kcal) : currentKcal;
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
}

document.addEventListener('DOMContentLoaded', init);
