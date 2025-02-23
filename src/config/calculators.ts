
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
};
