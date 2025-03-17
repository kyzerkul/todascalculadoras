import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Baby, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const DueDateCalculator = () => {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [gestationalAge, setGestationalAge] = useState<{weeks: number, days: number} | null>(null);
  const [trimester, setTrimester] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<{
    lmpDate: string, 
    dueDate: string, 
    calculationDate: string
  }[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Cargar historial del almacenamiento local al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem('dueDateHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar historial en el almacenamiento local cuando cambie
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('dueDateHistory', JSON.stringify(history));
    }
  }, []);

  // Calcular edad gestacional actual si hay fecha de parto prevista
  useEffect(() => {
    if (dueDate) {
      calculateGestationalAge();
    }
  }, [dueDate]);

  // Actualizar la edad gestacional cada día
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dueDate) {
        calculateGestationalAge();
      }
    }, 86400000); // 24 horas

    return () => clearInterval(intervalId);
  }, [dueDate]);

  const calculateDueDate = () => {
    if (!lmpDate) {
      setError('Por favor, selecciona la fecha de la última menstruación.');
      return;
    }

    // Validar que la fecha no sea en el futuro
    if (lmpDate > new Date()) {
      setError('La fecha de la última menstruación no puede estar en el futuro.');
      return;
    }

    // Validar que la fecha no sea hace más de 10 meses
    const tenMonthsAgo = new Date();
    tenMonthsAgo.setMonth(tenMonthsAgo.getMonth() - 10);
    if (lmpDate < tenMonthsAgo) {
      setError('La fecha de la última menstruación parece demasiado antigua.');
      return;
    }

    setError(null);
    
    // Clonar la fecha para no modificar la original
    const calculatedDueDate = new Date(lmpDate.getTime());
    
    // Añadir 280 días (40 semanas) a la fecha de la última menstruación
    calculatedDueDate.setDate(calculatedDueDate.getDate() + 280);
    
    setDueDate(calculatedDueDate);
    calculateGestationalAge();

    // Añadir al historial
    const newEntry = {
      lmpDate: format(lmpDate, 'dd/MM/yyyy'),
      dueDate: format(calculatedDueDate, 'dd/MM/yyyy'),
      calculationDate: format(new Date(), 'dd/MM/yyyy HH:mm')
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 10)); // Mantener solo los últimos 10 cálculos
  };

  const calculateGestationalAge = () => {
    if (!lmpDate) return;

    // Calcular semanas y días desde la última menstruación
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    
    setGestationalAge({ weeks, days });

    // Determinar trimestre
    if (weeks < 13) {
      setTrimester('Primer trimestre');
    } else if (weeks < 27) {
      setTrimester('Segundo trimestre');
    } else {
      setTrimester('Tercer trimestre');
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('dueDateHistory');
  };

  const getTrimesterColor = (tri: string) => {
    switch (tri) {
      case 'Primer trimestre': return 'bg-blue-100 text-blue-800';
      case 'Segundo trimestre': return 'bg-green-100 text-green-800';
      case 'Tercer trimestre': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Baby className="text-pink-500" />
          Calculadora de Fecha Probable de Parto
        </CardTitle>
        <CardDescription>
          Calcula la fecha estimada de parto basada en la fecha de tu última menstruación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lmp">Fecha de la última menstruación</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lmpDate ? (
                    format(lmpDate, "PPP", { locale: es })
                  ) : (
                    <span>Selecciona una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={lmpDate}
                  onSelect={(date) => {
                    setLmpDate(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={calculateDueDate} className="w-full">Calcular</Button>

          {dueDate && gestationalAge && (
            <div className="space-y-4 mt-4">
              <Alert>
                <AlertTitle>Fecha probable de parto:</AlertTitle>
                <AlertDescription className="text-2xl font-bold">
                  {format(dueDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold text-lg mb-2">Edad gestacional actual:</h3>
                  <p className="text-xl">
                    {gestationalAge.weeks} semanas y {gestationalAge.days} días
                  </p>
                  <span className={cn("mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium", getTrimesterColor(trimester))}>
                    {trimester}
                  </span>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold text-lg mb-2">Información importante:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• El embarazo típico dura entre 37-42 semanas</li>
                    <li>• Esta es una estimación basada en una duración de 40 semanas</li>
                    <li>• Solo un 5% de los bebés nacen en la fecha calculada</li>
                    <li>• Consulta con un profesional médico para un seguimiento adecuado</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-semibold text-lg mb-2">Trimestres del embarazo:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="p-2 border rounded bg-blue-50">
                    <span className="font-medium">Primer trimestre (Semanas 1-12):</span>
                    <p className="text-sm">Desarrollo de órganos y sistemas básicos</p>
                  </div>
                  <div className="p-2 border rounded bg-green-50">
                    <span className="font-medium">Segundo trimestre (Semanas 13-26):</span>
                    <p className="text-sm">Crecimiento rápido y desarrollo de características</p>
                  </div>
                  <div className="p-2 border rounded bg-purple-50">
                    <span className="font-medium">Tercer trimestre (Semanas 27-40+):</span>
                    <p className="text-sm">Aumento de peso y maduración de sistemas</p>
                  </div>
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
                    <th className="px-4 py-2 text-left">Fecha cálculo</th>
                    <th className="px-4 py-2 text-left">Última menstruación</th>
                    <th className="px-4 py-2 text-left">Fecha probable de parto</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{entry.calculationDate}</td>
                      <td className="px-4 py-2">{entry.lmpDate}</td>
                      <td className="px-4 py-2">{entry.dueDate}</td>
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

export default DueDateCalculator;
