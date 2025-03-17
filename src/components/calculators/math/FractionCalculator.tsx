import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Fraction {
  numerator: number;
  denominator: number;
}

const FractionCalculator = () => {
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: 0, denominator: 1 });
  const [operation, setOperation] = useState<string>("+");
  const [result, setResult] = useState<Fraction>({ numerator: 0, denominator: 1 });

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (fraction: Fraction): Fraction => {
    const divisor = gcd(Math.abs(fraction.numerator), Math.abs(fraction.denominator));
    return {
      numerator: fraction.numerator / divisor,
      denominator: fraction.denominator / divisor
    };
  };

  const handleNumInput = (e: React.ChangeEvent<HTMLInputElement>, field: string, fractionNum: number) => {
    const value = e.target.value;
    
    // Allow empty string (to clear input)
    if (value === "") {
      if (fractionNum === 1) {
        setFraction1({ ...fraction1, [field]: 0 });
      } else {
        setFraction2({ ...fraction2, [field]: 0 });
      }
      return;
    }
    
    // Replace commas with dots for decimal input
    const normalizedValue = value.replace(",", ".");
    const numberValue = parseInt(normalizedValue);
    
    if (!isNaN(numberValue)) {
      if (fractionNum === 1) {
        setFraction1({ ...fraction1, [field]: numberValue });
      } else {
        setFraction2({ ...fraction2, [field]: numberValue });
      }
    }
  };

  const calculate = () => {
    let newResult: Fraction = { numerator: 0, denominator: 1 };

    switch (operation) {
      case "+":
        newResult = {
          numerator: fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator,
          denominator: fraction1.denominator * fraction2.denominator
        };
        break;
      case "-":
        newResult = {
          numerator: fraction1.numerator * fraction2.denominator - fraction2.numerator * fraction1.denominator,
          denominator: fraction1.denominator * fraction2.denominator
        };
        break;
      case "×":
        newResult = {
          numerator: fraction1.numerator * fraction2.numerator,
          denominator: fraction1.denominator * fraction2.denominator
        };
        break;
      case "÷":
        if (fraction2.numerator === 0) {
          alert("No se puede dividir por cero");
          return;
        }
        newResult = {
          numerator: fraction1.numerator * fraction2.denominator,
          denominator: fraction1.denominator * fraction2.numerator
        };
        break;
    }

    setResult(simplifyFraction(newResult));
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primera Fracción</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={fraction1.numerator === 0 ? "" : fraction1.numerator}
                  onChange={(e) => handleNumInput(e, "numerator", 1)}
                  placeholder="Numerador"
                />
                <div className="border-t-2 border-black w-full my-4" />
                <Input
                  type="number"
                  value={fraction1.denominator === 0 ? 1 : fraction1.denominator}
                  onChange={(e) => handleNumInput(e, "denominator", 1)}
                  placeholder="Denominador"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Segunda Fracción</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={fraction2.numerator === 0 ? "" : fraction2.numerator}
                  onChange={(e) => handleNumInput(e, "numerator", 2)}
                  placeholder="Numerador"
                />
                <div className="border-t-2 border-black w-full my-4" />
                <Input
                  type="number"
                  value={fraction2.denominator === 0 ? 1 : fraction2.denominator}
                  onChange={(e) => handleNumInput(e, "denominator", 2)}
                  placeholder="Denominador"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+">+</SelectItem>
                <SelectItem value="-">-</SelectItem>
                <SelectItem value="×">×</SelectItem>
                <SelectItem value="÷">÷</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={calculate}>Calcular</Button>
          </div>

          <div className="text-center space-y-2">
            <Label>Resultado</Label>
            <div className="flex justify-center gap-2 items-center">
              <span className="text-2xl">
                {result.numerator}
                <div className="border-t-2 border-black w-12 my-1" />
                {result.denominator}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FractionCalculator;
