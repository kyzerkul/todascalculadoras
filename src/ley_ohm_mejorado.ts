"ley-ohm": {
  category: "ingenieria",
  title: "Calculadora de Ley de Ohm",
  description: "Calcula voltaje, corriente, resistencia y potencia según la Ley de Ohm para diseño y análisis de circuitos eléctricos",
  inputs: [
    {
      name: "calcular",
      label: "¿Qué quieres calcular?",
      type: "select",
      options: [
        { value: "voltaje", label: "Voltaje (V)" },
        { value: "corriente", label: "Corriente (I)" },
        { value: "resistencia", label: "Resistencia (R)" },
        { value: "potencia", label: "Potencia (P)" },
      ],
      defaultValue: "voltaje",
    },
    {
      name: "tipo_corriente",
      label: "Tipo de corriente",
      type: "select",
      options: [
        { value: "continua", label: "Corriente Continua (CC/DC)" },
        { value: "alterna", label: "Corriente Alterna (CA/AC)" },
      ],
      defaultValue: "continua",
    },
    {
      name: "corriente",
      label: "Corriente (A)",
      type: "number",
      defaultValue: "1",
      placeholder: "Ingresa la corriente en amperios",
      condition: { field: "calcular", value: "voltaje" },
    },
    {
      name: "resistencia",
      label: "Resistencia (Ω)",
      type: "number",
      defaultValue: "10",
      placeholder: "Ingresa la resistencia en ohmios",
      condition: { field: "calcular", value: "voltaje" },
    },
    {
      name: "factor_potencia",
      label: "Factor de potencia",
      type: "number",
      defaultValue: "1",
      placeholder: "Valor entre 0 y 1",
      condition: [
        { field: "calcular", value: "voltaje" },
        { field: "tipo_corriente", value: "alterna" },
      ],
    },
    {
      name: "voltaje",
      label: "Voltaje (V)",
      type: "number",
      defaultValue: "12",
      placeholder: "Ingresa el voltaje en voltios",
      condition: { field: "calcular", value: "corriente" },
    },
    {
      name: "resistencia2",
      label: "Resistencia (Ω)",
      type: "number",
      defaultValue: "10",
      placeholder: "Ingresa la resistencia en ohmios",
      condition: { field: "calcular", value: "corriente" },
    },
    {
      name: "factor_potencia2",
      label: "Factor de potencia",
      type: "number",
      defaultValue: "1",
      placeholder: "Valor entre 0 y 1",
      condition: [
        { field: "calcular", value: "corriente" },
        { field: "tipo_corriente", value: "alterna" },
      ],
    },
    {
      name: "voltaje2",
      label: "Voltaje (V)",
      type: "number",
      defaultValue: "12",
      placeholder: "Ingresa el voltaje en voltios",
      condition: { field: "calcular", value: "resistencia" },
    },
    {
      name: "corriente2",
      label: "Corriente (A)",
      type: "number",
      defaultValue: "1",
      placeholder: "Ingresa la corriente en amperios",
      condition: { field: "calcular", value: "resistencia" },
    },
    {
      name: "factor_potencia3",
      label: "Factor de potencia",
      type: "number",
      defaultValue: "1",
      placeholder: "Valor entre 0 y 1",
      condition: [
        { field: "calcular", value: "resistencia" },
        { field: "tipo_corriente", value: "alterna" },
      ],
    },
    {
      name: "voltaje3",
      label: "Voltaje (V)",
      type: "number",
      defaultValue: "12",
      placeholder: "Ingresa el voltaje en voltios",
      condition: { field: "calcular", value: "potencia" },
    },
    {
      name: "corriente3",
      label: "Corriente (A)",
      type: "number",
      defaultValue: "1",
      placeholder: "Ingresa la corriente en amperios",
      condition: { field: "calcular", value: "potencia" },
    },
    {
      name: "factor_potencia4",
      label: "Factor de potencia",
      type: "number",
      defaultValue: "1",
      placeholder: "Valor entre 0 y 1",
      condition: [
        { field: "calcular", value: "potencia" },
        { field: "tipo_corriente", value: "alterna" },
      ],
    },
    {
      name: "aplicacion",
      label: "Tipo de aplicación",
      type: "select",
      options: [
        { value: "general", label: "Uso general" },
        { value: "electronica", label: "Electrónica de bajo voltaje" },
        { value: "potencia", label: "Sistemas de potencia" },
        { value: "automotriz", label: "Sistemas automotrices" },
      ],
      defaultValue: "general",
    }
  ],
  calculate: (inputs) => {
    let resultado = 0;
    let formula = "";
    let unidad = "";
    let potencia = 0;
    let formulaPotencia = "";
    let esCA = inputs.tipo_corriente === "alterna";
    let factorPotenciaValor = 1;
    let aplicacionInfo = "";
    let nivelSeguridad = "";
    let recomendaciones = "";
    
    // Obtener el factor de potencia según la opción seleccionada
    if (esCA) {
      if (inputs.calcular === "voltaje") factorPotenciaValor = Number(inputs.factor_potencia);
      else if (inputs.calcular === "corriente") factorPotenciaValor = Number(inputs.factor_potencia2);
      else if (inputs.calcular === "resistencia") factorPotenciaValor = Number(inputs.factor_potencia3);
      else if (inputs.calcular === "potencia") factorPotenciaValor = Number(inputs.factor_potencia4);
      
      if (isNaN(factorPotenciaValor) || factorPotenciaValor <= 0 || factorPotenciaValor > 1) {
        factorPotenciaValor = 1;
      }
    }
    
    // Cálculo del voltaje: V = I × R
    if (inputs.calcular === "voltaje") {
      const corriente = Number(inputs.corriente);
      const resistencia = Number(inputs.resistencia);
      
      if (isNaN(corriente) || isNaN(resistencia)) {
        return "Por favor, ingresa valores numéricos válidos.";
      }
      
      resultado = corriente * resistencia;
      formula = `V = I × R = ${corriente} A × ${resistencia} Ω`;
      
      if (esCA) {
        formula += ` × cos(φ) = ${corriente} A × ${resistencia} Ω × ${factorPotenciaValor}`;
        resultado *= factorPotenciaValor;
      }
      
      unidad = "V";
      potencia = resultado * corriente * factorPotenciaValor;
      formulaPotencia = `P = V × I${esCA ? ' × cos(φ)' : ''} = ${resultado.toFixed(2)} V × ${corriente} A${esCA ? ` × ${factorPotenciaValor}` : ''} = ${potencia.toFixed(2)} W`;
    }
    
    // Cálculo de la corriente: I = V / R
    else if (inputs.calcular === "corriente") {
      const voltaje = Number(inputs.voltaje);
      const resistencia = Number(inputs.resistencia2);
      
      if (isNaN(voltaje) || isNaN(resistencia) || resistencia === 0) {
        return "Por favor, ingresa valores numéricos válidos. La resistencia no puede ser cero.";
      }
      
      resultado = voltaje / resistencia;
      formula = `I = V / R = ${voltaje} V / ${resistencia} Ω`;
      
      if (esCA) {
        formula += ` / cos(φ) = ${voltaje} V / (${resistencia} Ω × ${factorPotenciaValor})`;
        resultado /= factorPotenciaValor;
      }
      
      unidad = "A";
      potencia = voltaje * resultado * factorPotenciaValor;
      formulaPotencia = `P = V × I${esCA ? ' × cos(φ)' : ''} = ${voltaje} V × ${resultado.toFixed(2)} A${esCA ? ` × ${factorPotenciaValor}` : ''} = ${potencia.toFixed(2)} W`;
    }
    
    // Cálculo de la resistencia: R = V / I
    else if (inputs.calcular === "resistencia") {
      const voltaje = Number(inputs.voltaje2);
      const corriente = Number(inputs.corriente2);
      
      if (isNaN(voltaje) || isNaN(corriente) || corriente === 0) {
        return "Por favor, ingresa valores numéricos válidos. La corriente no puede ser cero.";
      }
      
      resultado = voltaje / corriente;
      formula = `R = V / I = ${voltaje} V / ${corriente} A`;
      
      if (esCA) {
        formula += ` × cos(φ) = ${voltaje} V / ${corriente} A × ${factorPotenciaValor}`;
        resultado *= factorPotenciaValor;
      }
      
      unidad = "Ω";
      potencia = voltaje * corriente * factorPotenciaValor;
      formulaPotencia = `P = V × I${esCA ? ' × cos(φ)' : ''} = ${voltaje} V × ${corriente} A${esCA ? ` × ${factorPotenciaValor}` : ''} = ${potencia.toFixed(2)} W`;
    }
    
    // Cálculo de la potencia: P = V × I
    else if (inputs.calcular === "potencia") {
      const voltaje = Number(inputs.voltaje3);
      const corriente = Number(inputs.corriente3);
      
      if (isNaN(voltaje) || isNaN(corriente)) {
        return "Por favor, ingresa valores numéricos válidos.";
      }
      
      resultado = voltaje * corriente;
      formula = `P = V × I = ${voltaje} V × ${corriente} A`;
      
      if (esCA) {
        formula += ` × cos(φ) = ${voltaje} V × ${corriente} A × ${factorPotenciaValor}`;
        resultado *= factorPotenciaValor;
      }
      
      unidad = "W";
      
      // Cálculo de resistencia equivalente
      const resistencia = voltaje / corriente;
      formulaPotencia = `También puede calcularse como: P = I² × R${esCA ? ' × cos(φ)' : ''} = ${corriente}² A × ${resistencia.toFixed(2)} Ω${esCA ? ` × ${factorPotenciaValor}` : ''} = ${resultado.toFixed(2)} W`;
    }
    
    // Información de aplicación
    switch (inputs.aplicacion) {
      case "electronica":
        aplicacionInfo = `
          <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p class="font-medium text-blue-800">Información para electrónica de bajo voltaje:</p>
            <ul class="list-disc list-inside text-sm space-y-1 text-blue-700">
              <li>Rango típico de operación: 1.5V - 24V DC</li>
              <li>Rangos de corriente habituales: 1mA - 1A</li>
              <li>Consideraciones especiales para componentes sensibles a ESD</li>
            </ul>
          </div>
        `;
        break;
      case "potencia":
        aplicacionInfo = `
          <div class="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p class="font-medium text-amber-800">Información para sistemas de potencia:</p>
            <ul class="list-disc list-inside text-sm space-y-1 text-amber-700">
              <li>Consideraciones para altas tensiones (>1000V)</li>
              <li>Importancia del factor de potencia en sistemas industriales</li>
              <li>Normativas aplicables: IEC 60364, NFPA 70, etc.</li>
            </ul>
          </div>
        `;
        break;
      case "automotriz":
        aplicacionInfo = `
          <div class="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-md">
            <p class="font-medium text-emerald-800">Información para sistemas automotrices:</p>
            <ul class="list-disc list-inside text-sm space-y-1 text-emerald-700">
              <li>Sistemas de 12V DC (vehículos ligeros) o 24V DC (vehículos pesados)</li>
              <li>Consideraciones para fluctuaciones de voltaje durante arranque</li>
              <li>Normativas aplicables: SAE J1772, ISO 26262</li>
            </ul>
          </div>
        `;
        break;
      default:
        // No mostrar información adicional para uso general
        break;
    }
    
    // Evaluación de seguridad basada en voltaje y corriente
    let voltajeEvaluado = 0;
    let corrienteEvaluada = 0;
    
    if (inputs.calcular === "voltaje") {
      voltajeEvaluado = resultado;
      corrienteEvaluada = Number(inputs.corriente);
    } else if (inputs.calcular === "corriente") {
      voltajeEvaluado = Number(inputs.voltaje);
      corrienteEvaluada = resultado;
    } else if (inputs.calcular === "resistencia") {
      voltajeEvaluado = Number(inputs.voltaje2);
      corrienteEvaluada = Number(inputs.corriente2);
    } else if (inputs.calcular === "potencia") {
      voltajeEvaluado = Number(inputs.voltaje3);
      corrienteEvaluada = Number(inputs.corriente3);
    }
    
    // Evaluación de seguridad
    if (voltajeEvaluado > 50 || (potencia > 50 && voltajeEvaluado > 25)) {
      nivelSeguridad = `
        <div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p class="font-medium text-red-800">⚠️ Advertencia de seguridad:</p>
          <p class="text-sm text-red-700">Este voltaje (${voltajeEvaluado.toFixed(2)}V) puede ser peligroso. Tensiones superiores a 50V pueden provocar descargas eléctricas graves.</p>
          <ul class="list-disc list-inside text-sm mt-2 text-red-700">
            <li>Use siempre equipos de protección adecuados</li>
            <li>Siga normativas de seguridad eléctricas locales</li>
            <li>Se recomienda aislamiento y protecciones adicionales</li>
          </ul>
        </div>
      `;
    } else if (corrienteEvaluada > 5) {
      nivelSeguridad = `
        <div class="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
          <p class="font-medium text-orange-800">⚠️ Precaución:</p>
          <p class="text-sm text-orange-700">Esta corriente (${corrienteEvaluada.toFixed(2)}A) puede generar calor excesivo. Corrientes superiores a 5A requieren conductores de sección adecuada.</p>
          <ul class="list-disc list-inside text-sm mt-2 text-orange-700">
            <li>Utilice cables con calibre adecuado para evitar sobrecalentamiento</li>
            <li>Considere protecciones contra sobrecorriente</li>
          </ul>
        </div>
      `;
    }
    
    // Recomendaciones según cálculos
    if (inputs.calcular === "resistencia" && resultado < 1) {
      recomendaciones = `
        <div class="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-md">
          <p class="font-medium text-violet-800">Recomendaciones técnicas:</p>
          <ul class="list-disc list-inside text-sm text-violet-700">
            <li>Resistencias bajas (${resultado.toFixed(4)}Ω) pueden causar corrientes elevadas</li>
            <li>Considere el uso de resistencias de potencia con disipadores térmicos</li>
            <li>Verifique la tolerancia de la resistencia para aplicaciones precisas</li>
          </ul>
        </div>
      `;
    } else if (inputs.calcular === "potencia" && resultado > 100) {
      recomendaciones = `
        <div class="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-md">
          <p class="font-medium text-violet-800">Recomendaciones técnicas:</p>
          <ul class="list-disc list-inside text-sm text-violet-700">
            <li>Para ${resultado.toFixed(2)}W, considere componentes con disipación térmica adecuada</li>
            <li>Se recomienda ventilación forzada para potencias superiores a 100W</li>
            <li>Considere la eficiencia energética para reducir pérdidas térmicas</li>
          </ul>
        </div>
      `;
    }
    
    return `
      <div class="space-y-4">
        <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm">
          <p class="font-semibold text-gray-800">Resultado:</p>
          <p class="text-xl font-bold">${resultado.toFixed(2)} ${unidad}</p>
          <p class="text-sm text-gray-600">
            ${formula} = ${resultado.toFixed(2)} ${unidad}
          </p>
          ${inputs.calcular !== "potencia" ? 
            `<div class="mt-2 pt-2 border-t border-green-100">
              <p class="font-medium">Potencia en el circuito:</p>
              <p class="text-md">${potencia.toFixed(2)} W</p>
              <p class="text-sm text-gray-600">${formulaPotencia}</p>
            </div>` : 
            `<div class="mt-2 pt-2 border-t border-green-100">
              <p class="text-sm text-gray-600">${formulaPotencia}</p>
            </div>`}
            
          ${esCA ? `
            <div class="mt-2 pt-2 border-t border-green-100">
              <p class="font-medium">Información para corriente alterna:</p>
              <p class="text-sm">Factor de potencia: ${factorPotenciaValor}</p>
              <p class="text-xs text-gray-600">El factor de potencia afecta a la potencia real consumida en circuitos AC.</p>
              ${factorPotenciaValor < 0.9 ? `<p class="text-xs text-orange-600 mt-1">Un factor de potencia bajo (< 0.9) puede resultar en pérdidas y sobrecostes. Considere la corrección del factor de potencia.</p>` : ''}
            </div>
          ` : ''}
        </div>
        
        ${nivelSeguridad}
        ${aplicacionInfo}
        ${recomendaciones}
        
        <div class="p-3 border rounded-md">
          <p class="font-medium">Ley de Ohm y potencia eléctrica:</p>
          <p>La Ley de Ohm establece que la corriente que circula por un conductor es directamente proporcional a la tensión e inversamente proporcional a la resistencia.</p>
          <p class="mt-2 font-semibold">Fórmulas principales:</p>
          <ul class="list-disc list-inside text-sm">
            <li>V = I × R (Voltaje = Corriente × Resistencia)</li>
            <li>I = V / R (Corriente = Voltaje / Resistencia)</li>
            <li>R = V / I (Resistencia = Voltaje / Corriente)</li>
            <li>P = V × I (Potencia = Voltaje × Corriente)</li>
            <li>P = I² × R (Potencia = Corriente² × Resistencia)</li>
            <li>P = V² / R (Potencia = Voltaje² / Resistencia)</li>
          </ul>
          
          <div class="mt-2 text-sm text-gray-600">
            <p class="font-medium">Información adicional:</p>
            <p>Unidades estándar:</p>
            <ul class="list-disc list-inside">
              <li>Voltaje (V): Voltio [V]</li>
              <li>Corriente (I): Amperio [A]</li>
              <li>Resistencia (R): Ohmio [Ω]</li>
              <li>Potencia (P): Vatio [W]</li>
            </ul>
          </div>
          
          <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="p-2 bg-blue-50 rounded border border-blue-100">
              <p class="font-medium text-blue-800">Aplicaciones prácticas:</p>
              <ul class="text-xs space-y-1 mt-1">
                <li><span class="font-medium">Diseño de circuitos:</span> Dimensionar componentes eléctricos.</li>
                <li><span class="font-medium">Diagnóstico:</span> Detectar fallos comparando valores teóricos vs medidos.</li>
                <li><span class="font-medium">Eficiencia energética:</span> Calcular pérdidas en sistemas eléctricos.</li>
                <li><span class="font-medium">Seguridad:</span> Prevenir sobrecalentamiento y riesgos eléctricos.</li>
              </ul>
            </div>
            
            <div class="p-2 bg-green-50 rounded border border-green-100">
              <p class="font-medium text-green-800">Códigos de colores para resistencias:</p>
              <div class="text-xs space-y-1 mt-1">
                <p>Negro: 0, Marrón: 1, Rojo: 2, Naranja: 3, Amarillo: 4</p>
                <p>Verde: 5, Azul: 6, Violeta: 7, Gris: 8, Blanco: 9</p>
                <p>Oro: ±5%, Plata: ±10%, Sin banda: ±20%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
