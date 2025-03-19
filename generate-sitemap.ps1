# Script PowerShell pour générer un sitemap.xml complet
# Dernière mise à jour: 2025-03-19

$outputFile = "public\sitemap.xml"
$baseUrl = "https://todascalculadoras.com"
$today = (Get-Date).ToString("yyyy-MM-dd")

# Structure XML initiale
$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
"@

# Fonction pour ajouter une URL au sitemap
function Add-SitemapUrl {
    param (
        [string]$url,
        [string]$lastmod = $today,
        [string]$changefreq = "weekly",
        [string]$priority = "0.8"
    )

    return @"
  <url>
    <loc>$url</loc>
    <lastmod>$lastmod</lastmod>
    <changefreq>$changefreq</changefreq>
    <priority>$priority</priority>
  </url>
"@
}

# Pages principales
$xml += Add-SitemapUrl -url "$baseUrl/" -priority "1.0"
$xml += Add-SitemapUrl -url "$baseUrl/calculadoras" -priority "0.9"
$xml += Add-SitemapUrl -url "$baseUrl/blog" -priority "0.9"
$xml += Add-SitemapUrl -url "$baseUrl/sobre-nosotros" -priority "0.7" -changefreq "monthly"
$xml += Add-SitemapUrl -url "$baseUrl/contacto" -priority "0.7" -changefreq "monthly"
$xml += Add-SitemapUrl -url "$baseUrl/faq" -priority "0.7" -changefreq "monthly"
$xml += Add-SitemapUrl -url "$baseUrl/legal" -priority "0.6" -changefreq "yearly"

# Pages de catégories
$categories = @(
    "matematicas", "financieras", "cientificas", "salud", "fechas",
    "estadisticas", "programacion-y-tecnologia", "conversiones", "simuladores", "ingenieria"
)

foreach ($cat in $categories) {
    $xml += Add-SitemapUrl -url "$baseUrl/categoria/$cat" -priority "0.8"
}

# Structure des calculatrices par catégorie (nouvelle structure d'URL)
$categoryCalculators = @{
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

# Ajouter les nouveaux liens de calculatrices (format catégorie/calculatrice)
foreach ($category in $categoryCalculators.Keys) {
    foreach ($calculator in $categoryCalculators[$category]) {
        $xml += Add-SitemapUrl -url "$baseUrl/$category/$calculator" -priority "0.8"
    }
}

# Conserver temporairement les anciens liens pour la transition (format /calculadora/nom)
# Cela aidera les moteurs de recherche à faire la transition vers les nouvelles URLs
if (Test-Path "public\calculadora") {
    $calculatorDirs = Get-ChildItem -Path "public\calculadora" -Directory
    foreach ($dir in $calculatorDirs) {
        $calculatorId = $dir.Name
        $xml += Add-SitemapUrl -url "$baseUrl/calculadora/$calculatorId" -priority "0.6" -changefreq "yearly"
    }
}

# Pages de blog (recherche dans le répertoire public/blog)
$blogDirs = Get-ChildItem -Path "public\blog" -Directory
foreach ($dir in $blogDirs) {
    $blogId = $dir.Name
    $xml += Add-SitemapUrl -url "$baseUrl/blog/$blogId" -priority "0.8"
}

# Fermeture du XML
$xml += "</urlset>"

# Écriture du fichier
$xml | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "Le sitemap a été généré avec succès dans $outputFile"
Write-Host "Total URLs: $((($xml -split "<url>").Count - 1))"
Write-Host "Le sitemap a été mis à jour avec la nouvelle structure d'URL domaine/catégorie/calculatrice"
