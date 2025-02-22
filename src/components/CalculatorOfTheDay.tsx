
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const CalculatorOfTheDay = () => {
  return (
    <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur">
      <CardHeader className="flex flex-row items-center gap-2">
        <Star className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-medium">Calculadora del Día</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">Calculadora de Hipoteca</h3>
        <p className="text-muted-foreground">
          Calcula tus pagos mensuales y planifica tu futura hipoteca con nuestra herramienta más popular.
        </p>
      </CardContent>
    </Card>
  );
};

export default CalculatorOfTheDay;
