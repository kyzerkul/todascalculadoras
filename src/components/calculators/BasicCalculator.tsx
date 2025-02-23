
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState(true);

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
    } else if (operation) {
      const result = calculate(firstNumber, current, operation);
      setFirstNumber(result);
      setDisplay(String(result));
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
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    const current = parseFloat(display);
    if (operation && firstNumber !== null) {
      const result = calculate(firstNumber, current, operation);
      setDisplay(String(result));
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

  return (
    <Card className="w-full max-w-xs mx-auto">
      <CardContent className="p-4">
        <Input
          value={display}
          className="text-right text-xl mb-4"
          readOnly
        />
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={handleClear}
            className="col-span-2"
          >
            C
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperation("÷")}
          >
            ÷
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperation("×")}
          >
            ×
          </Button>
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
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
          >
            -
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumber("0")}
            className="col-span-2"
          >
            0
          </Button>
          <Button variant="outline" onClick={handleDecimal}>
            .
          </Button>
          <Button
            variant="outline"
            onClick={() => handleOperation("+")}
          >
            +
          </Button>
          <Button
            variant="default"
            onClick={handleEquals}
            className="col-span-4"
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicCalculator;
