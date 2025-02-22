
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";

const CalculatorsDirectory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-down">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Directorio de Calculadoras
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección completa de calculadoras. Usa los filtros y la búsqueda para encontrar exactamente lo que necesitas.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center animate-fade-up">
          <div className="w-full md:flex-1">
            <SearchBar />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2" />
            Filtros
          </Button>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {/* Placeholder calculators - These would be dynamically populated */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Calculadora {index}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Descripción breve de la calculadora y sus funciones principales.
                </p>
                <Button variant="outline" className="w-full">
                  Ver Calculadora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorsDirectory;
