import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [angleUnit, setAngleUnit] = useState<"deg" | "rad">("deg");
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [memory, setMemory] = useState<number | null>(null);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (firstNumber === null) {
      setFirstNumber(current);
      setHistory([...history, `${current} ${op}`]);
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(String(result));
      setHistory([...history, `${firstNumber} ${operation} ${current} = ${result}`]);
    }
    setNewNumber(true);
    setOperation(op);
  };

  const handleScientificOperation = (op: string) => {
    const current = parseFloat(display);
    let result: number;
    let formattedOp = op;

    try {
      switch (op) {
        case "sin":
          result = angleUnit === "deg" 
            ? Math.sin((current * Math.PI) / 180)
            : Math.sin(current);
          formattedOp = `sin${angleUnit === "deg" ? "°" : ""}`;
          break;
        case "cos":
          result = angleUnit === "deg"
            ? Math.cos((current * Math.PI) / 180)
            : Math.cos(current);
          formattedOp = `cos${angleUnit === "deg" ? "°" : ""}`;
          break;
        case "tan":
          result = angleUnit === "deg"
            ? Math.tan((current * Math.PI) / 180)
            : Math.tan(current);
          formattedOp = `tan${angleUnit === "deg" ? "°" : ""}`;
          break;
        case "asin":
          result = angleUnit === "deg"
            ? (Math.asin(current) * 180) / Math.PI
            : Math.asin(current);
          formattedOp = `asin${angleUnit === "deg" ? "°" : ""}`;
          break;
        case "acos":
          result = angleUnit === "deg"
            ? (Math.acos(current) * 180) / Math.PI
            : Math.acos(current);
          formattedOp = `acos${angleUnit === "deg" ? "°" : ""}`;
          break;
        case "atan":
          result = angleUnit === "deg"
            ? (Math.atan(current) * 180) / Math.PI
            : Math.atan(current);
          formattedOp = `atan${angleUnit === "deg" ? "°" : ""}`;
          break;
        case "log":
          result = Math.log10(current);
          formattedOp = "log₁₀";
          break;
        case "ln":
          result = Math.log(current);
          break;
        case "sqrt":
          result = Math.sqrt(current);
          formattedOp = "√";
          break;
        case "square":
          result = current * current;
          formattedOp = "^2";
          break;
        case "cube":
          result = current * current * current;
          formattedOp = "^3";
          break;
        case "fact":
          if (current < 0 || !Number.isInteger(current)) {
            throw new Error("Factorial only defined for non-negative integers");
          }
          result = factorial(current);
          formattedOp = "!";
          break;
        case "1/x":
          if (current === 0) {
            throw new Error("Division by zero");
          }
          result = 1 / current;
          formattedOp = "⁻¹";
          break;
        case "exp":
          result = Math.exp(current);
          formattedOp = "e^";
          break;
        case "10^x":
          result = Math.pow(10, current);
          formattedOp = "10^";
          break;
        case "pi":
          result = Math.PI;
          formattedOp = "π";
          setNewNumber(() => true);
          break;
        case "e":
          result = Math.E;
          formattedOp = "e";
          setNewNumber(() => true);
          break;
        default:
          result = current;
      }

      setDisplay(String(result));
      setHistory([...history, `${formattedOp}(${current}) = ${result}`]);
      setNewNumber(() => true);
    } catch (error) {
      setDisplay("Error");
      setNewNumber(() => true);
    }
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        if (second === 0) throw new Error("Division by zero");
        return first / second;
      case "^":
        return Math.pow(first, second);
      case "mod":
        return first % second;
      case "%":
        return (first * second) / 100;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    try {
      const current = parseFloat(display);
      if (operation && firstNumber !== null) {
        const result = calculate(firstNumber, current, operation);
        setDisplay(String(result));
        setHistory([...history, `${firstNumber} ${operation} ${current} = ${result}`]);
        setFirstNumber(null);
        setOperation(null);
        setNewNumber(() => true);
      }
    } catch (error) {
      setDisplay("Error");
      setNewNumber(() => true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(() => true);
  };

  const handleAllClear = () => {
    handleClear();
    setHistory([]);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
      setNewNumber(() => true);
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handleMemory = (action: string) => {
    const current = parseFloat(display);
    switch (action) {
      case "MC": // Memory Clear
        setMemory(null);
        break;
      case "MR": // Memory Recall
        if (memory !== null) {
          setDisplay(String(memory));
          setNewNumber(() => true);
        }
        break;
      case "M+": // Memory Add
        setMemory((memory || 0) + current);
        setNewNumber(() => true);
        break;
      case "M-": // Memory Subtract
        setMemory((memory || 0) - current);
        setNewNumber(() => true);
        break;
      case "MS": // Memory Store
        setMemory(current);
        setNewNumber(() => true);
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                <span className="text-xs font-semibold text-gray-500">
                  {operation && firstNumber !== null
                    ? `${firstNumber} ${operation}`
                    : " "}
                </span>
                <span className="text-xs font-semibold text-green-500">
                  {angleUnit === "deg" ? "DEG" : "RAD"}
                </span>
              </div>
              {memory !== null && (
                <span className="text-xs font-semibold text-blue-500">M</span>
              )}
            </div>
            <Input
              value={display}
              className="text-right text-2xl mb-4 font-mono"
              readOnly
            />
            
            <Tabs defaultValue="basic" onValueChange={(value) => setMode(value as "basic" | "advanced")}>
              <div className="flex justify-between items-center mb-2">
                <TabsList>
                  <TabsTrigger value="basic">Básica</TabsTrigger>
                  <TabsTrigger value="advanced">Avanzada</TabsTrigger>
                </TabsList>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline" 
                    size="sm"
                    onClick={() => setAngleUnit("deg")}
                    className={angleUnit === "deg" ? "bg-green-100" : ""}
                  >
                    DEG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAngleUnit("rad")}
                    className={angleUnit === "rad" ? "bg-green-100" : ""}
                  >
                    RAD
                  </Button>
                </div>
              </div>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <Button
                    variant="outline"
                    onClick={() => handleMemory("MC")}
                    className="text-blue-500"
                  >
                    MC
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleMemory("MR")}
                    className="text-blue-500"
                  >
                    MR
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleMemory("M+")}
                    className="text-blue-500"
                  >
                    M+
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleMemory("M-")}
                    className="text-blue-500"
                  >
                    M-
                  </Button>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={handleAllClear}
                    className="bg-red-50 hover:bg-red-100"
                  >
                    AC
                  </Button>
                  <Button variant="outline" onClick={handleClear}>
                    C
                  </Button>
                  <Button variant="outline" onClick={handleBackspace}>
                    ⌫
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("÷")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    ÷
                  </Button>
                  {[7, 8, 9].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handleNumber(String(num))}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("×")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    ×
                  </Button>
                  {[4, 5, 6].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handleNumber(String(num))}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("-")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    -
                  </Button>
                  {[1, 2, 3].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handleNumber(String(num))}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("+")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    +
                  </Button>
                  <Button variant="outline" onClick={handleToggleSign}>
                    ±
                  </Button>
                  <Button variant="outline" onClick={() => handleNumber("0")}>
                    0
                  </Button>
                  <Button variant="outline" onClick={handleDecimal}>
                    .
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleEquals}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    =
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("pi")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    π
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("e")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    e
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("log")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    log
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("ln")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    ln
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("mod")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    mod
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("sin")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    sin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("cos")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    cos
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("tan")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    tan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("^")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    x^y
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("sqrt")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    √x
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("asin")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    asin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("acos")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    acos
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("atan")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    atan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("square")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    x²
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("cube")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    x³
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("10^x")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    10^x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("exp")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    e^x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("fact")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    n!
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleScientificOperation("1/x")}
                    className="bg-purple-50 hover:bg-purple-100"
                  >
                    1/x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAllClear}
                    className="bg-red-50 hover:bg-red-100"
                  >
                    AC
                  </Button>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {[7, 8, 9].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handleNumber(String(num))}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("÷")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    ÷
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBackspace}
                  >
                    ⌫
                  </Button>
                  
                  {[4, 5, 6].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handleNumber(String(num))}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("×")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    ×
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClear}
                  >
                    C
                  </Button>
                  
                  {[1, 2, 3].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      onClick={() => handleNumber(String(num))}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("-")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    -
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleToggleSign}
                  >
                    ±
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleNumber("0")}
                    className="col-span-2"
                  >
                    0
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDecimal}
                  >
                    .
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOperation("+")}
                    className="bg-amber-50 hover:bg-amber-100"
                  >
                    +
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleEquals}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    =
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-sm">Historial de operaciones</h3>
            <div className="max-h-[400px] overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay historial de operaciones</p>
              ) : (
                <ul className="space-y-1">
                  {history.map((item, index) => (
                    <li key={index} className="text-sm p-2 bg-gray-50 rounded">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {history.length > 0 && (
              <Button
                variant="ghost"
                onClick={handleAllClear}
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
              Esta calculadora científica ofrece dos modos de operación:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Básica</strong>: Funciones aritméticas estándar</li>
              <li><strong>Avanzada</strong>: Funciones científicas como trigonometría, logaritmos y más</li>
            </ul>
            <p className="mt-2">
              <strong>Funciones disponibles:</strong>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <p className="font-medium">Trigonométricas:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>sin, cos, tan</li>
                  <li>asin, acos, atan</li>
                  <li>Cambio DEG/RAD</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Logarítmicas:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>log (base 10)</li>
                  <li>ln (base e)</li>
                  <li>10^x, e^x</li>
                </ul>
              </div>
              <div>
                <p className="font-medium">Otras:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>x², x³, x^y, √x</li>
                  <li>π, e (constantes)</li>
                  <li>n!, 1/x, mod</li>
                </ul>
              </div>
            </div>
            <p className="mt-2">
              El historial de operaciones se muestra a la derecha, permitiéndote ver los cálculos anteriores.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientificCalculator;
