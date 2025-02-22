
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Preguntas Frecuentes
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                ¿Son gratuitas todas las calculadoras?
              </AccordionTrigger>
              <AccordionContent>
                Sí, todas nuestras calculadoras son completamente gratuitas para usar. No hay costos ocultos ni necesidad de registro.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                ¿Qué tan precisos son los cálculos?
              </AccordionTrigger>
              <AccordionContent>
                Nuestras calculadoras utilizan algoritmos precisos y están verificadas por expertos. Sin embargo, recomendamos usar los resultados como referencia y consultar con profesionales para decisiones importantes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                ¿Puedo sugerir una nueva calculadora?
              </AccordionTrigger>
              <AccordionContent>
                ¡Por supuesto! Valoramos las sugerencias de nuestra comunidad. Puedes contactarnos a través de nuestro formulario de contacto con tus ideas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                ¿Los cálculos se guardan en algún lugar?
              </AccordionTrigger>
              <AccordionContent>
                No almacenamos ningún dato de los cálculos realizados. Toda la información se procesa localmente en tu navegador y se elimina al cerrar la página.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                ¿Cómo reporto un error?
              </AccordionTrigger>
              <AccordionContent>
                Si encuentras algún error, por favor utiliza nuestro formulario de contacto especificando la calculadora y el problema encontrado. Nuestro equipo lo revisará lo antes posible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
