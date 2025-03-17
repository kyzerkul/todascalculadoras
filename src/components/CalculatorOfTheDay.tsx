import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { calculators } from "@/config/calculators";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Fonction pour obtenir la calculatrice du jour
const getCalculatorOfTheDay = () => {
  // Récupérer toutes les calculatrices disponibles
  const calculatorIds = Object.keys(calculators);
  
  if (calculatorIds.length === 0) return null;
  
  // Utiliser la date du jour comme seed pour sélectionner une calculatrice
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  // Créer un nombre unique basé sur la date (jour + mois*31 + année*366)
  // Ce nombre déterminera quelle calculatrice sera sélectionnée ce jour-là
  const seed = day + month * 31 + year * 366;
  
  // Sélectionner une calculatrice en fonction du nombre seed
  const index = seed % calculatorIds.length;
  const calculatorId = calculatorIds[index];
  
  return {
    id: calculatorId,
    ...calculators[calculatorId]
  };
};

const CalculatorOfTheDay = () => {
  const [calculator, setCalculator] = useState<{
    id: string;
    title: string;
    description: string;
    category?: string;
  } | null>(null);

  useEffect(() => {
    // Sélectionner la calculatrice du jour
    const dailyCalculator = getCalculatorOfTheDay();
    setCalculator(dailyCalculator);
  }, []);

  if (!calculator) {
    return null;
  }

  return (
    <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur">
      <CardHeader className="flex flex-row items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-medium">Calculadora del Día</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{calculator.title}</h3>
        <p className="text-muted-foreground mb-4">
          {calculator.description}
        </p>
        <Link to={`/calculadora/${calculator.id}`}>
          <Button variant="outline" className="w-full">Ver calculadora</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CalculatorOfTheDay;
