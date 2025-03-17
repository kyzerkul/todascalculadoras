import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const LogarithmCalculator = () => {
  const [value, setValue] = useState("");
  const [base, setBase] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ operation: string; input: string; result: string }>>([]);
  const [activeTab, setActiveTab] = useState("logarithm"); // "logarithm" or "exponential"

  const calculateLogarithm = (logType: string) => {
    if (!value || isNaN(parseFloat(value))) {
      setResult("Por favor, ingresa un valor numérico válido");
      return;
    }

    const x = parseFloat(value);
    
    if (x <= 0 && logType !== "ln1p") {
      setResult("El logaritmo solo está definido para valores positivos");
      return;
    }

    let calculatedResult: number;
    let operation: string;
    let displayBase: string = "";

    try {
      switch (logType) {
        case "ln":
          calculatedResult = Math.log(x);
          operation = "ln";
          break;
        case "ln1p":
          // ln(1+x) can handle small negative values as long as x > -1
          if (x <= -1) {
            setResult("El valor debe ser mayor que -1 para ln(1+x)");
            return;
          }
          calculatedResult = Math.log1p(x);
          operation = "ln(1+x)";
          break;
        case "log10":
          calculatedResult = Math.log10(x);
          operation = "log10";
          break;
        case "log2":
          calculatedResult = Math.log2(x);
          operation = "log2";
          break;
        case "logb":
          if (!base || isNaN(parseFloat(base))) {
            setResult("Por favor, ingresa una base válida");
            return;
          }
          const b = parseFloat(base);
          if (b <= 0 || b === 1) {
            setResult("La base debe ser positiva y diferente de 1");
            return;
          }
          calculatedResult = Math.log(x) / Math.log(b);
          operation = "log";
          displayBase = b.toString();
          break;
        default:
          setResult("Operación no soportada");
          return;
      }

      // Format the result to a reasonable precision
      const formattedResult = calculatedResult.toFixed(6).replace(/\.?0+$/, "");
      
      setResult(formattedResult);
      
      // Add to history
      setHistory([
        { 
          operation: displayBase ? `${operation}<sub>${displayBase}</sub>` : operation, 
          input: x.toString(), 
          result: formattedResult 
        },
        ...history.slice(0, 9) // Keep only last 10 entries
      ]);
    } catch (error) {
      setResult("Error en el cálculo");
    }
  };

  const calculateExponential = (expType: string) => {
    if (!value || isNaN(parseFloat(value))) {
      setResult("Por favor, ingresa un valor numérico válido");
      return;
    }

    const x = parseFloat(value);
    let calculatedResult: number;
    let operation: string;

    try {
      switch (expType) {
        case "exp":
          calculatedResult = Math.exp(x);
          operation = "e^x";
          break;
        case "exp2":
          calculatedResult = Math.pow(2, x);
          operation = "2^x";
          break;
        case "expb":
          if (!base || isNaN(parseFloat(base))) {
            setResult("Por favor, ingresa una base válida");
            return;
          }
          const b = parseFloat(base);
          calculatedResult = Math.pow(b, x);
          operation = `${b}^x`;
          break;
        case "expm1":
          calculatedResult = Math.expm1(x);
          operation = "e^x - 1";
          break;
        default:
          setResult("Operación no soportada");
          return;
      }

      // Format result, handling potentially large numbers
      let formattedResult: string;
      if (calculatedResult > 1e10) {
        formattedResult = calculatedResult.toExponential(6);
      } else {
        formattedResult = calculatedResult.toFixed(6).replace(/\.?0+$/, "");
      }
      
      setResult(formattedResult);
      
      // Add to history
      setHistory([
        { 
          operation: operation, 
          input: x.toString(), 
          result: formattedResult 
        },
        ...history.slice(0, 9) // Keep only last 10 entries
      ]);
    } catch (error) {
      setResult("Error en el cálculo");
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderLogarithmButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => calculateLogarithm("ln")}
          className="w-full"
        >
          ln(x)
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateLogarithm("log10")}
          className="w-full"
        >
          log<sub>10</sub>(x)
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateLogarithm("log2")}
          className="w-full"
        >
          log<sub>2</sub>(x)
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateLogarithm("ln1p")}
          className="w-full"
        >
          ln(1+x)
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateLogarithm("logb")}
          className="w-full col-span-2"
        >
          log<sub>base</sub>(x)
        </Button>
      </div>
    );
  };

  const renderExponentialButtons = () => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => calculateExponential("exp")}
          className="w-full"
        >
          e<sup>x</sup>
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateExponential("exp2")}
          className="w-full"
        >
          2<sup>x</sup>
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateExponential("expb")}
          className="w-full"
        >
          base<sup>x</sup>
        </Button>
        <Button
          variant="outline"
          onClick={() => calculateExponential("expm1")}
          className="w-full"
        >
          e<sup>x</sup>-1
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <Tabs
              defaultValue="logarithm"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value)}
              className="w-full"
            >
              <TabsList className="w-full mb-4">
                <TabsTrigger value="logarithm" className="flex-1">
                  Logaritmos
                </TabsTrigger>
                <TabsTrigger value="exponential" className="flex-1">
                  Exponenciales
                </TabsTrigger>
              </TabsList>

              <TabsContent value="logarithm">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="log-value">Valor (x):</Label>
                    <Input
                      id="log-value"
                      type="number"
                      placeholder="Introduce un valor positivo"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Para logaritmos estándar, el valor debe ser positivo.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="log-base">Base:</Label>
                    <Input
                      id="log-base"
                      type="number"
                      placeholder="Base para logaritmo personalizado"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      La base debe ser positiva y diferente de 1. Solo necesaria para log<sub>base</sub>(x).
                    </p>
                  </div>

                  {renderLogarithmButtons()}

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Resultado:</p>
                      <p className="text-2xl mt-1">{result}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="exponential">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="exp-value">Exponente (x):</Label>
                    <Input
                      id="exp-value"
                      type="number"
                      placeholder="Introduce un valor"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="exp-base">Base:</Label>
                    <Input
                      id="exp-base"
                      type="number"
                      placeholder="Base para potencia personalizada"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Solo necesaria para base<sup>x</sup>.
                    </p>
                  </div>

                  {renderExponentialButtons()}

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Resultado:</p>
                      <p className="text-2xl mt-1">{result}</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Historial</h3>
              {history.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="h-8 text-xs"
                >
                  Limpiar
                </Button>
              )}
            </div>
            <div className="max-h-[350px] overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay historial</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm p-2 bg-gray-50 rounded border border-gray-100"
                    >
                      <span className="font-medium" dangerouslySetInnerHTML={{ __html: item.operation }}></span>
                      {` (${item.input}) = ${item.result}`}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Esta calculadora de logaritmos y exponenciales te permite:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Logaritmos:</strong> Calcular ln(x), log₁₀(x), log₂(x), ln(1+x) y logaritmos con base personalizada</li>
              <li><strong>Exponenciales:</strong> Calcular eˣ, 2ˣ, base^x y e^x-1</li>
              <li><strong>Historial:</strong> Mantener registro de los cálculos realizados</li>
            </ul>
            <p>
              <strong>Fórmulas utilizadas:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>log<sub>b</sub>(x) = ln(x) / ln(b)</li>
              <li>e<sup>x</sup> = exp(x)</li>
              <li>b<sup>x</sup> = e<sup>x·ln(b)</sup></li>
            </ul>
            <p>
              <strong>Notas:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Los logaritmos solo están definidos para valores positivos (excepto ln(1+x) que admite valores &gt; -1)</li>
              <li>La base de un logaritmo debe ser positiva y diferente de 1</li>
              <li>Los resultados con valores muy grandes se muestran en notación científica</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogarithmCalculator;
