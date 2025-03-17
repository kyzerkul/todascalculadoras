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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, ArrowDown, ArrowUp, MinusCircle } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface CalorieResult {
  calories: number;
  bmr: number;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activity: string;
  goal: string;
  date: Date;
  macros: {
    carbs: {
      percentage: number;
      grams: number;
      calories: number;
    };
    protein: {
      percentage: number;
      grams: number;
      calories: number;
    };
    fats: {
      percentage: number;
      grams: number;
      calories: number;
    };
  };
}

const activityLevels = [
  { value: "sedentary", label: "Sedentario (poco o nada de ejercicio)", factor: 1.2 },
  { value: "lightly", label: "Ligeramente activo (ejercicio ligero 1-3 días/semana)", factor: 1.375 },
  { value: "moderately", label: "Moderadamente activo (ejercicio moderado 3-5 días/semana)", factor: 1.55 },
  { value: "very", label: "Muy activo (ejercicio intenso 6-7 días/semana)", factor: 1.725 },
  { value: "extremely", label: "Extremadamente activo (ejercicio muy intenso, trabajo físico)", factor: 1.9 },
];

const weightGoals = [
  { value: "lose-2", label: "Perder peso rápidamente (- 20%)", factor: 0.8 },
  { value: "lose-1", label: "Perder peso moderadamente (- 10%)", factor: 0.9 },
  { value: "maintain", label: "Mantener peso actual", factor: 1.0 },
  { value: "gain-1", label: "Ganar peso moderadamente (+ 10%)", factor: 1.1 },
  { value: "gain-2", label: "Ganar peso rápidamente (+ 20%)", factor: 1.2 },
];

