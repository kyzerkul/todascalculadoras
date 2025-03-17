import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState<string>('male');
  const [height, setHeight] = useState<number | ''>('');
  const [waist, setWaist] = useState<number | ''>('');
  const [neck, setNeck] = useState<number | ''>('');
  const [hip, setHip] = useState<number | ''>('');
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{
    gender: string,
    height: number,
    waist: number,
    neck: number,
    hip?: number,
    bodyFat: number,
    category: string,
    date: string
  }[]>([]);

  // Cargar historial del almacenamiento local al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem('bodyFatHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar historial en el almacenamiento local cuando cambie
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('bodyFatHistory', JSON.stringify(history));
    }
  }, []);

  const calculateBodyFat = () => {
    // Validación de datos
    if (!height || !waist || !neck || (gender === 'female' && !hip)) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (height < 100 || height > 250) {
      setError('La altura debe estar entre 100 y 250 cm.');
      return;
    }

    if (waist < 40 || waist > 200) {
      setError('La medida de cintura debe estar entre 40 y 200 cm.');
      return;
    }

    if (neck < 20 || neck > 80) {
      setError('La medida del cuello debe estar entre 20 y 80 cm.');
      return;
    }

    if (gender === 'female' && hip && (hip < 50 || hip > 200)) {
      setError('La medida de cadera debe estar entre 50 y 200 cm.');
      return;
    }

    setError(null);
    let bf = 0;
    
    // Altura en metros para los cálculos
    const heightInM = height / 100;
    
    // Algoritmo de la Marina de EE. UU. para el cálculo de grasa corporal
    if (gender === 'male') {
      // Fórmula para hombres: 86.010 × log10(cintura - cuello) - 70.041 × log10(altura) + 36.76
      bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      // Fórmula para mujeres: 163.205 × log10(cintura + cadera - cuello) - 97.684 × log10(altura) - 78.387
      if (hip) {
        bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
      } else {
        bf = 0; // No debería ocurrir debido a la validación anterior
      }
    }

    // Limitar a 2 decimales y asegurar que esté entre 2% y 70%
    bf = Math.max(2, Math.min(70, parseFloat(bf.toFixed(2))));
    setBodyFat(bf);

    // Determinar categoría
    let cat = '';
    if (gender === 'male') {
      if (bf < 6) cat = 'Grasa esencial';
      else if (bf < 14) cat = 'Atleta';
      else if (bf < 18) cat = 'Fitness';
      else if (bf < 25) cat = 'Aceptable';
      else cat = 'Obesidad';
    } else {
      if (bf < 16) cat = 'Grasa esencial';
      else if (bf < 24) cat = 'Atleta';
      else if (bf < 31) cat = 'Fitness';
      else if (bf < 38) cat = 'Aceptable';
      else cat = 'Obesidad';
    }
    setCategory(cat);

    // Añadir al historial
    const newEntry = {
      gender,
      height: Number(height),
      waist: Number(waist),
      neck: Number(neck),
      hip: gender === 'female' && hip ? Number(hip) : undefined,
      bodyFat: bf,
      category: cat,
      date: new Date().toLocaleString()
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 10)); // Mantener solo los últimos 10 cálculos
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bodyFatHistory');
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Grasa esencial': return 'bg-blue-100 text-blue-800';
      case 'Atleta': return 'bg-green-100 text-green-800';
      case 'Fitness': return 'bg-teal-100 text-teal-800';
      case 'Aceptable': return 'bg-yellow-100 text-yellow-800';
      case 'Obesidad': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Scale className="text-blue-500" />
          Calculadora de Grasa Corporal
        </CardTitle>
        <CardDescription>
          Estima tu porcentaje de grasa corporal basado en medidas antropométricas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Sexo</Label>
            <RadioGroup
              value={gender}
              onValueChange={setGender}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Hombre</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Mujer</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              min="100"
              max="250"
              placeholder="Ingresa tu altura en centímetros"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neck">Circunferencia del cuello (cm)</Label>
              <Input
                id="neck"
                type="number"
                min="20"
                max="80"
                placeholder="Medida del cuello"
                value={neck}
                onChange={(e) => setNeck(e.target.value ? Number(e.target.value) : '')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="waist">Circunferencia de la cintura (cm)</Label>
              <Input
                id="waist"
                type="number"
                min="40"
                max="200"
                placeholder="Medida de la cintura"
                value={waist}
                onChange={(e) => setWaist(e.target.value ? Number(e.target.value) : '')}
              />
            </div>
          </div>

          {gender === 'female' && (
            <div className="space-y-2">
              <Label htmlFor="hip">Circunferencia de la cadera (cm)</Label>
              <Input
                id="hip"
                type="number"
                min="50"
                max="200"
                placeholder="Medida de la cadera"
                value={hip}
                onChange={(e) => setHip(e.target.value ? Number(e.target.value) : '')}
              />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={calculateBodyFat} className="w-full">Calcular</Button>

          {bodyFat !== null && (
            <div className="space-y-4 mt-4">
              <Alert>
                <AlertTitle>Tu porcentaje de grasa corporal estimado es:</AlertTitle>
                <AlertDescription className="text-2xl font-bold">
                  {bodyFat}%
                </AlertDescription>
              </Alert>

              <div className="p-4 border rounded-md">
                <h3 className="font-semibold text-lg mb-2">Categoría:</h3>
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getCategoryColor(category))}>
                  {category}
                </span>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Rangos de referencia ({gender === 'male' ? 'hombres' : 'mujeres'}):</h4>
                  <ul className="space-y-1">
                    {gender === 'male' ? (
                      <>
                        <li><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mr-2">Grasa esencial</span> 2-5%</li>
                        <li><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs mr-2">Atleta</span> 6-13%</li>
                        <li><span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs mr-2">Fitness</span> 14-17%</li>
                        <li><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs mr-2">Aceptable</span> 18-24%</li>
                        <li><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs mr-2">Obesidad</span> 25%+</li>
                      </>
                    ) : (
                      <>
                        <li><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs mr-2">Grasa esencial</span> 10-15%</li>
                        <li><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs mr-2">Atleta</span> 16-23%</li>
                        <li><span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-xs mr-2">Fitness</span> 24-30%</li>
                        <li><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs mr-2">Aceptable</span> 31-37%</li>
                        <li><span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs mr-2">Obesidad</span> 38%+</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {history.length > 0 && (
        <CardFooter className="flex-col items-start">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Historial de cálculos</h3>
              <Button variant="outline" size="sm" onClick={clearHistory}>Limpiar historial</Button>
            </div>
            <div className="border rounded-md overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left">Fecha</th>
                    <th className="px-4 py-2 text-left">Medidas</th>
                    <th className="px-4 py-2 text-left">% Grasa</th>
                    <th className="px-4 py-2 text-left">Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">
                        {entry.gender === 'male' ? 'H' : 'M'}, {entry.height}cm, 
                        {entry.gender === 'female' && entry.hip ? ` ${entry.hip}cm,` : ''} 
                        {entry.waist}cm, {entry.neck}cm
                      </td>
                      <td className="px-4 py-2">{entry.bodyFat}%</td>
                      <td className="px-4 py-2">
                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium", getCategoryColor(entry.category))}>
                          {entry.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default BodyFatCalculator;
