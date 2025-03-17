import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LogarithmCalculator = () => {
  const [number, setNumber] = useState<number>(1);
  const [base, setBase] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>, defaultValue: number = 0) => {
    const value = e.target.value;
    
    // Allow empty string (to clear input)
    if (value === "") {
      setter(defaultValue);
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
    setError("");
    
    if (number <= 0) {
      setError("El número debe ser positivo");
      setResult(null);
      return;
    }

    if (base <= 0 || base === 1) {
      setError("La base debe ser positiva y diferente de 1");
      setResult(null);
      return;
    }

    const calculatedResult = Math.log(number) / Math.log(base);
    setResult(Number(calculatedResult.toFixed(6)));
  };

  const calculateCommonLogs = () => {
    if (number <= 0) return null;

    return {
      log10: Number(Math.log10(number).toFixed(6)),
      ln: Number(Math.log(number).toFixed(6)),
      log2: Number(Math.log2(number).toFixed(6)),
    };
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Número (x)</Label>
            <Input
              type="number"
              value={number === 1 ? "" : number}
              onChange={(e) => handleInput(e, setNumber, 1)}
              placeholder="Ingrese el número"
              step="any"
            />
          </div>

          <div className="space-y-2">
            <Label>Base (b)</Label>
            <Input
              type="number"
              value={base === 10 ? "" : base}
              onChange={(e) => handleInput(e, setBase, 10)}
              placeholder="Ingrese la base"
              step="any"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={calculate} className="w-full">
            Calcular
          </Button>

          {result !== null && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Resultado</h3>
                <p className="text-2xl text-center">
                  log<sub>{base}</sub>({number}) = {result}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Logaritmos Comunes</h3>
                {calculateCommonLogs() && (
                  <div className="space-y-2">
                    <p>log<sub>10</sub>({number}) = {calculateCommonLogs()?.log10}</p>
                    <p>ln({number}) = {calculateCommonLogs()?.ln}</p>
                    <p>log<sub>2</sub>({number}) = {calculateCommonLogs()?.log2}</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Propiedades Utilizadas</h3>
                <ul className="text-sm space-y-1">
                  <li>• log<sub>b</sub>(x) = ln(x) / ln(b)</li>
                  <li>• log<sub>10</sub>(x) = log(x)</li>
                  <li>• log<sub>e</sub>(x) = ln(x)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LogarithmCalculator;
