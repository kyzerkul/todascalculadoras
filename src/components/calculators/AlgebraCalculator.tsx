
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AlgebraCalculator = () => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const solveLinearEquation = (eq: string): string | null => {
    // Remove spaces and convert to lowercase
    eq = eq.replace(/\s+/g, "").toLowerCase();
    
    // Basic validation
    if (!eq.includes("=")) {
      return "Error: La ecuación debe contener un signo =";
    }

    try {
      // Split equation into left and right sides
      const [left, right] = eq.split("=");
      
      // Move all terms with x to left side and all numbers to right side
      let coefficient = 0;
      let constant = 0;
      
      // Process left side
      let terms = left.match(/[+-]?\d*x|[+-]?\d+/g) || [];
      terms.forEach(term => {
        if (term.includes("x")) {
          coefficient += parseInt(term.replace("x", "") || "1");
        } else {
          constant -= parseInt(term);
        }
      });
      
      // Process right side
      terms = right.match(/[+-]?\d*x|[+-]?\d+/g) || [];
      terms.forEach(term => {
        if (term.includes("x")) {
          coefficient -= parseInt(term.replace("x", "") || "1");
        } else {
          constant += parseInt(term);
        }
      });
      
      if (coefficient === 0) {
        return constant === 0 ? "Infinitas soluciones" : "Sin solución";
      }
      
      return `x = ${constant / coefficient}`;
    } catch (error) {
      return "Error: Formato de ecuación inválido";
    }
  };

  const handleSolve = () => {
    const solution = solveLinearEquation(equation);
    setResult(solution);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="equation">Ecuación lineal</Label>
          <Input
            id="equation"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            placeholder="Ejemplo: 2x + 3 = 7"
            className="text-lg"
          />
          <p className="text-sm text-muted-foreground">
            Ingresa una ecuación lineal usando la variable x
          </p>
        </div>

        <Button onClick={handleSolve} className="w-full">
          Resolver
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-primary/5 rounded-md">
            <p className="text-center text-lg font-medium">{result}</p>
          </div>
        )}

        <div className="mt-6 space-y-2">
          <h3 className="font-medium">Instrucciones:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Usa 'x' como variable</li>
            <li>Puedes usar +, - y números enteros</li>
            <li>Incluye un signo = en la ecuación</li>
            <li>Ejemplo: 2x + 3 = 7 o x + 5 = 10</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgebraCalculator;
