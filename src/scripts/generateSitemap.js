// @ts-check
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtenir le chemin du répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../../public');

// Configuration
const BASE_URL = 'https://todascalculadoras.com';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Liste des URLs
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/calculadoras', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.9', changefreq: 'weekly' },
  { path: '/sobre-nosotros', priority: '0.7', changefreq: 'monthly' },
  { path: '/contacto', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/legal', priority: '0.6', changefreq: 'yearly' },
];

// Catégories
const CATEGORIES = [
  'matematicas',
  'financieras',
  'cientificas',
  'conversiones',
  'salud',
  'simuladores',
  'fechas',
  'ingenieria'
];

// Calculatrices principales (liste partielle)
const CALCULATORS = [
  'calculadora-matematica-basica',
  'calculadora-fracciones',
  'calculadora-porcentajes',
  'calculadora-estadistica',
  'calculadora-cientifica',
  'calculadora-trigonometrica',
  'calculadora-logaritmos',
  'calculadora-ecuaciones',
  'conversor-unidades',
  'calculadora-imc',
  'calculadora-calorias',
  'calculadora-metabolismo-basal',
  'calculadora-hipoteca',
  'calculadora-prestamo',
  'calculadora-interes-compuesto',
  'calculadora-fecha',
  'due-date-calculator',
  'simulador-inversion',
  'calculadora-resistencia-electrica',
  'calculadora-ohm'
];

// Articles de blog (exemples)
const BLOG_POSTS = [
  'como-calcular-porcentajes',
  'guia-para-usar-nuestra-calculadora-de-imc',
  'como-funciona-el-interes-compuesto',
  'diferencia-entre-calculadoras-cientificas-y-graficas',
  'tips-para-mejorar-tus-finanzas-personales'
];

// Fonction pour générer le sitemap
const generateSitemap = () => {
  try {
    console.log('Génération du sitemap...');
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Ajouter les pages statiques
    STATIC_PAGES.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}${page.path}</loc>\n`;
      xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    });
    
    // Ajouter les pages de catégories
    CATEGORIES.forEach(category => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/categoria/${category}</loc>\n`;
      xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    // Ajouter les calculatrices
    CALCULATORS.forEach(calculator => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/calculadora/${calculator}</loc>\n`;
      xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });
    
    // Ajouter les articles de blog
    BLOG_POSTS.forEach(post => {
      xml += '  <url>\n';
      xml += `    <loc>${BASE_URL}/blog/${post}</loc>\n`;
      xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    // Écriture du fichier
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
    console.log(`Sitemap généré avec succès ! (${STATIC_PAGES.length + CATEGORIES.length + CALCULATORS.length + BLOG_POSTS.length} URLs)`);
    return true;
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    return false;
  }
};

// Exécution de la fonction
generateSitemap();

export { generateSitemap };
