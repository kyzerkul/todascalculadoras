
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Blog Header */}
        <div className="mb-12 text-center animate-fade-down">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Blog y Tutoriales
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aprende a sacar el máximo provecho de nuestras calculadoras con guías detalladas y consejos útiles.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-100" />
              <CardContent className="p-6">
                <div className="text-sm text-primary mb-2">Categoría</div>
                <h3 className="font-semibold text-lg mb-2">
                  Título del Artículo {index}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Breve descripción del contenido del artículo...
                </p>
                <div className="text-sm text-gray-500">12 Febrero, 2024</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
