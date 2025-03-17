import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface EquationResult {
  solution: string;
  steps: string[];
}

const EquationCalculator = () => {
  const [equation, setEquation] = useState("");
  const [equation2, setEquation2] = useState("");
  const [equation3, setEquation3] = useState("");
  const [result, setResult] = useState<EquationResult | null>(null);
  const [history, setHistory] = useState<Array<{ type: string; input: string; result: string }>>([]);
  const [activeTab, setActiveTab] = useState("linear"); // "linear", "system2", "system3"

  const solveLinearEquation = (eq: string): EquationResult => {
    // Normalize the equation for parsing
    eq = eq.replace(/\s+/g, "");
    
    // Make sure we have an equation with an equals sign
    if (!eq.includes("=")) {
      return {
        solution: "Error: La ecuación debe contener un signo igual (=)",
        steps: []
      };
    }

    try {
      const steps: string[] = [];
      steps.push(`Ecuación original: ${eq}`);

      // Split into left and right side
      const [leftSide, rightSide] = eq.split("=");
      
      // Find the variable (assuming single variable, could be x, y, z, etc.)
      const variableMatch = eq.match(/[a-zA-Z]/);
      if (!variableMatch) {
        return {
          solution: "Error: No se encontró ninguna variable en la ecuación",
          steps: []
        };
      }
      
      const variable = variableMatch[0];
      
      // Process the equation
      // 1. Move all terms with the variable to the left side
      // 2. Move all constant terms to the right side
      
      // Extract terms from both sides
      const leftTerms = parseTerms(leftSide);
      const rightTerms = parseTerms(rightSide);
      
      // Calculate coefficients
      let variableCoefficient = 0;
      let constantTerm = 0;
      
      leftTerms.forEach(term => {
        if (term.includes(variable)) {
          // This is a variable term on the left side (positive)
          variableCoefficient += extractCoefficient(term, variable);
        } else {
          // This is a constant term on the left side (needs to move right, so negative)
          constantTerm -= parseFloat(term);
        }
      });
      
      rightTerms.forEach(term => {
        if (term.includes(variable)) {
          // This is a variable term on the right side (needs to move left, so negative)
          variableCoefficient -= extractCoefficient(term, variable);
        } else {
          // This is a constant term on the right side (positive)
          constantTerm += parseFloat(term);
        }
      });
      
      steps.push(`Agrupando términos con la variable ${variable} a la izquierda y constantes a la derecha`);

      if (variableCoefficient === 0) {
        if (constantTerm === 0) {
          steps.push(`${variable} puede tomar cualquier valor`);
          return {
            solution: "Solución: La ecuación es una identidad, cualquier valor de " + variable + " es solución",
            steps
          };
        } else {
          steps.push(`Llegamos a ${constantTerm} = 0, lo cual es falso`);
          return {
            solution: "Sin solución: La ecuación es una contradicción",
            steps
          };
        }
      }
      
      steps.push(`${variableCoefficient}${variable} = ${constantTerm}`);
      
      // Divide both sides by the coefficient
      const solution = constantTerm / variableCoefficient;
      steps.push(`${variable} = ${constantTerm} ÷ ${variableCoefficient}`);
      steps.push(`${variable} = ${solution}`);
      
      return {
        solution: `${variable} = ${solution}`,
        steps
      };
    } catch (error) {
      return {
        solution: "Error al resolver la ecuación",
        steps: ["Ocurrió un error al procesar la ecuación"]
      };
    }
  };

  const solveSystem2 = (eq1: string, eq2: string): EquationResult => {
    try {
      // Normalize equations
      eq1 = eq1.replace(/\s+/g, "");
      eq2 = eq2.replace(/\s+/g, "");
      
      if (!eq1.includes("=") || !eq2.includes("=")) {
        return {
          solution: "Error: Las ecuaciones deben contener un signo igual (=)",
          steps: []
        };
      }
      
      const steps: string[] = [];
      steps.push(`Sistema original:`);
      steps.push(`(1) ${eq1}`);
      steps.push(`(2) ${eq2}`);
      
      // Parse equations to standard form ax + by = c
      const [a1, b1, c1] = parseEquationToStandardForm(eq1);
      const [a2, b2, c2] = parseEquationToStandardForm(eq2);
      
      steps.push(`Convertimos a forma estándar a·x + b·y = c:`);
      steps.push(`(1) ${a1}x + ${b1}y = ${c1}`);
      steps.push(`(2) ${a2}x + ${b2}y = ${c2}`);
      
      // Check if the system has a unique solution
      const determinant = a1 * b2 - a2 * b1;
      
      if (determinant === 0) {
        // Check if the system is consistent
        if (a1 / a2 === b1 / b2 && a1 / a2 === c1 / c2) {
          return {
            solution: "El sistema tiene infinitas soluciones (ecuaciones dependientes)",
            steps: [...steps, "El determinante es 0 y las ecuaciones son múltiplos entre sí"]
          };
        } else {
          return {
            solution: "El sistema no tiene solución (ecuaciones inconsistentes)",
            steps: [...steps, "El determinante es 0 pero las ecuaciones no son múltiplos entre sí"]
          };
        }
      }
      
      // Solve using Cramer's rule
      steps.push(`Resolvemos usando la regla de Cramer:`);
      steps.push(`Determinante principal = ${a1} · ${b2} - ${a2} · ${b1} = ${determinant}`);
      
      const determinantX = c1 * b2 - c2 * b1;
      const determinantY = a1 * c2 - a2 * c1;
      
      const x = determinantX / determinant;
      const y = determinantY / determinant;
      
      steps.push(`Determinante para x = ${c1} · ${b2} - ${c2} · ${b1} = ${determinantX}`);
      steps.push(`Determinante para y = ${a1} · ${c2} - ${a2} · ${c1} = ${determinantY}`);
      steps.push(`x = ${determinantX} / ${determinant} = ${x}`);
      steps.push(`y = ${determinantY} / ${determinant} = ${y}`);
      
      return {
        solution: `x = ${x}, y = ${y}`,
        steps
      };
    } catch (error) {
      return {
        solution: "Error al resolver el sistema",
        steps: ["Ocurrió un error al procesar el sistema de ecuaciones"]
      };
    }
  };

  const solveSystem3 = (eq1: string, eq2: string, eq3: string): EquationResult => {
    try {
      // Normalize equations
      eq1 = eq1.replace(/\s+/g, "");
      eq2 = eq2.replace(/\s+/g, "");
      eq3 = eq3.replace(/\s+/g, "");
      
      if (!eq1.includes("=") || !eq2.includes("=") || !eq3.includes("=")) {
        return {
          solution: "Error: Las ecuaciones deben contener un signo igual (=)",
          steps: []
        };
      }
      
      const steps: string[] = [];
      steps.push(`Sistema original:`);
      steps.push(`(1) ${eq1}`);
      steps.push(`(2) ${eq2}`);
      steps.push(`(3) ${eq3}`);
      
      // TODO: Implement full 3-equation system solver
      // This is a simplified implementation that works for well-formed equations only
      
      // Parse equations to standard form ax + by + cz = d
      const [a1, b1, c1, d1] = parseEquation3ToStandardForm(eq1);
      const [a2, b2, c2, d2] = parseEquation3ToStandardForm(eq2);
      const [a3, b3, c3, d3] = parseEquation3ToStandardForm(eq3);
      
      steps.push(`Convertimos a forma estándar a·x + b·y + c·z = d:`);
      steps.push(`(1) ${a1}x + ${b1}y + ${c1}z = ${d1}`);
      steps.push(`(2) ${a2}x + ${b2}y + ${c2}z = ${d2}`);
      steps.push(`(3) ${a3}x + ${b3}y + ${c3}z = ${d3}`);
      
      // Check if the system has a unique solution using determinants
      // This is a simplified approach - a full implementation would check for dependent equations
      
      // Using Cramer's rule for 3 variables
      const det = determinant3x3(
        a1, b1, c1,
        a2, b2, c2,
        a3, b3, c3
      );
      
      if (Math.abs(det) < 1e-10) {
        return {
          solution: "El sistema puede no tener una solución única",
          steps: [...steps, "El determinante principal es aproximadamente 0"]
        };
      }
      
      steps.push(`Determinante principal = ${det.toFixed(4)}`);
      
      const detX = determinant3x3(
        d1, b1, c1,
        d2, b2, c2,
        d3, b3, c3
      );
      
      const detY = determinant3x3(
        a1, d1, c1,
        a2, d2, c2,
        a3, d3, c3
      );
      
      const detZ = determinant3x3(
        a1, b1, d1,
        a2, b2, d2,
        a3, b3, d3
      );
      
      const x = detX / det;
      const y = detY / det;
      const z = detZ / det;
      
      steps.push(`Determinante para x = ${detX.toFixed(4)}`);
      steps.push(`Determinante para y = ${detY.toFixed(4)}`);
      steps.push(`Determinante para z = ${detZ.toFixed(4)}`);
      
      steps.push(`x = ${detX.toFixed(4)} / ${det.toFixed(4)} = ${x.toFixed(4)}`);
      steps.push(`y = ${detY.toFixed(4)} / ${det.toFixed(4)} = ${y.toFixed(4)}`);
      steps.push(`z = ${detZ.toFixed(4)} / ${det.toFixed(4)} = ${z.toFixed(4)}`);
      
      return {
        solution: `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}, z = ${z.toFixed(4)}`,
        steps
      };
    } catch (error) {
      return {
        solution: "Error al resolver el sistema",
        steps: ["Ocurrió un error al procesar el sistema de ecuaciones"]
      };
    }
  };

  // Helper functions
  function parseTerms(expression: string): string[] {
    // Add '+' before negative signs for proper splitting
    expression = expression.replace(/-/g, "+-");
    if (expression.startsWith("+")) {
      expression = expression.substring(1);
    }
    
    // Split by + to get individual terms
    return expression.split("+").filter(term => term !== "");
  }

  function extractCoefficient(term: string, variable: string): number {
    if (term === variable) return 1;
    if (term === `-${variable}`) return -1;
    
    // Extract the coefficient
    const coefficientStr = term.replace(variable, "");
    return coefficientStr === "" ? 1 : parseFloat(coefficientStr);
  }

  function parseEquationToStandardForm(equation: string): [number, number, number] {
    const [leftSide, rightSide] = equation.split("=");
    
    // Initialize coefficients
    let a = 0; // coefficient of x
    let b = 0; // coefficient of y
    let c = 0; // constant term (will be moved to the right)
    
    // Process left side
    parseTerms(leftSide).forEach(term => {
      if (term.includes("x")) {
        a += extractCoefficient(term, "x");
      } else if (term.includes("y")) {
        b += extractCoefficient(term, "y");
      } else {
        c -= parseFloat(term); // Move to right side, so negate
      }
    });
    
    // Process right side
    parseTerms(rightSide).forEach(term => {
      if (term.includes("x")) {
        a -= extractCoefficient(term, "x"); // Move to left side, so negate
      } else if (term.includes("y")) {
        b -= extractCoefficient(term, "y"); // Move to left side, so negate
      } else {
        c += parseFloat(term);
      }
    });
    
    return [a, b, c];
  }

  function parseEquation3ToStandardForm(equation: string): [number, number, number, number] {
    const [leftSide, rightSide] = equation.split("=");
    
    // Initialize coefficients
    let a = 0; // coefficient of x
    let b = 0; // coefficient of y
    let c = 0; // coefficient of z
    let d = 0; // constant term (will be moved to the right)
    
    // Process left side
    parseTerms(leftSide).forEach(term => {
      if (term.includes("x")) {
        a += extractCoefficient(term, "x");
      } else if (term.includes("y")) {
        b += extractCoefficient(term, "y");
      } else if (term.includes("z")) {
        c += extractCoefficient(term, "z");
      } else {
        d -= parseFloat(term); // Move to right side, so negate
      }
    });
    
    // Process right side
    parseTerms(rightSide).forEach(term => {
      if (term.includes("x")) {
        a -= extractCoefficient(term, "x"); // Move to left side, so negate
      } else if (term.includes("y")) {
        b -= extractCoefficient(term, "y"); // Move to left side, so negate
      } else if (term.includes("z")) {
        c -= extractCoefficient(term, "z"); // Move to left side, so negate
      } else {
        d += parseFloat(term);
      }
    });
    
    return [a, b, c, d];
  }

  function determinant3x3(
    a1: number, a2: number, a3: number,
    b1: number, b2: number, b3: number,
    c1: number, c2: number, c3: number
  ): number {
    return (
      a1 * (b2 * c3 - b3 * c2) -
      a2 * (b1 * c3 - b3 * c1) +
      a3 * (b1 * c2 - b2 * c1)
    );
  }

  const handleSolve = () => {
    let result: EquationResult;
    let historyType: string;
    let historyInput: string;
    
    switch (activeTab) {
      case "linear":
        result = solveLinearEquation(equation);
        historyType = "Ecuación Lineal";
        historyInput = equation;
        break;
      case "system2":
        result = solveSystem2(equation, equation2);
        historyType = "Sistema 2×2";
        historyInput = `${equation}, ${equation2}`;
        break;
      case "system3":
        result = solveSystem3(equation, equation2, equation3);
        historyType = "Sistema 3×3";
        historyInput = `${equation}, ${equation2}, ${equation3}`;
        break;
      default:
        return;
    }
    
    setResult(result);
    
    // Add to history
    setHistory([
      { type: historyType, input: historyInput, result: result.solution },
      ...history.slice(0, 9) // Keep only last 10 entries
    ]);
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
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setResult(null);
              }}
              className="w-full"
            >
              <TabsList className="w-full mb-4">
                <TabsTrigger value="linear" className="flex-1">
                  Ecuación Lineal
                </TabsTrigger>
                <TabsTrigger value="system2" className="flex-1">
                  Sistema 2×2
                </TabsTrigger>
                <TabsTrigger value="system3" className="flex-1">
                  Sistema 3×3
                </TabsTrigger>
              </TabsList>

              <TabsContent value="linear">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="equation">Ecuación:</Label>
                    <Input
                      id="equation"
                      placeholder="Ejemplo: 2x + 3 = 7"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ingresa una ecuación lineal con una variable.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleSolve}
                    className="w-full"
                  >
                    Resolver
                  </Button>

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Solución:</p>
                      <p className="text-xl mt-1">{result.solution}</p>
                      
                      <p className="font-medium mt-4">Pasos:</p>
                      <ul className="space-y-1 mt-2 text-sm">
                        {result.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="system2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="equation1">Primera Ecuación:</Label>
                    <Input
                      id="equation1"
                      placeholder="Ejemplo: 2x + y = 5"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="equation2">Segunda Ecuación:</Label>
                    <Input
                      id="equation2"
                      placeholder="Ejemplo: x - y = 1"
                      value={equation2}
                      onChange={(e) => setEquation2(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSolve}
                    className="w-full"
                  >
                    Resolver Sistema
                  </Button>

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Solución:</p>
                      <p className="text-xl mt-1">{result.solution}</p>
                      
                      <p className="font-medium mt-4">Pasos:</p>
                      <ul className="space-y-1 mt-2 text-sm">
                        {result.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="system3">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="equation1-3">Primera Ecuación:</Label>
                    <Input
                      id="equation1-3"
                      placeholder="Ejemplo: x + y + z = 6"
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="equation2-3">Segunda Ecuación:</Label>
                    <Input
                      id="equation2-3"
                      placeholder="Ejemplo: 2x - y + z = 3"
                      value={equation2}
                      onChange={(e) => setEquation2(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="equation3-3">Tercera Ecuación:</Label>
                    <Input
                      id="equation3-3"
                      placeholder="Ejemplo: x + 2y - z = 4"
                      value={equation3}
                      onChange={(e) => setEquation3(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSolve}
                    className="w-full"
                  >
                    Resolver Sistema
                  </Button>

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Solución:</p>
                      <p className="text-xl mt-1">{result.solution}</p>
                      
                      <p className="font-medium mt-4">Pasos:</p>
                      <div className="max-h-48 overflow-y-auto mt-2">
                        <ul className="space-y-1 text-sm">
                          {result.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Historial</h3>
              {history.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="h-8 text-xs"
                >
                  Limpiar
                </Button>
              )}
            </div>
            <div className="max-h-[350px] overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay historial</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm p-2 bg-gray-50 rounded border border-gray-100"
                    >
                      <div className="font-medium">{item.type}</div>
                      <div className="text-xs text-gray-600 truncate">{item.input}</div>
                      <div className="mt-1">{item.result}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Esta calculadora de ecuaciones y sistemas te permite:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Ecuación Lineal:</strong> Resolver ecuaciones lineales con una variable</li>
              <li><strong>Sistema 2×2:</strong> Resolver sistemas de dos ecuaciones con dos incógnitas</li>
              <li><strong>Sistema 3×3:</strong> Resolver sistemas de tres ecuaciones con tres incógnitas</li>
            </ul>
            <p>
              <strong>Formato de entrada:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Escriba las ecuaciones usando variables x, y, z</li>
              <li>Incluya el signo igual (=) en cada ecuación</li>
              <li>Ejemplos: "2x + 3 = 7", "2x + y = 5", "x + y + z = 6"</li>
            </ul>
            <p>
              <strong>Métodos de resolución:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Para sistemas 2×2 se utiliza el método de determinantes (regla de Cramer)</li>
              <li>Para sistemas 3×3 se utiliza el método de determinantes expandido</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquationCalculator;
