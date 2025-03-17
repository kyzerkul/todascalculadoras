import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const Blog = () => {
  // Données structurées pour la page du blog (Schema.org)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog de Todascalculadoras.com – Tutoriales, Consejos y Novedades en Calculadoras Online",
    "description": "Explora nuestro blog para obtener tutoriales, consejos prácticos y las últimas noticias sobre calculadoras online. Aprende a optimizar tus cálculos con herramientas digitales precisas en español.",
    "url": "https://todascalculadoras.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Todas Calculadoras",
      "logo": {
        "@type": "ImageObject",
        "url": "https://todascalculadoras.com/logo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "image": post.image,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.date,
      "url": `https://todascalculadoras.com/blog/${post.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <SEO
        title="Blog de Todascalculadoras.com – Tutoriales, Consejos y Novedades en Calculadoras Online"
        description="Explora nuestro blog para obtener tutoriales, consejos prácticos y las últimas noticias sobre calculadoras online. Aprende a optimizar tus cálculos con herramientas digitales precisas en español."
        canonical="/blog"
        schema={blogSchema}
      />
      <div className="container max-w-6xl mx-auto px-4">
        <Breadcrumbs />
        
        {/* Blog Header */}
        <div className="mb-12 text-center animate-fade-down">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Blog y Tutoriales
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aprende a sacar el máximo provecho de nuestras calculadoras con guías detalladas y consejos útiles.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12 animate-fade-up">
          <Link to={`/blog/${blogPosts[0].slug}`}>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-72 bg-primary/10 flex items-center justify-center overflow-hidden">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title} 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center">
                        <Tag className="mr-1 h-3 w-3" />
                        {blogPosts[0].category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {blogPosts[0].date}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                    <p className="text-gray-600 mb-4">{blogPosts[0].description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {blogPosts[0].author.charAt(0)}
                      </div>
                      <span className="ml-2 text-sm text-gray-700">{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center text-primary hover:underline font-medium">
                      Leer más
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          {blogPosts.slice(1).map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary flex items-center">
                      <Tag className="mr-1 h-3 w-3" />
                      {post.category}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {post.author.charAt(0)}
                      </div>
                      <span className="ml-2 text-xs text-gray-700">{post.author}</span>
                    </div>
                    <div className="flex items-center text-primary text-xs hover:underline font-medium">
                      Leer más
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="outline" size="sm">Siguiente</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
