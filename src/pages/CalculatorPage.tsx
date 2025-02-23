
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CalculatorInput from "@/components/CalculatorInput";

const calculators = {
  "prestamo-personal": {
    title: "Calculadora de Préstamo Personal",
    description: "Calcula tu pago mensual y el costo total del préstamo",
    inputs: [
      {
        id: "amount",
        label: "Monto del préstamo",
        type: "number",
        suffix: "€",
        helper: "Ingresa el monto total del préstamo",
      },
      {
        id: "rate",
        label: "Tasa de interés anual",
        type: "number",
        suffix: "%",
        helper: "Ingresa la tasa de interés anual",
      },
      {
        id: "years",
        label: "Plazo (años)",
        type: "number",
        helper: "Ingresa la duración del préstamo en años",
      },
    ],
  },
  "plazo-fijo": {
    title: "Calculadora de Plazo Fijo",
    description: "Calcula el interés y monto final de tu inversión a plazo fijo",
    inputs: [
      {
        id: "principal",
        label: "Capital inicial",
        type: "number",
        suffix: "€",
        helper: "Ingresa el monto a invertir",
      },
      {
        id: "rate",
        label: "Tasa de interés anual",
        type: "number",
        suffix: "%",
        helper: "Ingresa la tasa de interés anual",
      },
      {
        id: "days",
        label: "Plazo (días)",
        type: "number",
        helper: "Ingresa la duración de la inversión en días",
      },
    ],
  },
  "regla-72": {
    title: "Calculadora de la Regla del 72",
    description: "Calcula en cuántos años se duplicará tu inversión",
    inputs: [
      {
        id: "rate",
        label: "Tasa de interés anual",
        type: "number",
        suffix: "%",
        helper: "Ingresa la tasa de interés anual",
      },
    ],
  },
};

const CalculatorPage = () => {
  const { calculatorId } = useParams();
  const { toast } = useToast();
  const calculator = calculators[calculatorId as keyof typeof calculators];
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);

  if (!calculator) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Calculadora no encontrada</h1>
          <Link to="/calculadoras" className="text-primary hover:underline">
            Ver todas las calculadoras
          </Link>
        </div>
      </div>
    );
  }

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
        const rate = Number(inputs.rate) / 100;
        const years = Number(inputs.years);
        const monthlyRate = rate / 12;
        const numberOfPayments = years * 12;
        result =
          (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        break;
      }
      case "plazo-fijo": {
        const principal = Number(inputs.principal);
        const rate = Number(inputs.rate) / 100;
        const days = Number(inputs.days);
        result = principal * (1 + (rate * days) / 365);
        break;
      }
      case "regla-72": {
        const rate = Number(inputs.rate);
        result = 72 / rate;
        break;
      }
      default:
        result = 0;
    }

    setResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Link
          to="/categoria/financieras"
          className="inline-flex items-center text-primary hover:underline mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a calculadoras financieras
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            {calculator.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {calculator.description}
          </p>
        </div>

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
