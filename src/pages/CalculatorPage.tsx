
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { calculators } from "@/config/calculators";
import { isInputBasedCalculator } from "@/types/calculator";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import InputBasedCalculator from "@/components/calculator/InputBasedCalculator";

const CalculatorPage = () => {
  const { calculatorId } = useParams();
  const calculator = calculators[calculatorId as keyof typeof calculators];
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

  const isScienceCalculator = calculatorId?.includes("trigonometrica") || calculatorId?.includes("logaritmos") || calculatorId?.includes("ecuaciones");
  const isConversionCalculator = calculatorId?.includes("conversor");
  let category = isScienceCalculator ? "científicas" : "matemáticas";
  
  if (calculatorId?.includes("prestamo") || calculatorId?.includes("plazo")) {
    category = "financieras";
  } else if (isConversionCalculator) {
    category = "conversiones";
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <CalculatorHeader
          title={calculator.title}
          description={calculator.description}
          category={category}
        />

        {isInputBasedCalculator(calculator) ? (
          <InputBasedCalculator calculator={calculator} calculatorId={calculatorId!} />
        ) : CalculatorComponent ? (
          <CalculatorComponent />
        ) : null}
      </div>
    </div>
  );
};

export default CalculatorPage;
