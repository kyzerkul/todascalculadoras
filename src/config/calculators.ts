import { Calculators, Calculator } from "@/types/calculator";
import { Calculator as CalculatorIcon, ArrowLeftRight, Heart, Atom, Pi, Activity, Salad, Baby, Scale } from "lucide-react";

// Helper function to create conversion calculators with category
const createCalculator = (
  title: string, 
  description: string, 
  inputs: any[],
  category?: string
): Calculator => ({
  title,
  description,
  inputs,
  category: category || 'conversiones'
});

export const calculators: Calculators = {
// Financieras
  "hipoteca": {
    category: "financieras",
    title: "Calculadora de Hipoteca",
    description: "Calcula tu pago mensual y el costo total de tu hipoteca",
    inputs: [
      {
        id: "amount",
        label: "Monto del préstamo",
        type: "number",
        helper: "Ingresa el monto total del préstamo hipotecario",
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
  "prestamo-personal": {
    category: "financieras",
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
        id: "months",
        label: "Plazo (meses)",
        type: "number",
        helper: "Ingresa la duración del préstamo en meses",
      },
    ],
  },
  "interes-compuesto": {
    category: "financieras",
    title: "Calculadora de Interés Compuesto",
    description: "Calcula el valor futuro de una inversión con interés compuesto utilizando la fórmula: A = P × (1 + r/n)^(n × t)",
    component() {
      return import("@/components/calculators/financial/CompoundInterestCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "roi": {
    category: "financieras",
    title: "Calculadora de ROI (Retorno de Inversión)",
    description: "Calcula el porcentaje de retorno de tu inversión",
    inputs: [
      {
        id: "gain",
        label: "Ganancia de la inversión",
        type: "number",
        helper: "Ingresa la ganancia obtenida de la inversión",
      },
      {
        id: "cost",
        label: "Costo de la inversión",
        type: "number",
        helper: "Ingresa el costo inicial de la inversión",
      },
    ],
  },
  "amortizacion": {
    category: "financieras",
    title: "Calculadora de Amortización",
    description: "Genera una tabla de amortización para tu préstamo",
    inputs: [
      {
        id: "amount",
        label: "Monto del préstamo",
        type: "number",
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
    category: "financieras",
    title: "Calculadora de Plazo Fijo",
    description: "Calcula el interés y monto final de tu inversión a plazo fijo",
    inputs: [
      {
        id: "principal",
        label: "Capital inicial",
        type: "number",
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
    category: "financieras",
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
  // Matemáticas
  "calculadora-basica": {
    category: "matematicas",
    title: "Calculadora Básica",
    description: "Realiza operaciones aritméticas básicas con historial y funciones de memoria",
    component() {
      return import("@/components/calculators/math/BasicCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-cientifica": {
    category: "matematicas",
    title: "Calculadora Científica",
    description: "Realiza cálculos científicos avanzados con funciones trigonométricas, logarítmicas y más",
    component() {
      return import("@/components/calculators/math/ScientificCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-algebra": {
    category: "matematicas",
    title: "Calculadora de Álgebra",
    description: "Resuelve ecuaciones lineales, sistemas de ecuaciones y operaciones con polinomios",
    component() {
      return import("@/components/calculators/math/AlgebraCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-fracciones": {
    category: "matematicas",
    title: "Calculadora de Fracciones",
    description: "Realiza operaciones de suma, resta, multiplicación y división entre fracciones",
    component() {
      return import("@/components/calculators/math/FractionCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-porcentajes": {
    category: "matematicas",
    title: "Calculadora de Porcentajes",
    description: "Calcula el porcentaje de un número utilizando la fórmula: (Valor base × Porcentaje) / 100",
    component() {
      return import("@/components/calculators/math/PercentageCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-ecuaciones-cuadraticas": {
    category: "matematicas",
    title: "Calculadora de Ecuaciones Cuadráticas",
    description: "Encuentra las soluciones de la ecuación cuadrática utilizando la fórmula: (-b ± √(b² - 4ac)) / (2a)",
    component() {
      return import("@/components/calculators/math/QuadraticCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-logaritmos-mat": {
    category: "matematicas",
    title: "Calculadora de Logaritmos",
    description: "Calcula el logaritmo de un número en una base específica utilizando la fórmula: log_b(x)",
    component() {
      return import("@/components/calculators/math/LogarithmCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "conversor-unidades-mat": {
    category: "matematicas",
    title: "Conversor de Unidades",
    description: "Convierte valores entre diferentes unidades de medida como longitud, peso, volumen y más",
    component() {
      return import("@/components/calculators/math/UnitConverter").then(
        (mod) => mod.default
      );
    },
  },
  // Simuladores
  "calculadora-trigonometrica": {
    category: "simuladores",
    title: "Simulador de Calculadora Trigonométrica",
    description: "Simula la calculadora científica con funciones trigonométricas",
    component() {
      return import("@/components/calculators/scientific/TrigonometricCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-logaritmos": {
    category: "simuladores",
    title: "Simulador de Calculadora de Logaritmos y Exponentes",
    description: "Simula la calculadora científica con funciones de logaritmos y exponentes",
    component() {
      return import("@/components/calculators/scientific/LogarithmCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "calculadora-ecuaciones": {
    category: "simuladores",
    title: "Simulador de Calculadora de Ecuaciones y Sistemas",
    description: "Simula la calculadora científica con funciones de ecuaciones y sistemas",
    component() {
      return import("@/components/calculators/scientific/EquationCalculator").then(
        (mod) => mod.default
      );
    },
  },
  "casio-fx-82spxii": {
    category: "simuladores",
    title: "Simulador de Casio FX-82SPXII",
    description: "Simulador de la calculadora científica Casio FX-82SPXII con visualización natural",
    component() {
      return import("@/components/calculators/simulators/CasioFX82SPXII").then(
        (mod) => mod.default
      );
    },
  },
  "casio-fx-82ms": {
    category: "simuladores",
    title: "Simulador de Casio FX-82MS",
    description: "Modelo reconocido por su funcionalidad y durabilidad, ideal para estudiantes y profesionales",
    component() {
      return import("@/components/calculators/simulators/CasioFX82MS").then(
        (mod) => mod.default
      );
    },
  },
  "hp-300s-plus": {
    category: "simuladores",
    title: "Simulador de HP 300s+",
    description: "Calculadora científica con pantalla de 4 líneas y 315 funciones integradas, incluyendo álgebra y trigonometría",
    component() {
      return import("../components/calculators/simulators/HP300SPlus").then(
        (mod) => mod.default
      );
    },
  },
  // Conversiones
  "conversor-unidades": {
    category: "conversiones",
    title: "Conversor de Unidades",
    description: "Convierte entre diferentes unidades de medida como longitud, peso, volumen y más",
    inputs: [
      {
        id: "value",
        label: "Valor",
        type: "number",
        helper: "Ingresa el valor a convertir",
      },
      {
        id: "fromUnit",
        label: "Unidad de origen",
        type: "text",
        helper: "Selecciona la unidad de origen",
      },
      {
        id: "toUnit",
        label: "Unidad de destino",
        type: "text",
        helper: "Selecciona la unidad de destino",
      },
    ],
  },
  "conversor-divisas": {
    category: "conversiones",
    title: "Conversor de Divisas",
    description: "Convierte entre diferentes monedas usando tasas de cambio",
    inputs: [
      {
        id: "amount",
        label: "Monto",
        type: "number",
        helper: "Ingresa el monto a convertir",
      },
      {
        id: "fromCurrency",
        label: "Moneda de origen",
        type: "text",
        helper: "Selecciona la moneda de origen",
      },
      {
        id: "toCurrency",
        label: "Moneda de destino",
        type: "text",
        helper: "Selecciona la moneda de destino",
      },
      {
        id: "rate",
        label: "Tasa de cambio",
        type: "number",
        helper: "Ingresa la tasa de cambio actual",
      },
    ],
  },
  "conversor-temperatura": {
    category: "conversiones",
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
        label: "Escala de origen",
        type: "text",
        helper: "Selecciona la escala de origen (Celsius, Fahrenheit, Kelvin)",
      },
      {
        id: "toScale",
        label: "Escala de destino",
        type: "text",
        helper: "Selecciona la escala de destino",
      },
    ],
  },
  "conversor-tiempo": {
    category: "conversiones",
    title: "Conversor de Tiempo",
    description: "Convierte entre diferentes unidades de tiempo",
    inputs: [
      {
        id: "value",
        label: "Valor",
        type: "number",
        helper: "Ingresa el valor a convertir",
      },
      {
        id: "fromUnit",
        label: "Unidad de origen",
        type: "text",
        helper: "Selecciona la unidad de origen (horas, minutos, segundos)",
      },
      {
        id: "toUnit",
        label: "Unidad de destino",
        type: "text",
        helper: "Selecciona la unidad de destino",
      },
    ],
  },
  "conversor-medidas-especiales": {
    category: "conversiones",
    title: "Conversor de Medidas Especiales",
    description: "Convierte entre unidades de potencia, presión, energía y más",
    inputs: [
      {
        id: "value",
        label: "Valor",
        type: "number",
        helper: "Ingresa el valor a convertir",
      },
      {
        id: "measureType",
        label: "Tipo de medida",
        type: "text",
        helper: "Selecciona el tipo de medida (potencia, presión, energía)",
      },
      {
        id: "fromUnit",
        label: "Unidad de origen",
        type: "text",
        helper: "Selecciona la unidad de origen",
      },
      {
        id: "toUnit",
        label: "Unidad de destino",
        type: "text",
        helper: "Selecciona la unidad de destino",
      },
    ],
  },
  // Fechas
  "timeanddate-calculator": {
    category: "fechas",
    title: "Time and Date Calculator",
    description: "Herramienta en línea que permite calcular diferencias entre fechas, sumar o restar días y más",
    inputs: [
      {
        name: "tipo_calculo",
        label: "Tipo de cálculo",
        type: "select",
        options: [
          { value: "diferencia", label: "Calcular diferencia entre fechas" },
          { value: "suma", label: "Sumar tiempo a una fecha" },
          { value: "resta", label: "Restar tiempo a una fecha" },
          { value: "dias_laborables", label: "Calcular días laborables" },
          { value: "dia_semana", label: "Encontrar día de la semana" }
        ],
        defaultValue: "diferencia",
      },
      {
        name: "fecha_inicial",
        label: "Fecha inicial",
        type: "date",
        defaultValue: "",
        placeholder: "Selecciona una fecha inicial",
      },
      {
        name: "fecha_final",
        label: "Fecha final",
        type: "date",
        defaultValue: "",
        placeholder: "Selecciona una fecha final",
        condition: { field: "tipo_calculo", value: ["diferencia", "dias_laborables"] },
      },
      {
        name: "unidad",
        label: "Unidad de tiempo",
        type: "select",
        options: [
          { value: "dias", label: "Días" },
          { value: "semanas", label: "Semanas" },
          { value: "meses", label: "Meses" },
          { value: "años", label: "Años" },
        ],
        defaultValue: "dias",
        condition: { field: "tipo_calculo", value: ["suma", "resta"] },
      },
      {
        name: "cantidad",
        label: "Cantidad",
        type: "number",
        defaultValue: "1",
        placeholder: "Ingresa la cantidad",
        condition: { field: "tipo_calculo", value: ["suma", "resta"] },
      },
      {
        name: "incluir_festivos",
        label: "Excluir fines de semana",
        type: "select",
        options: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
        ],
        defaultValue: "si",
        condition: { field: "tipo_calculo", value: "dias_laborables" },
      },
    ],
    calculate: (inputs) => {
      if (!inputs.fecha_inicial) {
        return "Por favor, selecciona una fecha inicial.";
      }
      
      const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      
      // Función auxiliar para formatear la fecha
      const formatearFecha = (fecha: Date): string => {
        return `${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
      };
      
      // Función para verificar si es fin de semana
      const esFinDeSemana = (fecha: Date): boolean => {
        const dia = fecha.getDay();
        return dia === 0 || dia === 6; // 0 es domingo, 6 es sábado
      };
      
      // Función para calcular días laborables entre dos fechas
      const calcularDiasLaborables = (inicio: Date, fin: Date, excluirFinDeSemana: boolean): number => {
        let dias = 0;
        const fechaActual = new Date(inicio);
        
        while (fechaActual <= fin) {
          if (!excluirFinDeSemana || !esFinDeSemana(fechaActual)) {
            dias++;
          }
          fechaActual.setDate(fechaActual.getDate() + 1);
        }
        
        return dias;
      };
      
      // Calcular diferencia entre fechas
      if (inputs.tipo_calculo === "diferencia" && inputs.fecha_final) {
        const fechaInicial = new Date(inputs.fecha_inicial);
        const fechaFinal = new Date(inputs.fecha_final);
        
        // Validar que las fechas sean válidas
        if (isNaN(fechaInicial.getTime()) || isNaN(fechaFinal.getTime())) {
          return "Por favor, ingresa fechas válidas.";
        }
        
        // Calcular diferencia en milisegundos
        const difMilisegundos = Math.abs(fechaFinal.getTime() - fechaInicial.getTime());
        
        // Convertir a diferentes unidades de tiempo
        const difSegundos = Math.floor(difMilisegundos / 1000);
        const difMinutos = Math.floor(difSegundos / 60);
        const difHoras = Math.floor(difMinutos / 60);
        const difDias = Math.floor(difHoras / 24);
        
        // Calcular años, meses y días
        const difAnios = Math.floor(difDias / 365.25);
        const diasRestantes = difDias % 365.25;
        const difMeses = Math.floor(diasRestantes / 30.44);
        const diasFinales = diasRestantes % 30.44;
        
        // Verificar si la fecha final es posterior a la inicial
        const esPosterior = fechaFinal > fechaInicial;
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-blue-50 rounded-lg">
              <p class="font-semibold">Diferencia entre fechas:</p>
              <p class="text-lg">De ${formatearFecha(fechaInicial)} a ${formatearFecha(fechaFinal)}</p>
              <p class="text-sm text-gray-600">${esPosterior ? '(Fecha final es posterior a fecha inicial)' : '(Fecha inicial es posterior a fecha final)'}</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-3 border rounded-md">
                <p class="font-medium">Diferencia exacta:</p>
                <p>${difAnios} años, ${difMeses} meses y ${diasFinales} días</p>
              </div>
              
              <div class="p-3 border rounded-md">
                <p class="font-medium">En otras unidades:</p>
                <p>${difDias.toLocaleString()} días totales</p>
                <p>${difHoras.toLocaleString()} horas</p>
                <p>${difMinutos.toLocaleString()} minutos</p>
              </div>
            </div>
          </div>
        `;
      } 
      // Sumar tiempo a una fecha
      else if (inputs.tipo_calculo === "suma") {
        const fechaInicial = new Date(inputs.fecha_inicial);
        
        // Validar que la fecha sea válida
        if (isNaN(fechaInicial.getTime())) {
          return "Por favor, ingresa una fecha válida.";
        }
        
        // Validar que la cantidad sea un número
        const cantidad = Number(inputs.cantidad);
        if (isNaN(cantidad)) {
          return "Por favor, ingresa una cantidad válida.";
        }
        
        const nuevaFecha = new Date(fechaInicial);
        
        // Aplicar la suma según la unidad de tiempo
        switch (inputs.unidad) {
          case "dias":
            nuevaFecha.setDate(nuevaFecha.getDate() + cantidad);
            break;
          case "semanas":
            nuevaFecha.setDate(nuevaFecha.getDate() + (cantidad * 7));
            break;
          case "meses":
            nuevaFecha.setMonth(nuevaFecha.getMonth() + cantidad);
            break;
          case "años":
            nuevaFecha.setFullYear(nuevaFecha.getFullYear() + cantidad);
            break;
        }
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-green-50 rounded-lg">
              <p class="font-semibold">Resultado:</p>
              <p class="text-lg">Al sumar ${cantidad} ${inputs.unidad} a ${formatearFecha(fechaInicial)}</p>
              <p class="text-xl font-bold">La nueva fecha es: ${formatearFecha(nuevaFecha)}</p>
            </div>
            
            <div class="text-sm text-gray-600">
              <p>Día de la semana: ${diasSemana[nuevaFecha.getDay()]}</p>
              <p>Número de día del año: ${Math.floor((nuevaFecha.getTime() - new Date(nuevaFecha.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))}</p>
              <p>${esFinDeSemana(nuevaFecha) ? 'Es fin de semana' : 'Es día laboral (lunes a viernes)'}</p>
            </div>
          </div>
        `;
      } 
      // Restar tiempo a una fecha
      else if (inputs.tipo_calculo === "resta") {
        const fechaInicial = new Date(inputs.fecha_inicial);
        
        // Validar que la fecha sea válida
        if (isNaN(fechaInicial.getTime())) {
          return "Por favor, ingresa una fecha válida.";
        }
        
        // Validar que la cantidad sea un número
        const cantidad = Number(inputs.cantidad);
        if (isNaN(cantidad)) {
          return "Por favor, ingresa una cantidad válida.";
        }
        
        const nuevaFecha = new Date(fechaInicial);
        
        // Aplicar la resta según la unidad de tiempo
        switch (inputs.unidad) {
          case "dias":
            nuevaFecha.setDate(nuevaFecha.getDate() - cantidad);
            break;
          case "semanas":
            nuevaFecha.setDate(nuevaFecha.getDate() - (cantidad * 7));
            break;
          case "meses":
            nuevaFecha.setMonth(nuevaFecha.getMonth() - cantidad);
            break;
          case "años":
            nuevaFecha.setFullYear(nuevaFecha.getFullYear() - cantidad);
            break;
        }
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-purple-50 rounded-lg">
              <p class="font-semibold">Resultado:</p>
              <p class="text-lg">Al restar ${cantidad} ${inputs.unidad} a ${formatearFecha(fechaInicial)}</p>
              <p class="text-xl font-bold">La nueva fecha es: ${formatearFecha(nuevaFecha)}</p>
            </div>
            
            <div class="text-sm text-gray-600">
              <p>Día de la semana: ${diasSemana[nuevaFecha.getDay()]}</p>
              <p>Número de día del año: ${Math.floor((nuevaFecha.getTime() - new Date(nuevaFecha.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))}</p>
              <p>${esFinDeSemana(nuevaFecha) ? 'Es fin de semana' : 'Es día laboral (lunes a viernes)'}</p>
            </div>
          </div>
        `;
      } 
      // Calcular días laborables entre dos fechas
      else if (inputs.tipo_calculo === "dias_laborables" && inputs.fecha_final) {
        const fechaInicial = new Date(inputs.fecha_inicial);
        const fechaFinal = new Date(inputs.fecha_final);
        
        // Validar que las fechas sean válidas
        if (isNaN(fechaInicial.getTime()) || isNaN(fechaFinal.getTime())) {
          return "Por favor, ingresa fechas válidas.";
        }
        
        // Validar que la fecha inicial no sea posterior a la final
        if (fechaInicial > fechaFinal) {
          return "La fecha inicial no puede ser posterior a la fecha final.";
        }
        
        const excluirFinDeSemana = inputs.incluir_festivos === "si";
        const diasLaborables = calcularDiasLaborables(fechaInicial, fechaFinal, excluirFinDeSemana);
        
        // Calcular diferencia total en días
        const difMilisegundos = Math.abs(fechaFinal.getTime() - fechaInicial.getTime());
        const difDias = Math.floor(difMilisegundos / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día final
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-yellow-50 rounded-lg">
              <p class="font-semibold">Días laborables entre fechas:</p>
              <p class="text-lg">De ${formatearFecha(fechaInicial)} a ${formatearFecha(fechaFinal)}</p>
              <p class="text-2xl font-bold">${diasLaborables} días ${excluirFinDeSemana ? 'laborables' : 'totales'}</p>
            </div>
            
            <div class="p-3 border rounded-md">
              <p class="font-medium">Información adicional:</p>
              <p>Días totales (incluyendo fin de semana): ${difDias}</p>
              <p>Fines de semana en este período: ${excluirFinDeSemana ? difDias - diasLaborables : 'No calculado'}</p>
              <p class="text-sm text-gray-600 mt-2">
                Los días laborables se calculan de lunes a viernes${excluirFinDeSemana ? ', excluyendo' : ', incluyendo'} fines de semana.
              </p>
            </div>
          </div>
        `;
      } 
      // Encontrar día de la semana
      else if (inputs.tipo_calculo === "dia_semana") {
        const fechaInicial = new Date(inputs.fecha_inicial);
        
        // Validar que la fecha sea válida
        if (isNaN(fechaInicial.getTime())) {
          return "Por favor, ingresa una fecha válida.";
        }
        
        const diaSemana = diasSemana[fechaInicial.getDay()];
        const esFeriado = esFinDeSemana(fechaInicial);
        
        // Calcular el número del día del año
        const inicioAño = new Date(fechaInicial.getFullYear(), 0, 0);
        const diferenciaMs = fechaInicial.getTime() - inicioAño.getTime();
        const diaDelAño = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
        
        // Calcular la semana del año
        const semanaDelAño = Math.ceil(diaDelAño / 7);
        
        return `
          <div class="space-y-4">
            <div class="p-4 ${esFeriado ? 'bg-red-50' : 'bg-blue-50'} rounded-lg">
              <p class="font-semibold">Información de la fecha:</p>
              <p class="text-lg">${formatearFecha(fechaInicial)}</p>
              <p class="text-2xl font-bold">Día de la semana: ${diaSemana}</p>
            </div>
            
            <div class="text-sm text-gray-600">
              <p>Día ${diaDelAño} del año ${fechaInicial.getFullYear()}</p>
              <p>Semana ${semanaDelAño} del año</p>
              <p>${esFeriado ? 'Es fin de semana' : 'Es día laboral (lunes a viernes)'}</p>
            </div>
          </div>
        `;
      }
      
      return "Por favor, selecciona el tipo de cálculo y completa los campos requeridos.";
    },
  },
  "calculatornet-date-calculator": {
    category: "fechas",
    title: "Calculator.net Date Calculator",
    description: "Calculadora de fechas en línea que ofrece funciones para calcular intervalos, sumar o restar tiempo y encontrar días específicos de la semana",
    inputs: [
      {
        name: "tipo_calculo",
        label: "Tipo de cálculo",
        type: "select",
        options: [
          { value: "intervalo", label: "Calcular intervalo" },
          { value: "suma", label: "Sumar tiempo a una fecha" },
          { value: "resta", label: "Restar tiempo a una fecha" },
          { value: "dia_semana", label: "Encontrar día de la semana" },
        ],
        defaultValue: "intervalo",
      },
      {
        name: "fecha_inicio",
        label: "Fecha de inicio",
        type: "date",
        defaultValue: "",
        placeholder: "Selecciona una fecha",
      },
      {
        name: "fecha_fin",
        label: "Fecha final",
        type: "date",
        defaultValue: "",
        placeholder: "Selecciona una fecha final",
        condition: { field: "tipo_calculo", value: "intervalo" },
      },
      {
        name: "unidad",
        label: "Unidad de tiempo",
        type: "select",
        options: [
          { value: "dias", label: "Días" },
          { value: "semanas", label: "Semanas" },
          { value: "meses", label: "Meses" },
          { value: "años", label: "Años" },
        ],
        defaultValue: "dias",
        condition: { field: "tipo_calculo", value: ["suma", "resta"] },
      },
      {
        name: "cantidad",
        label: "Cantidad",
        type: "number",
        defaultValue: "1",
        placeholder: "Ingresa la cantidad",
        condition: { field: "tipo_calculo", value: ["suma", "resta"] },
      },
    ],
    calculate: (inputs) => {
      const fechaInicio = new Date(inputs.fecha_inicio);
      
      if (inputs.tipo_calculo === "intervalo" && inputs.fecha_fin) {
        const fechaFin = new Date(inputs.fecha_fin);
        const diferenciaMilisegundos = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
        const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
        const diferenciaAnios = Math.floor(diferenciaDias / 365);
        const diasRestantes = diferenciaDias % 365;
        const diferenciaMeses = Math.floor(diasRestantes / 30);
        const diasFinales = diasRestantes % 30;
        
        return `Intervalo: ${diferenciaAnios} años, ${diferenciaMeses} meses y ${diasFinales} días (Total: ${diferenciaDias} días)`;
      } else if (inputs.tipo_calculo === "suma") {
        const nuevaFecha = new Date(fechaInicio);
        if (inputs.unidad === "dias") {
          nuevaFecha.setDate(nuevaFecha.getDate() + Number(inputs.cantidad));
        } else if (inputs.unidad === "semanas") {
          nuevaFecha.setDate(nuevaFecha.getDate() + (Number(inputs.cantidad) * 7));
        } else if (inputs.unidad === "meses") {
          nuevaFecha.setMonth(nuevaFecha.getMonth() + Number(inputs.cantidad));
        } else if (inputs.unidad === "años") {
          nuevaFecha.setFullYear(nuevaFecha.getFullYear() + Number(inputs.cantidad));
        }
        return `Fecha resultante: ${nuevaFecha.toLocaleDateString()}`;
      } else if (inputs.tipo_calculo === "resta") {
        const nuevaFecha = new Date(fechaInicio);
        if (inputs.unidad === "dias") {
          nuevaFecha.setDate(nuevaFecha.getDate() - Number(inputs.cantidad));
        } else if (inputs.unidad === "semanas") {
          nuevaFecha.setDate(nuevaFecha.getDate() - (Number(inputs.cantidad) * 7));
        } else if (inputs.unidad === "meses") {
          nuevaFecha.setMonth(nuevaFecha.getMonth() - Number(inputs.cantidad));
        } else if (inputs.unidad === "años") {
          nuevaFecha.setFullYear(nuevaFecha.getFullYear() - Number(inputs.cantidad));
        }
        return `Fecha resultante: ${nuevaFecha.toLocaleDateString()}`;
      } else if (inputs.tipo_calculo === "dia_semana") {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const diaSemana = diasSemana[fechaInicio.getDay()];
        return `El día de la semana para la fecha seleccionada es: ${diaSemana}`;
      }
      
      return "Por favor, completa todos los campos.";
    },
  },
  "epoch-converter": {
    category: "fechas",
    title: "Epoch Converter",
    description: "Herramienta en línea que convierte fechas y horas a y desde la época Unix (timestamp)",
    inputs: [
      {
        name: "tipo_conversion",
        label: "Tipo de conversión",
        type: "select",
        options: [
          { value: "fecha_a_epoch", label: "Fecha a Timestamp Unix" },
          { value: "epoch_a_fecha", label: "Timestamp Unix a Fecha" },
          { value: "hora_actual", label: "Timestamp Unix actual" },
          { value: "calculo_dias", label: "Calcular diferencia en días" }
        ],
        defaultValue: "fecha_a_epoch",
      },
      {
        name: "fecha",
        label: "Fecha y hora",
        type: "datetime-local",
        defaultValue: "",
        placeholder: "Selecciona fecha y hora",
        condition: { field: "tipo_conversion", value: ["fecha_a_epoch", "calculo_dias"] },
      },
      {
        name: "timezone",
        label: "Zona horaria para conversión",
        type: "select",
        options: [
          { value: "local", label: "Hora local del navegador" },
          { value: "utc", label: "UTC/GMT" },
        ],
        defaultValue: "local",
        condition: { field: "tipo_conversion", value: ["fecha_a_epoch", "epoch_a_fecha"] },
      },
      {
        name: "timestamp",
        label: "Timestamp Unix (segundos)",
        type: "number",
        defaultValue: "",
        placeholder: "Ingresa el timestamp en segundos",
        condition: { field: "tipo_conversion", value: ["epoch_a_fecha", "calculo_dias"] },
      },
      {
        name: "formato_fecha",
        label: "Formato de fecha resultado",
        type: "select",
        options: [
          { value: "completo", label: "Completo (fecha y hora)" },
          { value: "fecha", label: "Solo fecha" },
          { value: "hora", label: "Solo hora" },
          { value: "iso", label: "ISO 8601" },
          { value: "rfc", label: "RFC 2822" },
        ],
        defaultValue: "completo",
        condition: { field: "tipo_conversion", value: "epoch_a_fecha" },
      },
    ],
    calculate: (inputs) => {
      // Obtener fecha actual en formato Unix timestamp
      const ahora = Math.floor(Date.now() / 1000);
      
      // Convertir fecha a timestamp
      if (inputs.tipo_conversion === "fecha_a_epoch" && inputs.fecha) {
        const fecha = new Date(inputs.fecha);
        
        // Validar que la fecha sea válida
        if (isNaN(fecha.getTime())) {
          return "Por favor, ingresa una fecha válida.";
        }
        
        let timestamp;
        
        if (inputs.timezone === "utc") {
          // Convertir a UTC
          timestamp = Math.floor(Date.UTC(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate(),
            fecha.getHours(),
            fecha.getMinutes(),
            fecha.getSeconds()
          ) / 1000);
        } else {
          // Usar hora local
          timestamp = Math.floor(fecha.getTime() / 1000);
        }
        
        const segundosDesdeEpoch = timestamp;
        const minutosDesdeEpoch = Math.floor(segundosDesdeEpoch / 60);
        const horasDesdeEpoch = Math.floor(minutosDesdeEpoch / 60);
        const diasDesdeEpoch = Math.floor(horasDesdeEpoch / 24);
        
        // Calcular años, meses y días
        const diasDesdeEpochTotal = Math.floor(segundosDesdeEpoch / (60 * 60 * 24));
        const aniosDesdeEpoch = Math.floor(diasDesdeEpochTotal / 365.25);
        const diasRestantes = diasDesdeEpochTotal % 365.25;
        const mesesDesdeEpoch = Math.floor(diasRestantes / 30.44);
        const diasFinales = diasRestantes % 30.44;
        
        return `
          <div class="space-y-2">
            <div class="p-4 bg-blue-50 rounded-lg">
              <p class="font-semibold">El timestamp Unix es:</p>
              <p class="text-lg">${timestamp} segundos</p>
              <div class="text-sm text-gray-600 mt-2">
                <p>Equivalente a:</p>
                <p>${minutosDesdeEpoch.toLocaleString()} minutos</p>
                <p>${horasDesdeEpoch.toLocaleString()} horas</p>
                <p>${diasDesdeEpoch.toLocaleString()} días desde el 1 de enero de 1970</p>
                <p>${aniosDesdeEpoch} años, ${mesesDesdeEpoch} meses y ${diasFinales} días</p>
              </div>
            </div>
          </div>
        `;
      } 
      // Convertir timestamp a fecha
      else if (inputs.tipo_conversion === "epoch_a_fecha" && inputs.timestamp) {
        const segundos = Number(inputs.timestamp);
        
        // Validar que el timestamp sea un número
        if (isNaN(segundos)) {
          return "Por favor, ingresa un timestamp válido.";
        }
        
        let fecha;
        
        if (inputs.timezone === "utc") {
          // Crear fecha en UTC
          fecha = new Date(0);
          fecha.setUTCSeconds(segundos);
        } else {
          // Crear fecha en hora local
          fecha = new Date(segundos * 1000);
        }
        
        let resultado = "";
        
        if (inputs.formato_fecha === "completo") {
          resultado = fecha.toLocaleString();
        } else if (inputs.formato_fecha === "fecha") {
          resultado = fecha.toLocaleDateString();
        } else if (inputs.formato_fecha === "hora") {
          resultado = fecha.toLocaleTimeString();
        } else if (inputs.formato_fecha === "iso") {
          resultado = fecha.toISOString();
        } else if (inputs.formato_fecha === "rfc") {
          resultado = fecha.toUTCString();
        }
        
        const diasPasados = Math.floor((ahora - segundos) / 86400);
        let mensajeTiempo = "";
        
        if (segundos > ahora) {
          const diasFuturos = Math.floor((segundos - ahora) / 86400);
          mensajeTiempo = `Esta fecha está ${diasFuturos} días en el futuro`;
        } else {
          mensajeTiempo = `Hace ${diasPasados} días`;
        }
        
        return `
          <div class="space-y-2">
            <div class="p-4 bg-green-50 rounded-lg">
              <p class="font-semibold">La fecha correspondiente es:</p>
              <p class="text-lg">${resultado}</p>
              <p class="text-sm text-gray-600">${mensajeTiempo}</p>
              <div class="text-xs text-gray-500 mt-2">
                <p>Zona horaria: ${inputs.timezone === "utc" ? "UTC/GMT" : "Local"}</p>
                <p>Formato: ${inputs.formato_fecha}</p>
              </div>
            </div>
          </div>
        `;
      } 
      // Mostrar timestamp actual
      else if (inputs.tipo_conversion === "hora_actual") {
        const fechaActual = new Date();
        const timestampActual = Math.floor(Date.now() / 1000);
        
        return `
          <div class="space-y-3">
            <div>
              <p class="font-semibold">Timestamp Unix actual:</p>
              <p class="text-lg">${timestampActual}</p>
            </div>
            <div>
              <p class="font-semibold">Fecha y hora actual:</p>
              <p>${fechaActual.toLocaleString()}</p>
            </div>
            <div class="text-sm text-gray-600">
              <p>ISO 8601: ${fechaActual.toISOString()}</p>
              <p>RFC 2822: ${fechaActual.toUTCString()}</p>
            </div>
          </div>
        `;
      }
      // Calcular diferencia en días
      else if (inputs.tipo_conversion === "calculo_dias" && inputs.fecha && inputs.timestamp) {
        const fecha1 = new Date(inputs.fecha);
        const fecha2 = new Date(Number(inputs.timestamp) * 1000);
        
        // Validar que las fechas sean válidas
        if (isNaN(fecha1.getTime()) || isNaN(fecha2.getTime())) {
          return "Por favor, ingresa fechas válidas.";
        }
        
        const milisegundosDiferencia = Math.abs(fecha2.getTime() - fecha1.getTime());
        const segundosDiferencia = Math.floor(milisegundosDiferencia / 1000);
        const minutosDiferencia = Math.floor(segundosDiferencia / 60);
        const horasDiferencia = Math.floor(minutosDiferencia / 60);
        const diasDiferencia = Math.floor(horasDiferencia / 24);
        
        return `
          <div class="space-y-3">
            <p class="font-semibold">Diferencia entre fechas:</p>
            <p>${diasDiferencia.toLocaleString()} días</p>
            <p>${horasDiferencia.toLocaleString()} horas</p>
            <p>${minutosDiferencia.toLocaleString()} minutos</p>
            <p>${segundosDiferencia.toLocaleString()} segundos</p>
          </div>
        `;
      }
      
      return "Por favor, completa todos los campos necesarios.";
    },
  },
  "date-wheel": {
    category: "fechas",
    title: "Date Wheel",
    description: "Herramienta de cálculo rápido de fechas futuras o pasadas a partir de una fecha de inicio",
    inputs: [
      {
        name: "fecha_base",
        label: "Fecha de inicio",
        type: "date",
        defaultValue: "",
        placeholder: "Selecciona la fecha de inicio",
      },
      {
        name: "direccion",
        label: "Dirección",
        type: "select",
        options: [
          { value: "adelante", label: "Avanzar hacia el futuro" },
          { value: "atras", label: "Retroceder hacia el pasado" },
        ],
        defaultValue: "adelante",
      },
      {
        name: "unidad",
        label: "Unidad de tiempo",
        type: "select",
        options: [
          { value: "dias", label: "Días" },
          { value: "semanas", label: "Semanas" },
          { value: "meses", label: "Meses" },
          { value: "años", label: "Años" },
          { value: "personalizado", label: "Personalizado (combinación)" },
        ],
        defaultValue: "dias",
      },
      {
        name: "cantidad_dias",
        label: "Días",
        type: "number",
        defaultValue: "0",
        placeholder: "Días",
        condition: { field: "unidad", value: "personalizado" },
      },
      {
        name: "cantidad_semanas",
        label: "Semanas",
        type: "number",
        defaultValue: "0",
        placeholder: "Semanas",
        condition: { field: "unidad", value: "personalizado" },
      },
      {
        name: "cantidad_meses",
        label: "Meses",
        type: "number",
        defaultValue: "0",
        placeholder: "Meses",
        condition: { field: "unidad", value: "personalizado" },
      },
      {
        name: "cantidad_años",
        label: "Años",
        type: "number",
        defaultValue: "0",
        placeholder: "Años",
        condition: { field: "unidad", value: "personalizado" },
      },
      {
        name: "cantidad",
        label: "Cantidad",
        type: "number",
        defaultValue: "7",
        placeholder: "Ingresa la cantidad",
        condition: { field: "unidad", value: ["dias", "semanas", "meses", "años"] },
      },
      {
        name: "mostrar_intermedias",
        label: "Mostrar fechas intermedias",
        type: "select",
        options: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
        ],
        defaultValue: "no",
      },
      {
        name: "incremento",
        label: "Incremento para fechas intermedias",
        type: "number",
        defaultValue: "1",
        placeholder: "Incremento",
        condition: { field: "mostrar_intermedias", value: "si" },
      },
    ],
    calculate: (inputs) => {
      if (!inputs.fecha_base) {
        return "Por favor, selecciona una fecha de inicio.";
      }
      
      const fechaBase = new Date(inputs.fecha_base);
      const esHaciaFuturo = inputs.direccion === "adelante";
      
      // Validar que la fecha sea válida
      if (isNaN(fechaBase.getTime())) {
        return "Por favor, ingresa una fecha válida.";
      }
      
      // Función para formatear la fecha
      const formatearFecha = (fecha: Date): string => {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return `${diasSemana[fecha.getDay()]}, ${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
      };
      
      // Función para verificar si es fin de semana
      const esFinDeSemana = (fecha: Date): boolean => {
        const dia = fecha.getDay();
        return dia === 0 || dia === 6; // 0 es domingo, 6 es sábado
      };
      
      const fechaResultado = new Date(fechaBase);
      let totalDias = 0;
      
      // Cálculo según unidad seleccionada
      if (inputs.unidad === "personalizado") {
        const dias = Number(inputs.cantidad_dias) || 0;
        const semanas = Number(inputs.cantidad_semanas) || 0;
        const meses = Number(inputs.cantidad_meses) || 0;
        const años = Number(inputs.cantidad_años) || 0;
        
        // Validar que al menos una unidad tenga un valor
        if (dias === 0 && semanas === 0 && meses === 0 && años === 0) {
          return "Por favor, ingresa al menos una cantidad mayor a cero.";
        }
        
        // Sumar o restar según dirección
        if (esHaciaFuturo) {
          fechaResultado.setFullYear(fechaResultado.getFullYear() + años);
          fechaResultado.setMonth(fechaResultado.getMonth() + meses);
          fechaResultado.setDate(fechaResultado.getDate() + dias + (semanas * 7));
        } else {
          fechaResultado.setFullYear(fechaResultado.getFullYear() - años);
          fechaResultado.setMonth(fechaResultado.getMonth() - meses);
          fechaResultado.setDate(fechaResultado.getDate() - dias - (semanas * 7));
        }
        
        // Calcular aproximación de días totales para mostrar diferencia
        totalDias = dias + (semanas * 7) + (meses * 30) + (años * 365);
      } else {
        const cantidad = Number(inputs.cantidad);
        if (isNaN(cantidad) || cantidad <= 0) {
          return "Por favor, ingresa una cantidad mayor a cero.";
        }
        
        // Sumar o restar según unidad y dirección
        switch (inputs.unidad) {
          case "dias":
            if (esHaciaFuturo) {
              fechaResultado.setDate(fechaResultado.getDate() + cantidad);
            } else {
              fechaResultado.setDate(fechaResultado.getDate() - cantidad);
            }
            totalDias = cantidad;
            break;
            
          case "semanas":
            if (esHaciaFuturo) {
              fechaResultado.setDate(fechaResultado.getDate() + (cantidad * 7));
            } else {
              fechaResultado.setDate(fechaResultado.getDate() - (cantidad * 7));
            }
            totalDias = cantidad * 7;
            break;
            
          case "meses":
            if (esHaciaFuturo) {
              fechaResultado.setMonth(fechaResultado.getMonth() + cantidad);
            } else {
              fechaResultado.setMonth(fechaResultado.getMonth() - cantidad);
            }
            totalDias = cantidad * 30; // Aproximación
            break;
            
          case "años":
            if (esHaciaFuturo) {
              fechaResultado.setFullYear(fechaResultado.getFullYear() + cantidad);
            } else {
              fechaResultado.setFullYear(fechaResultado.getFullYear() - cantidad);
            }
            totalDias = cantidad * 365; // Aproximación
            break;
        }
      }
      
      // Preparar resultado
      let resultado = `
        <div class="space-y-4">
          <div class="p-4 ${esHaciaFuturo ? 'bg-green-50' : 'bg-blue-50'} rounded-lg">
            <p class="font-semibold">Resultado:</p>
            <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center">
              <div>
                <p class="text-sm">Fecha base: ${formatearFecha(fechaBase)}</p>
                <p class="text-lg font-bold">Nueva fecha: ${formatearFecha(fechaResultado)}</p>
              </div>
              <div class="mt-2 md:mt-0 bg-white px-3 py-2 rounded-md shadow-sm">
                <p class="text-sm">Avanzado o retrocedido:</p>
                <p>${totalDias} días</p>
              </div>
            </div>
          </div>
      `;
      
      // Si se solicitan fechas intermedias
      if (inputs.mostrar_intermedias === "si") {
        const incremento = Number(inputs.incremento);
        
        if (isNaN(incremento) || incremento <= 0) {
          return resultado + "</div><p class='text-red-500'>El incremento para fechas intermedias debe ser mayor a cero.</p>";
        }
        
        // Calcular fechas intermedias
        resultado += `
          <div class="border rounded-md p-4">
            <p class="font-medium mb-2">Fechas intermedias:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        `;
        
        const fechasIntermedias = [];
        const fechaTemp = new Date(fechaBase);
        
        // Unidad personalizada no muestra fechas intermedias
        if (inputs.unidad !== "personalizado") {
          let cantidadTotal = Number(inputs.cantidad);
          let unidadTemp = inputs.unidad;
          let cantidadPorPaso = incremento;
          
          // Ajustar cantidad por paso según unidad
          if (unidadTemp === "semanas") {
            cantidadPorPaso = incremento * 7;
            unidadTemp = "dias";
            cantidadTotal = cantidadTotal * 7;
          } else if (unidadTemp === "meses" || unidadTemp === "años") {
            // No calculamos intermedias para meses o años
            resultado += "<p>Las fechas intermedias solo están disponibles para días y semanas.</p>";
          } else {
            // Para días mostramos cada incremento días
            for (let i = incremento; i < cantidadTotal; i += incremento) {
              const fechaIntermedia = new Date(fechaBase);
              
              if (esHaciaFuturo) {
                fechaIntermedia.setDate(fechaIntermedia.getDate() + i);
              } else {
                fechaIntermedia.setDate(fechaIntermedia.getDate() - i);
              }
              
              // Formato amigable
              const esFinSemana = esFinDeSemana(fechaIntermedia);
              resultado += `
                <div class="p-2 ${esFinSemana ? 'bg-gray-50' : 'bg-white'} border rounded text-sm">
                  <span class="font-medium">Día ${i}:</span> ${formatearFecha(fechaIntermedia)}
                  ${esFinSemana ? '<span class="text-xs text-gray-500"> (fin de semana)</span>' : ''}
                </div>
              `;
            }
          }
        } else {
          resultado += "<p>Las fechas intermedias no están disponibles para cálculos personalizados.</p>";
        }
        
        resultado += `
            </div>
          </div>
        `;
      }
      
      resultado += "</div>";
      return resultado;
    },
  },
  "time-calculator": {
    category: "fechas",
    title: "Time Calculator",
    description: "Calculadora en línea que permite sumar y restar horas y minutos, calcular duraciones y convertir formatos de tiempo",
    inputs: [
      {
        name: "operacion",
        label: "Operación",
        type: "select",
        options: [
          { value: "suma", label: "Sumar tiempos" },
          { value: "resta", label: "Restar tiempos" },
          { value: "duracion", label: "Calcular duración entre horas" },
          { value: "convertir", label: "Convertir unidades de tiempo" },
          { value: "zonas_horarias", label: "Convertir entre zonas horarias" }
        ],
        defaultValue: "suma",
      },
      {
        name: "tiempo_base",
        label: "Tiempo base (HH:MM)",
        type: "time",
        defaultValue: "",
        placeholder: "Ingresa el tiempo base",
        condition: { field: "operacion", value: ["suma", "resta", "duracion", "zonas_horarias"] },
      },
      {
        name: "tiempo_secundario",
        label: "Segundo tiempo (HH:MM)",
        type: "time",
        defaultValue: "",
        placeholder: "Ingresa el segundo tiempo",
        condition: { field: "operacion", value: ["suma", "resta", "duracion"] },
      },
      {
        name: "zona_origen",
        label: "Zona horaria de origen",
        type: "select",
        options: [
          { value: "UTC-12:00", label: "UTC-12:00 (Línea internacional de fecha oeste)" },
          { value: "UTC-11:00", label: "UTC-11:00 (Samoa Americana, Niue)" },
          { value: "UTC-10:00", label: "UTC-10:00 (Hawái)" },
          { value: "UTC-09:00", label: "UTC-09:00 (Alaska)" },
          { value: "UTC-08:00", label: "UTC-08:00 (Pacífico - Los Ángeles, Vancouver)" },
          { value: "UTC-07:00", label: "UTC-07:00 (Montaña - Denver, Phoenix)" },
          { value: "UTC-06:00", label: "UTC-06:00 (Central - Chicago, Ciudad de México)" },
          { value: "UTC-05:00", label: "UTC-05:00 (Este - Nueva York, Toronto)" },
          { value: "UTC-04:00", label: "UTC-04:00 (Atlántico - Halifax, Santiago)" },
          { value: "UTC-03:00", label: "UTC-03:00 (Buenos Aires, São Paulo)" },
          { value: "UTC-02:00", label: "UTC-02:00 (Atlántico medio)" },
          { value: "UTC-01:00", label: "UTC-01:00 (Azores, Cabo Verde)" },
          { value: "UTC+00:00", label: "UTC±00:00 (Londres, Lisboa)" },
          { value: "UTC+01:00", label: "UTC+01:00 (París, Madrid, Roma)" },
          { value: "UTC+02:00", label: "UTC+02:00 (Helsinki, Cairo, Jerusalén)" },
          { value: "UTC+03:00", label: "UTC+03:00 (Moscú, Estambul, Riad)" },
          { value: "UTC+04:00", label: "UTC+04:00 (Dubai, Bakú)" },
          { value: "UTC+05:00", label: "UTC+05:00 (Karachi, Islamabad)" },
          { value: "UTC+05:30", label: "UTC+05:30 (India - Nueva Delhi, Mumbai)" },
          { value: "UTC+06:00", label: "UTC+06:00 (Daca, Almaty)" },
          { value: "UTC+07:00", label: "UTC+07:00 (Bangkok, Hanói, Yakarta)" },
          { value: "UTC+08:00", label: "UTC+08:00 (China - Pekín, Hong Kong, Singapur)" },
          { value: "UTC+09:00", label: "UTC+09:00 (Japón - Tokio, Seúl)" },
          { value: "UTC+10:00", label: "UTC+10:00 (Sydney, Melbourne)" },
          { value: "UTC+11:00", label: "UTC+11:00 (Islas Salomón)" },
          { value: "UTC+12:00", label: "UTC+12:00 (Nueva Zelanda - Wellington, Auckland)" },
        ],
        defaultValue: "UTC-06:00",
        condition: { field: "operacion", value: "zonas_horarias" },
      },
      {
        name: "zona_destino",
        label: "Zona horaria de destino",
        type: "select",
        options: [
          { value: "UTC-12:00", label: "UTC-12:00 (Línea internacional de fecha oeste)" },
          { value: "UTC-11:00", label: "UTC-11:00 (Samoa Americana, Niue)" },
          { value: "UTC-10:00", label: "UTC-10:00 (Hawái)" },
          { value: "UTC-09:00", label: "UTC-09:00 (Alaska)" },
          { value: "UTC-08:00", label: "UTC-08:00 (Pacífico - Los Ángeles, Vancouver)" },
          { value: "UTC-07:00", label: "UTC-07:00 (Montaña - Denver, Phoenix)" },
          { value: "UTC-06:00", label: "UTC-06:00 (Central - Chicago, Ciudad de México)" },
          { value: "UTC-05:00", label: "UTC-05:00 (Este - Nueva York, Toronto)" },
          { value: "UTC-04:00", label: "UTC-04:00 (Atlántico - Halifax, Santiago)" },
          { value: "UTC-03:00", label: "UTC-03:00 (Buenos Aires, São Paulo)" },
          { value: "UTC-02:00", label: "UTC-02:00 (Atlántico medio)" },
          { value: "UTC-01:00", label: "UTC-01:00 (Azores, Cabo Verde)" },
          { value: "UTC+00:00", label: "UTC±00:00 (Londres, Lisboa)" },
          { value: "UTC+01:00", label: "UTC+01:00 (París, Madrid, Roma)" },
          { value: "UTC+02:00", label: "UTC+02:00 (Helsinki, Cairo, Jerusalén)" },
          { value: "UTC+03:00", label: "UTC+03:00 (Moscú, Estambul, Riad)" },
          { value: "UTC+04:00", label: "UTC+04:00 (Dubai, Bakú)" },
          { value: "UTC+05:00", label: "UTC+05:00 (Karachi, Islamabad)" },
          { value: "UTC+05:30", label: "UTC+05:30 (India - Nueva Delhi, Mumbai)" },
          { value: "UTC+06:00", label: "UTC+06:00 (Daca, Almaty)" },
          { value: "UTC+07:00", label: "UTC+07:00 (Bangkok, Hanói, Yakarta)" },
          { value: "UTC+08:00", label: "UTC+08:00 (China - Pekín, Hong Kong, Singapur)" },
          { value: "UTC+09:00", label: "UTC+09:00 (Japón - Tokio, Seúl)" },
          { value: "UTC+10:00", label: "UTC+10:00 (Sydney, Melbourne)" },
          { value: "UTC+11:00", label: "UTC+11:00 (Islas Salomón)" },
          { value: "UTC+12:00", label: "UTC+12:00 (Nueva Zelanda - Wellington, Auckland)" },
        ],
        defaultValue: "UTC+01:00",
        condition: { field: "operacion", value: "zonas_horarias" },
      },
      {
        name: "valor_tiempo",
        label: "Valor a convertir",
        type: "number",
        defaultValue: "60",
        placeholder: "Ingresa el valor",
        condition: { field: "operacion", value: "convertir" },
      },
      {
        name: "unidad_origen",
        label: "Unidad de origen",
        type: "select",
        options: [
          { value: "segundos", label: "Segundos" },
          { value: "minutos", label: "Minutos" },
          { value: "horas", label: "Horas" },
          { value: "dias", label: "Días" },
          { value: "semanas", label: "Semanas" },
          { value: "meses", label: "Meses (30 días)" },
          { value: "años", label: "Años (365 días)" },
        ],
        defaultValue: "minutos",
        condition: { field: "operacion", value: "convertir" },
      },
      {
        name: "unidad_destino",
        label: "Convertir a",
        type: "select",
        options: [
          { value: "segundos", label: "Segundos" },
          { value: "minutos", label: "Minutos" },
          { value: "horas", label: "Horas" },
          { value: "dias", label: "Días" },
          { value: "semanas", label: "Semanas" },
          { value: "meses", label: "Meses (30 días)" },
          { value: "años", label: "Años (365 días)" },
        ],
        defaultValue: "horas",
        condition: { field: "operacion", value: "convertir" },
      },
      {
        name: "incluir_am_pm",
        label: "Mostrar en formato AM/PM",
        type: "select",
        options: [
          { value: "si", label: "Sí" },
          { value: "no", label: "No" },
        ],
        defaultValue: "no",
        condition: { field: "operacion", value: ["suma", "resta", "duracion", "zonas_horarias"] },
      },
    ],
    calculate: (inputs) => {
      // Función para convertir HH:MM a minutos
      const tiempoAMinutos = (tiempo: string): number => {
        if (!tiempo) return 0;
        const [horas, minutos] = tiempo.split(':').map(Number);
        return (horas * 60) + minutos;
      };
      
      // Función para convertir minutos a formato HH:MM
      const minutosATiempo = (minutos: number, incluirAmPm: boolean = false): string => {
        // Asegurar que los minutos sean positivos (para restas)
        if (minutos < 0) {
          minutos += 24 * 60; // Ajustar para ciclo de 24 horas
        }
        
        // Normalizar para que no exceda las 24 horas
        minutos = minutos % (24 * 60);
        
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        
        // Formato 24 horas
        const formato24h = `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        
        // Si no se requiere formato AM/PM, retornar formato 24 horas
        if (!incluirAmPm || inputs.incluir_am_pm !== "si") {
          return formato24h;
        }
        
        // Formato AM/PM
        const horasAmPm = horas % 12 === 0 ? 12 : horas % 12;
        const amPm = horas < 12 ? 'AM' : 'PM';
        return `${horasAmPm}:${mins.toString().padStart(2, '0')} ${amPm}`;
      };
      
      // Convertir zonas horarias
      const convertirZonaHoraria = (tiempo: string, zonaOrigen: string, zonaDestino: string): string => {
        if (!tiempo || !zonaOrigen || !zonaDestino) return "";
        
        // Extraer el offset de las zonas horarias (UTC+XX:XX o UTC-XX:XX)
        const offsetOrigen = Number(zonaOrigen.replace("UTC", "").split(":")[0]);
        const offsetDestino = Number(zonaDestino.replace("UTC", "").split(":")[0]);
        
        // Convertir tiempo a minutos
        let [horas, minutos] = tiempo.split(':').map(Number);
        let totalMinutos = (horas * 60) + minutos;
        
        // Calcular la diferencia entre zonas horarias en minutos
        const diferenciaOffset = (offsetDestino - offsetOrigen) * 60;
        
        // Aplicar la diferencia
        totalMinutos += diferenciaOffset;
        
        // Manejar desbordamientos (más de 24h o menos de 0h)
        while (totalMinutos < 0) {
          totalMinutos += 24 * 60;
        }
        totalMinutos = totalMinutos % (24 * 60);
        
        // Convertir de vuelta a formato de tiempo
        const nuevasHoras = Math.floor(totalMinutos / 60);
        const nuevosMinutos = totalMinutos % 60;
        
        return `${nuevasHoras.toString().padStart(2, '0')}:${nuevosMinutos.toString().padStart(2, '0')}`;
      };
      
      // Convertir unidades de tiempo
      const convertirUnidades = (valor: number, unidadOrigen: string, unidadDestino: string): number => {
        // Convertir todo a segundos primero
        let segundos = 0;
        
        switch (unidadOrigen) {
          case "segundos":
            segundos = valor;
            break;
          case "minutos":
            segundos = valor * 60;
            break;
          case "horas":
            segundos = valor * 60 * 60;
            break;
          case "dias":
            segundos = valor * 24 * 60 * 60;
            break;
          case "semanas":
            segundos = valor * 7 * 24 * 60 * 60;
            break;
          case "meses":
            segundos = valor * 30 * 24 * 60 * 60;
            break;
          case "años":
            segundos = valor * 365 * 24 * 60 * 60;
            break;
        }
        
        // Convertir segundos a la unidad de destino
        switch (unidadDestino) {
          case "segundos":
            return segundos;
          case "minutos":
            return segundos / 60;
          case "horas":
            return segundos / (60 * 60);
          case "dias":
            return segundos / (24 * 60 * 60);
          case "semanas":
            return segundos / (7 * 24 * 60 * 60);
          case "meses":
            return segundos / (30 * 24 * 60 * 60);
          case "años":
            return segundos / (365 * 24 * 60 * 60);
        }
        
        return 0;
      };
      
      // Operación: Sumar tiempos
      if (inputs.operacion === "suma") {
        if (!inputs.tiempo_base || !inputs.tiempo_secundario) {
          return "Por favor, ingresa ambos tiempos para realizar la suma.";
        }
        
        const minutosBase = tiempoAMinutos(inputs.tiempo_base);
        const minutosSecundario = tiempoAMinutos(inputs.tiempo_secundario);
        
        const totalMinutos = minutosBase + minutosSecundario;
        const resultado = minutosATiempo(totalMinutos, inputs.incluir_am_pm === "si");
        
        // Mostrar detalles adicionales
        const horasResultado = Math.floor(totalMinutos / 60);
        const minutosResultado = totalMinutos % 60;
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-green-50 rounded-lg">
              <p class="font-semibold">Resultado de la suma:</p>
              <p class="text-xl font-bold">${resultado}</p>
              <p class="text-sm text-gray-600">
                ${inputs.tiempo_base} + ${inputs.tiempo_secundario} = ${resultado}
              </p>
            </div>
            
            <div class="p-3 border rounded-md">
              <p class="font-medium">Detalles:</p>
              <p>Total en horas: ${horasResultado} horas y ${minutosResultado} minutos</p>
              <p>Total en minutos: ${totalMinutos} minutos</p>
              <p>Total en segundos: ${totalMinutos * 60} segundos</p>
            </div>
          </div>
        `;
      } 
      // Operación: Restar tiempos
      else if (inputs.operacion === "resta") {
        if (!inputs.tiempo_base || !inputs.tiempo_secundario) {
          return "Por favor, ingresa ambos tiempos para realizar la resta.";
        }
        
        const minutosBase = tiempoAMinutos(inputs.tiempo_base);
        const minutosSecundario = tiempoAMinutos(inputs.tiempo_secundario);
        
        let diferenciaMinutos = minutosBase - minutosSecundario;
        
        // Si el resultado es negativo, ajustar para ciclo de 24 horas
        if (diferenciaMinutos < 0) {
          diferenciaMinutos += 24 * 60;
        }
        
        const resultado = minutosATiempo(diferenciaMinutos, inputs.incluir_am_pm === "si");
        
        // Mostrar detalles adicionales
        const horasResultado = Math.floor(diferenciaMinutos / 60);
        const minutosResultado = diferenciaMinutos % 60;
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-blue-50 rounded-lg">
              <p class="font-semibold">Resultado de la resta:</p>
              <p class="text-xl font-bold">${resultado}</p>
              <p class="text-sm text-gray-600">
                ${inputs.tiempo_base} - ${inputs.tiempo_secundario} = ${resultado}
              </p>
              <p class="text-xs text-gray-500">(Ciclo de 24 horas)</p>
            </div>
            
            <div class="p-3 border rounded-md">
              <p class="font-medium">Detalles:</p>
              <p>Diferencia: ${horasResultado} horas y ${minutosResultado} minutos</p>
              <p>Total en minutos: ${diferenciaMinutos} minutos</p>
              <p>Total en segundos: ${diferenciaMinutos * 60} segundos</p>
            </div>
          </div>
        `;
      } 
      // Operación: Calcular duración
      else if (inputs.operacion === "duracion") {
        if (!inputs.tiempo_base || !inputs.tiempo_secundario) {
          return "Por favor, ingresa ambos tiempos para calcular la duración.";
        }
        
        const minutosBase = tiempoAMinutos(inputs.tiempo_base);
        const minutosSecundario = tiempoAMinutos(inputs.tiempo_secundario);
        
        // Calcular diferencia absoluta
        let diferenciaMinutos = Math.abs(minutosBase - minutosSecundario);
        
        // Si la diferencia es mayor a 12 horas, tomar la ruta más corta en el ciclo de 24h
        if (diferenciaMinutos > 12 * 60) {
          diferenciaMinutos = 24 * 60 - diferenciaMinutos;
        }
        
        const resultado = minutosATiempo(diferenciaMinutos, false);
        
        // Determinar si el segundo tiempo es posterior o anterior al primero
        const esPosterior = minutosSecundario > minutosBase;
        
        // Mostrar detalles adicionales
        const horasResultado = Math.floor(diferenciaMinutos / 60);
        const minutosResultado = diferenciaMinutos % 60;
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-purple-50 rounded-lg">
              <p class="font-semibold">Duración entre tiempos:</p>
              <p class="text-xl font-bold">${resultado}</p>
              <p class="text-sm text-gray-600">
                Entre ${inputs.tiempo_base} y ${inputs.tiempo_secundario}
              </p>
              <p class="text-xs text-gray-500">
                (${esPosterior ? 
                  `${inputs.tiempo_secundario} es posterior a ${inputs.tiempo_base}` : 
                  `${inputs.tiempo_secundario} es anterior a ${inputs.tiempo_base}`})
              </p>
            </div>
            
            <div class="p-3 border rounded-md">
              <p class="font-medium">Detalles:</p>
              <p>Duración exacta: ${horasResultado} horas y ${minutosResultado} minutos</p>
              <p>Total en minutos: ${diferenciaMinutos} minutos</p>
              <p>Total en segundos: ${diferenciaMinutos * 60} segundos</p>
            </div>
          </div>
        `;
      } 
      // Operación: Convertir entre zonas horarias
      else if (inputs.operacion === "zonas_horarias") {
        if (!inputs.tiempo_base) {
          return "Por favor, ingresa el tiempo que deseas convertir.";
        }
        
        const tiempoConvertido = convertirZonaHoraria(
          inputs.tiempo_base,
          inputs.zona_origen,
          inputs.zona_destino
        );
        
        // Formatear en AM/PM si se solicita
        const tiempoFormateado = inputs.incluir_am_pm === "si" ? 
          minutosATiempo(tiempoAMinutos(tiempoConvertido), true) : 
          tiempoConvertido;
        
        // Obtener diferencia horaria
        const offsetOrigen = Number(inputs.zona_origen.replace("UTC", "").split(":")[0]);
        const offsetDestino = Number(inputs.zona_destino.replace("UTC", "").split(":")[0]);
        const diferenciaHoras = offsetDestino - offsetOrigen;
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-yellow-50 rounded-lg">
              <p class="font-semibold">Conversión de zona horaria:</p>
              <p class="text-xl font-bold">${tiempoFormateado}</p>
              <p class="text-sm text-gray-600">
                Cuando son las ${inputs.tiempo_base} en ${inputs.zona_origen}
                son las ${tiempoFormateado} en ${inputs.zona_destino}
              </p>
            </div>
            
            <div class="p-3 border rounded-md">
              <p class="font-medium">Detalles:</p>
              <p>Diferencia horaria: ${diferenciaHoras > 0 ? '+' : ''}${diferenciaHoras} horas</p>
              <p class="text-sm text-gray-600">
                ${Math.abs(diferenciaHoras) === 1 ? 
                  `${inputs.zona_destino} está 1 hora ${diferenciaHoras > 0 ? 'adelante' : 'atrás'} respecto a ${inputs.zona_origen}` :
                  `${inputs.zona_destino} está ${Math.abs(diferenciaHoras)} horas ${diferenciaHoras > 0 ? 'adelante' : 'atrás'} respecto a ${inputs.zona_origen}`
                }
              </p>
            </div>
          </div>
        `;
      } 
      // Operación: Convertir unidades de tiempo
      else if (inputs.operacion === "convertir") {
        const valor = Number(inputs.valor_tiempo);
        
        if (isNaN(valor) || valor < 0) {
          return "Por favor, ingresa un valor válido mayor o igual a cero.";
        }
        
        const resultado = convertirUnidades(
          valor,
          inputs.unidad_origen,
          inputs.unidad_destino
        );
        
        // Formatear el número con decimales adecuados
        const resultadoFormateado = 
          resultado >= 1000 ? resultado.toLocaleString(undefined, { maximumFractionDigits: 2 }) :
          resultado >= 10 ? resultado.toLocaleString(undefined, { maximumFractionDigits: 4 }) :
          resultado.toLocaleString(undefined, { maximumFractionDigits: 6 });
        
        // Preparar mensaje explicativo
        let explicacion = "";
        if (inputs.unidad_origen === "minutos" && inputs.unidad_destino === "horas") {
          explicacion = `${valor} minutos ÷ 60 = ${resultadoFormateado} horas`;
        } else if (inputs.unidad_origen === "horas" && inputs.unidad_destino === "minutos") {
          explicacion = `${valor} horas × 60 = ${resultadoFormateado} minutos`;
        } else {
          explicacion = `${valor} ${inputs.unidad_origen} = ${resultadoFormateado} ${inputs.unidad_destino}`;
        }
        
        return `
          <div class="space-y-4">
            <div class="p-4 bg-indigo-50 rounded-lg">
              <p class="font-semibold">Conversión de unidades:</p>
              <p class="text-xl font-bold">${resultadoFormateado} ${inputs.unidad_destino}</p>
              <p class="text-sm text-gray-600">${explicacion}</p>
            </div>
            
            <div class="p-3 border rounded-md">
              <p class="font-medium">Tabla de equivalencias para ${valor} ${inputs.unidad_origen}:</p>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                <li>Segundos: ${convertirUnidades(valor, inputs.unidad_origen, "segundos").toLocaleString()}</li>
                <li>Minutos: ${convertirUnidades(valor, inputs.unidad_origen, "minutos").toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                <li>Horas: ${convertirUnidades(valor, inputs.unidad_origen, "horas").toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                <li>Días: ${convertirUnidades(valor, inputs.unidad_origen, "dias").toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                <li>Semanas: ${convertirUnidades(valor, inputs.unidad_origen, "semanas").toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                <li>Meses (30 días): ${convertirUnidades(valor, inputs.unidad_origen, "meses").toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
                <li>Años (365 días): ${convertirUnidades(valor, inputs.unidad_origen, "años").toLocaleString(undefined, { maximumFractionDigits: 2 })}</li>
              </ul>
            </div>
          </div>
        `;
      }
      
      return "Por favor, selecciona una operación y completa los campos requeridos.";
    },
  },
  // Salud
  "calculadora-imc": {
    category: "salud",
    title: "Calculadora de IMC",
    description: "Calcula tu índice de masa corporal (IMC)",
    component() {
      return import("@/components/calculators/health/BMICalculator").then(
        (mod) => mod.default
      );
    },
    icon: Heart,
  },
  "calculadora-calorias": {
    category: "salud",
    title: "Calculadora de Calorías y Dieta",
    description: "Calcula tus necesidades calóricas diarias",
    component() {
      return import("@/components/calculators/health/CalorieCalculator").then(
        (mod) => mod.default
      );
    },
    icon: Salad,
  },
  "calculadora-metabolismo": {
    category: "salud",
    title: "Calculadora de Metabolismo Basal",
    description: "Calcula tu tasa metabólica basal (TMB)",
    component() {
      return import("@/components/calculators/health/BMRCalculator").then(
        (mod) => mod.default
      );
    },
    icon: Activity,
  },
  "calculadora-frecuencia-cardiaca": {
    category: "salud",
    title: "Calculadora de Frecuencia Cardíaca Máxima",
    description: "Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento",
    component() {
      return import("@/components/calculators/health/HeartRateCalculator").then(
        (mod) => mod.default
      );
    },
    icon: Heart,
  },
  "calculadora-grasa-corporal": {
    category: "salud",
    title: "Calculadora de Grasa Corporal",
    description: "Estima tu porcentaje de grasa corporal basado en medidas antropométricas",
    component() {
      return import("@/components/calculators/health/BodyFatCalculator").then(
        (mod) => mod.default
      );
    },
    icon: Scale,
  },
  "calculadora-fecha-parto": {
    category: "salud",
    title: "Calculadora de Fecha Probable de Parto",
    description: "Calcula la fecha estimada de parto basada en tu última menstruación",
    component() {
      return import("@/components/calculators/health/DueDateCalculator").then(
        (mod) => mod.default
      );
    },
    icon: Baby,
  },
  // Ingeniería
  "resistencia-materiales": {
    category: "ingenieria",
    title: "Calculadora de Resistencia de Materiales",
    description: "Calcula tensiones, deformaciones y factores de seguridad para diferentes materiales bajo cargas axiales",
    inputs: [
      {
        name: "material",
        label: "Material",
        type: "select",
        options: [
          { value: "acero", label: "Acero estructural" },
          { value: "acero_inox", label: "Acero inoxidable" },
          { value: "aluminio", label: "Aluminio" },
          { value: "cobre", label: "Cobre" },
          { value: "titanio", label: "Titanio" },
          { value: "concreto", label: "Concreto/Hormigón" },
          { value: "madera", label: "Madera (pino)" },
          { value: "madera_dura", label: "Madera dura (roble)" },
          { value: "fibra_carbono", label: "Fibra de carbono" },
          { value: "plastico_pvc", label: "Plástico (PVC)" },
          { value: "otro", label: "Otro material (genérico)" }
        ],
        defaultValue: "acero",
      },
      {
        name: "longitud_inicial",
        label: "Longitud inicial (mm)",
        type: "number",
        defaultValue: "1000",
        placeholder: "Ingresa la longitud en mm"
      },
      {
        name: "fuerza",
        label: "Fuerza aplicada (N)",
        type: "number",
        defaultValue: "1000",
        placeholder: "Ingresa la fuerza en Newtons"
      },
      {
        name: "area",
        label: "Área de sección transversal (mm²)",
        type: "number",
        defaultValue: "100",
        placeholder: "Ingresa el área en mm²"
      }
    ],
    calculate: (inputs) => {
      const fuerza = Number(inputs.fuerza);
      const area = Number(inputs.area);
      const material = inputs.material;
      const longitud = Number(inputs.longitud_inicial);
      
      if (isNaN(fuerza) || isNaN(area) || area <= 0 || isNaN(longitud) || longitud <= 0) {
        return "Por favor, ingresa valores válidos. El área y la longitud no pueden ser cero o negativas.";
      }
      
      // Propiedades de los materiales
      const propiedades = {
        acero: { modulo: 210, limite: 250, color: "blue" },      // GPa, MPa
        acero_inox: { modulo: 200, limite: 300, color: "gray" }, // GPa, MPa
        aluminio: { modulo: 70, limite: 95, color: "gray" },     // GPa, MPa
        cobre: { modulo: 110, limite: 200, color: "amber" },     // GPa, MPa
        titanio: { modulo: 110, limite: 900, color: "blue" },    // GPa, MPa
        concreto: { modulo: 30, limite: 25, color: "teal" },     // GPa, MPa
        madera: { modulo: 12, limite: 40, color: "amber" },      // GPa, MPa
        madera_dura: { modulo: 15, limite: 60, color: "brown" }, // GPa, MPa
        fibra_carbono: { modulo: 350, limite: 4000, color: "purple" }, // GPa, MPa
        plastico_pvc: { modulo: 3, limite: 50, color: "pink" }, // GPa, MPa
        otro: { modulo: 100, limite: 100, color: "purple" }      // GPa, MPa (valores genéricos)
      };
      
      const tension = fuerza / area; // Resultado en N/mm² = MPa
      const factorSeguridad = propiedades[material].limite / tension;
      const deformacionUnitaria = tension / propiedades[material].modulo / 1000; // convertir de MPa a GPa
      
      // Determinar el estado de seguridad
      let estadoSeguridad = "";
      let colorEstado = "";
      
      if (factorSeguridad >= 3) {
        estadoSeguridad = "Seguro - Factor de seguridad alto";
        colorEstado = "text-green-600";
      } else if (factorSeguridad >= 1.5) {
        estadoSeguridad = "Aceptable - Factor de seguridad moderado";
        colorEstado = "text-yellow-600";
      } else if (factorSeguridad >= 1) {
        estadoSeguridad = "Crítico - Factor de seguridad bajo";
        colorEstado = "text-orange-600";
      } else {
        estadoSeguridad = "Peligro - Tensión por encima del límite recomendado";
        colorEstado = "text-red-600";
      }
      
      return `
        <div class="space-y-4">
          <div class="p-4 bg-${propiedades[material].color}-50 rounded-lg">
            <p class="font-semibold">Resultados del análisis:</p>
            <p class="text-xl font-bold">${tension.toFixed(2)} MPa (N/mm²)</p>
            <p class="text-sm text-gray-600">Tensión = Fuerza / Área</p>
            <p class="text-sm text-gray-600">${fuerza} N / ${area} mm² = ${tension.toFixed(2)} MPa</p>
            
            <div class="mt-2 pt-2 border-t border-${propiedades[material].color}-100">
              <p class="font-medium">Deformación unitaria estimada:</p>
              <p class="text-md">${(deformacionUnitaria).toExponential(4)}</p>
            </div>
          </div>
          
          <div class="p-3 border rounded-md">
            <p class="font-medium">Estado de seguridad:</p>
            <p class="font-semibold ${colorEstado}">${estadoSeguridad}</p>
            <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
              <div class="h-2.5 rounded-full ${colorEstado === 'text-green-600' ? 'bg-green-600' : colorEstado === 'text-yellow-600' ? 'bg-yellow-500' : colorEstado === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-600'}" 
                   style="width: ${Math.min(factorSeguridad * 25, 100)}%"></div>
            </div>
            <p class="mt-2">Factor de seguridad: <span class="font-medium">${factorSeguridad.toFixed(2)}</span></p>
            <p class="text-sm text-gray-600 mt-1">
              Se recomienda un factor de seguridad mínimo de 1.5 para aplicaciones estructurales estándar y de 3-4 para aplicaciones críticas.
            </p>
          </div>
          
          <div class="p-3 border rounded-md">
            <p class="font-medium">Propiedades del material seleccionado: ${material.replace('_', ' ').charAt(0).toUpperCase() + material.replace('_', ' ').slice(1)}</p>
            <ul class="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Módulo de elasticidad (E): <span class="font-medium">${propiedades[material].modulo} GPa</span></li>
              <li>Límite de fluencia aproximado: <span class="font-medium">${propiedades[material].limite} MPa</span></li>
              ${material === 'acero' ? '<li>Composición principal: Hierro con 0.2-2.1% de carbono</li>' : ''}
              ${material === 'acero_inox' ? '<li>Composición principal: Aleación de hierro con min. 10.5% de cromo</li>' : ''}
              ${material === 'aluminio' ? '<li>Densidad: Aproximadamente 2.7 g/cm³ (liviano)</li>' : ''}
              ${material === 'titanio' ? '<li>Excelente resistencia a la corrosión y alta resistencia específica</li>' : ''}
              ${material === 'fibra_carbono' ? '<li>Alta resistencia específica y extremadamente ligero</li>' : ''}
            </ul>
            
            <div class="mt-3 text-sm text-gray-700">
              <p class="font-medium text-indigo-700">Información técnica:</p>
              <p class="mt-1">La tensión (σ) es una medida de la fuerza interna por unidad de área. La deformación unitaria (ε) representa el cambio en longitud por unidad de longitud original.</p>
              <p class="mt-1">Unidades comunes de tensión: MPa (N/mm²), Pa, kPa, GPa</p>
              <p class="text-xs text-gray-500 mt-1">1 MPa = 1 N/mm² = 10⁶ Pa = 1000 kPa = 0.001 GPa</p>
              
              <div class="mt-2 p-2 bg-blue-50 rounded-md">
                <p class="font-medium">Referencias normativas:</p>
                <p>Este cálculo proporciona una aproximación según principios básicos de resistencia de materiales. Para diseños estructurales reales, consultar normas como AISC, Eurocódigos o ASTM según su jurisdicción.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },
  "ley-ohm": {
    category: "ingenieria",
    title: "Calculadora de Ley de Ohm",
    description: "Calcula voltaje, corriente, resistencia y potencia según la Ley de Ohm para diseño y análisis de circuitos eléctricos",
    inputs: [
      {
        name: "calcular",
        label: "¿Qué quieres calcular?",
        type: "select",
        options: [
          { value: "voltaje", label: "Voltaje (V)" },
          { value: "corriente", label: "Corriente (I)" },
          { value: "resistencia", label: "Resistencia (R)" },
          { value: "potencia", label: "Potencia (P)" },
        ],
        defaultValue: "voltaje",
      },
      {
        name: "corriente",
        label: "Corriente (A)",
        type: "number",
        defaultValue: "1",
        placeholder: "Ingresa la corriente en amperios",
        condition: { field: "calcular", value: "voltaje" },
      },
      {
        name: "resistencia",
        label: "Resistencia (Ω)",
        type: "number",
        defaultValue: "10",
        placeholder: "Ingresa la resistencia en ohmios",
        condition: { field: "calcular", value: "voltaje" },
      },
      {
        name: "voltaje",
        label: "Voltaje (V)",
        type: "number",
        defaultValue: "12",
        placeholder: "Ingresa el voltaje en voltios",
        condition: { field: "calcular", value: "corriente" },
      },
      {
        name: "resistencia2",
        label: "Resistencia (Ω)",
        type: "number",
        defaultValue: "10",
        placeholder: "Ingresa la resistencia en ohmios",
        condition: { field: "calcular", value: "corriente" },
      },
      {
        name: "voltaje2",
        label: "Voltaje (V)",
        type: "number",
        defaultValue: "12",
        placeholder: "Ingresa el voltaje en voltios",
        condition: { field: "calcular", value: "resistencia" },
      },
      {
        name: "corriente2",
        label: "Corriente (A)",
        type: "number",
        defaultValue: "1",
        placeholder: "Ingresa la corriente en amperios",
        condition: { field: "calcular", value: "resistencia" },
      },
      {
        name: "voltaje3",
        label: "Voltaje (V)",
        type: "number",
        defaultValue: "12",
        placeholder: "Ingresa el voltaje en voltios",
        condition: { field: "calcular", value: "potencia" },
      },
      {
        name: "corriente3",
        label: "Corriente (A)",
        type: "number",
        defaultValue: "1",
        placeholder: "Ingresa la corriente en amperios",
        condition: { field: "calcular", value: "potencia" },
      }
    ],
    calculate: (inputs) => {
      let resultado = 0;
      let formula = "";
      let unidad = "";
      let potencia = 0;
      let formulaPotencia = "";
      
      // Cálculo del voltaje: V = I × R
      if (inputs.calcular === "voltaje") {
        const corriente = Number(inputs.corriente);
        const resistencia = Number(inputs.resistencia);
        
        if (isNaN(corriente) || isNaN(resistencia)) {
          return "Por favor, ingresa valores numéricos válidos.";
        }
        
        resultado = corriente * resistencia;
        formula = `V = I × R = ${corriente} A × ${resistencia} Ω`;
        unidad = "V";
        potencia = resultado * corriente;
        formulaPotencia = `P = V × I = ${resultado.toFixed(2)} V × ${corriente} A = ${potencia.toFixed(2)} W`;
      }
      
      // Cálculo de la corriente: I = V / R
      else if (inputs.calcular === "corriente") {
        const voltaje = Number(inputs.voltaje);
        const resistencia = Number(inputs.resistencia2);
        
        if (isNaN(voltaje) || isNaN(resistencia) || resistencia === 0) {
          return "Por favor, ingresa valores numéricos válidos. La resistencia no puede ser cero.";
        }
        
        resultado = voltaje / resistencia;
        formula = `I = V / R = ${voltaje} V / ${resistencia} Ω`;
        unidad = "A";
        potencia = voltaje * resultado;
        formulaPotencia = `P = V × I = ${voltaje} V × ${resultado.toFixed(2)} A = ${potencia.toFixed(2)} W`;
      }
      
      // Cálculo de la resistencia: R = V / I
      else if (inputs.calcular === "resistencia") {
        const voltaje = Number(inputs.voltaje2);
        const corriente = Number(inputs.corriente2);
        
        if (isNaN(voltaje) || isNaN(corriente) || corriente === 0) {
          return "Por favor, ingresa valores numéricos válidos. La corriente no puede ser cero.";
        }
        
        resultado = voltaje / corriente;
        formula = `R = V / I = ${voltaje} V / ${corriente} A`;
        unidad = "Ω";
        potencia = voltaje * corriente;
        formulaPotencia = `P = V × I = ${voltaje} V × ${corriente} A = ${potencia.toFixed(2)} W`;
      }
      
      // Cálculo de la potencia: P = V × I
      else if (inputs.calcular === "potencia") {
        const voltaje = Number(inputs.voltaje3);
        const corriente = Number(inputs.corriente3);
        
        if (isNaN(voltaje) || isNaN(corriente)) {
          return "Por favor, ingresa valores numéricos válidos.";
        }
        
        resultado = voltaje * corriente;
        formula = `P = V × I = ${voltaje} V × ${corriente} A`;
        unidad = "W";
        
        // Cálculo de resistencia equivalente
        const resistencia = voltaje / corriente;
        formulaPotencia = `También puede calcularse como: P = I² × R = ${corriente}² A × ${resistencia.toFixed(2)} Ω = ${resultado.toFixed(2)} W`;
      }
      
      return `
        <div class="space-y-4">
          <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm">
            <p class="font-semibold text-gray-800">Resultado:</p>
            <p class="text-xl font-bold">${resultado.toFixed(2)} ${unidad}</p>
            <p class="text-sm text-gray-600">
              ${formula} = ${resultado.toFixed(2)} ${unidad}
            </p>
            ${inputs.calcular !== "potencia" ? 
              `<div class="mt-2 pt-2 border-t border-green-100">
                <p class="font-medium">Potencia en el circuito:</p>
                <p class="text-md">${potencia.toFixed(2)} W</p>
                <p class="text-sm text-gray-600">${formulaPotencia}</p>
              </div>` : 
              `<div class="mt-2 pt-2 border-t border-green-100">
                <p class="text-sm text-gray-600">${formulaPotencia}</p>
              </div>`}
          </div>
          
          <div class="p-3 border rounded-md">
            <p class="font-medium">Ley de Ohm y potencia eléctrica:</p>
            <p>La Ley de Ohm establece que la corriente que circula por un conductor es directamente proporcional a la tensión e inversamente proporcional a la resistencia.</p>
            <p class="mt-2 font-semibold">Fórmulas principales:</p>
            <ul class="list-disc list-inside text-sm">
              <li>V = I × R (Voltaje = Corriente × Resistencia)</li>
              <li>I = V / R (Corriente = Voltaje / Resistencia)</li>
              <li>R = V / I (Resistencia = Voltaje / Corriente)</li>
              <li>P = V × I (Potencia = Voltaje × Corriente)</li>
              <li>P = I² × R (Potencia = Corriente² × Resistencia)</li>
              <li>P = V² / R (Potencia = Voltaje² / Resistencia)</li>
            </ul>
            
            <div class="mt-2 text-sm text-gray-600">
              <p class="font-medium">Información adicional:</p>
              <p>Unidades estándar:</p>
              <ul class="list-disc list-inside">
                <li>Voltaje (V): Voltio [V]</li>
                <li>Corriente (I): Amperio [A]</li>
                <li>Resistencia (R): Ohmio [Ω]</li>
                <li>Potencia (P): Vatio [W]</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  },
  "conversion-energia": {
    category: "ingenieria",
    title: "Calculadora de Conversión de Unidades de Energía",
    description: "Convierte entre diferentes unidades de energía con aplicaciones en ingeniería, física y sistemas energéticos",
    inputs: [
      {
        name: "valor",
        label: "Valor de energía",
        type: "number",
        defaultValue: "100",
        placeholder: "Ingresa el valor a convertir"
      },
      {
        name: "unidad_origen",
        label: "Unidad de origen",
        type: "select",
        options: [
          { value: "joule", label: "Joule (J)" },
          { value: "kilojulio", label: "Kilojulio (kJ)" },
          { value: "megajulio", label: "Megajulio (MJ)" },
          { value: "gigajulio", label: "Gigajulio (GJ)" },
          { value: "caloria", label: "Caloría (cal)" },
          { value: "kilocal", label: "Kilocaloría (kcal)" },
          { value: "watt_hora", label: "Vatio-hora (Wh)" },
          { value: "kilowatt_hora", label: "Kilovatio-hora (kWh)" },
          { value: "megawatt_hora", label: "Megavatio-hora (MWh)" },
          { value: "electron_voltio", label: "Electronvoltio (eV)" },
          { value: "btu", label: "Unidad Térmica Británica (BTU)" },
          { value: "therm", label: "Therm (thm)" },
          { value: "tep", label: "Tonelada equivalente de petróleo (TEP)" },
          { value: "pie_libra", label: "Pie-libra (ft·lb)" },
        ],
        defaultValue: "joule",
      },
      {
        name: "unidad_destino",
        label: "Unidad de destino",
        type: "select",
        options: [
          { value: "joule", label: "Joule (J)" },
          { value: "kilojulio", label: "Kilojulio (kJ)" },
          { value: "megajulio", label: "Megajulio (MJ)" },
          { value: "gigajulio", label: "Gigajulio (GJ)" },
          { value: "caloria", label: "Caloría (cal)" },
          { value: "kilocal", label: "Kilocaloría (kcal)" },
          { value: "watt_hora", label: "Vatio-hora (Wh)" },
          { value: "kilowatt_hora", label: "Kilovatio-hora (kWh)" },
          { value: "megawatt_hora", label: "Megavatio-hora (MWh)" },
          { value: "electron_voltio", label: "Electronvoltio (eV)" },
          { value: "btu", label: "Unidad Térmica Británica (BTU)" },
          { value: "therm", label: "Therm (thm)" },
          { value: "tep", label: "Tonelada equivalente de petróleo (TEP)" },
          { value: "pie_libra", label: "Pie-libra (ft·lb)" },
        ],
        defaultValue: "kilojulio",
      }
    ],
    calculate: (inputs) => {
      const valor = Number(inputs.valor);
      
      if (isNaN(valor)) {
        return "Por favor, ingresa un valor numérico válido.";
      }
      
      // Factores de conversión a Joules (unidad base)
      const factoresAJoules = {
        joule: 1,
        kilojulio: 1000,
        megajulio: 1000000,
        gigajulio: 1000000000,
        caloria: 4.184,
        kilocal: 4184,
        watt_hora: 3600,
        kilowatt_hora: 3600000,
        megawatt_hora: 3600000000,
        electron_voltio: 1.602176634e-19,
        btu: 1055.06,
        therm: 105506000,
        tep: 41868000000,
        pie_libra: 1.3558179483314,
      };
      
      // Convertir a Joules primero
      const valorEnJoules = valor * factoresAJoules[inputs.unidad_origen];
      
      // Convertir de Joules a la unidad de destino
      const resultado = valorEnJoules / factoresAJoules[inputs.unidad_destino];
      
      // Obtener nombres completos de las unidades
      const nombresUnidades = {
        joule: "Joule (J)",
        kilojulio: "Kilojulio (kJ)",
        megajulio: "Megajulio (MJ)",
        gigajulio: "Gigajulio (GJ)",
        caloria: "Caloría (cal)",
        kilocal: "Kilocaloría (kcal)",
        watt_hora: "Vatio-hora (Wh)",
        kilowatt_hora: "Kilovatio-hora (kWh)",
        megawatt_hora: "Megavatio-hora (MWh)",
        electron_voltio: "Electronvoltio (eV)",
        btu: "Unidad Térmica Británica (BTU)",
        therm: "Therm (thm)",
        tep: "Tonelada equivalente de petróleo (TEP)",
        pie_libra: "Pie-libra (ft·lb)",
      };
      
      // Formatear el resultado según su magnitud
      let resultadoFormateado = "";
      if (Math.abs(resultado) >= 1e9) {
        resultadoFormateado = (resultado / 1e9).toFixed(6) + " × 10⁹";
      } else if (Math.abs(resultado) >= 1e6) {
        resultadoFormateado = (resultado / 1e6).toFixed(6) + " × 10⁶";
      } else if (Math.abs(resultado) >= 1e3) {
        resultadoFormateado = (resultado / 1e3).toFixed(6) + " × 10³";
      } else if (Math.abs(resultado) >= 1) {
        resultadoFormateado = resultado.toFixed(6);
      } else if (Math.abs(resultado) >= 1e-3) {
        resultadoFormateado = (resultado * 1e3).toFixed(6) + " × 10⁻³";
      } else if (Math.abs(resultado) >= 1e-6) {
        resultadoFormateado = (resultado * 1e6).toFixed(6) + " × 10⁻⁶";
      } else if (Math.abs(resultado) >= 1e-9) {
        resultadoFormateado = (resultado * 1e9).toFixed(6) + " × 10⁻⁹";
      } else if (Math.abs(resultado) >= 1e-12) {
        resultadoFormateado = (resultado * 1e12).toFixed(6) + " × 10⁻¹²";
      } else {
        resultadoFormateado = resultado.toExponential(6);
      }
      
      return `
        <div class="space-y-4">
          <div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow">
            <p class="font-semibold">Resultado de la conversión:</p>
            <p class="text-xl font-bold">${resultadoFormateado} ${nombresUnidades[inputs.unidad_destino]}</p>
            <p class="text-sm text-gray-600">
              ${valor} ${nombresUnidades[inputs.unidad_origen]} = ${resultadoFormateado} ${nombresUnidades[inputs.unidad_destino]}
            </p>
          </div>
          
          <div class="p-4 border rounded-md bg-white shadow-sm">
            <p class="font-medium text-indigo-700">Contexto técnico:</p>
            
            <div class="mt-2">
              <p class="text-sm">La unidad estándar del Sistema Internacional (SI) para la energía es el <span class="font-medium">joule (J)</span>.</p>
              
              <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3 bg-blue-50 rounded-md">
                  <p class="font-medium text-blue-800">Aplicaciones comunes:</p>
                  <ul class="list-disc list-inside text-sm mt-1 space-y-1 text-gray-700">
                    <li><span class="font-medium">J, kJ, MJ, GJ:</span> Ingeniería mecánica y física</li>
                    <li><span class="font-medium">cal, kcal:</span> Nutrición y procesos térmicos</li>
                    <li><span class="font-medium">Wh, kWh, MWh:</span> Generación y consumo eléctrico</li>
                    <li><span class="font-medium">BTU, therm:</span> Calefacción y climatización</li>
                    <li><span class="font-medium">eV:</span> Física atómica y nuclear</li>
                    <li><span class="font-medium">TEP:</span> Análisis energético a gran escala</li>
                  </ul>
                </div>
                
                <div class="p-3 bg-indigo-50 rounded-md">
                  <p class="font-medium text-indigo-800">Equivalencias principales:</p>
                  <ul class="grid grid-cols-1 gap-1 mt-1 text-sm">
                    <li>1 kJ = 1000 J</li>
                    <li>1 MJ = 1000 kJ</li>
                    <li>1 GJ = 1000 MJ</li>
                    <li>1 kcal = 4.184 kJ</li>
                    <li>1 kWh = 3.6 MJ</li>
                    <li>1 MWh = 3.6 GJ</li>
                    <li>1 BTU = 1.055 kJ</li>
                    <li>1 therm = 105.5 MJ</li>
                    <li>1 TEP = 41.87 GJ</li>
                  </ul>
                </div>
              </div>
              
              <div class="mt-3 text-sm text-gray-700">
                <p class="font-medium">Definición fundamental:</p>
                <p>Un joule es la energía necesaria para ejercer una fuerza de un newton a lo largo de un metro. En términos eléctricos, es el trabajo realizado por un vatio de potencia durante un segundo.</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },
  "caida-tension": {
    category: "ingenieria",
    title: "Calculadora de Caída de Tensión",
    description: "Calcula la caída de tensión en instalaciones eléctricas según normativas técnicas y evalúa su conformidad",
    inputs: [
      {
        name: "tipo_circuito",
        label: "Tipo de circuito",
        type: "select",
        options: [
          { value: "monofasico", label: "Monofásico" },
          { value: "trifasico", label: "Trifásico" },
        ],
        defaultValue: "monofasico",
      },
      {
        name: "longitud",
        label: "Longitud del cable (m)",
        type: "number",
        defaultValue: "100",
        placeholder: "Ingresa la longitud del cable en metros"
      },
      {
        name: "corriente",
        label: "Corriente (A)",
        type: "number",
        defaultValue: "10",
        placeholder: "Ingresa la corriente en amperios"
      },
      {
        name: "seccion",
        label: "Sección del conductor (mm²)",
        type: "select",
        options: [
          { value: "1.5", label: "1.5 mm²" },
          { value: "2.5", label: "2.5 mm²" },
          { value: "4", label: "4 mm²" },
          { value: "6", label: "6 mm²" },
          { value: "10", label: "10 mm²" },
          { value: "16", label: "16 mm²" },
          { value: "25", label: "25 mm²" },
          { value: "35", label: "35 mm²" },
          { value: "50", label: "50 mm²" },
          { value: "70", label: "70 mm²" },
          { value: "95", label: "95 mm²" },
          { value: "120", label: "120 mm²" },
          { value: "150", label: "150 mm²" },
          { value: "185", label: "185 mm²" },
          { value: "240", label: "240 mm²" },
        ],
        defaultValue: "2.5",
      },
      {
        name: "material",
        label: "Material del conductor",
        type: "select",
        options: [
          { value: "cobre", label: "Cobre (Cu)" },
          { value: "aluminio", label: "Aluminio (Al)" },
        ],
        defaultValue: "cobre",
      },
      {
        name: "tension_nominal",
        label: "Tensión nominal (V)",
        type: "select",
        options: [
          { value: "230", label: "230V (Monofásico)" },
          { value: "400", label: "400V (Trifásico)" },
          { value: "120", label: "120V (EEUU/Canadá)" },
          { value: "208", label: "208V (EEUU/Canadá - Trifásico)" },
          { value: "240", label: "240V (EEUU/Canadá)" },
          { value: "480", label: "480V (EEUU/Canadá - Industrial)" },
        ],
        defaultValue: "230",
      },
      {
        name: "factor_potencia",
        label: "Factor de potencia",
        type: "number",
        defaultValue: "0.9",
        placeholder: "Rango típico: 0.8 - 1.0"
      },
      {
        name: "tipo_instalacion",
        label: "Tipo de instalación",
        type: "select",
        options: [
          { value: "vivienda", label: "Vivienda" },
          { value: "comercial", label: "Comercial/Oficinas" },
          { value: "industrial", label: "Industrial" },
        ],
        defaultValue: "vivienda",
      }
    ],
    calculate: (inputs) => {
      // Valores de resistividad a 20°C
      const resistividad = {
        cobre: 0.01786,      // Ω·mm²/m
        aluminio: 0.02941,   // Ω·mm²/m
      };
      
      // Factor de ajuste de temperatura (40°C)
      const factorTemperatura = 1.08;
      
      // Conversión de inputs a números
      const longitud = Number(inputs.longitud);
      const corriente = Number(inputs.corriente);
      const seccion = Number(inputs.seccion);
      const tensionNominal = Number(inputs.tension_nominal);
      const factorPotencia = Number(inputs.factor_potencia);
      const material = inputs.material;
      const tipoCircuito = inputs.tipo_circuito;
      const tipoInstalacion = inputs.tipo_instalacion;
      
      // Validación de inputs
      if (isNaN(longitud) || isNaN(corriente) || isNaN(seccion) || isNaN(tensionNominal) || isNaN(factorPotencia) || 
          longitud <= 0 || corriente <= 0 || seccion <= 0 || tensionNominal <= 0 || factorPotencia <= 0 || factorPotencia > 1) {
        return "Por favor, ingresa valores numéricos válidos. El factor de potencia debe estar entre 0 y 1.";
      }
      
      // Factor para cálculo según tipo de circuito
      const factorCircuito = tipoCircuito === "monofasico" ? 2 : Math.sqrt(3);
      
      // Cálculo de la resistencia del conductor ajustada por temperatura
      const resistencia = resistividad[material] * factorTemperatura * longitud / seccion;
      
      // Cálculo de la caída de tensión
      const caidaTension = tipoCircuito === "monofasico" 
        ? 2 * corriente * resistencia * factorPotencia 
        : Math.sqrt(3) * corriente * resistencia * factorPotencia;
      
      // Cálculo de la caída de tensión porcentual
      const caidaTensionPorcentual = (caidaTension / tensionNominal) * 100;
      
      // Límites de caída de tensión según tipo de instalación
      const limites = {
        vivienda: {
          alumbrado: 3,
          fuerza: 5
        },
        comercial: {
          alumbrado: 3,
          fuerza: 5
        },
        industrial: {
          alumbrado: 4.5,
          fuerza: 6.5
        }
      };
      
      // Límites para este tipo de instalación
      const limiteAlumbrado = limites[tipoInstalacion].alumbrado;
      const limiteFuerza = limites[tipoInstalacion].fuerza;
      
      // Evaluación de conformidad
      const conformidadAlumbrado = caidaTensionPorcentual <= limiteAlumbrado;
      const conformidadFuerza = caidaTensionPorcentual <= limiteFuerza;
      
      // Recomendaciones si no cumple
      let recomendacion = "";
      if (!conformidadFuerza) {
        // Calcular la sección mínima requerida para cumplir con los límites
        const seccionMinima = tipoCircuito === "monofasico"
          ? (2 * corriente * resistividad[material] * factorTemperatura * longitud * factorPotencia * 100) / (limiteFuerza * tensionNominal)
          : (Math.sqrt(3) * corriente * resistividad[material] * factorTemperatura * longitud * factorPotencia * 100) / (limiteFuerza * tensionNominal);
        
        // Encontrar la sección normalizada inmediatamente superior
        const seccionesNormalizadas = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];
        let seccionRecomendada = seccionesNormalizadas[seccionesNormalizadas.length - 1];
        
        for (const secNorm of seccionesNormalizadas) {
          if (secNorm >= seccionMinima) {
            seccionRecomendada = secNorm;
            break;
          }
        }
        
        recomendacion = `
          <div class="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
            <p class="font-medium text-orange-800">Recomendaciones para cumplir normativa:</p>
            <ul class="list-disc list-inside text-sm space-y-1 text-orange-700">
              <li>Aumentar la sección del conductor a <strong>${seccionRecomendada} mm²</strong></li>
              <li>Reducir la longitud del circuito si es posible</li>
              <li>Considerar instalar un circuito adicional para dividir la carga</li>
              <li>En trifásico, verificar el equilibrio de cargas entre fases</li>
            </ul>
          </div>
        `;
      }
      
      // Capacidad de transporte de corriente aproximada
      const capacidadCorriente = {
        "1.5": { cobre: 16, aluminio: 12.5 },
        "2.5": { cobre: 22, aluminio: 17.5 },
        "4": { cobre: 30, aluminio: 24 },
        "6": { cobre: 37, aluminio: 30 },
        "10": { cobre: 52, aluminio: 41 },
        "16": { cobre: 70, aluminio: 54 },
        "25": { cobre: 91, aluminio: 70 },
        "35": { cobre: 114, aluminio: 86 },
        "50": { cobre: 141, aluminio: 109 },
        "70": { cobre: 179, aluminio: 138 },
        "95": { cobre: 216, aluminio: 167 },
        "120": { cobre: 249, aluminio: 192 },
        "150": { cobre: 285, aluminio: 219 },
        "185": { cobre: 324, aluminio: 248 },
        "240": { cobre: 380, aluminio: 291 },
      };
      
      const maxCorriente = capacidadCorriente[seccion.toString()][material];
      const conformidadAmpacidad = corriente <= maxCorriente;
      
      // Pérdida de potencia
      const perdidaPotencia = caidaTension * corriente;
      const potenciaTotal = tensionNominal * corriente * (tipoCircuito === "monofasico" ? 1 : Math.sqrt(3)) * factorPotencia;
      const perdidaPorcentual = (perdidaPotencia / potenciaTotal) * 100;
      
      return `
        <div class="space-y-4">
          <div class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-gray-700">Resultados del cálculo:</p>
              <span class="px-2 py-1 text-xs font-medium ${conformidadFuerza ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded">
                ${conformidadFuerza ? '✓ Cumple normativa' : '✗ No cumple normativa'}
              </span>
            </div>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-xl font-bold text-orange-700">${caidaTension.toFixed(2)} V</p>
                <p class="text-sm text-gray-600">Caída de tensión absoluta</p>
              </div>
              <div>
                <p class="text-xl font-bold ${caidaTensionPorcentual <= limiteFuerza ? 'text-green-600' : 'text-red-600'}">
                  ${caidaTensionPorcentual.toFixed(2)}%
                </p>
                <p class="text-sm text-gray-600">Caída de tensión porcentual</p>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm border-t border-yellow-200 pt-2">
              <div>
                <p class="text-gray-700"><span class="font-medium">Resistencia:</span> ${resistencia.toFixed(4)} Ω</p>
              </div>
              <div>
                <p class="text-gray-700"><span class="font-medium">Pérdida de potencia:</span> ${perdidaPotencia.toFixed(2)} W (${perdidaPorcentual.toFixed(2)}%)</p>
              </div>
              <div>
                <p class="text-gray-700"><span class="font-medium">Tipo de circuito:</span> ${tipoCircuito === "monofasico" ? "Monofásico" : "Trifásico"}</p>
              </div>
              <div>
                <p class="text-gray-700 ${conformidadAmpacidad ? 'text-green-600' : 'text-red-600'}">
                  <span class="font-medium">Capacidad de corriente:</span> ${maxCorriente} A 
                  ${conformidadAmpacidad ? '(✓)' : '(✗ Sobrecarga)'}
                </p>
              </div>
            </div>
          </div>
          
          <div class="p-4 border rounded-md bg-white">
            <p class="font-medium">Criterios de evaluación según normativa:</p>
            <div class="mt-2 space-y-2">
              <div class="flex items-center">
                <div class="w-2/3">
                  <p class="text-sm">Para circuitos de alumbrado: Máximo ${limiteAlumbrado}%</p>
                </div>
                <div class="w-1/3 text-right">
                  <span class="px-2 py-1 text-xs font-medium ${conformidadAlumbrado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded">
                    ${conformidadAlumbrado ? 'Cumple ✓' : 'No cumple ✗'}
                  </span>
                </div>
              </div>
              <div class="flex items-center">
                <div class="w-2/3">
                  <p class="text-sm">Para circuitos de fuerza: Máximo ${limiteFuerza}%</p>
                </div>
                <div class="w-1/3 text-right">
                  <span class="px-2 py-1 text-xs font-medium ${conformidadFuerza ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded">
                    ${conformidadFuerza ? 'Cumple ✓' : 'No cumple ✗'}
                  </span>
                </div>
              </div>
            </div>
            
            ${recomendacion}
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-3 border rounded-md bg-white">
              <p class="font-medium">Fórmulas utilizadas:</p>
              <ul class="text-sm space-y-1 mt-2">
                <li>Resistencia: R = ρ × α × L / S</li>
                <li>Monofásico: ΔV = 2 × I × R × cosφ</li>
                <li>Trifásico: ΔV = √3 × I × R × cosφ</li>
                <li>Caída %: ΔV(%) = (ΔV / V) × 100</li>
                <li>Pérdida potencia: P<sub>pérdida</sub> = ΔV × I</li>
              </ul>
              <p class="mt-2 text-xs text-gray-600">
                ρ = Resistividad del material a 20°C<br>
                α = Factor de corrección por temperatura<br>
                L = Longitud<br>
                S = Sección<br>
                I = Corriente<br>
                V = Tensión nominal<br>
                cosφ = Factor de potencia
              </p>
            </div>
            
            <div class="p-3 border rounded-md bg-white">
              <p class="font-medium">Información técnica:</p>
              <div class="mt-2 text-sm space-y-2">
                <p>La caída de tensión excesiva puede causar:</p>
                <ul class="list-disc list-inside text-sm">
                  <li>Mal funcionamiento de equipos electrónicos</li>
                  <li>Sobrecalentamiento de motores</li>
                  <li>Reducción de vida útil de luminarias</li>
                  <li>Disminución de eficiencia energética</li>
                </ul>
                <p class="text-xs text-gray-600 mt-1">
                  Normativas de referencia: REBT (España), IEC 60364, NEC (EE.UU).
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  },
};

export const categories = {
  basicas: {
    name: "Básicas",
    description: "Calculadoras simples para operaciones cotidianas",
    icon: CalculatorIcon,
  },
  matematicas: {
    name: "Matemáticas",
    description: "Herramientas avanzadas para cálculos matemáticos",
    icon: Pi,
  },
  cientificas: {
    name: "Científicas",
    description: "Calculadoras con funciones científicas y trigonométricas",
    icon: Atom,
  },
  simuladores: {
    name: "Simuladores",
    description: "Simuladores de calculadoras físicas reales",
    icon: CalculatorIcon,
  },
  conversiones: {
    name: "Conversiones",
    description: "Herramientas para convertir entre distintas unidades",
    icon: ArrowLeftRight,
  },
  fechas: {
    name: "Fechas",
    description: "Calculadoras para fechas y horarios",
    icon: CalculatorIcon,
  },
  salud: {
    name: "Salud",
    description: "Calculadoras para la salud y el bienestar",
    icon: Heart,
  },
  ingenieria: {
    name: "Ingeniería",
    description: "Calculadoras para problemas de ingeniería",
    icon: CalculatorIcon,
  },
};
