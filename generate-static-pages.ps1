# Script pour générer des pages statiques HTML pour tous les calculateurs
# Liste des calculateurs restants
$calculadoras = @(
    @{
        "path" = "calculadora-cientifica"
        "title" = "Calculadora Científica"
        "desc" = "Calculadora científica online gratuita con funciones avanzadas: trigonometría, logaritmos, potencias, raíces y más. Fácil de usar en cualquier dispositivo."
        "category" = "SoftwareApplication"
    },
    @{
        "path" = "calculadora-estadistica"
        "title" = "Calculadora Estadística"
        "desc" = "Calcula media, mediana, moda, desviación estándar y más estadísticas con nuestra calculadora online. Herramienta gratuita para análisis estadístico."
        "category" = "SoftwareApplication"
    },
    @{
        "path" = "calculadora-matematica-basica"
        "title" = "Calculadora Matemática Básica"
        "desc" = "Calculadora básica online para operaciones aritméticas: suma, resta, multiplicación y división. Ideal para cálculos rápidos y sencillos."
        "category" = "SoftwareApplication"
    },
    @{
        "path" = "calculadora-porcentajes"
        "title" = "Calculadora de Porcentajes"
        "desc" = "Calcula porcentajes de manera rápida y sencilla: aumentos, descuentos, porcentajes de un número y más. Herramienta gratuita en línea."
        "category" = "SoftwareApplication"
    },
    @{
        "path" = "calculadora-ecuaciones"
        "title" = "Calculadora de Ecuaciones"
        "desc" = "Resuelve ecuaciones lineales, cuadráticas y polinómicas paso a paso. Calculadora gratuita online para resolver ecuaciones con variables."
        "category" = "SoftwareApplication"
    },
    @{
        "path" = "calculadora-logaritmos"
        "title" = "Calculadora de Logaritmos"
        "desc" = "Calcula logaritmos naturales, decimales y en cualquier base. Herramienta gratuita para resolver cálculos logarítmicos de forma precisa."
        "category" = "SoftwareApplication"
    },
    @{
        "path" = "simulador-inversion"
        "title" = "Simulador de Inversión"
        "desc" = "Simula el crecimiento de tus inversiones con diferentes tasas de interés y plazos. Herramienta para planificar tus objetivos financieros."
        "category" = "FinanceApplication"
    },
    @{
        "path" = "calculadora-prestamo"
        "title" = "Calculadora de Préstamo"
        "desc" = "Calcula cuotas mensuales, intereses y amortización de préstamos. Herramienta perfecta para planificar antes de solicitar un préstamo."
        "category" = "FinanceApplication"
    },
    @{
        "path" = "calculadora-interes-compuesto"
        "title" = "Calculadora de Interés Compuesto"
        "desc" = "Calcula cuánto crecerá tu dinero con el interés compuesto. Visualiza el poder del crecimiento exponencial en tus ahorros e inversiones."
        "category" = "FinanceApplication"
    },
    @{
        "path" = "calculadora-ohm"
        "title" = "Calculadora de Ley de Ohm"
        "desc" = "Calcula voltaje, corriente, resistencia y potencia con nuestra calculadora de la Ley de Ohm. Herramienta indispensable para electrónica."
        "category" = "EngineeringApplication"
    },
    @{
        "path" = "calculadora-resistencia-electrica"
        "title" = "Calculadora de Resistencia Eléctrica"
        "desc" = "Calcula el valor de resistencias por código de colores y realiza conversiones entre unidades eléctricas. Ideal para estudiantes y profesionales."
        "category" = "EngineeringApplication"
    },
    @{
        "path" = "conversor-unidades"
        "title" = "Conversor de Unidades"
        "desc" = "Convierte entre diferentes unidades de longitud, peso, volumen, temperatura y más. Herramienta de conversión precisa y fácil de usar."
        "category" = "UtilityApplication"
    },
    @{
        "path" = "calculadora-metabolismo-basal"
        "title" = "Calculadora de Metabolismo Basal"
        "desc" = "Calcula tu tasa metabólica basal (TMB) para conocer las calorías que quemas en reposo. Herramienta útil para planes de nutrición."
        "category" = "HealthApplication"
    },
    @{
        "path" = "calculadora-calorias"
        "title" = "Calculadora de Calorías"
        "desc" = "Calcula tus necesidades diarias de calorías según tu edad, peso, altura, sexo y nivel de actividad física. Ideal para planes alimenticios."
        "category" = "HealthApplication"
    },
    @{
        "path" = "calculadora-fecha"
        "title" = "Calculadora de Fechas"
        "desc" = "Calcula diferencias entre fechas, suma o resta días a una fecha, y determina días laborables. Herramienta completa para gestión de tiempo."
        "category" = "UtilityApplication"
    },
    @{
        "path" = "due-date-calculator"
        "title" = "Calculadora de Fecha de Parto"
        "desc" = "Calcula tu fecha probable de parto basada en tu último período menstrual o fecha de concepción. Herramienta útil para futuras mamás."
        "category" = "HealthApplication"
    }
)

