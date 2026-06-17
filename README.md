# 🍽️ Mi Plan Nutricional

App web para gestionar tu plan de dieta personalizado. Selecciona las calorías diarias y elige tus comidas con cantidades ajustadas automáticamente.

## 👉 [Abrir la app](https://pcresp0.github.io/dieta_gym_PCB/)

---

## Funcionalidades

- **Selector de calorías** de 1500 a 3500 kcal (de 100 en 100) con slider y botones +/−
- **6 opciones de desayuno/merienda** con tarjetas seleccionables
- **Almuerzo y cena** con tablas de hidratos de carbono y proteínas (elige una de cada)
- **Recálculo automático** de todas las cantidades según las kcal seleccionadas
- **Calculadora TDEE** (Gasto Energético Total Diario):
  - Datos personales: sexo, edad, altura, peso
  - Nivel de actividad diaria (trabajo sentado, de pie, etc.)
  - Configuración de entreno: tipo, días/semana, duración, intensidad
  - Cálculo de TMB con fórmula Mifflin-St Jeor
  - Barra visual de déficit / mantenimiento / superávit
  - Tooltips informativos con explicación de cada concepto
- **Suplementación** con las recomendaciones del entrenador
- **Responsive**: diseñado para PC y móvil
- **Persistencia**: guarda tu selección y datos en localStorage

---

## Sobre la web

### Arquitectura

La web es una **Single Page Application (SPA) estática**, sin backend ni dependencias externas. Todo se ejecuta en el navegador del usuario.

```
dieta_gym_PCB/
├── index.html          ← Estructura HTML (página principal)
├── css/
│   └── styles.css      ← Estilos responsive con CSS variables
├── js/
│   └── app.js          ← Lógica, datos de la dieta y renderizado
└── README.md           ← Este archivo
```

### Stack tecnológico

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica con secciones colapsables |
| **CSS3** | Variables CSS, Grid, Flexbox, media queries para responsive |
| **JavaScript (Vanilla)** | Lógica de la app, sin frameworks ni librerías |
| **localStorage** | Persistencia de selecciones y datos del calculador |
| **GitHub Pages** | Hosting estático gratuito |

### Cómo funciona

#### Selector de calorías
El selector en el header permite elegir entre 1500-3500 kcal. Todas las cantidades de alimentos se escalan proporcionalmente usando un ratio simple:

```
ratio = kcal_seleccionadas / 2500
cantidad_ajustada = cantidad_base_2500kcal × ratio
```

Los valores base (para 2500 kcal) están extraídos directamente de la dieta del entrenador.

#### Calculadora TDEE
Utiliza la **fórmula de Mifflin-St Jeor** para calcular la Tasa Metabólica Basal (TMB):

- **Hombres**: `TMB = (10 × peso) + (6.25 × altura) − (5 × edad) + 5`
- **Mujeres**: `TMB = (10 × peso) + (6.25 × altura) − (5 × edad) − 161`

Luego aplica:
1. **Factor de actividad diaria** (×1.2 a ×1.725) → NEAT
2. **Calorías de entrenamiento** (según tipo, duración, intensidad y días/semana) → TDEE total

Compara el TDEE con las kcal de la dieta seleccionada para determinar si estás en **déficit**, **mantenimiento** o **superávit**.

#### Datos de la dieta
Los datos nutricionales están definidos como arrays de objetos en `js/app.js`:
- `breakfastOptions[]` → 6 opciones de desayuno/merienda con ingredientes y cantidades
- `lunchCarbs[]`, `lunchProteins[]` → Opciones de hidratos y proteínas para almuerzo
- `dinnerCarbs[]`, `dinnerProteins[]` → Opciones de hidratos y proteínas para cena
- `supplements[]` → Recomendaciones de suplementación

#### Renderizado
Todo se renderiza dinámicamente con JavaScript vanilla (sin frameworks). Cada cambio en las kcal o selecciones dispara un re-render de las secciones afectadas.

#### Persistencia
Se guardan en `localStorage`:
- Las kcal seleccionadas y las opciones elegidas (`dietApp`)
- Los datos del calculador TDEE (`dietAppCalc`)

---

## Desarrollo local

```bash
# Clonar el repo
git clone https://github.com/pCresp0/dieta_gym_PCB.git
cd dieta_gym_PCB

# Servir localmente (Python 3)
python3 -m http.server 8080

# Abrir en el navegador
open http://localhost:8080
```

No requiere `npm install`, build steps, ni ninguna dependencia. Abrir `index.html` directamente en el navegador también funciona.