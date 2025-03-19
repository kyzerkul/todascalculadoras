import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { categories } from "@/components/CategoryGrid";
import { calculators } from "@/config/calculators";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

// Mapping of calculators by category
const categoryCalculators = {
  matematicas: Object.keys(calculators)
    .filter(id => calculators[id].category === "matematicas")
    .map(id => ({ id, ...calculators[id] })),
  financieras: Object.keys(calculators)
    .filter(id => calculators[id].category === "financieras")
    .map(id => ({ id, ...calculators[id] })),
  cientificas: Object.keys(calculators)
    .filter(id => calculators[id].category === "cientificas" || calculators[id].category === "simuladores") // Combinamos científicas y simuladores
    .map(id => ({ id, ...calculators[id] })),
  conversiones: Object.keys(calculators)
    .filter(id => calculators[id].category === "conversiones")
    .map(id => ({ id, ...calculators[id] })),
  simuladores: Object.keys(calculators)
    .filter(id => calculators[id].category === "simuladores")
    .map(id => ({ id, ...calculators[id] })),
  salud: Object.keys(calculators)
    .filter(id => calculators[id].category === "salud")
    .map(id => ({ id, ...calculators[id] })),
  fechas: Object.keys(calculators)
    .filter(id => calculators[id].category === "fechas")
    .map(id => ({ id, ...calculators[id] })),
  ingenieria: Object.keys(calculators)
    .filter(id => calculators[id].category === "ingenieria")
    .map(id => ({ id, ...calculators[id] })),
  estadisticas: Object.keys(calculators)
    .filter(id => calculators[id].category === "matematicas" && 
            (calculators[id].title.toLowerCase().includes("estadística") || 
             calculators[id].description.toLowerCase().includes("estadística")))
    .map(id => ({ id, ...calculators[id] })),
  "programacion-y-tecnologia": Object.keys(calculators)
    .filter(id => calculators[id].category === "conversiones" || calculators[id].category === "simuladores")
    .map(id => ({ id, ...calculators[id] })),
};

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find(
    (cat) => cat.title.toLowerCase().replace(/\s+/g, "-").normalize("NFD").replace(/[\u0300-\u036f]/g, "") === categoryId?.toLowerCase()
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

  // Fix para cualquier variación del URL de categorías especiales
  let categoryCalcs;
  let categoryKey = categoryId?.toLowerCase();
  
  if (categoryKey?.includes("ingenier")) {
    categoryCalcs = categoryCalculators["ingenieria"] || [];
  } else if (categoryKey?.includes("estad")) {
    categoryCalcs = categoryCalculators["estadisticas"] || [];
  } else if (categoryKey?.includes("program") || categoryKey?.includes("tecnolog")) {
    categoryCalcs = categoryCalculators["programacion-y-tecnologia"] || [];
  } else if (categoryKey?.includes("cient")) {
    categoryCalcs = categoryCalculators["cientificas"] || [];
  } else {
    // Para otras categorías, usar el ID normal
    categoryCalcs = categoryCalculators[categoryId as keyof typeof categoryCalculators] || [];
  }

  // Si todavía no hay calculadoras, asegurémonos de mostrar al menos calculadoras relacionadas
  if (categoryCalcs.length === 0) {
    // Proporcionar calculadoras relacionadas o populares como alternativa
    categoryCalcs = Object.keys(calculators)
      .slice(0, 6) // Mostrar las 6 primeras calculadoras como ejemplo
      .map(id => ({ id, ...calculators[id] }));
  }
  
  // Création des données structurées pour la page de catégorie (Schema.org)
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Calculadoras ${category.title}`,
    "description": category.description,
    "url": `https://todascalculadoras.com/categoria/${categoryId}`,
    "hasPart": categoryCalcs.map(calc => ({
      "@type": "SoftwareApplication",
      "name": calc.title,
      "description": calc.description,
      "applicationCategory": "CalculatorApplication",
      "operatingSystem": "Web",
      "url": `https://todascalculadoras.com/calculadora/${calc.id}`
    }))
  };

  // Optimisation du titre SEO pour la page de catégorie
  const seoTitle = `Calculadoras ${category.title} - Herramientas de Cálculo Online`;
  
  // Optimisation de la description SEO pour la page de catégorie
  const seoDescription = `Explora nuestras calculadoras ${category.title.toLowerCase()} online gratuitas. ${category.description} Las mejores herramientas de cálculo.`;
  
  // URL canonique pour la page de catégorie
  const canonicalUrl = `/categoria/${categoryId}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        schema={categorySchema}
      />
      <div className="container max-w-6xl mx-auto px-4">
        <Breadcrumbs />
        
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
          {categoryCalcs.map((calc) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
