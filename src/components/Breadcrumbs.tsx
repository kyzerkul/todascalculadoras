import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { calculators } from "@/config/calculators";
import { categories } from "@/components/CategoryGrid";
import { blogPosts } from "@/data/blogPosts";

interface BreadcrumbItem {
  name: string;
  path: string;
  isLast: boolean;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(segment => segment !== "");
  
  // Ne pas afficher de breadcrumbs sur la page d'accueil
  if (pathSegments.length === 0) {
    return null;
  }
  
  // Construction des breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Inicio", path: "/", isLast: pathSegments.length === 0 }
  ];

  // Traitement spécial pour calculadora et categoria
  if (pathSegments.length > 0) {
    if (pathSegments[0] === "calculadora") {
      // Ajouter un segment intermédiaire pour calculadoras
      breadcrumbs.push({
        name: "Calculadoras",
        path: "/calculadoras",
        isLast: false
      });
    } else if (pathSegments[0] === "categoria") {
      // Ne pas ajouter de segment intermédiaire, le chemin "Categorías" est déjà sur la home page
    } else if (pathSegments[0] === "blog" && pathSegments.length > 1) {
      // Ajouter un segment intermédiaire pour blog
      breadcrumbs.push({
        name: "Blog", 
        path: "/blog",
        isLast: false
      });
    }
  }
  
  // Ajouter le segment final
  if (pathSegments.length > 0) {
    const lastSegment = pathSegments[pathSegments.length - 1];
    let name = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    
    // Pour les segments spéciaux du dernier niveau
    if (pathSegments.length === 1) {
      if (lastSegment === "blog") {
        name = "Blog";
      } else if (lastSegment === "calculadoras") {
        name = "Calculadoras";
      } else if (lastSegment === "sobre-nosotros") {
        name = "Sobre Nosotros";
      } else if (lastSegment === "contacto") {
        name = "Contacto";
      } else if (lastSegment === "faq") {
        name = "FAQ";
      } else if (lastSegment === "legal") {
        name = "Legal";
      }
    } 
    // Pour les niveaux intermédiaires
    else {
      const prevSegment = pathSegments[pathSegments.length - 2];
      
      // Nom des catégories
      if (prevSegment === "categoria") {
        const category = categories.find(
          cat => cat.title.toLowerCase().replace(/\s+/g, "-") === lastSegment
        );
        if (category) {
          name = category.title;
        }
      }
      
      // Nom des calculatrices
      if (prevSegment === "calculadora") {
        const calculator = calculators[lastSegment as keyof typeof calculators];
        if (calculator) {
          name = calculator.title;
        }
      }
      
      // Nom des articles de blog
      if (prevSegment === "blog") {
        const post = blogPosts.find(post => post.slug === lastSegment);
        if (post) {
          name = post.title;
        }
      }
    }
    
    breadcrumbs.push({
      name,
      path: location.pathname,
      isLast: true
    });
  }
  
  // Création des données structurées Schema.org pour BreadcrumbList
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://calculadorahub.com${item.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            {index === 0 ? (
              <Link to={item.path} className="flex items-center hover:text-primary">
                <Home className="h-4 w-4 mr-1" />
                <span>{item.name}</span>
              </Link>
            ) : (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                {item.isLast ? (
                  <span className="font-medium text-foreground">{item.name}</span>
                ) : (
                  <Link to={item.path} className="hover:text-primary">
                    {item.name}
                  </Link>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
