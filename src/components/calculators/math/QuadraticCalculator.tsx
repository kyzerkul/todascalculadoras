import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const QuadraticCalculator = () => {
  const [coefficients, setCoefficients] = useState({
    a: 1,
    b: 0,
    c: 0,
  });
  const [solutions, setSolutions] = useState<{
    x1: number | null;
    x2: number | null;
    discriminant: number;
  }>({
    x1: null,
    x2: null,
    discriminant: 0,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, coefficient: 'a' | 'b' | 'c') => {
    const value = e.target.value;
    
    // Allow empty string (to clear input)
    if (value === "") {
      setCoefficients({ ...coefficients, [coefficient]: coefficient === 'a' ? 1 : 0 });
      return;
    }
    
    // Replace commas with dots for decimal input
    const normalizedValue = value.replace(",", ".");
    const numberValue = parseFloat(normalizedValue);
    
    if (!isNaN(numberValue)) {
      setCoefficients({ ...coefficients, [coefficient]: numberValue });
    }
  };

  const solve = () => {
    const { a, b, c } = coefficients;
    const discriminant = b * b - 4 * a * c;

    if (a === 0) {
      alert("El coeficiente 'a' no puede ser cero en una ecuación cuadrática");
      return;
    }

    let x1: number | null = null;
    let x2: number | null = null;

    if (discriminant > 0) {
      x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    } else if (discriminant === 0) {
      x1 = x2 = -b / (2 * a);
    }

    setSolutions({
      x1: x1 !== null ? Number(x1.toFixed(4)) : null,
      x2: x2 !== null ? Number(x2.toFixed(4)) : null,
      discriminant,
    });
  };

  const getSolutionType = () => {
    if (solutions.discriminant > 0) {
      return "Dos soluciones reales distintas";
    } else if (solutions.discriminant === 0) {
      return "Una solución real (raíz doble)";
    } else {
      return "Dos soluciones complejas conjugadas";
    }
  };

  const getComplexSolutions = () => {
    if (solutions.discriminant >= 0) return null;

    const { a, b } = coefficients;
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-solutions.discriminant) / (2 * a);

    return {
      x1: `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`,
      x2: `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`,
    };
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">ax² + bx + c = 0</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Coeficiente a</Label>
              <Input
                type="number"
                value={coefficients.a === 0 ? 1 : coefficients.a === 1 ? "" : coefficients.a}
                onChange={(e) => handleInput(e, 'a')}
              />
            </div>
            <div className="space-y-2">
              <Label>Coeficiente b</Label>
              <Input
                type="number"
                value={coefficients.b === 0 ? "" : coefficients.b}
                onChange={(e) => handleInput(e, 'b')}
              />
            </div>
            <div className="space-y-2">
              <Label>Coeficiente c</Label>
              <Input
                type="number"
                value={coefficients.c === 0 ? "" : coefficients.c}
                onChange={(e) => handleInput(e, 'c')}
              />
            </div>
          </div>

          <Button onClick={solve} className="w-full">
            Resolver
          </Button>

          <div className="space-y-4 mt-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Resultados</h3>
              <div className="space-y-2">
                <p>Tipo de soluciones: {getSolutionType()}</p>
                <p>Discriminante: {solutions.discriminant}</p>
                {solutions.discriminant >= 0 ? (
                  <>
                    <p>x₁ = {solutions.x1}</p>
                    <p>x₂ = {solutions.x2}</p>
                  </>
                ) : (
                  <>
                    <p>x₁ = {getComplexSolutions()?.x1}</p>
                    <p>x₂ = {getComplexSolutions()?.x2}</p>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Fórmula Utilizada</h3>
              <p className="text-center">x = (-b ± √(b² - 4ac)) / (2a)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuadraticCalculator;
