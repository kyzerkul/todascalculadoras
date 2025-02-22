
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CalculatorInput from "@/components/CalculatorInput";

const CalculatorPage = () => {
  const { calculatorId } = useParams();
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    amount: "",
    rate: "",
    years: "",
  });
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const amount = parseFloat(inputs.amount);
    const rate = parseFloat(inputs.rate) / 100;
    const years = parseFloat(inputs.years);

    if (isNaN(amount) || isNaN(rate) || isNaN(years)) {
      toast({
        title: "Error de cálculo",
        description: "Por favor, introduce valores válidos en todos los campos.",
        variant: "destructive",
      });
      return;
    }

    // Example calculation for a loan calculator
    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setResult(monthlyPayment);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Calculator Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Calculator className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Calculadora de Hipoteca
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calcula tu pago mensual de hipoteca basado en el monto del préstamo, la tasa de interés y el plazo.
          </p>
        </div>

        {/* Calculator Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduce los datos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CalculatorInput
              label="Monto del préstamo"
              id="amount"
              value={inputs.amount}
              onChange={(value) => setInputs({ ...inputs, amount: value })}
              suffix="€"
              helper="Ingresa el monto total del préstamo"
            />
            <CalculatorInput
              label="Tasa de interés anual"
              id="rate"
              value={inputs.rate}
              onChange={(value) => setInputs({ ...inputs, rate: value })}
              suffix="%"
              helper="Ingresa la tasa de interés anual"
            />
            <CalculatorInput
              label="Plazo (años)"
              id="years"
              value={inputs.years}
              onChange={(value) => setInputs({ ...inputs, years: value })}
              helper="Ingresa la duración del préstamo en años"
            />
            <Button onClick={handleCalculate} className="w-full">
              Calcular
            </Button>
          </CardContent>
        </Card>

        {/* Results Display */}
        {result !== null && (
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle>Resultado del cálculo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">Tu pago mensual estimado:</p>
                <p className="text-4xl font-bold text-primary">
                  {result.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;
