import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
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

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        return second !== 0 ? first / second : NaN;
      case "%":
        return (first * second) / 100;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    const current = parseFloat(display);
    if (operation && firstNumber !== null) {
      const result = calculate(firstNumber, current, operation);
      setDisplay(String(result));
      setHistory([...history, `${firstNumber} ${operation} ${current} = ${result}`]);
      setFirstNumber(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperation(null);
    setNewNumber(true);
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
      setNewNumber(true);
    }
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    if (firstNumber === null) {
      setDisplay(String(current / 100));
    } else {
      const result = calculate(firstNumber, current, "%");
      setDisplay(String(result));
    }
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">
                {operation && firstNumber !== null
                  ? `${firstNumber} ${operation}`
                  : " "}
              </span>
              {memory !== null && (
                <span className="text-xs font-semibold text-blue-500">M</span>
              )}
            </div>
            <Input
              value={display}
              className="text-right text-2xl mb-4 font-mono"
              readOnly
            />
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
              <Button
                variant="outline"
                onClick={handleClear}
              >
                C
              </Button>
              <Button
                variant="outline"
                onClick={handleBackspace}
              >
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
              <Button
                variant="outline"
                onClick={handleToggleSign}
              >
                ±
              </Button>
              <Button
                variant="outline"
                onClick={() => handleNumber("0")}
              >
                0
              </Button>
              <Button variant="outline" onClick={handleDecimal}>
                .
              </Button>
              <Button
                variant="outline"
                onClick={handlePercentage}
                className="bg-amber-50 hover:bg-amber-100"
              >
                %
              </Button>
              <Button
                variant="default"
                onClick={handleEquals}
                className="col-span-4 bg-blue-500 hover:bg-blue-600"
              >
                =
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardContent className="p-4">
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
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Esta calculadora básica te permite realizar cálculos aritméticos simples con funcionalidades adicionales:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>AC</strong>: Borrar todo (incluyendo historial)</li>
              <li><strong>C</strong>: Borrar entrada actual</li>
              <li><strong>⌫</strong>: Borrar último dígito</li>
              <li><strong>±</strong>: Cambiar signo del número</li>
              <li><strong>%</strong>: Calcular porcentaje</li>
              <li><strong>MC</strong>: Borrar memoria</li>
              <li><strong>MR</strong>: Recuperar valor de memoria</li>
              <li><strong>M+</strong>: Sumar a memoria</li>
              <li><strong>M-</strong>: Restar de memoria</li>
            </ul>
            <p>
              El historial de operaciones se muestra a la derecha, permitiéndote ver los cálculos anteriores.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicCalculator;
