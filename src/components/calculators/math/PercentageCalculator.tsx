import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PercentageCalculator = () => {
  const [baseValue, setBaseValue] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
    const value = e.target.value;
    
    // Allow empty string (to clear input)
    if (value === "") {
      setter(0);
      return;
    }
    
    // Replace commas with dots for decimal input
    const normalizedValue = value.replace(",", ".");
    const numberValue = parseFloat(normalizedValue);
    
    if (!isNaN(numberValue)) {
      setter(numberValue);
    }
  };

  const calculate = () => {
    const calculatedResult = (baseValue * percentage) / 100;
    setResult(Number(calculatedResult.toFixed(2)));
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Valor Base</Label>
            <Input
              type="number"
              value={baseValue === 0 ? "" : baseValue}
              onChange={(e) => handleInput(e, setBaseValue)}
              placeholder="Ingrese el valor base"
            />
          </div>

          <div className="space-y-2">
            <Label>Porcentaje</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={percentage === 0 ? "" : percentage}
                onChange={(e) => handleInput(e, setPercentage)}
                placeholder="Ingrese el porcentaje"
              />
              <span className="text-lg">%</span>
            </div>
          </div>

          <Button onClick={calculate} className="w-full">
            Calcular
          </Button>

          <div className="space-y-2">
            <Label>Resultado</Label>
            <div className="text-center">
              <p className="text-2xl font-semibold">{result}</p>
              <p className="text-sm text-gray-500">
                {percentage}% de {baseValue} es {result}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Información Adicional</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Valor del porcentaje: {result}</li>
              <li>• Valor restante: {(baseValue - result).toFixed(2)}</li>
              <li>• Nuevo total con porcentaje añadido: {(baseValue + result).toFixed(2)}</li>
              <li>• Nuevo total con porcentaje reducido: {(baseValue - result).toFixed(2)}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PercentageCalculator;
