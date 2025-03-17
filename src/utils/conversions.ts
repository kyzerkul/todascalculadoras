
// Temperature conversions - improved precision and handling
export const convertTemperature = (value: number, from: string, to: string): number => {
  // Handle invalid inputs
  if (isNaN(value)) return 0;
  
  // Standardize input units
  const fromUnit = from.toLowerCase();
  const toUnit = to.toLowerCase();
  
  // Convert to Celsius first (as the base unit)
  let celsius = value;
  if (fromUnit === "fahrenheit") {
    celsius = (value - 32) * (5/9);
  } else if (fromUnit === "kelvin") {
    celsius = value - 273.15;
  }

  // Convert from Celsius to target unit
  if (toUnit === "fahrenheit") {
    return (celsius * 9/5) + 32;
  } else if (toUnit === "kelvin") {
    return celsius + 273.15;
  }
  
  return celsius; // If target is Celsius or unrecognized
};

// Time conversions - expanded units and improved formula
export const convertTime = (value: number, from: string, to: string): number => {
  // Handle invalid inputs
  if (isNaN(value) || value < 0) return 0;
  
  // Standardize input units
  const fromUnit = from.toLowerCase();
  const toUnit = to.toLowerCase();
  
  // Convert everything to seconds first (as the base unit)
  const conversions: Record<string, number> = {
    "segundos": 1,
    "minutos": 60,
    "horas": 3600,
    "dias": 86400,
    "semanas": 604800,
    "meses": 2592000, // Approximate - 30 days
    "años": 31536000, // Non-leap year
  };

  // If unit not found, return original value
  if (!conversions[fromUnit] || !conversions[toUnit]) {
    console.error("Unidad de tiempo no reconocida");
    return value;
  }

  const seconds = value * conversions[fromUnit];
  return seconds / conversions[toUnit];
};

// Currency conversion - with validation
export const convertCurrency = (amount: number, rate: number): number => {
  // Handle invalid inputs
  if (isNaN(amount) || isNaN(rate) || rate < 0) {
    return 0;
  }
  
  return amount * rate;
};

// Special measurements conversion - expanded units and better error handling
export const convertSpecialMeasurement = (value: number, type: string, from: string, to: string): number => {
  // Handle invalid inputs
  if (isNaN(value)) return 0;
  
  // Standardize input
  const measureType = type.toLowerCase();
  const fromUnit = from.toLowerCase();
  const toUnit = to.toLowerCase();
  
  const conversions: Record<string, Record<string, number>> = {
    "potencia": {
      "watts": 1,
      "kilowatts": 1000,
      "hp": 745.7,           // 1 HP = 745.7 W
      "btu/h": 0.29307107,   // 1 BTU/h = 0.29307107 W
    },
    "presion": {
      "pascal": 1,
      "kilopascal": 1000,
      "bar": 100000,         // 1 bar = 100000 Pa
      "psi": 6894.76,        // 1 PSI = 6894.76 Pa
      "atm": 101325,         // 1 atm = 101325 Pa
      "mmhg": 133.322,       // 1 mmHg = 133.322 Pa
    },
    "energia": {
      "joule": 1,
      "kilojoule": 1000,
      "calorias": 4.184,     // 1 cal = 4.184 J
      "kilocaloria": 4184,   // 1 kcal = 4184 J
      "kwh": 3600000,        // 1 kWh = 3600000 J
      "electronvolt": 1.602176634e-19, // 1 eV = 1.602176634×10^-19 J
      "btu": 1055.06,        // 1 BTU = 1055.06 J
    },
    "area": {
      "metro2": 1,
      "centimetro2": 0.0001,
      "kilometro2": 1000000,
      "hectarea": 10000,
      "pie2": 0.092903,
      "pulgada2": 0.00064516,
      "acre": 4046.86,
    },
  };

  if (!conversions[measureType]) {
    console.error("Tipo de medida no soportado:", measureType);
    return value;
  }

  if (!conversions[measureType][fromUnit] || !conversions[measureType][toUnit]) {
    console.error("Unidad no soportada para", measureType);
    return value;
  }

  // Convert to base unit first
  const valueInBase = value * conversions[measureType][fromUnit];
  // Convert from base to target unit
  return valueInBase / conversions[measureType][toUnit];
};

// Length, weight, volume conversions - expanded units and improved error handling
export const convertUnit = (value: number, category: string, from: string, to: string): number => {
  // Handle invalid inputs
  if (isNaN(value)) return 0;
  
  // Standardize input
  const unitCategory = category.toLowerCase();
  const fromUnit = from.toLowerCase();
  const toUnit = to.toLowerCase();
  
  const conversions: Record<string, Record<string, number>> = {
    "longitud": {
      "metros": 1,
      "centimetros": 0.01,
      "milimetros": 0.001,
      "kilometros": 1000,
      "millas": 1609.34,
      "pies": 0.3048,
      "pulgadas": 0.0254,
      "yardas": 0.9144,
      "millas_nauticas": 1852,
    },
    "peso": {
      "kilogramos": 1,
      "gramos": 0.001,
      "miligramos": 0.000001,
      "toneladas": 1000,
      "libras": 0.453592,
      "onzas": 0.0283495,
      "stone": 6.35029,       // 1 stone = 6.35029 kg
    },
    "volumen": {
      "litros": 1,
      "mililitros": 0.001,
      "metro3": 1000,
      "centimetro3": 0.001,
      "galones": 3.78541,
      "cuartos": 0.946353,
      "pintas": 0.473176,
      "onzas_fluidas": 0.0295735,
    },
    "velocidad": {
      "metros_segundo": 1,
      "kilometros_hora": 0.277778,   // 1 km/h = 0.277778 m/s
      "millas_hora": 0.44704,        // 1 mph = 0.44704 m/s
      "nudos": 0.514444,             // 1 knot = 0.514444 m/s
    },
    "datos": {
      "byte": 1,
      "kilobyte": 1024,
      "megabyte": 1048576,
      "gigabyte": 1073741824,
      "terabyte": 1099511627776,
    },
  };

  if (!conversions[unitCategory]) {
    console.error("Categoría no soportada:", unitCategory);
    return value;
  }

  if (!conversions[unitCategory][fromUnit] || !conversions[unitCategory][toUnit]) {
    console.error("Unidad no soportada para", unitCategory);
    return value;
  }

  // Convert to base unit first
  const valueInBase = value * conversions[unitCategory][fromUnit];
  // Convert from base to target unit
  return valueInBase / conversions[unitCategory][toUnit];
};
