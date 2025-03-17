// Améliorations pour la calculatrice de résistance des matériaux

// 1. Nouveaux champs d'entrée
/*
  {
    name: "longitud",
    label: "Longitud inicial (mm)",
    type: "number",
    defaultValue: "1000",
    placeholder: "Ingresa la longitud en mm"
  },
  {
    name: "aplicacion",
    label: "Tipo de aplicación",
    type: "select",
    options: [
      { value: "estandar", label: "Estándar (FS > 1.5)" },
      { value: "critica", label: "Crítica (FS > 3.0)" },
      { value: "precision", label: "Alta precisión" }
    ],
    defaultValue: "estandar",
  }
*/

// 2. Modifications dans la fonction calculate
/*
  calculate: (inputs) => {
    const fuerza = Number(inputs.fuerza);
    const area = Number(inputs.area);
    const material = inputs.material;
    const longitud = Number(inputs.longitud) || 1000; // Valeur par défaut si non spécifiée
    const aplicacion = inputs.aplicacion || "estandar";
    
    if (isNaN(fuerza) || isNaN(area) || area <= 0 || isNaN(longitud) || longitud <= 0) {
      return "Por favor, ingresa valores válidos. El área y la longitud no pueden ser cero o negativas.";
    }
    
    // Propiedades de los materiales - déjà mis à jour avec les nouveaux matériaux
    
    const tension = fuerza / area; // Resultado en N/mm² = MPa
    const factorSeguridad = propiedades[material].limite / tension;
    const deformacionUnitaria = tension / propiedades[material].modulo / 1000; // convertir de MPa a GPa
    const deformacionTotal = deformacionUnitaria * longitud; // en mm
    
    // Determinar el nivel de recomendación según la aplicación
    let nivelRecomendacion = "";
    if (aplicacion === "estandar" && factorSeguridad >= 1.5) {
      nivelRecomendacion = "Adecuado para aplicaciones estándar";
    } else if (aplicacion === "critica" && factorSeguridad >= 3.0) {
      nivelRecomendacion = "Adecuado para aplicaciones críticas";
    } else if (aplicacion === "precision" && deformacionUnitaria < 0.001) {
      nivelRecomendacion = "Adecuado para aplicaciones de alta precisión";
    } else {
      nivelRecomendacion = "No cumple con los requisitos para el tipo de aplicación seleccionada";
    }

    // Determinar el estado de seguridad - reste inchangé
*/

