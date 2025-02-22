
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const CategoryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Category Header */}
        <div className="mb-12 text-center animate-fade-down">
          <div className="flex justify-center mb-4">
            <Calculator className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Calculadoras Financieras
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Herramientas especializadas para todas tus necesidades financieras, desde préstamos hasta inversiones.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  Calculadora Financiera {index}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Descripción específica de esta calculadora financiera.
                </p>
                <Button className="w-full">Usar Calculadora</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
