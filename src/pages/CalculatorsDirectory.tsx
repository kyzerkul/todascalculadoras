import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Filter, X } from "lucide-react";
import { calculators } from "@/config/calculators";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const CalculatorsDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredCalculators, setFilteredCalculators] = useState<
    [string, any][]
  >([]);

  // Extract all unique categories
  const allCategories = Array.from(
    new Set(
      Object.values(calculators).map((calculator) => calculator.category || "otros")
    )
  ).sort();

  // Filter calculators based on search term and selected categories
  useEffect(() => {
    const calculatorEntries = Object.entries(calculators);
    
    const filtered = calculatorEntries.filter(([id, calculator]) => {
      const matchesSearch =
        searchTerm === "" ||
        calculator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        calculator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(calculator.category || "otros");

      return matchesSearch && matchesCategory;
    });

    setFilteredCalculators(filtered);
  }, [searchTerm, selectedCategories]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Clear all selected categories
  const clearCategories = () => {
    setSelectedCategories([]);
  };

  // Handle search input change
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      matematicas: "Matemáticas",
      financieras: "Financieras",
      conversiones: "Conversiones",
      fechas: "Fechas y Tiempo",
      salud: "Salud",
      ingenieria: "Ingeniería",
      simuladores: "Simuladores",
      otros: "Otros",
    };

    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Schéma structured data pour la page du répertoire de calculatrices
  const calculatorsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Calculadoras Online en Español – Herramientas Precisas y Gratuitas",
    "description": "Encuentra la calculadora perfecta para tus necesidades en Todascalculadoras.com. Accede a herramientas en línea para finanzas, matemáticas, salud, ingeniería y más, totalmente gratuitas y optimizadas para cualquier usuario.",
    "url": "https://todascalculadoras.com/calculadoras",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredCalculators.map(([id, calculator], index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://todascalculadoras.com/calculadora/${id}`,
        "name": calculator.title
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <SEO
        title="Calculadoras Online en Español – Herramientas Precisas y Gratuitas"
        description="Encuentra la calculadora perfecta para tus necesidades en Todascalculadoras.com. Accede a herramientas en línea para finanzas, matemáticas, salud, ingeniería y más, totalmente gratuitas y optimizadas para cualquier usuario."
        canonical="/calculadoras"
        schema={calculatorsSchema}
      />
      <div className="container max-w-6xl mx-auto px-4">
        <Breadcrumbs />
        
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
        <div className="mb-4 flex flex-col md:flex-row gap-4 items-center animate-fade-up">
          <div className="w-full md:flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtros {selectedCategories.length > 0 && `(${selectedCategories.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Categorías</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                >
                  {formatCategoryName(category)}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedCategories.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs"
                      onClick={clearCategories}
                    >
                      <X className="mr-2 h-3 w-3" />
                      Limpiar filtros
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Selected Categories Display */}
        {selectedCategories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 animate-fade">
            {selectedCategories.map((category) => (
              <Badge key={category} variant="secondary" className="flex items-center gap-1">
                {formatCategoryName(category)}
                <button
                  className="ml-1 hover:text-red-600 rounded-full"
                  onClick={() => toggleCategory(category)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6"
              onClick={clearCategories}
            >
              Limpiar todos
            </Button>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Mostrando {filteredCalculators.length} calculadoras
          {searchTerm && (
            <span> para "{searchTerm}"</span>
          )}
          {selectedCategories.length > 0 && (
            <span> en {selectedCategories.length} {selectedCategories.length === 1 ? 'categoría' : 'categorías'}</span>
          )}
        </div>

        {/* Calculator Grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
            {filteredCalculators.map(([id, calculator]) => (
              <Link to={`/calculadora/${id}`} key={id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg mb-2">{calculator.title}</h3>
                      <Badge variant="outline" className="ml-2">
                        {formatCategoryName(calculator.category || "otros")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {calculator.description}
                    </p>
                    <Button variant="outline" className="w-full mt-auto">
                      Ver Calculadora
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 animate-fade">
            <p className="text-gray-500 mb-2">No se encontraron calculadoras que coincidan con tu búsqueda.</p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategories([]); }}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorsDirectory;
