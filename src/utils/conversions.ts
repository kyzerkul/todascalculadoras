
// Temperature conversions
export const convertTemperature = (value: number, from: string, to: string): number => {
  // Convert to Celsius first
  let celsius = value;
  if (from === "fahrenheit") {
    celsius = (value - 32) * (5/9);
  } else if (from === "kelvin") {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target unit
  if (to === "fahrenheit") {
    return (celsius * 9/5) + 32;
  } else if (to === "kelvin") {
    return celsius + 273.15;
  }
  return celsius; // If target is Celsius
};

// Time conversions
export const convertTime = (value: number, from: string, to: string): number => {
  // Convert everything to seconds first
  const conversions: Record<string, number> = {
    "segundos": 1,
    "minutos": 60,
    "horas": 3600,
  };

  const seconds = value * conversions[from];
  return seconds / conversions[to];
};

// Currency conversion
export const convertCurrency = (amount: number, rate: number): number => {
  return amount * rate;
};

// Special measurements conversion
export const convertSpecialMeasurement = (value: number, type: string, from: string, to: string): number => {
  const conversions: Record<string, Record<string, number>> = {
    "potencia": {
      "watts": 1,
      "hp": 745.7, // 1 HP = 745.7 W
    },
    "presion": {
      "pascal": 1,
      "bar": 100000, // 1 bar = 100000 Pa
      "psi": 6894.76, // 1 PSI = 6894.76 Pa
    },
    "energia": {
      "joule": 1,
      "calorias": 4.184, // 1 cal = 4.184 J
      "kwh": 3600000, // 1 kWh = 3600000 J
    },
  };

  if (!conversions[type]) {
    throw new Error("Tipo de medida no soportado");
  }

  // Convert to base unit first
  const valueInBase = value * conversions[type][from];
  // Convert from base to target unit
  return valueInBase / conversions[type][to];
};

// Length, weight, volume conversions
export const convertUnit = (value: number, category: string, from: string, to: string): number => {
  const conversions: Record<string, Record<string, number>> = {
    "longitud": {
      "metros": 1,
      "centimetros": 0.01,
      "kilometros": 1000,
      "millas": 1609.34,
      "pies": 0.3048,
      "pulgadas": 0.0254,
    },
    "peso": {
      "kilogramos": 1,
      "gramos": 0.001,
      "libras": 0.453592,
      "onzas": 0.0283495,
    },
    "volumen": {
      "litros": 1,
      "mililitros": 0.001,
      "galones": 3.78541,
    },
  };

  if (!conversions[category]) {
    throw new Error("Categoría no soportada");
  }

  // Convert to base unit first
  const valueInBase = value * conversions[category][from];
  // Convert from base to target unit
  return valueInBase / conversions[category][to];
};
