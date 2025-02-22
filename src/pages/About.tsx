
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Sobre Nosotros
          </h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="text-gray-600 mb-6">
              Facilitar el acceso a herramientas de cálculo precisas y fáciles de usar para todos. Creemos en hacer que las matemáticas y los cálculos complejos sean accesibles y comprensibles para cualquier persona.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>Calculadoras precisas y verificadas</li>
              <li>Interfaz intuitiva y fácil de usar</li>
              <li>Actualizaciones regulares</li>
              <li>Soporte en español</li>
              <li>100% gratuito</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Nuestro Compromiso</h2>
            <p className="text-gray-600">
              Nos comprometemos a mantener la más alta calidad en nuestras herramientas de cálculo, garantizando precisión y facilidad de uso. Continuamente trabajamos en mejorar y expandir nuestra colección de calculadoras para satisfacer las necesidades de nuestra comunidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
