import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HP300SPlus = () => {
  const [display, setDisplay] = useState("0");
  const [secondaryDisplay, setSecondaryDisplay] = useState("");
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [shiftMode, setShiftMode] = useState(false);
  const [degreeMode, setDegreeMode] = useState(true); // true = degrees, false = radians
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("standard");

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
      case "%": 
        if (operation === "+" || operation === "-") {
          return (a * b) / 100;
        } else if (operation === "*" || operation === "/") {
          return b / 100;
        }
        return b / 100;
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
      case "%": return "%";
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
            setDisplay("ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.asin(current);
          if (degreeMode) result = result * 180 / Math.PI;
          formattedOp = "sin⁻¹";
          break;
        case "acos":
          if (current < -1 || current > 1) {
            setDisplay("ERROR");
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
            setDisplay("ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.log(current);
          formattedOp = "ln";
          break;
        case "log":
          if (current <= 0) {
            setDisplay("ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.log10(current);
          formattedOp = "log";
          break;
        case "sqrt":
          if (current < 0) {
            setDisplay("ERROR");
            setNewNumber(true);
            return;
          }
          result = Math.sqrt(current);
          formattedOp = "√";
          break;
        case "cbrt":
          result = Math.cbrt(current);
          formattedOp = "∛";
          break;
        case "x2":
          result = Math.pow(current, 2);
          formattedOp = "x²";
          break;
        case "x3":
          result = Math.pow(current, 3);
          formattedOp = "x³";
          break;
        case "1/x":
          if (current === 0) {
            setDisplay("ERROR");
            setNewNumber(true);
            return;
          }
          result = 1 / current;
          formattedOp = "1/x";
          break;
        case "exp":
          result = Math.exp(current);
          formattedOp = "e^x";
          break;
        case "10^x":
          result = Math.pow(10, current);
          formattedOp = "10^x";
          break;
        case "factorial":
          if (current < 0 || !Number.isInteger(current)) {
            setDisplay("ERROR");
            setNewNumber(true);
            return;
          }
          result = factorial(current);
          formattedOp = "x!";
          break;
        case "pi":
          result = Math.PI;
          formattedOp = "π";
          break;
        case "abs":
          result = Math.abs(current);
          formattedOp = "|x|";
          break;
        case "floor":
          result = Math.floor(current);
          formattedOp = "⌊x⌋";
          break;
        case "ceil":
          result = Math.ceil(current);
          formattedOp = "⌈x⌉";
          break;
        case "random":
          result = Math.random();
          formattedOp = "random()";
          break;
        default:
          result = current;
          break;
      }

      setDisplay(formatNumber(result));
      setHistory([`${formattedOp}(${current}) = ${result}`, ...history.slice(0, 9)]);
      setNewNumber(true);
    } catch (error) {
      setDisplay("ERROR");
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
      case "MS": // Memory Store
        setMemory(current);
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

  // Render calculator layout based on active tab
  const renderCalculator = () => {
    return (
      <div className="calculator-body bg-slate-700 p-4 rounded-lg shadow-md border border-slate-600">
        <div className="calculator-brand flex justify-between items-center mb-2">
          <span className="text-white font-bold">HP</span>
          <span className="text-white font-semibold">300s+</span>
        </div>
        
        {/* Calculator Display */}
        <div className="calculator-display mb-4">
          <div className="bg-green-100 border-2 border-slate-800 rounded p-2 font-mono">
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
            className="h-10 bg-blue-500"
            onClick={handleDegreeMode}
          >
            {degreeMode ? "DEG" : "RAD"}
          </Button>
          <Button variant="destructive" className="h-10" onClick={handleAllClear}>
            AC
          </Button>
          <Button variant="destructive" className="h-10" onClick={handleClear}>
            C
          </Button>
        </div>
        
        {activeTab === "standard" ? (
          <>
            {/* Memory buttons */}
            <div className="memory-buttons grid grid-cols-4 gap-1 mb-2">
              <Button variant="secondary" className="h-10" onClick={() => handleMemory("MC")}>MC</Button>
              <Button variant="secondary" className="h-10" onClick={() => handleMemory("MR")}>MR</Button>
              <Button variant="secondary" className="h-10" onClick={() => handleMemory("MS")}>MS</Button>
              <Button variant="secondary" className="h-10" onClick={() => handleMemory("M+")}>M+</Button>
            </div>
            
            {/* Numeric keypad */}
            <div className="grid grid-cols-4 gap-1">
              <Button variant="outline" className="h-10" onClick={() => handleOperation("%")}>%</Button>
              <Button variant="outline" className="h-10" onClick={handleSignChange}>±</Button>
              <Button variant="outline" className="h-10" onClick={() => handleScientificOperation("sqrt")}>√</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("/")}>÷</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("7")}>7</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("8")}>8</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("9")}>9</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("*")}>×</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("4")}>4</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("5")}>5</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("6")}>6</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("-")}>−</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("1")}>1</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("2")}>2</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("3")}>3</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("+")}>+</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("0")}>0</Button>
              <Button variant="outline" className="h-10" onClick={handleDecimal}>.</Button>
              <Button variant="outline" className="h-10" onClick={() => handleScientificOperation("1/x")}>1/x</Button>
              <Button variant="default" className="h-10 bg-green-500" onClick={handleEquals}>=</Button>
            </div>
          </>
        ) : (
          <>
            {/* Scientific functions */}
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
              <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("pi") : handleScientificOperation("factorial")}>
                {shiftMode ? "π" : "x!"}
              </Button>
            </div>
            
            <div className="scientific-buttons grid grid-cols-4 gap-1 mb-2">
              <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("10^x") : handleScientificOperation("log")}>
                {shiftMode ? "10^x" : "log"}
              </Button>
              <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("exp") : handleScientificOperation("ln")}>
                {shiftMode ? "e^x" : "ln"}
              </Button>
              <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("cbrt") : handleScientificOperation("sqrt")}>
                {shiftMode ? "∛" : "√"}
              </Button>
              <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("x3") : handleScientificOperation("x2")}>
                {shiftMode ? "x³" : "x²"}
              </Button>
            </div>
            
            <div className="scientific-buttons grid grid-cols-4 gap-1 mb-2">
              <Button variant="outline" className="h-10" onClick={() => shiftMode ? handleScientificOperation("ceil") : handleScientificOperation("floor")}>
                {shiftMode ? "⌈x⌉" : "⌊x⌋"}
              </Button>
              <Button variant="outline" className="h-10" onClick={() => handleScientificOperation("abs")}>
                |x|
              </Button>
              <Button variant="outline" className="h-10" onClick={() => handleOperation("^")}>
                x^y
              </Button>
              <Button variant="outline" className="h-10" onClick={() => handleOperation("root")}>
                y√x
              </Button>
            </div>
            
            <div className="numeric-buttons grid grid-cols-4 gap-1">
              <Button variant="outline" className="h-10" onClick={() => handleNumber("7")}>7</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("8")}>8</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("9")}>9</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("/")}>÷</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("4")}>4</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("5")}>5</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("6")}>6</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("*")}>×</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("1")}>1</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("2")}>2</Button>
              <Button variant="outline" className="h-10" onClick={() => handleNumber("3")}>3</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("-")}>−</Button>
              
              <Button variant="outline" className="h-10" onClick={() => handleNumber("0")}>0</Button>
              <Button variant="outline" className="h-10" onClick={handleDecimal}>.</Button>
              <Button variant="outline" className="h-10" onClick={handleSignChange}>±</Button>
              <Button variant="default" className="h-10 bg-blue-500" onClick={() => handleOperation("+")}>+</Button>
              
              <Button variant="default" className="h-10 col-span-4 bg-green-500" onClick={handleEquals}>=</Button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="standard" onValueChange={setActiveTab} className="mb-4">
            <TabsList className="w-full">
              <TabsTrigger value="standard" className="flex-1">Estándar</TabsTrigger>
              <TabsTrigger value="scientific" className="flex-1">Científica</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Card>
            <CardContent className="p-6">
              {renderCalculator()}
            </CardContent>
          </Card>
        </div>

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
              <strong>HP 300s+</strong> - Simulador de calculadora científica con las siguientes características:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Pantalla LCD de 4 líneas de alta resolución</li>
              <li>315 funciones científicas y matemáticas integradas</li>
              <li>Funciones algebraicas y trigonométricas</li>
              <li>Modos estándar y científico</li>
              <li>Operaciones con fracciones y porcentajes</li>
              <li>Cálculos estadísticos</li>
              <li>Memorias para almacenar resultados</li>
            </ul>
            <p>
              <strong>Instrucciones:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Utiliza las pestañas superiores para cambiar entre modo estándar y científico</li>
              <li><strong>SHIFT</strong>: Accede a funciones secundarias</li>
              <li><strong>DEG/RAD</strong>: Alterna entre grados y radianes para cálculos trigonométricos</li>
              <li><strong>AC</strong>: Borrar todo / <strong>C</strong>: Borrar entrada actual</li>
              <li><strong>MC, MR, MS, M+</strong>: Operaciones de memoria</li>
            </ul>
            <p className="italic">
              La HP 300s+ es una calculadora versátil diseñada para estudiantes y profesionales, ideal para matemáticas, ciencias, ingeniería y finanzas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HP300SPlus;
