
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { categories } from "@/components/CategoryGrid";

const categoryCalculators = {
  "financieras": [
    {
      id: "prestamo-personal",
      title: "Préstamo Personal",
      description: "Calcula tu pago mensual basado en el monto del préstamo, tasa de interés y plazo.",
    },
    {
      id: "plazo-fijo",
      title: "Plazo Fijo",
      description: "Calcula el interés y monto final de tu inversión a plazo fijo.",
    },
    {
      id: "regla-72",
      title: "Regla del 72",
      description: "Calcula en cuántos años se duplicará tu inversión.",
    },
  ],
  "matematicas": [],
  "cientificas": [],
  "salud": [],
  "fechas": [],
  "estadisticas": [],
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find(
    (cat) => cat.title.toLowerCase().replace(/\s+/g, "-") === categoryId
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Categoría no encontrada</h1>
          <Link to="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const calculators = categoryCalculators[categoryId as keyof typeof categoryCalculators] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Category Header */}
        <div className="mb-12 text-center animate-fade-down">
          <div className="flex justify-center mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Calculadoras {category.title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {calculators.length > 0 ? (
            calculators.map((calc) => (
              <Card
                key={calc.id}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{calc.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{calc.description}</p>
                  <Button className="w-full" asChild>
                    <Link to={`/calculadora/${calc.id}`}>Usar Calculadora</Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Calculator className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Calculadoras en desarrollo
              </h3>
              <p className="text-gray-600">
                Estamos trabajando para traerte las mejores calculadoras en esta
                categoría. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
