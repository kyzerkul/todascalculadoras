import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { calculators } from "@/config/calculators";
import { isInputBasedCalculator } from "@/types/calculator";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import InputBasedCalculator from "@/components/calculator/InputBasedCalculator";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const CalculatorPage = () => {
  const { calculatorId, categoryId } = useParams();
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
          {categoryId ? (
            <Link to={`/categoria/${categoryId}`} className="text-primary hover:underline">
              Volver a calculadoras de {categoryId}
            </Link>
          ) : (
            <Link to="/calculadoras" className="text-primary hover:underline">
              Ver todas las calculadoras
            </Link>
          )}
        </div>
      </div>
    );
  }

  // If we have category from params, use it, otherwise determine from calculator ID
  let category: "matematicas" | "financieras" | "cientificas" | "conversiones" | "salud" | "simuladores" | "fechas" | "ingenieria";
  
  if (categoryId) {
    // Convert categoryId to our category type format (handle special cases)
    if (categoryId === "conversiones") {
      category = "conversiones";
    } else if (categoryId === "financieras") {
      category = "financieras";
    } else if (categoryId === "cientificas" || categoryId === "científicas") {
      category = "cientificas";
    } else if (categoryId === "salud") {
      category = "salud"; 
    } else if (categoryId === "simuladores") {
      category = "simuladores";
    } else if (categoryId === "fechas") {
      category = "fechas";
    } else if (categoryId === "ingenieria") {
      category = "ingenieria";
    } else {
      category = "matematicas";
    }
  } else {
    // For backward compatibility - fallback to determine from calculatorId
    const isScienceCalculator = calculatorId?.includes("trigonometrica") || calculatorId?.includes("logaritmos") || calculatorId?.includes("ecuaciones");
    const isConversionCalculator = calculatorId?.includes("conversor");
    const isHealthCalculator = calculatorId?.includes("imc") || calculatorId?.includes("calorias") || calculatorId?.includes("metabolismo");
    const isFinancialCalculator = calculatorId?.includes("hipoteca") || calculatorId?.includes("prestamo") || calculatorId?.includes("interes");
    const isDateCalculator = calculatorId?.includes("fecha") || calculatorId?.includes("time") || calculatorId?.includes("date") || calculatorId?.includes("epoch");
    
    if (isConversionCalculator) {
      category = "conversiones";
    } else if (isScienceCalculator) {
      category = "cientificas";
    } else if (isHealthCalculator) {
      category = "salud";
    } else if (isFinancialCalculator) {
      category = "financieras";
    } else if (isDateCalculator) {
      category = "fechas";
    } else {
      category = "matematicas";
    }
  }

  // Données structurées pour la page calculatrice (Schema.org)
  const getCategoryName = (cat: string) => {
    const categories: Record<string, string> = {
      'matematicas': 'Matemáticas',
      'financieras': 'Financieras',
      'cientificas': 'Científicas',
      'conversiones': 'Conversiones',
      'salud': 'Salud y Bienestar',
      'simuladores': 'Simuladores',
      'fechas': 'Fechas y Tiempo',
      'ingenieria': 'Ingeniería'
    };
    return categories[cat] || 'Matemáticas';
  };

  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculator.title,
    "description": calculator.description,
    "applicationCategory": "CalculatorApplication",
    "applicationSubCategory": getCategoryName(category),
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  // Titre SEO optimisé pour chaque calculatrice
  const seoTitle = `${calculator.title} | Calculadora Online Gratis`;

  // Description SEO optimisée pour chaque calculatrice
  const seoDescription = `Utiliza nuestra calculadora de ${calculator.title.toLowerCase()} online gratuita. ${calculator.description} Herramienta rápida y precisa.`;

  // URL canonique pour la page de calculatrice
  const canonicalUrl = `/calculadora/${calculatorId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        type="product"
        schema={calculatorSchema}
      />
      
      <div className="container max-w-4xl mx-auto px-4">
        <Breadcrumbs />
        
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
