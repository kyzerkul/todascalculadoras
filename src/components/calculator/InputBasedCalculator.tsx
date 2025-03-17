
import { useState } from "react";
import { 
  convertTemperature,
  convertTime, 
  convertCurrency, 
  convertSpecialMeasurement, 
  convertUnit 
} from "@/utils/conversions";
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
    // Validate required fields based on calculator type
    let requiredFields: string[] = [];
    
    // Define required fields based on calculator type
    switch (calculatorId) {
      case "hipoteca":
        requiredFields = ["amount", "rate", "years"];
        break;
      case "prestamo-personal":
        requiredFields = ["amount", "rate", "months"];
        break;
      case "interes-compuesto":
        requiredFields = ["principal", "rate", "years"];
        // Set default frequency if not provided
        if (!inputs.compoundFrequency) {
          setInputs(prev => ({ ...prev, compoundFrequency: "anual" }));
        }
        break;
      case "roi":
        requiredFields = ["gain", "cost"];
        break;
      case "amortizacion":
        requiredFields = ["amount", "rate", "years"];
        break;
      case "plazo-fijo":
        requiredFields = ["principal", "rate", "days"];
        break;
      case "regla-72":
        requiredFields = ["rate"];
        break;
      case "conversor-temperatura":
        requiredFields = ["temperature", "fromScale", "toScale"];
        break;
      case "conversor-tiempo":
        requiredFields = ["value", "fromUnit", "toUnit"];
        break;
      case "conversor-divisas":
        requiredFields = ["amount", "rate"];
        break;
      case "conversor-medidas-especiales":
        requiredFields = ["value", "measureType", "fromUnit", "toUnit"];
        break;
      case "conversor-unidades":
        requiredFields = ["value", "fromUnit", "toUnit"];
        break;
      default:
        requiredFields = Object.keys(inputs);
    }
    
    // Check if all required fields are provided and are valid numbers
    const missingFields = requiredFields.filter(field => {
      if (!inputs[field]) return true;
      if (["fromScale", "toScale", "fromUnit", "toUnit", "compoundFrequency", "measureType"].includes(field)) {
        return false; // Skip NaN check for text fields
      }
      return isNaN(Number(inputs[field]));
    });
    
    if (missingFields.length > 0) {
      toast({
        title: "Error de cálculo",
        description: "Por favor, introduce valores válidos en todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    let result: number | string;
    switch (calculatorId) {
      case "hipoteca": {
        const amount = Number(inputs.amount);
        const rate = Number(inputs.rate);
        const years = Number(inputs.years);
        const monthlyRate = rate / 1200; // Convert annual rate to monthly decimal
        const numberOfPayments = years * 12;
        result = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        break;
      }
      case "prestamo-personal": {
        const amount = Number(inputs.amount);
        const rate = Number(inputs.rate);
        const months = Number(inputs.months);
        const monthlyRate = rate / 1200; // Convert annual rate to monthly decimal
        result = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
        break;
      }
      case "interes-compuesto": {
        const principal = Number(inputs.principal);
        const rate = Number(inputs.rate);
        const years = Number(inputs.years);
        let compoundFrequency = 1; // Default to annual
        
        // Check if compoundFrequency is defined before using toLowerCase
        if (inputs.compoundFrequency) {
          switch(inputs.compoundFrequency.toLowerCase()) {
            case "mensual":
              compoundFrequency = 12;
              break;
            case "trimestral":
              compoundFrequency = 4;
              break;
            case "semestral":
              compoundFrequency = 2;
              break;
            case "anual":
              compoundFrequency = 1;
              break;
            default:
              compoundFrequency = 1; // Default to annual
          }
        }
        
        // A = P * (1 + r/n)^(n * t)
        // Convert annual interest rate from percentage to decimal
        const rateDecimal = rate / 100;
        result = principal * Math.pow(1 + (rateDecimal / compoundFrequency), compoundFrequency * years);
        
        // Calculate results for all frequencies for comparison
        const resultAnnual = principal * Math.pow(1 + (rateDecimal / 1), 1 * years);
        const resultSemiannual = principal * Math.pow(1 + (rateDecimal / 2), 2 * years);
        const resultQuarterly = principal * Math.pow(1 + (rateDecimal / 4), 4 * years);
        const resultMonthly = principal * Math.pow(1 + (rateDecimal / 12), 12 * years);
        
        // Adding helpful information for debugging
        console.log(`Compound Interest Calculation:
          Principal: ${principal}
          Rate: ${rate}% (${rateDecimal} as decimal)
          Years: ${years}
          Compound Frequency: ${compoundFrequency} times per year
          
          Results by Frequency:
          - Annual (n=1): ${resultAnnual.toFixed(2)}
          - Semi-Annual (n=2): ${resultSemiannual.toFixed(2)}
          - Quarterly (n=4): ${resultQuarterly.toFixed(2)}
          - Monthly (n=12): ${resultMonthly.toFixed(2)}
          
          Selected Frequency Result: ${result.toFixed(2)}`);
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
      case "roi": {
        const gain = Number(inputs.gain);
        const cost = Number(inputs.cost);
        if (cost === 0) {
          toast({
            title: "Error de cálculo",
            description: "El costo de la inversión no puede ser cero.",
            variant: "destructive",
          });
          return;
        }
        // ROI = (Ganancia - Costo) / Costo * 100%
        result = ((gain - cost) / cost) * 100;
        break;
      }
      case "amortizacion": {
        const amount = Number(inputs.amount);
        const rate = Number(inputs.rate);
        const years = Number(inputs.years);
        const monthlyRate = rate / 1200; // Convert annual rate to monthly decimal
        const numberOfPayments = years * 12;
        
        // Monthly payment calculation
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                             (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        
        // Instead of returning full amortization table, 
        // just calculate the monthly payment and total interest
        const totalPaid = monthlyPayment * numberOfPayments;
        const totalInterest = totalPaid - amount;
        
        // Since we can't return a complex result, return a formatted string
        result = monthlyPayment;
        
        // In a real implementation, you'd generate the full amortization table
        // and display it in a separate component or modal
        break;
      }
      // Conversion calculators
      case "conversor-temperatura": {
        const temperature = Number(inputs.temperature);
        const fromScale = inputs.fromScale.toLowerCase();
        const toScale = inputs.toScale.toLowerCase();
        result = convertTemperature(temperature, fromScale, toScale);
        break;
      }
      case "conversor-tiempo": {
        const value = Number(inputs.value);
        const fromUnit = inputs.fromUnit.toLowerCase();
        const toUnit = inputs.toUnit.toLowerCase();
        result = convertTime(value, fromUnit, toUnit);
        break;
      }
      case "conversor-divisas": {
        const amount = Number(inputs.amount);
        const rate = Number(inputs.rate);
        result = convertCurrency(amount, rate);
        break;
      }
      case "conversor-medidas-especiales": {
        const value = Number(inputs.value);
        const measureType = inputs.measureType.toLowerCase();
        const fromUnit = inputs.fromUnit.toLowerCase();
        const toUnit = inputs.toUnit.toLowerCase();
        result = convertSpecialMeasurement(value, measureType, fromUnit, toUnit);
        break;
      }
      case "conversor-unidades": {
        const value = Number(inputs.value);
        const category = inputs.category || "longitud"; // Default to length if not specified
        const fromUnit = inputs.fromUnit.toLowerCase();
        const toUnit = inputs.toUnit.toLowerCase();
        result = convertUnit(value, category, fromUnit, toUnit);
        break;
      }
      // Mathematics calculators
      case "calculadora-fracciones": {
        const numerator1 = Number(inputs.numerator1);
        const denominator1 = Number(inputs.denominator1);
        const numerator2 = Number(inputs.numerator2);
        const denominator2 = Number(inputs.denominator2);
        const operation = inputs.operation.toLowerCase();
        
        // Check for invalid denominators
        if (denominator1 === 0 || denominator2 === 0) {
          toast({
            title: "Error de cálculo",
            description: "El denominador no puede ser cero.",
            variant: "destructive",
          });
          return;
        }
        
        let resultNum, resultDenom;
        
        switch (operation) {
          case "suma": {
            // a/b + c/d = (ad + bc)/bd
            resultNum = numerator1 * denominator2 + numerator2 * denominator1;
            resultDenom = denominator1 * denominator2;
            break;
          }
          case "resta": {
            // a/b - c/d = (ad - bc)/bd
            resultNum = numerator1 * denominator2 - numerator2 * denominator1;
            resultDenom = denominator1 * denominator2;
            break;
          }
          case "multiplicacion": {
            // a/b * c/d = ac/bd
            resultNum = numerator1 * numerator2;
            resultDenom = denominator1 * denominator2;
            break;
          }
          case "division": {
            // a/b ÷ c/d = ad/bc
            if (numerator2 === 0) {
              toast({
                title: "Error de cálculo",
                description: "No se puede dividir por cero.",
                variant: "destructive",
              });
              return;
            }
            resultNum = numerator1 * denominator2;
            resultDenom = denominator1 * numerator2;
            break;
          }
          default: {
            toast({
              title: "Error de cálculo",
              description: "Operación no reconocida. Use: suma, resta, multiplicacion, o division",
              variant: "destructive",
            });
            return;
          }
        }
        
        // Simplify the fraction (find greatest common divisor)
        const gcd = (a: number, b: number): number => {
          return b === 0 ? a : gcd(b, a % b);
        };
        
        const commonDivisor = gcd(Math.abs(resultNum), Math.abs(resultDenom));
        resultNum = resultNum / commonDivisor;
        resultDenom = resultDenom / commonDivisor;
        
        // If denominator is negative, move the sign to the numerator
        if (resultDenom < 0) {
          resultNum = -resultNum;
          resultDenom = -resultDenom;
        }
        
        // Format result as a string
        result = `${resultNum}/${resultDenom}`;
        break;
      }
      case "calculadora-porcentajes": {
        const value = Number(inputs.value);
        const percentage = Number(inputs.percentage);
        // Formula: Percentage of a number = (Value * Percentage) / 100
        result = (value * percentage) / 100;
        break;
      }
      case "calculadora-ecuaciones-cuadraticas": {
        const a = Number(inputs.a);
        const b = Number(inputs.b);
        const c = Number(inputs.c);
        
        // Check if it's a valid quadratic equation
        if (a === 0) {
          toast({
            title: "Error de cálculo",
            description: "El coeficiente 'a' no puede ser cero para una ecuación cuadrática",
            variant: "destructive",
          });
          return;
        }
        
        // Calculate the discriminant
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
          // Complex roots
          const realPart = -b / (2 * a);
          const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);
          result = `x₁ = ${realPart.toFixed(2)} + ${imaginaryPart.toFixed(2)}i, x₂ = ${realPart.toFixed(2)} - ${imaginaryPart.toFixed(2)}i`;
        } else if (discriminant === 0) {
          // One real root (repeated)
          const root = -b / (2 * a);
          result = `x = ${root.toFixed(2)} (raíz doble)`;
        } else {
          // Two distinct real roots
          const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
          const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
          result = `x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(2)}`;
        }
        break;
      }
      case "calculadora-logaritmos-matematicas": {
        const num = Number(inputs.number);
        const base = Number(inputs.base);
        
        // Validate inputs
        if (num <= 0) {
          toast({
            title: "Error de cálculo",
            description: "El número debe ser mayor que cero para calcular su logaritmo",
            variant: "destructive",
          });
          return;
        }
        
        if (base <= 0 || base === 1) {
          toast({
            title: "Error de cálculo",
            description: "La base debe ser mayor que cero y diferente de 1",
            variant: "destructive",
          });
          return;
        }
        
        // Calculate logarithm (change of base formula)
        // log_b(x) = log(x) / log(b)
        result = Math.log(num) / Math.log(base);
        break;
      }
      default:
        result = 0;
    }

    setResult(result);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="md:w-2/3">
        <CardHeader>
          <CardTitle>Introduce los datos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {calculator.inputs.map((input) => {
            // Check if this is a selection input
            if (input.id === "compoundFrequency") {
              return (
                <div key={input.id} className="space-y-2">
                  <label htmlFor={input.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {input.label}
                  </label>
                  <select 
                    id={input.id}
                    value={inputs[input.id] || ""}
                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Seleccionar</option>
                    <option value="anual">Anual</option>
                    <option value="semestral">Semestral</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="mensual">Mensual</option>
                  </select>
                  {input.helper && <p className="text-xs text-gray-500">{input.helper}</p>}
                </div>
              );
            }
            
            return (
              <CalculatorInput
                key={input.id}
                {...input}
                value={inputs[input.id] || ""}
                onChange={(value) => handleInputChange(input.id, value)}
                suffix={input.suffix?.replace("€", "")}
              />
            );
          })}
          <Button onClick={calculateResult} className="w-full mt-4">
            Calcular
          </Button>
        </CardContent>
      </Card>

      <Card className="md:w-1/3 bg-primary/5">
        <CardHeader>
          <CardTitle>Resultado del cálculo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {result === null ? (
              <p className="text-gray-500 italic">Completa los campos y haz clic en calcular para ver el resultado</p>
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-2">
                  {calculatorId === "prestamo-personal"
                    ? "Tu pago mensual estimado:"
                    : calculatorId === "interes-compuesto"
                    ? "Monto final con interés compuesto:"
                    : calculatorId === "plazo-fijo"
                    ? "Monto final de tu inversión:"
                    : calculatorId === "regla-72"
                    ? "Años para duplicar tu inversión:"
                    : calculatorId === "conversor-temperatura"
                    ? "Temperatura convertida:"
                    : calculatorId === "conversor-tiempo"
                    ? "Tiempo convertido:"
                    : calculatorId === "conversor-divisas"
                    ? "Monto convertido:"
                    : calculatorId.includes("conversor")
                    ? "Resultado de la conversión:"
                    : "Resultado:"}
                </p>
                <p className="text-3xl font-bold text-primary">
                  {calculatorId === "regla-72"
                    ? `${Number(result).toFixed(1)} años`
                    : calculatorId === "roi"
                    ? `${Number(result).toFixed(2)}%`
                    : calculatorId.includes("conversor")
                    ? `${Number(result).toFixed(2)}`
                    : typeof result === "number" 
                    ? result.toLocaleString("es-ES", {
                        maximumFractionDigits: 2,
                      })
                    : result }
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputBasedCalculator;
