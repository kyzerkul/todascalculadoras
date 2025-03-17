import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CasioFX82MS = () => {
  const [display, setDisplay] = useState("0");
  const [secondaryDisplay, setSecondaryDisplay] = useState("");
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [shiftMode, setShiftMode] = useState(false);
  const [degreeMode, setDegreeMode] = useState(true); // true = degrees, false = radians
  const [history, setHistory] = useState<string[]>([]);

  // Handle number input
  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  // Handle decimal point
  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Handle operations
  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (operation === null) {
      setFirstNumber(current);
      setOperation(op);
      setNewNumber(true);
      setSecondaryDisplay(`${current} ${getOperationSymbol(op)}`);
    } else {
      // Handle chain calculations
      const result = calculate(firstNumber as number, current, operation);
      setFirstNumber(result);
      setOperation(op);
      setDisplay(String(result));
      setNewNumber(true);
      setSecondaryDisplay(`${result} ${getOperationSymbol(op)}`);
    }
  };

  // Handle equals
  const handleEquals = () => {
    if (operation === null || firstNumber === null) return;
    
    const current = parseFloat(display);
    const result = calculate(firstNumber, current, operation);
    
    setDisplay(formatNumber(result));
    setHistory([`${firstNumber} ${getOperationSymbol(operation)} ${current} = ${result}`, ...history.slice(0, 9)]);
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
    setSecondaryDisplay("");
  };

  // Calculate result
  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return a / b;
      case "^": return Math.pow(a, b);
      case "root": return Math.pow(a, 1 / b);
      default: return b;
    }
  };

  // Get operation symbol for display
  const getOperationSymbol = (op: string): string => {
    switch (op) {
      case "+": return "+";
      case "-": return "-";
      case "*": return "×";
      case "/": return "÷";
      case "^": return "^";
      case "root": return "√";
      default: return "";
    }
  };

  // Handle scientific operations
  const handleScientificOperation = (op: string) => {
    const current = parseFloat(display);
    let result: number;
    let formattedOp: string = op;

    try {
      switch (op) {
        case "sin":
          result = degreeMode ? 
            Math.sin(current * Math.PI / 180) : 
            Math.sin(current);
          formattedOp = "sin";
          break;
        case "cos":
          result = degreeMode ? 
            Math.cos(current * Math.PI / 180) : 
            Math.cos(current);
          formattedOp = "cos";
          break;
        case "tan":
          result = degreeMode ? 
            Math.tan(current * Math.PI / 180) : 
            Math.tan(current);
          formattedOp = "tan";
          break;
        case "asin":
          if (current < -1 || current > 1) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.asin(current);
          if (degreeMode) result = result * 180 / Math.PI;
          formattedOp = "sin⁻¹";
          break;
        case "acos":
          if (current < -1 || current > 1) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.acos(current);
          if (degreeMode) result = result * 180 / Math.PI;
          formattedOp = "cos⁻¹";
          break;
        case "atan":
          result = Math.atan(current);
          if (degreeMode) result = result * 180 / Math.PI;
          formattedOp = "tan⁻¹";
          break;
        case "ln":
          if (current <= 0) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.log(current);
          formattedOp = "ln";
          break;
        case "log":
          if (current <= 0) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.log10(current);
          formattedOp = "log";
          break;
        case "sqrt":
          if (current < 0) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.sqrt(current);
          formattedOp = "√";
          break;
        case "x2":
          result = Math.pow(current, 2);
          formattedOp = "x²";
          break;
        case "1/x":
          if (current === 0) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = 1 / current;
          formattedOp = "1/x";
          break;
        case "factorial":
          if (current < 0 || !Number.isInteger(current)) {
            setDisplay("Math ERROR");
            setNewNumber(true);
            return;
          }
          result = factorial(current);
          formattedOp = "x!";
          break;
        default:
          result = current;
          break;
      }

      setDisplay(formatNumber(result));
      setHistory([`${formattedOp}(${current}) = ${result}`, ...history.slice(0, 9)]);
      setNewNumber(true);
    } catch (error) {
      setDisplay("Error");
      setNewNumber(true);
    }
  };

  // Calculate factorial
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  // Format number for display
  const formatNumber = (num: number): string => {
    // Handle very large or small numbers with scientific notation
    if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }
    
    const strNum = num.toString();
    // If the number has a decimal part
    if (strNum.includes('.')) {
      // Remove trailing zeros
      return strNum.replace(/\.?0+$/, '');
    }
    
    return strNum;
  };

  // Handle memory operations
  const handleMemory = (action: string) => {
    const current = parseFloat(display);
    
    switch (action) {
      case "MC": // Memory Clear
        setMemory(null);
        break;
      case "MR": // Memory Recall
        if (memory !== null) {
          setDisplay(String(memory));
          setNewNumber(true);
        }
        break;
      case "M+": // Memory Add
        setMemory((memory || 0) + current);
        setNewNumber(true);
        break;
      case "M-": // Memory Subtract
        setMemory((memory || 0) - current);
        setNewNumber(true);
        break;
    }
  };

  // Handle clear and all clear
  const handleClear = () => {
    setDisplay("0");
    setNewNumber(true);
  };

  const handleAllClear = () => {
    setDisplay("0");
    setSecondaryDisplay("");
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
    setShiftMode(false);
  };

  // Handle sign change
  const handleSignChange = () => {
    setDisplay(String(-parseFloat(display)));
  };

  // Handle shift mode
  const handleShift = () => {
    setShiftMode(!shiftMode);
  };

  // Handle degree mode toggle
  const handleDegreeMode = () => {
    setDegreeMode(!degreeMode);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <div className="calculator-body bg-gray-300 p-4 rounded-lg shadow-md border border-gray-400">
              <div className="calculator-brand flex justify-between items-center mb-2">
                <span className="text-blue-800 font-bold">CASIO</span>
                <span className="text-blue-800 font-semibold">fx-82MS</span>
              </div>
              
              {/* Calculator Display */}
              <div className="calculator-display mb-4">
                <div className="bg-green-100 border-2 border-gray-500 rounded p-2 font-mono">
                  <div className="text-xs text-gray-600 h-4">
                    {secondaryDisplay}
                    {memory !== null && <span className="ml-2">M</span>}
                    {shiftMode && <span className="ml-2">SHIFT</span>}
                    {degreeMode ? <span className="ml-2">DEG</span> : <span className="ml-2">RAD</span>}
                  </div>
                  <div className="text-right text-xl">{display}</div>
                </div>
              </div>
              
              {/* Mode buttons */}
              <div className="mode-buttons grid grid-cols-4 gap-1 mb-2">
                <Button 
                  className={`h-10 ${shiftMode ? 'bg-yellow-500' : 'bg-yellow-400'}`}
                  onClick={handleShift}
                >
                  SHIFT
                </Button>
                <Button 
                  className="h-10 bg-blue-400"
                  onClick={handleDegreeMode}
                >
                  {degreeMode ? "DEG" : "RAD"}
                </Button>
                <Button variant="outline" className="h-10" onClick={handleAllClear}>
                  AC
                </Button>
                <Button variant="destructive" className="h-10" onClick={handleClear}>
                  C
                </Button>
              </div>
              
              {/* Scientific buttons */}
              <div className="scientific-buttons grid grid-cols-4 gap-1 mb-2">
                <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("asin") : handleScientificOperation("sin")}>
                  {shiftMode ? "sin⁻¹" : "sin"}
                </Button>
                <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("acos") : handleScientificOperation("cos")}>
                  {shiftMode ? "cos⁻¹" : "cos"}
                </Button>
                <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("atan") : handleScientificOperation("tan")}>
                  {shiftMode ? "tan⁻¹" : "tan"}
                </Button>
                <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleOperation("^") : handleScientificOperation("x2")}>
                  {shiftMode ? "^" : "x²"}
                </Button>
                
                <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("1/x") : handleScientificOperation("sqrt")}>
                  {shiftMode ? "1/x" : "√"}
                </Button>
                <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("factorial") : handleOperation("^")}>
                  {shiftMode ? "x!" : "^"}
                </Button>
                <Button variant="outline" className="h-10" onClick={() => handleScientificOperation("log")}>
                  log
                </Button>
                <Button variant="outline" className="h-10" onClick={() => handleScientificOperation("ln")}>
                  ln
                </Button>
              </div>
              
              {/* Memory buttons */}
              <div className="memory-buttons grid grid-cols-4 gap-1 mb-2">
                <Button variant="secondary" className="h-10" onClick={() => handleMemory("MC")}>MC</Button>
                <Button variant="secondary" className="h-10" onClick={() => handleMemory("MR")}>MR</Button>
                <Button variant="secondary" className="h-10" onClick={() => handleMemory("M-")}>M-</Button>
                <Button variant="secondary" className="h-10" onClick={() => handleMemory("M+")}>M+</Button>
              </div>
              
              {/* Numeric keypad */}
              <div className="grid grid-cols-4 gap-1">
                <Button variant="outline" className="h-10" onClick={() => handleNumber("7")}>7</Button>
                <Button variant="outline" className="h-10" onClick={() => handleNumber("8")}>8</Button>
                <Button variant="outline" className="h-10" onClick={() => handleNumber("9")}>9</Button>
                <Button variant="default" className="h-10 bg-blue-600" onClick={() => handleOperation("/")}>÷</Button>
                
                <Button variant="outline" className="h-10" onClick={() => handleNumber("4")}>4</Button>
                <Button variant="outline" className="h-10" onClick={() => handleNumber("5")}>5</Button>
                <Button variant="outline" className="h-10" onClick={() => handleNumber("6")}>6</Button>
                <Button variant="default" className="h-10 bg-blue-600" onClick={() => handleOperation("*")}>×</Button>
                
                <Button variant="outline" className="h-10" onClick={() => handleNumber("1")}>1</Button>
                <Button variant="outline" className="h-10" onClick={() => handleNumber("2")}>2</Button>
                <Button variant="outline" className="h-10" onClick={() => handleNumber("3")}>3</Button>
                <Button variant="default" className="h-10 bg-blue-600" onClick={() => handleOperation("-")}>−</Button>
                
                <Button variant="outline" className="h-10" onClick={() => handleNumber("0")}>0</Button>
                <Button variant="outline" className="h-10" onClick={handleDecimal}>.</Button>
                <Button variant="outline" className="h-10" onClick={handleSignChange}>±</Button>
                <Button variant="default" className="h-10 bg-blue-600" onClick={() => handleOperation("+")}>+</Button>
                
                <Button variant="default" className="h-10 col-span-4 bg-red-500" onClick={handleEquals}>=</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Historial</h3>
            <div className="max-h-[400px] overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay historial</p>
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
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Casio FX-82MS</strong> - Simulador de calculadora científica con las siguientes características:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pantalla con visualización natural de dos líneas</li>
              <li>Operaciones aritméticas básicas: suma, resta, multiplicación y división</li>
              <li>Funciones trigonométricas (sin, cos, tan) y sus inversas</li>
              <li>Logaritmos naturales y base 10</li>
              <li>Cálculo de potencias, raíces cuadradas y factorial</li>
              <li>Conversión de unidades entre grados y radianes</li>
              <li>Sistema de memoria con operaciones MC, MR, M+, M-</li>
            </ul>
            <p>
              <strong>Instrucciones:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>SHIFT</strong>: Accede a funciones secundarias</li>
              <li><strong>DEG/RAD</strong>: Alterna entre modo de grados y radianes</li>
              <li><strong>AC</strong>: Borrar todo / <strong>C</strong>: Borrar entrada actual</li>
              <li><strong>MC, MR, M+, M-</strong>: Operaciones de memoria</li>
              <li>Para calcular senos, cosenos o tangentes, primero introduce el ángulo y luego presiona la función</li>
            </ul>
            <p className="italic">
              Esta calculadora es conocida por su durabilidad y facilidad de uso, siendo un modelo popular entre estudiantes y profesionales.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasioFX82MS;
