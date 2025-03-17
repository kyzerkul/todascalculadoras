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
import { 
  History, 
  Activity, 
  Heart, 
  Brain, 
  Dumbbell, 
  Thermometer
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface BMRResult {
  bmr: number;
  age: number;
  gender: string;
  weight: number;
  height: number;
  formula: string;
  date: Date;
  energyExpenditures: {
    resting: number;
    physical: number;
    thermic: number;
    total: number;
  };
}

const formulas = [
  { 
    id: "mifflin", 
    name: "Mifflin-St Jeor", 
    description: "La ecuación más precisa para la mayoría de las personas (1990)",
    male: (weight: number, height: number, age: number) => 10 * weight + 6.25 * height - 5 * age + 5,
    female: (weight: number, height: number, age: number) => 10 * weight + 6.25 * height - 5 * age - 161
  },
  { 
    id: "harris", 
    name: "Harris-Benedict", 
    description: "Fórmula clásica, revisada en 1984",
    male: (weight: number, height: number, age: number) => 13.397 * weight + 4.799 * height - 5.677 * age + 88.362,
    female: (weight: number, height: number, age: number) => 9.247 * weight + 3.098 * height - 4.330 * age + 447.593
  },
  { 
    id: "katch", 
    name: "Katch-McArdle", 
    description: "Tiene en cuenta la masa magra corporal (no usa el género)",
    both: (weight: number, bodyFat: number) => 370 + (21.6 * (weight * (1 - bodyFat / 100)))
  }
];

const activityLevels = [
  { value: "1.2", label: "Sedentario (poco o nada de ejercicio)", factor: 1.2 },
  { value: "1.375", label: "Ligeramente activo (ejercicio ligero 1-3 días/semana)", factor: 1.375 },
  { value: "1.55", label: "Moderadamente activo (ejercicio moderado 3-5 días/semana)", factor: 1.55 },
  { value: "1.725", label: "Muy activo (ejercicio intenso 6-7 días/semana)", factor: 1.725 },
  { value: "1.9", label: "Extremadamente activo (ejercicio muy intenso, trabajo físico)", factor: 1.9 },
];

const BMRCalculator = () => {
  const { toast } = useToast();
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [bodyFat, setBodyFat] = useState<number | "">("");
  const [formula, setFormula] = useState<string>("mifflin");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [activity, setActivity] = useState<string>("1.55");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [energyExpenditures, setEnergyExpenditures] = useState<BMRResult["energyExpenditures"] | null>(null);
  const [history, setHistory] = useState<BMRResult[]>([]);

  // Initialize history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("bmrHistory");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error("Error parsing BMR history", e);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("bmrHistory", JSON.stringify(history));
  }, [history]);

  const calculateBMR = () => {
    // Validations
    if (formula === "katch") {
      if (bodyFat === "") {
        toast({
          title: "Error",
          description: "Para la fórmula de Katch-McArdle, es necesario el porcentaje de grasa corporal",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (age === "" || gender === "" || height === "") {
        toast({
          title: "Error",
          description: "Por favor, completa todos los campos requeridos",
          variant: "destructive",
        });
        return;
      }
    }

    if (weight === "") {
      toast({
        title: "Error",
        description: "El peso es necesario para todas las fórmulas",
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

    // Calculate BMR based on selected formula
    let bmrValue: number;
    const selectedFormula = formulas.find(f => f.id === formula);

    if (formula === "katch") {
      bmrValue = selectedFormula!.both(weightKg, Number(bodyFat));
    } else if (gender === "male") {
      bmrValue = selectedFormula!.male(weightKg, heightCm, Number(age));
    } else {
      bmrValue = selectedFormula!.female(weightKg, heightCm, Number(age));
    }

    // Round to nearest integer
    bmrValue = Math.round(bmrValue);
    
    // Calculate Total Daily Energy Expenditure (TDEE)
    const activityFactor = parseFloat(activity);
    const tdeeValue = Math.round(bmrValue * activityFactor);
    
    // Calculate energy expenditures breakdown
    const thermicEffect = Math.round(tdeeValue * 0.1); // Thermic effect of food ~10%
    const restingEnergy = bmrValue; // BMR is resting energy
    const physicalActivity = tdeeValue - restingEnergy - thermicEffect;
    
    const energyValues = {
      resting: restingEnergy,
      physical: physicalActivity,
      thermic: thermicEffect,
      total: tdeeValue
    };

    setBmr(bmrValue);
    setTdee(tdeeValue);
    setEnergyExpenditures(energyValues);
    
    // Add to history
    const newResult: BMRResult = {
      bmr: bmrValue,
      age: Number(age),
      gender,
      weight: Number(weight),
      height: Number(height),
      formula,
      date: new Date(),
      energyExpenditures: energyValues
    };

    setHistory(prev => [newResult, ...prev.slice(0, 9)]);

    toast({
      title: "TMB Calculada",
      description: `Tu tasa metabólica basal es ${bmrValue} calorías por día`,
    });
  };

  const clearForm = () => {
    setAge("");
    setWeight("");
    setHeight("");
    setBodyFat("");
    setFormula("mifflin");
    setBmr(null);
    setTdee(null);
    setEnergyExpenditures(null);
  };

  const deleteHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmrHistory");
    toast({
      title: "Historial borrado",
      description: "Tu historial de cálculos de TMB ha sido eliminado",
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

  const getFormulaName = (formulaId: string) => {
    return formulas.find(f => f.id === formulaId)?.name || formulaId;
  };

  const getActivityLabel = (activityValue: string) => {
    return activityLevels.find(level => level.value === activityValue)?.label || activityValue;
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
              <CardTitle>Calculadora de Metabolismo Basal</CardTitle>
              <CardDescription>
                Calcula tu tasa metabólica basal (TMB) y gasto energético diario
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

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="formula">Fórmula</Label>
                <Select value={formula} onValueChange={setFormula}>
                  <SelectTrigger id="formula">
                    <SelectValue placeholder="Selecciona una fórmula" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {formulas.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.name} - {f.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {formula !== "katch" && (
                  <>
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
                  </>
                )}

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
                
                {formula !== "katch" && (
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
                )}
                
                {formula === "katch" && (
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="bodyfat">Porcentaje de Grasa Corporal (%)</Label>
                    <Input
                      id="bodyfat"
                      type="number"
                      value={bodyFat}
                      onChange={(e) => setBodyFat(e.target.value ? Number(e.target.value) : "")}
                      placeholder="20"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch 
                  id="advanced"
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                />
                <Label htmlFor="advanced">Mostrar opciones avanzadas</Label>
              </div>
              
              {showAdvanced && (
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
              )}

              {bmr !== null && (
                <div className="mt-6 space-y-6">
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-lg text-center flex flex-col items-center">
                      <Heart className="h-8 w-8 text-red-500 mb-2" />
                      <div className="text-lg">Tasa Metabólica Basal</div>
                      <div className="text-3xl font-bold my-2">{bmr} kcal</div>
                      <div className="text-sm text-muted-foreground">
                        Calorías necesarias para las funciones vitales en reposo
                      </div>
                    </div>
                    
                    {showAdvanced && tdee !== null && (
                      <div className="bg-gray-50 p-4 rounded-lg text-center flex flex-col items-center">
                        <Activity className="h-8 w-8 text-green-500 mb-2" />
                        <div className="text-lg">Gasto Energético Total</div>
                        <div className="text-3xl font-bold my-2">{tdee} kcal</div>
                        <div className="text-sm text-muted-foreground">
                          Calorías totales considerando tu nivel de actividad
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {showAdvanced && energyExpenditures !== null && (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Desglose del Gasto Energético Diario</h3>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Componente</TableHead>
                            <TableHead>Calorías</TableHead>
                            <TableHead className="text-right">Porcentaje</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium flex items-center">
                              <Brain className="h-4 w-4 mr-2 text-blue-500" />
                              Metabolismo Basal
                            </TableCell>
                            <TableCell>{energyExpenditures.resting} kcal</TableCell>
                            <TableCell className="text-right">
                              {Math.round((energyExpenditures.resting / energyExpenditures.total) * 100)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium flex items-center">
                              <Dumbbell className="h-4 w-4 mr-2 text-orange-500" />
                              Actividad Física
                            </TableCell>
                            <TableCell>{energyExpenditures.physical} kcal</TableCell>
                            <TableCell className="text-right">
                              {Math.round((energyExpenditures.physical / energyExpenditures.total) * 100)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium flex items-center">
                              <Thermometer className="h-4 w-4 mr-2 text-red-500" />
                              Efecto Térmico de Alimentos
                            </TableCell>
                            <TableCell>{energyExpenditures.thermic} kcal</TableCell>
                            <TableCell className="text-right">
                              {Math.round((energyExpenditures.thermic / energyExpenditures.total) * 100)}%
                            </TableCell>
                          </TableRow>
                          <TableRow className="font-bold">
                            <TableCell>TOTAL</TableCell>
                            <TableCell>{energyExpenditures.total} kcal</TableCell>
                            <TableCell className="text-right">100%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              )}

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Qué es la Tasa Metabólica Basal?</AccordionTrigger>
                  <AccordionContent>
                    <p>La Tasa Metabólica Basal (TMB) es la cantidad mínima de energía que tu cuerpo necesita cuando está en reposo para mantener sus funciones vitales, como respiración, circulación sanguínea, regulación de la temperatura corporal, crecimiento y regeneración celular.</p>
                    <p className="mt-2">Representa aproximadamente el 60-75% del gasto calórico total diario para una persona sedentaria.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Qué fórmula debo usar?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li><strong>Mifflin-St Jeor</strong>: Considerada la más precisa para la mayoría de las personas. Es la recomendada para uso general.</li>
                      <li><strong>Harris-Benedict</strong>: Una fórmula clásica, ligeramente menos precisa que Mifflin-St Jeor para la población general.</li>
                      <li><strong>Katch-McArdle</strong>: La más precisa si conoces tu porcentaje de grasa corporal. Especialmente útil para atletas y personas con un porcentaje de grasa corporal no típico.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Factores que afectan el metabolismo basal</AccordionTrigger>
                  <AccordionContent>
                    <p>Varios factores pueden influir en tu TMB:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>Masa corporal</strong>: Más masa muscular = mayor TMB</li>
                      <li><strong>Edad</strong>: La TMB disminuye con la edad (aproximadamente 2% por década después de los 30)</li>
                      <li><strong>Género</strong>: Los hombres suelen tener un TMB más alto debido a su mayor masa muscular</li>
                      <li><strong>Genética</strong>: Puede variar hasta un 10% entre individuos similares</li>
                      <li><strong>Hormonas</strong>: Problemas tiroideos y otros desequilibrios hormonales pueden afectar el TMB</li>
                      <li><strong>Temperatura</strong>: Ambientes fríos pueden aumentar el TMB temporalmente</li>
                      <li><strong>Ayuno o dietas muy restrictivas</strong>: Pueden reducir el TMB</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearForm}>Limpiar</Button>
              <Button onClick={calculateBMR}>Calcular TMB</Button>
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
                          <span className="font-semibold text-lg">{result.bmr} kcal</span>
                          <span className="ml-4 text-sm bg-gray-100 px-2 py-1 rounded">
                            {getFormulaName(result.formula)}
                          </span>
                        </div>
                        <span className="text-sm">{formatDate(new Date(result.date))}</span>
                      </div>
                      <div className="text-sm grid grid-cols-2 gap-2">
                        {result.age && <div>Edad: {result.age} años</div>}
                        {result.gender && <div>Género: {result.gender === "male" ? "Masculino" : "Femenino"}</div>}
                        <div>Peso: {result.weight} {result.weight > 200 ? "lb" : "kg"}</div>
                        {result.height && <div>Altura: {result.height} {result.height > 200 ? "in" : "cm"}</div>}
                      </div>
                      {result.energyExpenditures && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Gasto Energético Total: {result.energyExpenditures.total} kcal
                        </div>
                      )}
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

export default BMRCalculator;
