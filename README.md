# 🍽️ Mi Plan Nutricional

Herramienta web de planificación nutricional personalizada. Calcula tu gasto calórico, elige tus comidas y obtén un plan con cantidades exactas ajustadas a tu objetivo — todo basado en evidencia científica.

## 👉 [Abrir la app](https://pcresp0.github.io/dieta_gym_PCB/)

<p align="center">
  <img src="img/og-image.png" alt="Mi Plan Nutricional" width="600">
</p>

---

## Por qué existe este proyecto

Nació de un plan nutricional real diseñado por un entrenador personal certificado. El problema era que ese plan venía en un PDF estático con cantidades fijas a 2500 kcal — si querías ajustar las calorías, tenías que recalcular todo a mano.

Esta app automatiza ese proceso: introduces tus datos, eliges tu objetivo y tus comidas favoritas, y las cantidades se ajustan automáticamente con un sistema de escalado inteligente que prioriza la proteína según tu objetivo (perder grasa, ganar músculo, etc.).

Todo está fundamentado en ciencia. Las fórmulas, los objetivos proteicos, las dosis de suplementos y las recomendaciones están respaldados por publicaciones revisadas por pares (ISSN, meta-análisis, ensayos clínicos). El documento completo de fundamentos está en [Fundamentos_Nutricionales.md](Fundamentos_Nutricionales.md).

---

## Qué hace

### Onboarding personalizado

Un wizard de 6 pasos que recoge tus datos (edad, peso, altura, composición corporal, hábitos, nivel de actividad) y calcula automáticamente tus calorías recomendadas según tu objetivo. Incluye estimación de % de grasa corporal ajustada por masa muscular y experiencia de entrenamiento, recomendación de objetivo basada en tu perfil, y tips personalizados.

### Planificación de comidas

7 opciones de desayuno, 9 fuentes de hidratos y 8 fuentes de proteínas para comida y cena. Cada comida incluye extras obligatorios (verduras, aceite de oliva, fruta). Las cantidades se recalculan en tiempo real con un sistema de doble ratio que prioriza alcanzar el objetivo proteico sin pasarse de calorías.

### Resumen nutricional

Desglose de macros (proteínas, carbos, grasas) en gramos, porcentaje calórico y g/kg de peso corporal. Indicador de lo que falta por seleccionar y tooltips con recomendaciones.

### Dieta aleatoria y plan semanal

Generación de menú completo al instante o plan de 7 días variados con variedad de alimentos y evitando repeticiones.

### Exportación

Exportar como imagen PNG o PDF. Compartir por WhatsApp.

### Suplementación basada en evidencia

Creatina, omega 3, magnesio, zinc y melatonina con dosis específicas y tooltips que explican la evidencia detrás de cada uno (ISSN Position Stands, meta-análisis).

### Otros

Tema claro/oscuro, diseño responsive, persistencia en localStorage, modo entrenador con el plan original a 2500 kcal, disclaimer con referencias científicas y avisos contextuales.

---

## Arquitectura

Single Page Application estática — sin backend, sin frameworks, sin dependencias externas. Todo se ejecuta en el navegador.

```
crespofit_nutritionplan/
├── index.html                    ← Estructura: onboarding, app, modales
├── css/
│   └── styles.css                ← Estilos: variables CSS, temas claro/oscuro, responsive
├── js/
│   └── app.js                    ← Lógica: datos nutricionales, escalado, TDEE, renderizado, exportación
├── img/
│   ├── og-image.png              ← Open Graph para compartir
│   ├── cabecera.png              ← Fondo del header
│   ├── favicon.png               ← Favicon 192×192
│   ├── apple-touch-icon.png      ← Icono iOS
│   └── whatsapp-svgrepo-com.svg  ← Icono de compartir
├── Fundamentos_Nutricionales.md  ← Documento científico de referencia
└── README.md
```

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica, meta tags OG, PWA-ready |
| CSS3 | Variables, Grid, Flexbox, temas con `data-theme`, responsive |
| JavaScript (ES5) | Lógica completa, renderizado dinámico — 0 dependencias |
| localStorage | Persistencia de selecciones, calculadora y tema |
| GitHub Pages | Hosting estático |

### Decisiones de diseño

- **Sin frameworks:** la app es deliberadamente vanilla JS/CSS/HTML. No necesita build, no tiene dependencias que mantener, y se puede desplegar abriendo el HTML directamente.
- **Escalado con prioridad proteica:** en lugar de un ratio uniforme, el sistema resuelve un sistema de ecuaciones para que las fuentes de proteína escalen independientemente de los hidratos, priorizando alcanzar el objetivo proteico del usuario según su peso y objetivo.
- **Cálculo TDEE con Mifflin-St Jeor:** la fórmula más precisa para población general según la ADA. Se complementa con estimación de gasto por pasos diarios y por sesiones de entrenamiento (10 tipos × 3 intensidades).
- **Estimación de grasa corporal:** fórmula de Deurenberg (1991) como base, ajustada por masa muscular autopercibida y experiencia de entrenamiento, ya que el IMC sobreestima el % graso en personas musculadas (Esco et al., 2015).
- **Persistencia en localStorage:** tres claves separadas (`dietAppV2` para estado, `dietAppCalc` para calculadora, `dietTheme` para tema) para que cada parte sea independiente.

---

## Base científica

Las recomendaciones se fundamentan en publicaciones revisadas por pares:

- **ISSN Position Stands** — Referencia en nutrición deportiva
- **Mifflin-St Jeor (1990)** — Fórmula de TMB más precisa para población general
- **Helms et al. (2014)** — Proteína óptima en déficit calórico
- **Jäger et al. (2017)** — Creatina y proteína en ejercicio
- **Barakat et al. (2020)** — Recomposición corporal simultánea
- **Deurenberg et al. (1991)** — Estimación de % grasa desde IMC
- **Esco et al. (2015)** — Discrepancia BMI-BF% en personas entrenadas
- **Paluch et al. (2022)** — Beneficios de pasos diarios sobre mortalidad
- **Trexler et al. (2014)** — Adaptación metabólica al déficit calórico
- **Dominguez et al. (2025)** — Magnesio: cofactor ATP, calidad del sueño

Documento completo con todas las referencias: [Fundamentos_Nutricionales.md](Fundamentos_Nutricionales.md)

---

## Desarrollo local

```bash
git clone https://github.com/pCresp0/crespofit_nutritionplan.git
cd crespofit_nutritionplan
```

Abre `index.html` en el navegador. No necesita instalación, build ni servidor.

---

## Autor

**Pablo Crespo Bellido** · [LinkedIn](https://www.linkedin.com/in/pablocrespobellido/) · [GitHub](https://github.com/pCresp0)

---

<p align="center">
  <img src="https://hits.sh/pcresp0.github.io/dieta_gym_PCB.svg?label=visitas&color=6B7280&labelColor=374151" alt="Visitas">
</p>
