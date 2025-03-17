import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UnitCategory = {
  name: string;
  units: {
    [key: string]: number;
  };
};

const unitCategories: { [key: string]: UnitCategory } = {
  length: {
    name: "Longitud",
    units: {
      "Metros": 1,
      "Kilómetros": 0.001,
      "Centímetros": 100,
      "Milímetros": 1000,
      "Pulgadas": 39.3701,
      "Pies": 3.28084,
      "Yardas": 1.09361,
      "Millas": 0.000621371
    }
  },
  mass: {
    name: "Masa",
    units: {
      "Gramos": 1,
      "Kilogramos": 0.001,
      "Miligramos": 1000,
      "Toneladas": 0.000001,
      "Libras": 0.00220462,
      "Onzas": 0.035274
    }
  },
  volume: {
    name: "Volumen",
    units: {
      "Litros": 1,
      "Mililitros": 1000,
      "Galones": 0.264172,
      "Pulgadas cúbicas": 61.0237,
      "Pies cúbicos": 0.0353147,
      "Metros cúbicos": 0.001
    }
  },
  area: {
    name: "Área",
    units: {
      "Metros cuadrados": 1,
      "Kilómetros cuadrados": 0.000001,
      "Centímetros cuadrados": 10000,
      "Milímetros cuadrados": 1000000,
      "Pulgadas cuadradas": 1550,
      "Pies cuadrados": 10.7639,
      "Acres": 0.000247105,
      "Hectáreas": 0.0001
    }
  },
  temperature: {
    name: "Temperatura",
    units: {
      "Celsius": 1,
      "Fahrenheit": 2,
      "Kelvin": 3
    }
  }
};

const unitsByCategory: { [key: string]: { label: string; value: string; factor: number }[] } = {
  temperature: [
    { label: "Celsius (°C)", value: "Celsius", factor: 1 },
    { label: "Fahrenheit (°F)", value: "Fahrenheit", factor: 2 },
    { label: "Kelvin (K)", value: "Kelvin", factor: 3 }
  ],
  length: Object.entries(unitCategories.length.units).map(([name, factor]) => ({
    label: name,
    value: name,
    factor: Number(factor)
  })),
  mass: Object.entries(unitCategories.mass.units).map(([name, factor]) => ({
    label: name,
    value: name,
    factor: Number(factor)
  })),
  volume: Object.entries(unitCategories.volume.units).map(([name, factor]) => ({
    label: name,
    value: name,
    factor: Number(factor)
  })),
  area: Object.entries(unitCategories.area.units).map(([name, factor]) => ({
    label: name,
    value: name,
    factor: Number(factor)
  }))
};

const UnitConverter = () => {
  const [category, setCategory] = useState<string>("length");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string (to clear input)
    if (inputValue === "") {
      setValue(0);
      return;
    }
    
    // Replace commas with dots for decimal input
    const normalizedValue = inputValue.replace(",", ".");
    const numberValue = parseFloat(normalizedValue);
    
    if (!isNaN(numberValue)) {
      setValue(numberValue);
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number;

    // Convertir à Celsius d'abord
    switch (from) {
      case "Celsius":
        celsius = value;
        break;
      case "Fahrenheit":
        celsius = (value - 32) * (5 / 9);
        break;
      case "Kelvin":
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Convertir de Celsius à l'unité de destination
    switch (to) {
      case "Celsius":
        return celsius;
      case "Fahrenheit":
        return celsius * (9 / 5) + 32;
      case "Kelvin":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const handleConversion = () => {
    if (!fromUnit || !toUnit) return;

    let convertedValue: number;

    switch (category) {
      case "temperature":
        convertedValue = convertTemperature(value, fromUnit, toUnit);
        break;
      case "length":
      case "mass":
      case "volume":
      case "area":
        // Get conversion factors from the units
        const fromFactor = unitsByCategory[category].find((unit) => unit.value === fromUnit)?.factor;
        const toFactor = unitsByCategory[category].find((unit) => unit.value === toUnit)?.factor;

        // Convert to base unit then to target unit
        convertedValue = (value * fromFactor) / toFactor;
        break;
      default:
        convertedValue = 0;
    }

    setResult(Number(convertedValue.toFixed(6)));
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={category} onValueChange={(value) => {
              setCategory(value);
              setFromUnit("");
              setToUnit("");
              setResult(null);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione categoría" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitCategories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>De</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unidad origen" />
                </SelectTrigger>
                <SelectContent>
                  {unitsByCategory[category].map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>A</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Unidad destino" />
                </SelectTrigger>
                <SelectContent>
                  {unitsByCategory[category].map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Valor</Label>
            <Input
              type="number"
              value={value === 0 ? "" : value}
              onChange={handleInput}
              placeholder="Ingrese el valor a convertir"
              step="any"
            />
          </div>

          <Button onClick={handleConversion} className="w-full">
            Convertir
          </Button>

          {result !== null && (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="font-semibold mb-2">Resultado</h3>
              <p className="text-2xl">
                {value} {fromUnit} = {result} {toUnit}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitConverter;
