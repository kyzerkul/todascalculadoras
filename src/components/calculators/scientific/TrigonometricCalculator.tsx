import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TrigonometricCalculator = () => {
  const [angle, setAngle] = useState("");
  const [unit, setUnit] = useState("degrees"); // "degrees" or "radians"
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<Array<{ operation: string; input: string; result: string }>>([]);
  const [activeTab, setActiveTab] = useState("direct"); // "direct" or "inverse"

  const calculateTrigFunction = (func: string) => {
    if (!angle || isNaN(parseFloat(angle))) {
      setResult("Por favor, ingresa un ángulo válido");
      return;
    }

    const angleValue = parseFloat(angle);
    let angleInRadians = angleValue;
    
    // Convert to radians if in degrees
    if (unit === "degrees") {
      angleInRadians = (angleValue * Math.PI) / 180;
    }

    let calculatedResult: number;
    let operation: string;

    try {
      switch (func) {
        case "sin":
          calculatedResult = Math.sin(angleInRadians);
          operation = "sen";
          break;
        case "cos":
          calculatedResult = Math.cos(angleInRadians);
          operation = "cos";
          break;
        case "tan":
          calculatedResult = Math.tan(angleInRadians);
          operation = "tan";
          break;
        case "csc":
          calculatedResult = 1 / Math.sin(angleInRadians);
          operation = "cosec";
          break;
        case "sec":
          calculatedResult = 1 / Math.cos(angleInRadians);
          operation = "sec";
          break;
        case "cot":
          calculatedResult = 1 / Math.tan(angleInRadians);
          operation = "cotg";
          break;
        case "asin":
          // Check if value is within the domain of arcsin
          if (angleValue < -1 || angleValue > 1) {
            setResult("El valor debe estar entre -1 y 1 para arcoseno");
            return;
          }
          calculatedResult = Math.asin(angleValue);
          operation = "arcsen";
          break;
        case "acos":
          // Check if value is within the domain of arccos
          if (angleValue < -1 || angleValue > 1) {
            setResult("El valor debe estar entre -1 y 1 para arcocoseno");
            return;
          }
          calculatedResult = Math.acos(angleValue);
          operation = "arccos";
          break;
        case "atan":
          calculatedResult = Math.atan(angleValue);
          operation = "arctan";
          break;
        default:
          setResult("Función no soportada");
          return;
      }

      // Convert result to degrees if needed for inverse functions
      if (func.startsWith("a") && unit === "degrees") {
        calculatedResult = (calculatedResult * 180) / Math.PI;
      }

      // Format the result to a reasonable precision
      const formattedResult = calculatedResult.toFixed(6).replace(/\.?0+$/, "");
      
      setResult(formattedResult);
      
      // Add to history
      const inputDisplay = `${angleValue}${unit === "degrees" ? "°" : " rad"}`;
      const resultDisplay = `${activeTab === "inverse" ? (unit === "degrees" ? `${formattedResult}°` : `${formattedResult} rad`) : formattedResult}`;
      
      setHistory([
        { operation, input: inputDisplay, result: resultDisplay },
        ...history.slice(0, 9) // Keep only last 10 entries
      ]);
    } catch (error) {
      setResult("Error en el cálculo");
    }
  };

  const handleUnitChange = (value: string) => {
    setUnit(value);
    setResult(null);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderTrigButtons = () => {
    const directButtons = [
      { label: "sen", func: "sin" },
      { label: "cos", func: "cos" },
      { label: "tan", func: "tan" },
      { label: "cosec", func: "csc" },
      { label: "sec", func: "sec" },
      { label: "cotg", func: "cot" },
    ];

    const inverseButtons = [
      { label: "arcsen", func: "asin" },
      { label: "arccos", func: "acos" },
      { label: "arctan", func: "atan" },
    ];

    const buttons = activeTab === "direct" ? directButtons : inverseButtons;

    return (
      <div className="grid grid-cols-3 gap-2 mt-4">
        {buttons.map((button) => (
          <Button
            key={button.func}
            variant="outline"
            onClick={() => calculateTrigFunction(button.func)}
            className="w-full"
          >
            {button.label}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <Tabs
              defaultValue="direct"
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="w-full mb-4">
                <TabsTrigger value="direct" className="flex-1">
                  Funciones Directas
                </TabsTrigger>
                <TabsTrigger value="inverse" className="flex-1">
                  Funciones Inversas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="direct">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="angle">Ángulo:</Label>
                    <Input
                      id="angle"
                      type="number"
                      placeholder="Introduce un ángulo"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Unidad:</Label>
                    <RadioGroup
                      value={unit}
                      onValueChange={handleUnitChange}
                      className="flex space-x-4 mt-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="degrees" id="degrees" />
                        <Label htmlFor="degrees">Grados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radians" id="radians" />
                        <Label htmlFor="radians">Radianes</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {renderTrigButtons()}

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Resultado:</p>
                      <p className="text-2xl mt-1">{result}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="inverse">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="value">Valor:</Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Introduce un valor"
                      value={angle}
                      onChange={(e) => setAngle(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Para arcoseno y arcocoseno, el valor debe estar entre -1 y 1.
                    </p>
                  </div>

                  <div>
                    <Label>Resultado en:</Label>
                    <RadioGroup
                      value={unit}
                      onValueChange={handleUnitChange}
                      className="flex space-x-4 mt-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="degrees" id="i-degrees" />
                        <Label htmlFor="i-degrees">Grados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="radians" id="i-radians" />
                        <Label htmlFor="i-radians">Radianes</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {renderTrigButtons()}

                  {result && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="font-medium">Resultado:</p>
                      <p className="text-2xl mt-1">
                        {result} {unit === "degrees" ? "°" : " rad"}
                      </p>
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
                      <span className="font-medium">{item.operation}</span>
                      {activeTab === "direct" 
                        ? <span>({item.input}) = {item.result}</span>
                        : <span>({item.input}) = {item.result}</span>
                      }
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
              Esta calculadora de funciones trigonométricas te permite:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Funciones directas:</strong> Seno, coseno, tangente, cosecante, secante y cotangente</li>
              <li><strong>Funciones inversas:</strong> Arcoseno, arcocoseno y arcotangente</li>
              <li><strong>Unidades:</strong> Trabajar con ángulos en grados o radianes</li>
              <li><strong>Historial:</strong> Mantener registro de los cálculos realizados</li>
            </ul>
            <p>
              <strong>Notas:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Para funciones inversas, arcoseno y arcocoseno requieren valores entre -1 y 1</li>
              <li>Los resultados se muestran con 6 decimales significativos</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrigonometricCalculator;
