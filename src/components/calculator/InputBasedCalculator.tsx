
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CalculatorInput from "@/components/CalculatorInput";
import { InputBasedCalculator as InputBasedCalculatorType } from "@/types/calculator";

type Props = {
  calculator: InputBasedCalculatorType;
  calculatorId: string;
};

const InputBasedCalculator = ({ calculator, calculatorId }: Props) => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const calculateResult = () => {
    const values = Object.values(inputs).map(Number);
    if (values.some(isNaN)) {
      toast({
        title: "Error de cálculo",
        description: "Por favor, introduce valores válidos en todos los campos.",
        variant: "destructive",
      });
      return;
    }

    let result: number;
    switch (calculatorId) {
      case "prestamo-personal": {
        const amount = Number(inputs.amount);
        const rate = Number(inputs.rate);
        const years = Number(inputs.years);
        const monthlyRate = rate / 1200; // Convert annual rate to monthly decimal
        const numberOfPayments = years * 12;
        result = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        break;
      }
      case "interes-compuesto": {
        const principal = Number(inputs.principal);
        const rate = Number(inputs.rate);
        const periods = Number(inputs.periods);
        const frequency = Number(inputs.frequency) || 1; // Default to annual if not specified
        result = principal * Math.pow(1 + (rate / (100 * frequency)), frequency * periods);
        break;
      }
      case "plazo-fijo": {
        const principal = Number(inputs.principal);
        const rate = Number(inputs.rate);
        const days = Number(inputs.days);
        // Simple interest formula for fixed-term deposits
        result = principal * (1 + (rate * days) / (100 * 365));
        break;
      }
      case "regla-72": {
        const rate = Number(inputs.rate);
        result = 72 / rate; // Simple rule of 72 calculation
        break;
      }
      default:
        result = 0;
    }

    setResult(result);
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Introduce los datos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {calculator.inputs.map((input) => (
            <CalculatorInput
              key={input.id}
              {...input}
              value={inputs[input.id] || ""}
              onChange={(value) => handleInputChange(input.id, value)}
            />
          ))}
          <Button onClick={calculateResult} className="w-full">
            Calcular
          </Button>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle>Resultado del cálculo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-2">
                {calculatorId === "prestamo-personal"
                  ? "Tu pago mensual estimado:"
                  : calculatorId === "interes-compuesto"
                  ? "Monto final con interés compuesto:"
                  : calculatorId === "plazo-fijo"
                  ? "Monto final de tu inversión:"
                  : "Años para duplicar tu inversión:"}
              </p>
              <p className="text-4xl font-bold text-primary">
                {calculatorId === "regla-72"
                  ? `${result.toFixed(1)} años`
                  : result.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 2,
                    })}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default InputBasedCalculator;
