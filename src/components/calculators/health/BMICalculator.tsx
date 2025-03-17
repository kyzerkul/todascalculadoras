import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface BMIResult {
  bmi: number;
  weight: number;
  height: number;
  category: string;
  color: string;
  date: Date;
  unit: string;
}

const BMICategories = [
  { range: [0, 16], category: "Delgadez severa", color: "#c62828" },
  { range: [16, 17], category: "Delgadez moderada", color: "#ef6c00" },
  { range: [17, 18.5], category: "Delgadez leve", color: "#ff9800" },
  { range: [18.5, 25], category: "Normal", color: "#4caf50" },
  { range: [25, 30], category: "Sobrepeso", color: "#ff9800" },
  { range: [30, 35], category: "Obesidad grado I", color: "#ef6c00" },
  { range: [35, 40], category: "Obesidad grado II", color: "#e65100" },
  { range: [40, 100], category: "Obesidad grado III", color: "#c62828" },
];

const BMICalculator = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = useState<string>("#4caf50");
  const [history, setHistory] = useState<BMIResult[]>([]);
  const [progress, setProgress] = useState(0);

  // Initialize history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("bmiHistory");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error("Error parsing BMI history", e);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("bmiHistory", JSON.stringify(history));
  }, [history]);

  const calculateBMI = () => {
    if (weight === "" || height === "") {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    let bmiValue: number;
    let heightInMeters: number;

    if (unit === "metric") {
      heightInMeters = Number(height) / 100;
      bmiValue = Number(weight) / (heightInMeters * heightInMeters);
    } else {
      // Imperial: weight in pounds, height in inches
      bmiValue = (Number(weight) * 703) / (Number(height) * Number(height));
    }

    // Round to 1 decimal place
    bmiValue = Math.round(bmiValue * 10) / 10;

    // Determine category and color
    const categoryInfo = BMICategories.find(
      (c) => bmiValue >= c.range[0] && bmiValue < c.range[1]
    );

    setBMI(bmiValue);
    setCategory(categoryInfo?.category || "Desconocido");
    setColor(categoryInfo?.color || "#4caf50");

    // Set progress for the BMI visualization (max BMI we show is 40)
    setProgress(Math.min((bmiValue / 40) * 100, 100));

    // Add to history
    const newResult: BMIResult = {
      bmi: bmiValue,
      weight: Number(weight),
      height: Number(height),
      category: categoryInfo?.category || "Desconocido",
      color: categoryInfo?.color || "#4caf50",
      date: new Date(),
      unit: unit,
    };

    setHistory((prev) => [newResult, ...prev.slice(0, 9)]);

    toast({
      title: "IMC Calculado",
      description: `Tu IMC es ${bmiValue} - ${categoryInfo?.category || "Desconocido"}`,
    });
  };

  const clearForm = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
    setCategory(null);
  };

  const deleteHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmiHistory");
    toast({
      title: "Historial borrado",
      description: "Tu historial de IMC ha sido eliminado",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card>
            <CardHeader>
              <CardTitle>Calculadora de Índice de Masa Corporal (IMC)</CardTitle>
              <CardDescription>
                El IMC es una medida de la relación entre el peso y la altura y se utiliza para estimar si una persona tiene un peso saludable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="unit">Unidades</Label>
                <Select
                  value={unit}
                  onValueChange={(value) => setUnit(value as "metric" | "imperial")}
                >
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Selecciona las unidades" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="metric">Métrico (kg, cm)</SelectItem>
                    <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="weight">Peso {unit === "metric" ? "(kg)" : "(lb)"}</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                    placeholder={unit === "metric" ? "70" : "154"}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="height">Altura {unit === "metric" ? "(cm)" : "(in)"}</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                    placeholder={unit === "metric" ? "170" : "67"}
                  />
                </div>
              </div>

              {bmi !== null && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>IMC: {bmi}</span>
                      <span style={{ color }}>{category}</span>
                    </div>
                    <Progress value={progress} className="h-2" style={{ 
                      background: "linear-gradient(to right, #c62828, #ef6c00, #4caf50, #ff9800, #c62828)",
                      boxShadow: `0 0 8px ${color}`
                    }} />
                  </div>
                  
                  <Alert variant="outline" style={{ borderColor: color }}>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Categoría: {category}</AlertTitle>
                    <AlertDescription>
                      {category === "Delgadez severa" && "El peso está muy por debajo de lo recomendado, lo que puede tener serias implicaciones para la salud."}
                      {category === "Delgadez moderada" && "El peso está significativamente por debajo de lo recomendado."}
                      {category === "Delgadez leve" && "El peso está ligeramente por debajo de lo recomendado."}
                      {category === "Normal" && "El peso está dentro del rango considerado saludable para la altura."}
                      {category === "Sobrepeso" && "El peso está por encima de lo recomendado para la altura."}
                      {category === "Obesidad grado I" && "El peso excede significativamente lo recomendado para la altura."}
                      {category === "Obesidad grado II" && "El peso excede considerablemente lo recomendado para la altura."}
                      {category === "Obesidad grado III" && "El peso excede muy considerablemente lo recomendado para la altura."}
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Qué es el IMC?</AccordionTrigger>
                  <AccordionContent>
                    <p>El Índice de Masa Corporal (IMC) es una medida que relaciona el peso con la altura y se utiliza para evaluar si una persona tiene un peso saludable. Se calcula dividiendo el peso en kilogramos por el cuadrado de la altura en metros.</p>
                    <p className="mt-2">El IMC es una herramienta de evaluación general y no tiene en cuenta factores como la composición corporal, distribución de grasa, sexo, edad o masa muscular.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Limitaciones del IMC</AccordionTrigger>
                  <AccordionContent>
                    <p>El IMC tiene varias limitaciones:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>No distingue entre peso de músculo, hueso y grasa</li>
                      <li>No considera la distribución de grasa corporal</li>
                      <li>No es igualmente preciso para todos los grupos étnicos</li>
                      <li>Puede no ser preciso para deportistas o personas muy musculadas</li>
                      <li>No considera las diferencias relacionadas con la edad o el sexo</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearForm}>Limpiar</Button>
              <Button onClick={calculateBMI}>Calcular IMC</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de IMC</CardTitle>
              <CardDescription>
                Resultados de tus cálculos anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <History className="mx-auto h-12 w-12 mb-4 opacity-20" />
                  <p>No hay cálculos previos</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((result, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-lg">{result.bmi.toFixed(1)}</span>
                        <span style={{ color: result.color }}>{result.category}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Peso: {result.weight} {result.unit === "metric" ? "kg" : "lb"}</span>
                          <span>Altura: {result.height} {result.unit === "metric" ? "cm" : "in"}</span>
                        </div>
                        <div className="mt-1">{formatDate(new Date(result.date))}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={deleteHistory}
                disabled={history.length === 0}
              >
                Borrar historial
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BMICalculator;