const CalorieCalculator = () => {
  const { toast } = useToast();
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [activity, setActivity] = useState<string>("moderately");
  const [goal, setGoal] = useState<string>("maintain");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  
  const [calories, setCalories] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [history, setHistory] = useState<CalorieResult[]>([]);
  
  // Macros state
  const [carbPercentage, setCarbPercentage] = useState(50);
  const [proteinPercentage, setProteinPercentage] = useState(25);
  const [fatPercentage, setFatPercentage] = useState(25);
  const [macros, setMacros] = useState<CalorieResult["macros"] | null>(null);

  // Initialize history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("calorieHistory");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error("Error parsing calorie history", e);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("calorieHistory", JSON.stringify(history));
  }, [history]);

  // Ensure percentages add up to 100%
  useEffect(() => {
    const total = carbPercentage + proteinPercentage + fatPercentage;
    
    if (total !== 100) {
      // Adjust the last changed value to make total 100%
      const diff = 100 - total;
      
      if (diff !== 0) {
        // Adjust fats by default since they were most likely the last to change
        setFatPercentage(prevFat => Math.max(0, Math.min(100, prevFat + diff)));
      }
    }
  }, [carbPercentage, proteinPercentage, fatPercentage]);

  // Recalculate macros when calories or macro percentages change
  useEffect(() => {
    if (calories) {
      calculateMacros(calories);
    }
  }, [calories, carbPercentage, proteinPercentage, fatPercentage]);

  const calculateCalories = () => {
    if (
      age === "" ||
      weight === "" ||
      height === "" ||
      !activity ||
      !gender ||
      !goal
    ) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    // Convert imperial to metric if needed
    let weightKg = Number(weight);
    let heightCm = Number(height);
    
    if (unit === "imperial") {
      weightKg = weightKg * 0.453592;      // Convert pounds to kg
      heightCm = heightCm * 2.54;          // Convert inches to cm
    }

    // Calculate BMR using the Mifflin-St Jeor Equation
    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) + 5;
    } else {
      bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * Number(age) - 161;
    }

    // Get activity factor
    const activityFactor = activityLevels.find(level => level.value === activity)?.factor || 1.55;
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmrValue * activityFactor;
    
    // Apply goal factor
    const goalFactor = weightGoals.find(g => g.value === goal)?.factor || 1.0;
    let calorieTarget = Math.round(tdee * goalFactor);

    setBmr(Math.round(bmrValue));
    setCalories(calorieTarget);
    
    // Calculate macros
    calculateMacros(calorieTarget);
    
    // Add to history
    const newResult: CalorieResult = {
      calories: calorieTarget,
      bmr: Math.round(bmrValue),
      age: Number(age),
      gender,
      weight: Number(weight),
      height: Number(height),
      activity,
      goal,
      date: new Date(),
      macros: {
        carbs: {
          percentage: carbPercentage,
          grams: Math.round((calorieTarget * (carbPercentage / 100)) / 4),
          calories: Math.round(calorieTarget * (carbPercentage / 100)),
        },
        protein: {
          percentage: proteinPercentage,
          grams: Math.round((calorieTarget * (proteinPercentage / 100)) / 4),
          calories: Math.round(calorieTarget * (proteinPercentage / 100)),
        },
        fats: {
          percentage: fatPercentage,
          grams: Math.round((calorieTarget * (fatPercentage / 100)) / 9),
          calories: Math.round(calorieTarget * (fatPercentage / 100)),
        },
      },
    };

    setHistory(prev => [newResult, ...prev.slice(0, 9)]);

    toast({
      title: "Calorías Calculadas",
      description: `Tu ingesta calórica diaria recomendada es ${calorieTarget} calorías`,
    });
  };

  const calculateMacros = (totalCalories: number) => {
    // Calculate macros based on percentages
    const macrosCalc = {
      carbs: {
        percentage: carbPercentage,
        grams: Math.round((totalCalories * (carbPercentage / 100)) / 4), // 4 calories per gram of carbs
        calories: Math.round(totalCalories * (carbPercentage / 100)),
      },
      protein: {
        percentage: proteinPercentage,
        grams: Math.round((totalCalories * (proteinPercentage / 100)) / 4), // 4 calories per gram of protein
        calories: Math.round(totalCalories * (proteinPercentage / 100)),
      },
      fats: {
        percentage: fatPercentage,
        grams: Math.round((totalCalories * (fatPercentage / 100)) / 9), // 9 calories per gram of fat
        calories: Math.round(totalCalories * (fatPercentage / 100)),
      },
    };
    
    setMacros(macrosCalc);
  };
  
  const clearForm = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setActivity("moderately");
    setGoal("maintain");
    setCalories(null);
    setBmr(null);
    setMacros(null);
  };

  const deleteHistory = () => {
    setHistory([]);
    localStorage.removeItem("calorieHistory");
    toast({
      title: "Historial borrado",
      description: "Tu historial de cálculos de calorías ha sido eliminado",
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

  const getActivityLabel = (activityValue: string) => {
    return activityLevels.find(level => level.value === activityValue)?.label || activityValue;
  };

  const getGoalLabel = (goalValue: string) => {
    return weightGoals.find(g => g.value === goalValue)?.label || goalValue;
  };

  const getGoalIcon = (goalValue: string) => {
    if (goalValue.includes("lose")) return <ArrowDown className="h-4 w-4 text-blue-500" />;
    if (goalValue.includes("gain")) return <ArrowUp className="h-4 w-4 text-red-500" />;
    return <MinusCircle className="h-4 w-4 text-green-500" />;
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
              <CardTitle>Calculadora de Calorías y Dieta</CardTitle>
              <CardDescription>
                Calcula tus necesidades calóricas diarias basadas en tu metabolismo y nivel de actividad
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
                  <Label htmlFor="age">Edad</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                    placeholder="30"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gender">Género</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Selecciona tu género" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="activity">Nivel de Actividad</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Selecciona tu nivel de actividad" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="goal">Objetivo</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Selecciona tu objetivo" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {weightGoals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {calories !== null && macros !== null && (
                <div className="mt-6 space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-xl">Ingesta calórica diaria recomendada</div>
                    <div className="text-4xl font-bold my-2">{calories} kcal</div>
                    <div className="text-sm text-muted-foreground">
                      Metabolismo Basal (BMR): {bmr} kcal
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Distribución de Macronutrientes</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="carbs">Carbohidratos ({carbPercentage}%)</Label>
                          <span className="text-sm font-medium">{macros.carbs.grams}g</span>
                        </div>
                        <Slider
                          id="carbs"
                          value={[carbPercentage]}
                          min={10}
                          max={80}
                          step={5}
                          onValueChange={(value) => setCarbPercentage(value[0])}
                          className="[&_[role=slider]]:bg-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="protein">Proteínas ({proteinPercentage}%)</Label>
                          <span className="text-sm font-medium">{macros.protein.grams}g</span>
                        </div>
                        <Slider
                          id="protein"
                          value={[proteinPercentage]}
                          min={10}
                          max={60}
                          step={5}
                          onValueChange={(value) => setProteinPercentage(value[0])}
                          className="[&_[role=slider]]:bg-red-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="fats">Grasas ({fatPercentage}%)</Label>
                          <span className="text-sm font-medium">{macros.fats.grams}g</span>
                        </div>
                        <Slider
                          id="fats"
                          value={[fatPercentage]}
                          min={10}
                          max={60}
                          step={5}
                          onValueChange={(value) => setFatPercentage(value[0])}
                          className="[&_[role=slider]]:bg-yellow-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Macronutriente</TableHead>
                            <TableHead>Porcentaje</TableHead>
                            <TableHead>Gramos</TableHead>
                            <TableHead>Calorías</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Carbohidratos</TableCell>
                            <TableCell>{macros.carbs.percentage}%</TableCell>
                            <TableCell>{macros.carbs.grams}g</TableCell>
                            <TableCell>{macros.carbs.calories} kcal</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Proteínas</TableCell>
                            <TableCell>{macros.protein.percentage}%</TableCell>
                            <TableCell>{macros.protein.grams}g</TableCell>
                            <TableCell>{macros.protein.calories} kcal</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Grasas</TableCell>
                            <TableCell>{macros.fats.percentage}%</TableCell>
                            <TableCell>{macros.fats.grams}g</TableCell>
                            <TableCell>{macros.fats.calories} kcal</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Qué son las calorías?</AccordionTrigger>
                  <AccordionContent>
                    <p>Las calorías son unidades de energía. En nutrición, representan la cantidad de energía que el cuerpo obtiene de los alimentos que consume. El cuerpo necesita calorías para mantener sus funciones básicas (metabolismo basal) y para realizar actividades físicas.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Qué son los macronutrientes?</AccordionTrigger>
                  <AccordionContent>
                    <p>Los macronutrientes son los nutrientes que el cuerpo necesita en grandes cantidades para funcionar correctamente:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>Carbohidratos</strong>: Principal fuente de energía (4 kcal/g)</li>
                      <li><strong>Proteínas</strong>: Esenciales para construir y reparar tejidos (4 kcal/g)</li>
                      <li><strong>Grasas</strong>: Fuente concentrada de energía y componente esencial de las células (9 kcal/g)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Cómo se calculan las necesidades calóricas?</AccordionTrigger>
                  <AccordionContent>
                    <p>El cálculo se realiza en tres pasos:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li><strong>Calcular el BMR</strong> (Tasa Metabólica Basal): Utilizamos la ecuación de Mifflin-St Jeor, que considera edad, género, peso y altura.</li>
                      <li><strong>Aplicar el factor de actividad</strong>: Multiplicamos el BMR por un factor que representa tu nivel de actividad física.</li>
                      <li><strong>Ajustar según el objetivo</strong>: Modificamos el resultado según si quieres perder, mantener o ganar peso.</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearForm}>Limpiar</Button>
              <Button onClick={calculateCalories}>Calcular Calorías</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Cálculos</CardTitle>
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
                        <div className="flex items-center">
                          <span className="font-semibold text-lg">{result.calories} kcal</span>
                          <span className="ml-2">
                            {getGoalIcon(result.goal)}
                          </span>
                        </div>
                        <span className="text-sm">{formatDate(new Date(result.date))}</span>
                      </div>
                      <div className="text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Edad: {result.age} años</div>
                          <div>Género: {result.gender === "male" ? "Masculino" : "Femenino"}</div>
                          <div>Peso: {result.weight} {result.weight > 200 ? "lb" : "kg"}</div>
                          <div>Altura: {result.height} {result.height > 200 ? "in" : "cm"}</div>
                          <div>Actividad: {getActivityLabel(result.activity)}</div>
                          <div>Objetivo: {getGoalLabel(result.goal)}</div>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                          <div>Carbos: {result.macros.carbs.grams}g ({result.macros.carbs.percentage}%)</div>
                          <div>Proteínas: {result.macros.protein.grams}g ({result.macros.protein.percentage}%)</div>
                          <div>Grasas: {result.macros.fats.grams}g ({result.macros.fats.percentage}%)</div>
                        </div>
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

export default CalorieCalculator;
