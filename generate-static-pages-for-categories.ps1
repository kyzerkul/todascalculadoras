# Script PowerShell pour générer des pages statiques HTML avec le nouveau format d'URL (catégorie/calculateur)
# Date: 2025-03-19

# Fonction pour créer un répertoire s'il n'existe pas
function Create-DirectoryIfNotExists {
    param ([string]$path)
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "Répertoire créé: $path"
    }
}

# Définir la structure des calculatrices par catégorie
$calculatorsStructure = @{
    "matematicas" = @("calculadora-fracciones", "calculadora-algebra", "calculadora-porcentajes", "calculadora-ecuaciones-cuadraticas", "calculadora-logaritmos-mat")
    "financieras" = @("hipoteca", "prestamo-personal", "interes-compuesto", "calculadora-roi", "calculadora-prestamo")
    "cientificas" = @("calculadora-cientifica", "calculadora-ecuaciones", "calculadora-logaritmos")
    "conversiones" = @("conversor-unidades", "conversor-monedas", "conversor-tiempo", "conversion-energia")
    "salud" = @("calculadora-imc", "calculadora-calorias", "calculadora-metabolismo", "calculadora-grasa-corporal")
    "simuladores" = @("casio-fx-82ms", "hp-300s-plus", "calculadora-trigonometrica")
    "fechas" = @("calculadora-fecha", "time-calculator", "date-wheel", "epoch-converter")
    "ingenieria" = @("resistencia-materiales", "ley-ohm", "caida-tension")
    "estadisticas" = @("calculadora-estadistica", "calculadora-probabilidad")
    "programacion-y-tecnologia" = @("conversor-unidades", "calculadora-cientifica")
}

# Articles de blog (simplifié)
$blogArticles = @(
    "como-calcular-porcentajes",
    "como-funciona-el-interes-compuesto",
    "diferencia-entre-calculadoras-cientificas-y-graficas",
    "guia-para-usar-nuestra-calculadora-de-imc",
    "tips-para-mejorar-tus-finanzas-personales"
)

# Fonction pour créer un fichier HTML statique
function Create-StaticHtml {
    param (
        [string]$category,
        [string]$calculatorId,
        [string]$title,
        [string]$description
    )

    $outputDir = "public\$category\$calculatorId"
    Create-DirectoryIfNotExists $outputDir

    $htmlContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title | TodasCalculadoras</title>
    <meta name="description" content="$description">
    <link rel="canonical" href="https://todascalculadoras.com/$category/$calculatorId">
    <meta property="og:title" content="$title | TodasCalculadoras">
    <meta property="og:description" content="$description">
    <meta property="og:url" content="https://todascalculadoras.com/$category/$calculatorId">
    <meta property="og:type" content="website">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "$title",
        "applicationCategory": "CalculatorApplication",
        "operatingSystem": "Web",
        "description": "$description",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "url": "https://todascalculadoras.com/$category/$calculatorId"
    }
    </script>
    <script>
        // Redirection vers l'application React
        window.location.href = "/#/$category/$calculatorId";
    </script>
</head>
<body>
    <h1>$title</h1>
    <p>$description</p>
    <p>Cargando la calculadora...</p>
</body>
</html>
"@

    $outputPath = "$outputDir\index.html"
    $htmlContent | Out-File -FilePath $outputPath -Encoding UTF8
    Write-Host "Page statique créée: $outputPath"
}

# Fonction pour créer un fichier HTML statique pour blog
function Create-BlogStaticHtml {
    param (
        [string]$postSlug,
        [string]$title,
        [string]$description
    )

    $outputDir = "public\blog\$postSlug"
    Create-DirectoryIfNotExists $outputDir

    $htmlContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title | Blog TodasCalculadoras</title>
    <meta name="description" content="$description">
    <link rel="canonical" href="https://todascalculadoras.com/blog/$postSlug">
    <meta property="og:title" content="$title | Blog TodasCalculadoras">
    <meta property="og:description" content="$description">
    <meta property="og:url" content="https://todascalculadoras.com/blog/$postSlug">
    <meta property="og:type" content="article">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "$title",
        "description": "$description",
        "url": "https://todascalculadoras.com/blog/$postSlug",
        "datePublished": "2025-03-19"
    }
    </script>
    <script>
        // Redirection vers l'application React
        window.location.href = "/#/blog/$postSlug";
    </script>
</head>
<body>
    <h1>$title</h1>
    <p>$description</p>
    <p>Cargando el artículo...</p>
</body>
</html>
"@

    $outputPath = "$outputDir\index.html"
    $htmlContent | Out-File -FilePath $outputPath -Encoding UTF8
    Write-Host "Page blog statique créée: $outputPath"
}

# Générer les pages pour toutes les calculatrices par catégorie
foreach ($category in $calculatorsStructure.Keys) {
    foreach ($calculatorId in $calculatorsStructure[$category]) {
        $title = "Calculadora de $calculatorId"
        $description = "Utiliza nuestra calculadora de $calculatorId en línea, gratis y sin registro. Herramienta rápida y fácil de usar."
        Create-StaticHtml -category $category -calculatorId $calculatorId -title $title -description $description
    }
}

# Générer les pages pour les articles de blog
foreach ($postSlug in $blogArticles) {
    $title = $postSlug -replace "-", " " -replace "\b[a-z]", { $args[0].ToString().ToUpper() }
    $description = "Aprende todo sobre $($postSlug -replace '-', ' ') en nuestro blog. Consejos, trucos y explicaciones detalladas."
    Create-BlogStaticHtml -postSlug $postSlug -title $title -description $description
}

Write-Host "Génération de pages statiques terminée !"
