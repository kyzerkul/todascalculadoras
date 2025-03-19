import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { calculators } from "@/config/calculators";
import { isInputBasedCalculator } from "@/types/calculator";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";
import InputBasedCalculator from "@/components/calculator/InputBasedCalculator";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

// Fonction d'aide pour normaliser les chaînes (enlever accents, espaces, etc.)
const normalizeString = (str: string) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

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
    // Normalize the category ID to handle accents and special characters
    const normalizedCategoryId = normalizeString(categoryId);
    
    // Convert categoryId to our category type format (handle special cases)
    if (normalizedCategoryId === "conversiones") {
      category = "conversiones";
    } else if (normalizedCategoryId === "financieras") {
      category = "financieras";
    } else if (normalizedCategoryId === "cientificas") {
      category = "cientificas";
    } else if (normalizedCategoryId === "salud") {
      category = "salud"; 
    } else if (normalizedCategoryId === "simuladores") {
      category = "simuladores";
    } else if (normalizedCategoryId === "fechas") {
      category = "fechas";
    } else if (normalizedCategoryId === "ingenieria") {
      category = "ingenieria";
    } else if (normalizedCategoryId === "estadisticas") {
      category = "matematicas" as "matematicas"; // Les calculatrices statistiques sont dans la catégorie mathématiques
    } else if (normalizedCategoryId === "programacion-y-tecnologia") {
      category = "simuladores" as "simuladores"; // Utiliser simuladores pour programación y tecnología
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
    const isEngineeringCalculator = calculatorId?.includes("resistencia") || calculatorId?.includes("ohm") || calculatorId?.includes("energia") || calculatorId?.includes("tension");
    
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
    } else if (isEngineeringCalculator) {
      category = "ingenieria";
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

  // Normaliser l'ID de catégorie pour les liens dans la page
  const normalizedCategoryId = categoryId ? normalizeString(categoryId) : normalizeString(getCategoryName(category));

  // Structured Data for Calculator Page
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculator.title,
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Web",
    "description": calculator.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "url": `https://todascalculadoras.com/${normalizedCategoryId}/${calculatorId}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <SEO
        title={`${calculator.title} | TodasCalculadoras`}
        description={calculator.description}
        canonical={`/${normalizedCategoryId}/${calculatorId}`}
        schema={calculatorSchema}
      />
      <div className="container max-w-4xl mx-auto px-4">
        <Breadcrumbs />

        <CalculatorHeader
          title={calculator.title}
          description={calculator.description}
          category={getCategoryName(category)}
        />

        <div className="mt-8 p-5 bg-white rounded-xl shadow-sm">
          {isInputBasedCalculator(calculator) ? (
            <InputBasedCalculator calculator={calculator} calculatorId={calculatorId as string} />
          ) : CalculatorComponent ? (
            <CalculatorComponent />
          ) : (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {/* Related calculators - TBD */}
      </div>
    </div>
  );
};

export default CalculatorPage;
