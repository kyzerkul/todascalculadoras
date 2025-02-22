
const Legal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Aviso Legal
        </h1>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Términos de Uso</h2>
            <div className="prose text-gray-600">
              <p>
                Al usar nuestro sitio web, aceptas estos términos de uso en su totalidad. Si no estás de acuerdo con estos términos, por favor no uses este sitio.
              </p>
              <p>
                Las calculadoras proporcionadas son solo para fines informativos y educativos. No nos hacemos responsables de decisiones tomadas basadas en los resultados obtenidos.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Política de Privacidad</h2>
            <div className="prose text-gray-600">
              <p>
                Respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica cómo recopilamos y utilizamos la información.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No almacenamos datos de cálculos realizados</li>
                <li>No compartimos información personal con terceros</li>
                <li>Usamos cookies esenciales para el funcionamiento del sitio</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">Descargo de Responsabilidad</h2>
            <div className="prose text-gray-600">
              <p>
                Aunque nos esforzamos por mantener la precisión de nuestras calculadoras, no garantizamos la exactitud de los resultados. Los usuarios deben verificar los cálculos importantes con profesionales calificados.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
