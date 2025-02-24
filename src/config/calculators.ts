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
};
