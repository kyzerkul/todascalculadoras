import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const AlgebraCalculator = () => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [calculationType, setCalculationType] = useState<"linear" | "system" | "polynomial">("linear");
  
  // Para ecuaciones lineales
  const [variableName, setVariableName] = useState("x");
  
  // Para sistemas de ecuaciones
  const [equation1, setEquation1] = useState("");
  const [equation2, setEquation2] = useState("");
  
  // Para polinomios
  const [polynomial, setPolynomial] = useState("");
  const [polynomialOperation, setPolynomialOperation] = useState("evaluate");
  const [polynomialValue, setPolynomialValue] = useState("");
  
  // Historia
  const [history, setHistory] = useState<{type: string, input: string, result: string}[]>([]);

  const solveLinearEquation = (eq: string, varName = "x"): { result: string, steps: string[] } => {
    // Remove spaces and convert to lowercase
    eq = eq.replace(/\s+/g, "").toLowerCase();
    const steps: string[] = [];
    
    // Basic validation
    if (!eq.includes("=")) {
      return { result: "Error: La ecuación debe contener un signo =", steps: [] };
    }

    try {
      steps.push(`Ecuación original: ${eq}`);
      
      // Split equation into left and right sides
      const [left, right] = eq.split("=");
      
      // Move all terms with the variable to left side and all numbers to right side
      let coefficient = 0;
      let constant = 0;
      
      // Process left side
      const leftRegExp = new RegExp(`[+-]?\\d*${varName}|[+-]?\\d+`, 'g');
      let terms = left.match(leftRegExp) || [];
      steps.push(`Analizando lado izquierdo: ${terms.join(' + ')}`);
      
      terms.forEach(term => {
        if (term.includes(varName)) {
          const coef = term.replace(varName, "") || "1";
          const numCoef = coef === "-" ? -1 : (coef === "+" ? 1 : parseFloat(coef));
          coefficient += numCoef;
          steps.push(`Término con variable: ${term} → coeficiente: ${numCoef}`);
        } else {
          const num = parseFloat(term);
          constant -= num;
          steps.push(`Término constante: ${term} → moviendo al lado derecho: ${-num}`);
        }
      });
      
      // Process right side
      const rightRegExp = new RegExp(`[+-]?\\d*${varName}|[+-]?\\d+`, 'g');
      terms = right.match(rightRegExp) || [];
      steps.push(`Analizando lado derecho: ${terms.join(' + ')}`);
      
      terms.forEach(term => {
        if (term.includes(varName)) {
          const coef = term.replace(varName, "") || "1";
          const numCoef = coef === "-" ? -1 : (coef === "+" ? 1 : parseFloat(coef));
          coefficient -= numCoef;
          steps.push(`Término con variable: ${term} → coeficiente: ${-numCoef} (al mover al lado izquierdo)`);
        } else {
          const num = parseFloat(term);
          constant += num;
          steps.push(`Término constante: ${term} → suma al lado derecho: ${num}`);
        }
      });
      
      steps.push(`Ecuación simplificada: ${coefficient}${varName} = ${constant}`);
      
      if (coefficient === 0) {
        if (constant === 0) {
          steps.push("El coeficiente de la variable es 0 y la constante es 0");
          return { result: "Infinitas soluciones", steps };
        } else {
          steps.push("El coeficiente de la variable es 0 pero la constante no es 0");
          return { result: "Sin solución", steps };
        }
      }
      
      const solution = constant / coefficient;
      steps.push(`Despejando ${varName}: ${varName} = ${constant} ÷ ${coefficient} = ${solution}`);
      
      return { result: `${varName} = ${solution}`, steps };
    } catch (error) {
      return { result: "Error: Formato de ecuación inválido", steps: [] };
    }
  };

  const solveSystemOfEquations = (eq1: string, eq2: string): { result: string, steps: string[] } => {
    const steps: string[] = [];
    try {
      // Remove spaces and convert to lowercase
      eq1 = eq1.replace(/\s+/g, "").toLowerCase();
      eq2 = eq2.replace(/\s+/g, "").toLowerCase();
      
      // Basic validation
      if (!eq1.includes("=") || !eq2.includes("=")) {
        return { result: "Error: Ambas ecuaciones deben contener el signo =", steps: [] };
      }

      steps.push(`Sistema original:\n${eq1}\n${eq2}`);
      
      // Parse equations to standard form: ax + by = c
      const eq1Parts = eq1.split("=");
      const eq2Parts = eq2.split("=");
      
      // Function to extract coefficients a, b, c from an equation
      const extractCoefficients = (leftSide: string, rightSide: string): { a: number, b: number, c: number, steps: string[] } => {
        const localSteps: string[] = [];
        // Move everything to the left side
        let expression = `${leftSide}-${rightSide.replace(/[-+]/g, match => match === '-' ? '+' : '-')}`;
        if (!expression.startsWith('+') && !expression.startsWith('-')) expression = '+' + expression;
        
        localSteps.push(`Expresión normalizada: ${expression}`);
        
        // Match coefficients for x and y, and constants
        let a = 0, b = 0, c = 0;
        
        // Match x terms
        const xTerms = expression.match(/[+-][^-+]*x/g);
        if (xTerms) {
          xTerms.forEach(term => {
            const coefficient = term.replace('x', '');
            a += coefficient === '+' ? 1 : (coefficient === '-' ? -1 : parseFloat(coefficient));
          });
        }
        
        // Match y terms
        const yTerms = expression.match(/[+-][^-+]*y/g);
        if (yTerms) {
          yTerms.forEach(term => {
            const coefficient = term.replace('y', '');
            b += coefficient === '+' ? 1 : (coefficient === '-' ? -1 : parseFloat(coefficient));
          });
        }
        
        // Match constants
        const constantTerms = expression.match(/[+-]\d+(?![xy])/g);
        if (constantTerms) {
          constantTerms.forEach(term => {
            c -= parseFloat(term); // Negative because we moved to the right side
          });
        }
        
        localSteps.push(`Coeficientes extraídos: ${a}x + ${b}y = ${c}`);
        
        return { a, b, c, steps: localSteps };
      };
      
      const { a: a1, b: b1, c: c1, steps: steps1 } = extractCoefficients(eq1Parts[0], eq1Parts[1]);
      const { a: a2, b: b2, c: c2, steps: steps2 } = extractCoefficients(eq2Parts[0], eq2Parts[1]);
      
      steps.push(...steps1);
      steps.push(...steps2);
      
      steps.push(`Ecuación 1 en forma estándar: ${a1}x + ${b1}y = ${c1}`);
      steps.push(`Ecuación 2 en forma estándar: ${a2}x + ${b2}y = ${c2}`);
      
      // Solve system using Cramer's rule
      const determinant = a1 * b2 - a2 * b1;
      
      if (determinant === 0) {
        // Check if the system has no solution or infinite solutions
        if (a1 / a2 === b1 / b2 && b1 / b2 === c1 / c2) {
          steps.push("El determinante es 0 y las ecuaciones son proporcionales");
          return { result: "Infinitas soluciones", steps };
        } else {
          steps.push("El determinante es 0 pero las ecuaciones no son proporcionales");
          return { result: "Sin solución", steps };
        }
      }
      
      const x = (c1 * b2 - c2 * b1) / determinant;
      const y = (a1 * c2 - a2 * c1) / determinant;
      
      steps.push(`Calculando el determinante: ${a1} × ${b2} - ${a2} × ${b1} = ${determinant}`);
      steps.push(`Calculando x: (${c1} × ${b2} - ${c2} × ${b1}) ÷ ${determinant} = ${x}`);
      steps.push(`Calculando y: (${a1} × ${c2} - ${a2} × ${c1}) ÷ ${determinant} = ${y}`);
      
      return { result: `x = ${x}, y = ${y}`, steps };
    } catch (error) {
      return { result: "Error: Formato de ecuación inválido", steps: [] };
    }
  };

  const handlePolynomial = (poly: string, operation: string, value: string = ""): { result: string, steps: string[] } => {
    const steps: string[] = [];
    try {
      // Remove spaces
      poly = poly.replace(/\s+/g, "");
      
      // Parse the polynomial to get coefficients
      const terms = poly.match(/[+-]?\d*x\^\d+|[+-]?\d*x|[+-]?\d+/g) || [];
      
      steps.push(`Polinomio original: ${poly}`);
      steps.push(`Términos identificados: ${terms.join(", ")}`);
      
      // Create a map of powers to coefficients
      const coefficients = new Map<number, number>();
      
      for (const term of terms) {
        if (term.includes("x^")) {
          // Handle terms with x^n
          const [coefPart, powPart] = term.split("x^");
          const power = parseInt(powPart);
          let coef;
          if (coefPart === "" || coefPart === "+") coef = 1;
          else if (coefPart === "-") coef = -1;
          else coef = parseFloat(coefPart);
          
          coefficients.set(power, (coefficients.get(power) || 0) + coef);
        } else if (term.includes("x")) {
          // Handle terms with x (power 1)
          const coefPart = term.replace("x", "");
          let coef;
          if (coefPart === "" || coefPart === "+") coef = 1;
          else if (coefPart === "-") coef = -1;
          else coef = parseFloat(coefPart);
          
          coefficients.set(1, (coefficients.get(1) || 0) + coef);
        } else {
          // Handle constant terms (power 0)
          const coef = parseFloat(term);
          coefficients.set(0, (coefficients.get(0) || 0) + coef);
        }
      }
      
      // Sort powers in descending order
      const powers = Array.from(coefficients.keys()).sort((a, b) => b - a);
      
      steps.push("Coeficientes extraídos:");
      for (const power of powers) {
        steps.push(`  Término con x^${power}: ${coefficients.get(power)}`);
      }
      
      if (operation === "evaluate") {
        if (!value || isNaN(parseFloat(value))) {
          return { result: "Error: Se requiere un valor para evaluar el polinomio", steps: [] };
        }
        
        const x = parseFloat(value);
        let result = 0;
        
        steps.push(`Evaluando polinomio en x = ${x}:`);
        
        for (const power of powers) {
          const coef = coefficients.get(power) || 0;
          const term = coef * Math.pow(x, power);
          result += term;
          steps.push(`  ${coef} × ${x}^${power} = ${term}`);
        }
        
        steps.push(`Suma total = ${result}`);
        
        return { result: `P(${x}) = ${result}`, steps };
      } else if (operation === "derivative") {
        // Calculate derivative
        const derivativeCoefficients = new Map<number, number>();
        
        for (const power of powers) {
          if (power > 0) {
            const coef = coefficients.get(power) || 0;
            derivativeCoefficients.set(power - 1, coef * power);
          }
        }
        
        // Format derivative
        const derivativePowers = Array.from(derivativeCoefficients.keys()).sort((a, b) => b - a);
        let derivative = "";
        
        steps.push("Calculando la derivada:");
        
        for (const power of derivativePowers) {
          const coef = derivativeCoefficients.get(power) || 0;
          if (coef === 0) continue;
          
          const sign = coef > 0 ? (derivative ? "+" : "") : "";
          const coefficient = coef === 1 ? (power > 0 ? "" : "1") : (coef === -1 ? "-" : coef.toString());
          const variable = power > 0 ? (power === 1 ? "x" : `x^${power}`) : "";
          
          derivative += `${sign}${coefficient}${variable}`;
          steps.push(`  Derivada del término con x^${power + 1}: ${coefficients.get(power + 1)} × ${power + 1} = ${coef}`);
        }
        
        if (!derivative) derivative = "0";
        steps.push(`Derivada completa: ${derivative}`);
        
        return { result: `P'(x) = ${derivative}`, steps };
      } else {
        return { result: "Error: Operación no soportada", steps: [] };
      }
    } catch (error) {
      return { result: "Error: Formato de polinomio inválido", steps: [] };
    }
  };

  const handleSolve = () => {
    let solution: { result: string, steps: string[] };
    
    if (calculationType === "linear") {
      solution = solveLinearEquation(equation, variableName);
      setResult(solution.result);
      setSteps(solution.steps);
      setHistory([...history, { 
        type: "Ecuación Lineal", 
        input: equation, 
        result: solution.result 
      }]);
    } else if (calculationType === "system") {
      solution = solveSystemOfEquations(equation1, equation2);
      setResult(solution.result);
      setSteps(solution.steps);
      setHistory([...history, { 
        type: "Sistema de Ecuaciones", 
        input: `${equation1}, ${equation2}`, 
        result: solution.result 
      }]);
    } else if (calculationType === "polynomial") {
      solution = handlePolynomial(polynomial, polynomialOperation, polynomialValue);
      setResult(solution.result);
      setSteps(solution.steps);
      setHistory([...history, { 
        type: "Polinomio", 
        input: polynomial + (polynomialOperation === "evaluate" ? ` en x = ${polynomialValue}` : " (derivada)"), 
        result: solution.result 
      }]);
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <Tabs
              defaultValue="linear"
              onValueChange={(value) => {
                setCalculationType(value as "linear" | "system" | "polynomial");
                setResult(null);
                setSteps([]);
              }}
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="linear">Ecuación Lineal</TabsTrigger>
                <TabsTrigger value="system">Sistema 2×2</TabsTrigger>
                <TabsTrigger value="polynomial">Polinomios</TabsTrigger>
              </TabsList>

              <TabsContent value="linear" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                      <Label htmlFor="equation">Ecuación lineal</Label>
                      <Input
                        id="equation"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        placeholder="Ejemplo: 2x + 3 = 7"
                        className="text-lg"
                      />
                    </div>
                    <div className="w-20">
                      <Label htmlFor="variableName">Variable</Label>
                      <Select
                        value={variableName}
                        onValueChange={setVariableName}
                      >
                        <SelectTrigger id="variableName">
                          <SelectValue placeholder="Variable" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="x">x</SelectItem>
                          <SelectItem value="y">y</SelectItem>
                          <SelectItem value="z">z</SelectItem>
                          <SelectItem value="a">a</SelectItem>
                          <SelectItem value="b">b</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ingresa una ecuación lineal usando la variable {variableName}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="system" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="equation1">Primera ecuación</Label>
                    <Input
                      id="equation1"
                      value={equation1}
                      onChange={(e) => setEquation1(e.target.value)}
                      placeholder="Ejemplo: 2x + y = 5"
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equation2">Segunda ecuación</Label>
                    <Input
                      id="equation2"
                      value={equation2}
                      onChange={(e) => setEquation2(e.target.value)}
                      placeholder="Ejemplo: x - y = 1"
                      className="text-lg"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ingresa un sistema de dos ecuaciones con dos incógnitas (x e y)
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="polynomial" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="polynomial">Polinomio</Label>
                    <Input
                      id="polynomial"
                      value={polynomial}
                      onChange={(e) => setPolynomial(e.target.value)}
                      placeholder="Ejemplo: 2x^3 - 4x^2 + x - 7"
                      className="text-lg"
                    />
                    <p className="text-sm text-muted-foreground">
                      Ingresa un polinomio en la variable x (usa ^ para potencias)
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-40">
                      <Label htmlFor="operation">Operación</Label>
                      <Select
                        value={polynomialOperation}
                        onValueChange={setPolynomialOperation}
                      >
                        <SelectTrigger id="operation">
                          <SelectValue placeholder="Operación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="evaluate">Evaluar</SelectItem>
                          <SelectItem value="derivative">Derivar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {polynomialOperation === "evaluate" && (
                      <div className="flex-grow">
                        <Label htmlFor="value">Valor de x</Label>
                        <Input
                          id="value"
                          value={polynomialValue}
                          onChange={(e) => setPolynomialValue(e.target.value)}
                          placeholder="Ejemplo: 2"
                          className="text-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button onClick={handleSolve} className="w-full mt-4">
              Resolver
            </Button>

            {result && (
              <div className="mt-6 p-4 bg-primary/5 rounded-md">
                <h3 className="font-medium mb-2">Resultado:</h3>
                <p className="text-center text-lg font-medium">{result}</p>
              </div>
            )}

            {steps.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium mb-2">Pasos de resolución:</h3>
                <div className="space-y-1 text-sm">
                  {steps.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-sm">Historial de cálculos</h3>
            <div className="max-h-[400px] overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay historial de cálculos</p>
              ) : (
                <ul className="space-y-3">
                  {history.map((item, index) => (
                    <li key={index} className="text-sm p-3 bg-gray-50 rounded border border-gray-100">
                      <div className="font-medium text-xs text-gray-500 mb-1">{item.type}</div>
                      <div className="mb-1">{item.input}</div>
                      <div className="font-medium">{item.result}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {history.length > 0 && (
              <Button
                variant="ghost"
                onClick={clearHistory}
                className="w-full mt-2 text-sm h-8"
              >
                Limpiar historial
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Instrucciones</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Esta calculadora de álgebra permite resolver tres tipos de problemas:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="space-y-2">
                <h4 className="font-medium">Ecuaciones Lineales</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Ingresa una ecuación con una incógnita</li>
                  <li>Puedes elegir la variable (x, y, z, a, b)</li>
                  <li>Ejemplo: 2x + 3 = 7 o x/2 - 5 = 10</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Sistema de Ecuaciones</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Ingresa dos ecuaciones con dos incógnitas (x, y)</li>
                  <li>El sistema se resolverá usando el método de Cramer</li>
                  <li>Ejemplo: 2x + y = 5 y x - y = 1</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Polinomios</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Evalúa un polinomio en un valor específico</li>
                  <li>Calcula la derivada de un polinomio</li>
                  <li>Ejemplo: 2x^3 - 4x^2 + x - 7</li>
                </ul>
              </div>
            </div>
            <p className="mt-2">
              La calculadora muestra los pasos detallados de resolución y mantiene un historial de tus cálculos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgebraCalculator;
