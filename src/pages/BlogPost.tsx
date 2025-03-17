import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, BlogPost as BlogPostType } from "@/data/blogPosts";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const currentPost = blogPosts.find((p) => p.slug === postSlug) || null;
    setPost(currentPost);

    if (currentPost) {
      // Get related posts based on same category
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [postSlug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Artículo no encontrado</h1>
          <p className="mb-6">Lo sentimos, el artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blog">
            <Button>Volver al Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Création des données structurées pour l'article de blog (Schema.org)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Calculadora Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://calculadorahub.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://calculadorahub.com/blog/${post.slug}`
    },
    "keywords": [post.category, "calculadora", "calculadoras", ...post.content.sections.map(s => s.title.toLowerCase())],
    "articleSection": post.category
  };

  // Optimisation du titre SEO pour l'article de blog
  const seoTitle = `${post.title} | Blog Calculadora Hub`;
  
  // Optimisation de la description SEO pour l'article de blog
  const seoDescription = post.description;
  
  // URL canonique pour l'article de blog
  const canonicalUrl = `/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        type="article"
        image={post.image}
        schema={articleSchema}
      />
      <div className="container max-w-4xl mx-auto px-4">
        <Breadcrumbs />

        {/* Back to blog button */}
        <Link to="/blog" className="inline-flex items-center text-primary mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Blog
        </Link>

        {/* Article header */}
        <div className="mb-10 animate-fade-down">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center">
              <Tag className="mr-1 h-3 w-3" />
              {post.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {post.date}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <User className="mr-1 h-3 w-3" />
              {post.author}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          <p className="text-xl text-gray-600">{post.description}</p>
        </div>

        {/* Featured image */}
        <div className="mb-10 rounded-xl overflow-hidden bg-primary/5 p-8 flex justify-center animate-fade">
          <img 
            src={post.image}
            alt={post.title}
            className="max-h-80 object-contain" 
          />
        </div>

        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-12 animate-fade-up">
          {/* Introduction */}
          <p className="text-lg leading-relaxed mb-8">{post.content.intro}</p>

          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="mb-4">{section.content}</p>
              {section.image && (
                <div className="my-6 rounded-lg overflow-hidden">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full" 
                  />
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <h2 className="text-2xl font-bold mb-4">Conclusión</h2>
          <p className="mb-8">{post.content.conclusion}</p>
        </div>

        {/* Related calculators */}
        {post.content.relatedCalculators && post.content.relatedCalculators.length > 0 && (
          <div className="mb-12 animate-fade">
            <h3 className="text-xl font-bold mb-4">Calculadoras relacionadas</h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.content.relatedCalculators.map((calcId, index) => (
                  <li key={index}>
                    <Link 
                      to={`/calculadora/${calcId}`} 
                      className="text-primary hover:underline flex items-center"
                    >
                      <span className="mr-2">•</span>
                      {calcId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 animate-fade-up">
            <h3 className="text-2xl font-bold mb-6">Artículos relacionados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link to={`/blog/${relatedPost.slug}`} key={relatedPost.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="h-40 bg-gray-100 flex items-center justify-center p-4">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="h-full object-contain" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold line-clamp-2">{relatedPost.title}</h4>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{relatedPost.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
