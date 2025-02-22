
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import CategoryGrid from "@/components/CategoryGrid";
import CalculatorOfTheDay from "@/components/CalculatorOfTheDay";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 animate-fade-down">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Todas las Calculadoras
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Encuentra la calculadora perfecta para tus necesidades. Miles de herramientas útiles en un solo lugar.
          </p>
          <SearchBar />
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
          <Button className="bg-primary text-white hover:bg-primary/90">
            Ver Todas las Calculadoras
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
