import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  schema?: Record<string, any>;
  noindex?: boolean;
}

const SEO = ({
  title = 'Todas Calculadoras - Calculadoras Online en Español',
  description = 'Descubre una amplia variedad de calculadoras en línea para finanzas, matemáticas, salud, ingeniería y más. Herramientas precisas, gratuitas y fáciles de usar en español para tus cálculos diarios.',
  canonical,
  image = '/images/og-image.jpg',
  type = 'website',
  schema,
  noindex = false
}: SEOProps) => {
  const siteUrl = 'https://todascalculadoras.com';
  const siteName = 'Todas Calculadoras';
  const fullUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Mise à jour directe des métadonnées pour s'assurer qu'elles sont détectables
  useEffect(() => {
    // Mettre à jour le titre
    document.title = title;
    
    // Mettre à jour la description
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', description);
    }
    
    // Mettre à jour les balises Open Graph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Mettre à jour l'URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl);
    }
    
    // Définir langue du document
    document.documentElement.setAttribute('lang', 'es');
  }, [title, description, fullUrl]);
  
  return (
    <Helmet>
      {/* Balises de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={fullUrl} />}
      
      {/* Balises contrôle robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Balises Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />

      {/* Balises Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Schema.org (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Définir la langue */}
      <html lang="es" />
    </Helmet>
  );
};

export default SEO;