// 3. Améliorations de l'affichage des résultats
/*
  return `
    <div class="space-y-4">
      <div class="p-4 bg-gradient-to-r from-${propiedades[material].color}-50 to-blue-50 rounded-lg shadow-sm">
        <div class="flex flex-col md:flex-row justify-between">
          <div>
            <p class="font-semibold text-gray-800">Resultados del análisis:</p>
            <p class="text-xl font-bold">${tension.toFixed(2)} MPa (N/mm²)</p>
            <p class="text-sm text-gray-600">Tensión = Fuerza / Área</p>
            <p class="text-sm text-gray-600">${fuerza} N / ${area} mm² = ${tension.toFixed(2)} MPa</p>
          </div>
          <div class="mt-3 md:mt-0 md:ml-4 p-3 bg-white/60 backdrop-blur-sm rounded-md">
            <p class="font-medium text-gray-800">Comparación con límite</p>
            <div class="flex items-center gap-2 mt-1">
              <div class="grow h-3 bg-gray-200 rounded-full">
                <div class="h-3 rounded-full bg-${tension > propiedades[material].limite * 0.8 ? 'red' : tension > propiedades[material].limite * 0.6 ? 'yellow' : 'green'}-500" 
                  style="width: ${Math.min((tension / propiedades[material].limite) * 100, 100)}%"></div>
              </div>
              <span class="text-xs whitespace-nowrap">${Math.round((tension / propiedades[material].limite) * 100)}% del límite</span>
            </div>
          </div>
        </div>
        
        <div class="mt-3 pt-3 border-t border-${propiedades[material].color}-100">
          <p class="font-medium">Deformación:</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p class="text-sm font-medium">Unitaria:</p>
              <p class="text-md">${(deformacionUnitaria).toExponential(4)}</p>
              <p class="text-xs text-gray-600">ε = σ/E</p>
            </div>
            <div>
              <p class="text-sm font-medium">Total:</p>
              <p class="text-md">${deformacionTotal.toFixed(4)} mm</p>
              <p class="text-xs text-gray-600">Δl = ε × l₀</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-4 border rounded-md bg-white shadow-sm">
        <div class="flex items-center">
          <p class="font-medium">Estado para ${aplicacion === 'estandar' ? 'aplicación estándar' : aplicacion === 'critica' ? 'aplicación crítica' : 'alta precisión'}:</p>
          <span class="ml-2 px-2 py-1 text-sm rounded-md ${nivelRecomendacion.includes('Adecuado') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">${nivelRecomendacion}</span>
        </div>
        <p class="font-semibold ${colorEstado} mt-2">${estadoSeguridad}</p>
        <div class="mt-2 w-full bg-gray-200 rounded-full h-2.5">
          <div class="h-2.5 rounded-full ${colorEstado === 'text-green-600' ? 'bg-green-600' : colorEstado === 'text-yellow-600' ? 'bg-yellow-500' : colorEstado === 'text-orange-600' ? 'bg-orange-500' : 'bg-red-600'}" 
               style="width: ${Math.min(factorSeguridad * 25, 100)}%"></div>
        </div>
        <p class="mt-2">Factor de seguridad: <span class="font-medium">${factorSeguridad.toFixed(2)}</span></p>
        <p class="text-sm text-gray-600 mt-1">
          Se recomienda un factor de seguridad mínimo de 1.5 para aplicaciones estructurales estándar y de 3-4 para aplicaciones críticas.
        </p>
      </div>
      
      <!-- Section sur les applications typiques -->
      <div class="p-4 border rounded-md bg-white shadow-sm">
        <p class="font-medium text-indigo-700">Aplicaciones típicas: ${material.replace('_', ' ').charAt(0).toUpperCase() + material.replace('_', ' ').slice(1)}</p>
        <ul class="list-disc list-inside text-sm mt-2">
          ${material === 'acero' ? '<li>Estructuras de edificios y puentes</li><li>Maquinaria industrial</li><li>Componentes automotrices</li>' : ''}
          ${material === 'acero_inox' ? '<li>Equipos médicos y quirúrgicos</li><li>Industria alimentaria</li><li>Ambientes corrosivos</li>' : ''}
          ${material === 'aluminio' ? '<li>Aeronáutica</li><li>Perfiles arquitectónicos</li><li>Componentes electrónicos</li>' : ''}
          ${material === 'titanio' ? '<li>Implantes médicos</li><li>Aeronáutica y espacio</li><li>Industria química</li>' : ''}
          ${material === 'fibra_carbono' ? '<li>Deportes de alto rendimiento</li><li>Aeroespacial</li><li>Automóviles de competición</li>' : ''}
          ${material === 'concreto' ? '<li>Cimentaciones</li><li>Estructuras de edificios</li><li>Obras civiles</li>' : ''}
          ${material === 'madera' ? '<li>Estructuras residenciales</li><li>Muebles</li><li>Decoración</li>' : ''}
          ${material === 'madera_dura' ? '<li>Pisos de alta calidad</li><li>Muebles de lujo</li><li>Instrumentos musicales</li>' : ''}
          ${material === 'plastico_pvc' ? '<li>Tuberías y conexiones</li><li>Aislamiento eléctrico</li><li>Perfiles para ventanas</li>' : ''}
          ${material === 'otro' ? '<li>Aplicaciones diversas según propiedades</li>' : ''}
        </ul>
      </div>
      
      <!-- Visualisation simplifiée -->
      <div class="p-4 border rounded-md bg-white shadow-sm">
        <p class="font-medium text-indigo-700">Comportamiento del material bajo carga</p>
        <div class="mt-2 h-40 bg-gray-50 border rounded-md p-2 relative">
          <!-- Axe Y - Tension -->
          <div class="absolute left-8 top-0 bottom-0 w-px bg-gray-400"></div>
          <!-- Axe X - Déformation -->
          <div class="absolute left-8 right-0 bottom-8 h-px bg-gray-400"></div>
          
          <!-- Ligne élastique -->
          <div class="absolute left-8 bottom-8 h-24 w-px bg-gray-200" style="transform: rotate(-30deg); transform-origin: bottom left;"></div>
          
          <!-- Point de la tension calculée -->
          <div class="absolute w-3 h-3 rounded-full bg-red-500" 
               style="left: calc(8px + ${Math.min(deformacionUnitaria * 5000, 80)}%); bottom: calc(8px + ${Math.min((tension / propiedades[material].limite) * 100, 80)}%);"></div>
          
          <!-- Point limite -->
          <div class="absolute w-3 h-3 rounded-full bg-yellow-500" 
               style="left: calc(8px + 80%); bottom: calc(8px + 80%);"></div>
          
          <!-- Légende -->
          <div class="absolute left-10 bottom-3 text-xs flex items-center">
            <span>0</span><span class="ml-20">Deformación unitaria</span>
          </div>
          <div class="absolute left-3 bottom-10 text-xs" style="writing-mode: vertical-rl; transform: rotate(180deg);">
            <span>Tensión (MPa)</span><span class="ml-5">0</span>
          </div>
          <div class="absolute right-2 top-2 text-xs">
            <div class="flex items-center"><div class="w-2 h-2 rounded-full bg-red-500 mr-1"></div><span>Tensión actual</span></div>
            <div class="flex items-center mt-1"><div class="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div><span>Límite elástico</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
*/
