import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart } from "lucide-react";

const HeartRateCalculator = () => {
  const [age, setAge] = useState<number | ''>('');
  const [maxHeartRate, setMaxHeartRate] = useState<number | null>(null);
  const [trainingZones, setTrainingZones] = useState<{min: number, max: number}[]>([]);
  const [history, setHistory] = useState<{age: number, maxHeartRate: number, date: string}[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cargar historial del almacenamiento local al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem('heartRateHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Guardar historial en el almacenamiento local cuando cambie
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('heartRateHistory', JSON.stringify(history));
    }
  }, [history]);

  const calculateMaxHeartRate = () => {
    if (!age) {
      setError('Por favor, ingresa tu edad.');
      return;
    }

    if (age < 1 || age > 120) {
      setError('Por favor, ingresa una edad válida entre 1 y 120 años.');
      return;
    }

    setError(null);
    const maxHR = 220 - age;
    setMaxHeartRate(maxHR);
    
    // Calcular zonas de entrenamiento (50-60%, 60-70%, 70-80%, 80-90%, 90-100%)
    const zones = [
      { min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.6) },
      { min: Math.round(maxHR * 0.6), max: Math.round(maxHR * 0.7) },
      { min: Math.round(maxHR * 0.7), max: Math.round(maxHR * 0.8) },
      { min: Math.round(maxHR * 0.8), max: Math.round(maxHR * 0.9) },
      { min: Math.round(maxHR * 0.9), max: maxHR }
    ];
    setTrainingZones(zones);

    // Añadir al historial
    const newEntry = {
      age: age,
      maxHeartRate: maxHR,
      date: new Date().toLocaleString()
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 10));  // Mantener solo los últimos 10 cálculos
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('heartRateHistory');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Heart className="text-red-500" />
          Calculadora de Frecuencia Cardíaca Máxima
        </CardTitle>
        <CardDescription>
          Calcula tu frecuencia cardíaca máxima y zonas de entrenamiento basadas en tu edad
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input
              id="age"
              type="number"
              min="1"
              max="120"
              placeholder="Ingresa tu edad"
              value={age}
              onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={calculateMaxHeartRate} className="w-full">Calcular</Button>

          {maxHeartRate !== null && (
            <div className="space-y-4 mt-4">
              <Alert>
                <AlertTitle>Tu frecuencia cardíaca máxima es:</AlertTitle>
                <AlertDescription className="text-2xl font-bold">
                  {maxHeartRate} latidos por minuto
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Zonas de entrenamiento:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="p-2 border rounded bg-blue-50">
                    <span className="font-medium">Zona 1 (50-60%):</span> {trainingZones[0]?.min} - {trainingZones[0]?.max} lpm
                    <p className="text-sm text-gray-600">Actividad muy ligera</p>
                  </div>
                  <div className="p-2 border rounded bg-green-50">
                    <span className="font-medium">Zona 2 (60-70%):</span> {trainingZones[1]?.min} - {trainingZones[1]?.max} lpm
                    <p className="text-sm text-gray-600">Quema de grasa</p>
                  </div>
                  <div className="p-2 border rounded bg-yellow-50">
                    <span className="font-medium">Zona 3 (70-80%):</span> {trainingZones[2]?.min} - {trainingZones[2]?.max} lpm
                    <p className="text-sm text-gray-600">Aeróbica</p>
                  </div>
                  <div className="p-2 border rounded bg-orange-50">
                    <span className="font-medium">Zona 4 (80-90%):</span> {trainingZones[3]?.min} - {trainingZones[3]?.max} lpm
                    <p className="text-sm text-gray-600">Anaeróbica</p>
                  </div>
                  <div className="p-2 border rounded bg-red-50">
                    <span className="font-medium">Zona 5 (90-100%):</span> {trainingZones[4]?.min} - {trainingZones[4]?.max} lpm
                    <p className="text-sm text-gray-600">Máximo esfuerzo</p>
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
                    <th className="px-4 py-2 text-left">Fecha</th>
                    <th className="px-4 py-2 text-left">Edad</th>
                    <th className="px-4 py-2 text-left">FCM</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">{entry.age} años</td>
                      <td className="px-4 py-2">{entry.maxHeartRate} lpm</td>
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

export default HeartRateCalculator;
