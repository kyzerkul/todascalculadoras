import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import CalculatorInput from "@/components/CalculatorInput";

type CalculatorInputConfig = {
  id: string;
  label: string;
  type: "number" | "text";
  suffix?: string;
  helper: string;
};

type InputBasedCalculator = {
  title: string;
  description: string;
  inputs: CalculatorInputConfig[];
  component?: never;
};

type ComponentBasedCalculator = {
  title: string;
  description: string;
  component: () => Promise<React.ComponentType>;
  inputs?: never;
};

type Calculator = InputBasedCalculator | ComponentBasedCalculator;

type Calculators = {
  [key: string]: Calculator;
};

const calculators: Calculators = {
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
  "calculadora-basica": {
    title: "Calculadora Básica",
    description: "Realiza operaciones matemáticas básicas",
    component: () => import("@/components/calculators/BasicCalculator").then(mod => mod.default),
  },
  "calculadora-cientifica": {
    title: "Calculadora Científica",
    description: "Funciones científicas avanzadas",
    component: () => import("@/components/calculators/ScientificCalculator").then(mod => mod.default),
  },
  "calculadora-algebra": {
    title: "Calculadora de Álgebra",
    description: "Resuelve ecuaciones algebraicas",
    component: () => import("@/components/calculators/AlgebraCalculator").then(mod => mod.default),
  },
};

const isInputBasedCalculator = (calculator: Calculator): calculator is InputBasedCalculator => {
  return 'inputs' in calculator;
};

const CalculatorPage = () => {
  const { calculatorId } = useParams();
  const { toast } = useToast();
  const calculator = calculators[calculatorId as keyof typeof calculators];
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [CalculatorComponent, setCalculatorComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (calculator && !isInputBasedCalculator(calculator)) {
      calculator.component().then(component => {
        setCalculatorComponent(() => component);
      });
    }
  }, [calculator]);

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

  if (!isInputBasedCalculator(calculator) && CalculatorComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Link
            to="/categoria/matematicas"
            className="inline-flex items-center text-primary hover:underline mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a calculadoras matemáticas
          </Link>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              {calculator.title}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {calculator.description}
            </p>
          </div>

          <CalculatorComponent />
        </div>
      </div>
    );
  }

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const calculateResult = () => {
    if (!isInputBasedCalculator(calculator)) return;
    
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
            {isInputBasedCalculator(calculator) && calculator.inputs.map((input) => (
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
