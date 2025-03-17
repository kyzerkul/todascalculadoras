// @ts-check
import { generateSitemap } from './generateSitemap.js';

console.log('Exécution des tâches post-build...');

// Génération du sitemap
try {
  const result = generateSitemap();
  if (result) {
    console.log('Sitemap généré avec succès !');
  } else {
    console.error('Échec de la génération du sitemap');
  }
} catch (error) {
  console.error('Erreur lors de la génération du sitemap:', error);
}

console.log('Toutes les tâches post-build ont été exécutées avec succès !');
