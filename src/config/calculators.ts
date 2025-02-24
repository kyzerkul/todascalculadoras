import { Calculators } from "@/types/calculator";

export const calculators: Calculators = {
  "prestamo-personal": {
    title: "Calculadora de Préstamo Personal",
    description: "Calcula tu pago mensual y el costo total del préstamo",
    inputs: [
      {
        id: "amount",
        label: "Monto del préstamo",
        type: "number",
        suffix: "€",
        helper: "Ingresa el monto total del préstamo",
      },
      {
        id: "rate",
        label: "Tasa de interés anual",
        type: "number",
        suffix: "%",
        helper: "Ingresa la tasa de interés anual",
      },
      {
        id: "years",
        label: "Plazo (años)",
        type: "number",
        helper: "Ingresa la duración del préstamo en años",
      },
    ],
  },
  "plazo-fijo": {
    title: "Calculadora de Plazo Fijo",
    description: "Calcula el interés y monto final de tu inversión a plazo fijo",
    inputs: [
      {
        id: "principal",
        label: "Capital inicial",
        type: "number",
        suffix: "€",
        helper: "Ingresa el monto a invertir",
      },
      {
        id: "rate",
        label: "Tasa de interés anual",
        type: "number",
        suffix: "%",
        helper: "Ingresa la tasa de interés anual",
      },
      {
        id: "days",
        label: "Plazo (días)",
        type: "number",
        helper: "Ingresa la duración de la inversión en días",
      },
    ],
  },
  "regla-72": {
    title: "Calculadora de la Regla del 72",
    description: "Calcula en cuántos años se duplicará tu inversión",
    inputs: [
      {
        id: "rate",
        label: "Tasa de interés anual",
        type: "number",
        suffix: "%",
        helper: "Ingresa la tasa de interés anual",
      },
    ],
  },
  "calculadora-basica": {
    title: "Calculadora Básica",
    description: "Realiza operaciones matemáticas básicas",
    component: () => import("@/components/calculators/BasicCalculator").then(mod => mod.default),
  },
  "calculadora-cientifica": {
    title: "Calculadora Científica",
    description: "Funciones científicas avanzadas",
    component: () => import("@/components/calculators/ScientificCalculator").then(mod => mod.default),
  },
  "calculadora-algebra": {
    title: "Calculadora de Álgebra",
    description: "Resuelve ecuaciones algebraicas",
    component: () => import("@/components/calculators/AlgebraCalculator").then(mod => mod.default),
  },
  "calculadora-trigonometrica": {
    title: "Calculadora de Funciones Trigonométricas",
    description: "Calcula seno, coseno, tangente y sus funciones inversas en grados o radianes",
    inputs: [
      {
        id: "angle",
        label: "Ángulo",
        type: "number",
        helper: "Ingresa el ángulo",
      },
      {
        id: "unit",
        label: "Unidad",
        type: "text",
        helper: "Selecciona grados o radianes",
      },
    ],
  },
  "calculadora-logaritmos": {
    title: "Calculadora de Logaritmos y Exponentes",
    description: "Resuelve operaciones con logaritmos naturales, base 10 y exponentes",
    inputs: [
      {
        id: "number",
        label: "Número",
        type: "number",
        helper: "Ingresa el número",
      },
      {
        id: "base",
        label: "Base (para logaritmos)",
        type: "number",
        helper: "Ingresa la base del logaritmo (10 para log, e para ln)",
      },
    ],
  },
  "calculadora-ecuaciones": {
    title: "Calculadora de Ecuaciones y Sistemas",
    description: "Resuelve sistemas de ecuaciones lineales y ecuaciones algebraicas",
    inputs: [
      {
        id: "equation1",
        label: "Ecuación 1",
        type: "text",
        helper: "Ingresa la primera ecuación (ejemplo: 2x + 3y = 8)",
      },
      {
        id: "equation2",
        label: "Ecuación 2",
        type: "text",
        helper: "Ingresa la segunda ecuación (ejemplo: 4x - y = 1)",
      },
    ],
  },
  "conversor-unidades": {
    title: "Conversor de Unidades",
    description: "Convierte entre diferentes unidades de medida",
    inputs: [
      {
        id: "value",
        label: "Valor",
        type: "number",
        helper: "Ingresa el valor a convertir",
      },
      {
        id: "fromUnit",
        label: "De",
        type: "text",
        helper: "Selecciona la unidad de origen",
      },
      {
        id: "toUnit",
        label: "A",
        type: "text",
        helper: "Selecciona la unidad de destino",
      },
      {
        id: "category",
        label: "Categoría",
        type: "text",
        helper: "Selecciona el tipo de unidad (longitud, peso, etc.)",
      },
    ],
  },
  "conversor-divisas": {
    title: "Conversor de Divisas",
    description: "Convierte entre diferentes monedas",
    inputs: [
      {
        id: "amount",
        label: "Cantidad",
        type: "number",
        helper: "Ingresa la cantidad a convertir",
      },
      {
        id: "fromCurrency",
        label: "De",
        type: "text",
        helper: "Selecciona la moneda de origen",
      },
      {
        id: "toCurrency",
        label: "A",
        type: "text",
        helper: "Selecciona la moneda de destino",
      },
    ],
  },
  "conversor-temperatura": {
    title: "Conversor de Temperatura",
    description: "Convierte entre Celsius, Fahrenheit y Kelvin",
    inputs: [
      {
        id: "temperature",
        label: "Temperatura",
        type: "number",
        helper: "Ingresa la temperatura a convertir",
      },
      {
        id: "fromScale",
        label: "De",
        type: "text",
        helper: "Selecciona la escala de origen (Celsius, Fahrenheit, Kelvin)",
      },
      {
        id: "toScale",
        label: "A",
        type: "text",
        helper: "Selecciona la escala de destino",
      },
    ],
  },
  "calculadora-imc": {
    title: "Calculadora de IMC",
    description: "Calcula tu Índice de Masa Corporal",
    inputs: [
      {
        id: "weight",
        label: "Peso",
        type: "number",
        suffix: "kg",
        helper: "Ingresa tu peso en kilogramos",
      },
      {
        id: "height",
        label: "Altura",
        type: "number",
        suffix: "cm",
        helper: "Ingresa tu altura en centímetros",
      },
    ],
  },
  "calculadora-calorias": {
    title: "Calculadora de Calorías y Dieta",
    description: "Calcula tus necesidades calóricas diarias",
    inputs: [
      {
        id: "age",
        label: "Edad",
        type: "number",
        helper: "Ingresa tu edad",
      },
      {
        id: "gender",
        label: "Género",
        type: "text",
        helper: "Selecciona tu género (Masculino/Femenino)",
      },
      {
        id: "weight",
        label: "Peso",
        type: "number",
        suffix: "kg",
        helper: "Ingresa tu peso en kilogramos",
      },
      {
        id: "height",
        label: "Altura",
        type: "number",
        suffix: "cm",
        helper: "Ingresa tu altura en centímetros",
      },
      {
        id: "activity",
        label: "Nivel de actividad",
        type: "text",
        helper: "Selecciona tu nivel de actividad física",
      },
    ],
  },
  "calculadora-metabolismo": {
    title: "Calculadora de Metabolismo Basal",
    description: "Calcula tu tasa metabólica basal (TMB)",
    inputs: [
      {
        id: "age",
        label: "Edad",
        type: "number",
        helper: "Ingresa tu edad",
      },
      {
        id: "gender",
        label: "Género",
        type: "text",
        helper: "Selecciona tu género (Masculino/Femenino)",
      },
      {
        id: "weight",
        label: "Peso",
        type: "number",
        suffix: "kg",
        helper: "Ingresa tu peso en kilogramos",
      },
      {
        id: "height",
        label: "Altura",
        type: "number",
        suffix: "cm",
        helper: "Ingresa tu altura en centímetros",
      },
    ],
  },
};
