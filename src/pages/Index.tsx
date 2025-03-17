import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import CalculatorOfTheDay from "@/components/CalculatorOfTheDay";
import { Link, useNavigate } from "react-router-dom";
import { calculators } from "@/config/calculators";
import { ArrowRight, Calculator, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

const Index = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Array<{ id: string; title: string; description: string; category?: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchTermRef = useRef<string>("");

  // Effet pour gérer le clic en dehors de la zone de recherche
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (term: string) => {
    // Stocker le terme de recherche pour la comparaison
    searchTermRef.current = term;

    // Annuler toute recherche précédente en cours
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!term.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setIsLoading(false);
      return;
    }

    // Afficher le chargement uniquement si ce n'est pas déjà en cours de recherche
    if (!isSearching) {
      setIsSearching(true);
    }
    
    setIsLoading(true);
    
    // Stabilisation avec un délai fixe
    searchTimeoutRef.current = setTimeout(() => {
      // Vérifier si le terme de recherche est toujours le même
      if (term === searchTermRef.current) {
        // Filtrer les calculatrices en fonction du terme de recherche
        const results = Object.entries(calculators)
          .filter(([id, calc]) => {
            const searchTerm = term.toLowerCase();
            return (
              calc.title.toLowerCase().includes(searchTerm) ||
              calc.description.toLowerCase().includes(searchTerm) ||
              id.toLowerCase().includes(searchTerm) ||
              (calc.category && calc.category.toLowerCase().includes(searchTerm))
            );
          })
          .map(([id, calc]) => ({
            id,
            title: calc.title,
            description: calc.description,
            category: calc.category
          }))
          .slice(0, 5); // Limiter à 5 résultats pour ne pas encombrer l'interface

        setSearchResults(results);
        setIsLoading(false);
      }
    }, 300);
  };

  const handleResultClick = (id: string) => {
    navigate(`/calculadora/${id}`);
    setSearchResults([]);
    setIsSearching(false);
  };

  // Déterminer les couleurs de catégorie
  const getCategoryColor = (category?: string) => {
    const colors = {
      financieras: "bg-emerald-50 text-emerald-600",
      matematicas: "bg-blue-50 text-blue-600",
      simuladores: "bg-purple-50 text-purple-600",
      conversiones: "bg-amber-50 text-amber-600",
      salud: "bg-red-50 text-red-600",
      ingenieria: "bg-indigo-50 text-indigo-600",
      fechas: "bg-pink-50 text-pink-600",
    };
    
    return category && colors[category as keyof typeof colors] 
      ? colors[category as keyof typeof colors] 
      : "bg-gray-50 text-gray-600";
  };

  // Données structurées pour la page d'accueil (Schema.org)
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Todas Calculadoras",
    "description": "Descubre una amplia variedad de calculadoras en línea para finanzas, matemáticas, salud, ingeniería y más. Herramientas precisas, gratuitas y fáciles de usar en español para tus cálculos diarios.",
    "url": "https://todascalculadoras.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://todascalculadoras.com/calculadoras?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <SEO 
        title="Todas Calculadoras - Calculadoras Online en Español"
        description="Descubre una amplia variedad de calculadoras en línea para finanzas, matemáticas, salud, ingeniería y más. Herramientas precisas, gratuitas y fáciles de usar en español para tus cálculos diarios."
        canonical="/"
        schema={homeSchema}
      />
      
      {/* Hero Section */}
      <section className="py-20 px-4 animate-fade-down">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Todas Calculadoras
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Encuentra la calculadora perfecta para tus necesidades. Miles de herramientas útiles en un solo lugar.
          </p>
          <div className="relative w-full max-w-2xl mx-auto" ref={searchContainerRef}>
            <SearchBar onSearch={handleSearch} />
            
            {/* Résultats de recherche avec stabilité améliorée */}
            <div 
              className="absolute z-10 mt-1 w-full left-0 right-0 mx-auto"
              style={{ maxWidth: "calc(100% - 20px)" }}
            >
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      height: 'auto',
                      transition: {
                        height: { duration: 0.2 },
                        opacity: { duration: 0.15 }
                      }
                    }}
                    exit={{ 
                      opacity: 0,
                      height: 0,
                      transition: {
                        height: { duration: 0.2, delay: 0.1 },
                        opacity: { duration: 0.1 }
                      }
                    }}
                    className="overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-lg border border-gray-100"
                  >
                    {isLoading ? (
                      <div className="p-6 text-center">
                        <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Buscando calculadoras...</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div>
                        <div className="p-2 bg-gray-50 border-b border-gray-100 flex items-center">
                          <Search className="h-3 w-3 text-gray-400 ml-2 mr-1" />
                          <span className="text-xs text-gray-500">Resultados de búsqueda</span>
                        </div>
                        <div className="divide-y divide-gray-100 max-h-[350px] overflow-auto">
                          {searchResults.map((result, index) => (
                            <div
                              key={result.id}
                              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                              onClick={() => handleResultClick(result.id)}
                            >
                              <div className="flex items-start gap-2">
                                <div className="p-1.5 rounded-md bg-primary/5 text-primary flex items-center justify-center">
                                  <Calculator className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium text-sm text-gray-900 group-hover:text-primary transition-colors truncate">{result.title}</h3>
                                  <p className="text-xs text-gray-500 line-clamp-1">{result.description}</p>
                                  {result.category && (
                                    <span className={`text-xs mt-1 inline-block px-1.5 py-0.5 rounded-full ${getCategoryColor(result.category)}`}>
                                      {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                                    </span>
                                  )}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                                  <ArrowRight className="h-3 w-3 text-primary" />
                                </div>
                              </div>
                            </div>
                          ))}
                          {searchResults.length > 4 && (
                            <div className="p-2 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                              <Link 
                                to={`/calculadoras?q=${encodeURIComponent(searchResults[0]?.title || '')}`}
                                className="text-xs text-primary hover:text-primary/80 font-medium flex items-center justify-center"
                              >
                                Ver todos los resultados
                                <ArrowRight className="ml-1 h-2.5 w-2.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 text-center">
                        <div className="bg-gray-50 inline-flex rounded-full p-2 mb-2">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-sm font-medium">No se encontraron calculadoras</p>
                        <p className="text-gray-500 text-xs mt-1">Intenta con otro término de búsqueda</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator of the Day Section */}
      <section className="py-12 px-4 animate-fade-up">
        <div className="container max-w-6xl mx-auto">
          <CalculatorOfTheDay />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 animate-fade-up">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Categorías Populares</h2>
          <CategoryGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 mb-8">
            Explora nuestra colección completa de calculadoras o contacta con nosotros.
          </p>
          <Link to="/calculadoras">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Ver Todas las Calculadoras
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