# Liste des articles de blog restants
$blogs = @(
    @{
        "path" = "tips-para-mejorar-tus-finanzas-personales"
        "title" = "Tips Para Mejorar tus Finanzas Personales"
        "desc" = "Consejos prácticos para mejorar tu salud financiera, ahorrar más dinero y alcanzar tus metas económicas. Estrategias simples y efectivas."
    },
    @{
        "path" = "diferencia-entre-calculadoras-cientificas-y-graficas"
        "title" = "Diferencia Entre Calculadoras Científicas y Gráficas"
        "desc" = "Descubre las principales diferencias entre calculadoras científicas y gráficas, sus funciones específicas y cuál es la ideal para tus necesidades."
    },
    @{
        "path" = "guia-para-usar-nuestra-calculadora-de-imc"
        "title" = "Guía Para Usar Nuestra Calculadora de IMC"
        "desc" = "Aprende a utilizar correctamente nuestra calculadora de IMC. Guía completa con interpretación de resultados y consejos para un peso saludable."
    }
)

# Fonction pour générer un fichier HTML pour une calculadora
function Generate-CalculadoraHtml($path, $title, $desc, $category) {
    $fullPath = "public\calculadora\$path\index.html"
    $canonicalUrl = "https://todascalculadoras.com/calculadora/$path"
    
    $content = @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title | Todas Calculadoras</title>
  <meta name="description" content="$desc">
  <link rel="canonical" href="$canonicalUrl">
  <meta http-equiv="refresh" content="0;url=/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "$title",
    "applicationCategory": "$category",
    "description": "$desc",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  </script>
</head>
<body>
  <p>Redireccionando a <a href="/">Todas Calculadoras</a>...</p>
</body>
</html>
"@

    Set-Content -Path $fullPath -Value $content
    Write-Host "Generado: $fullPath"
}

# Fonction pour générer un fichier HTML pour un article de blog
function Generate-BlogHtml($path, $title, $desc) {
    $fullPath = "public\blog\$path\index.html"
    $canonicalUrl = "https://todascalculadoras.com/blog/$path"
    
    $content = @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title | Blog Todas Calculadoras</title>
  <meta name="description" content="$desc">
  <link rel="canonical" href="$canonicalUrl">
  <meta http-equiv="refresh" content="0;url=/">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "$title",
    "description": "$desc",
    "author": {
      "@type": "Organization",
      "name": "Todas Calculadoras"
    },
    "datePublished": "2024-01-15T09:00:00+00:00",
    "dateModified": "2024-01-15T09:00:00+00:00",
    "publisher": {
      "@type": "Organization",
      "name": "Todas Calculadoras",
      "logo": {
        "@type": "ImageObject",
        "url": "https://todascalculadoras.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "$canonicalUrl"
    }
  }
  </script>
</head>
<body>
  <p>Redireccionando a <a href="/">Todas Calculadoras</a>...</p>
</body>
</html>
"@

    Set-Content -Path $fullPath -Value $content
    Write-Host "Generado: $fullPath"
}

# Génération des fichiers HTML pour les calculateurs
foreach ($calc in $calculadoras) {
    Generate-CalculadoraHtml $calc.path $calc.title $calc.desc $calc.category
}

# Génération des fichiers HTML pour les articles de blog
foreach ($blog in $blogs) {
    Generate-BlogHtml $blog.path $blog.title $blog.desc
}

Write-Host "Génération terminée!"
