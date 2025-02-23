
import { Calculator, PlusSquare, BarChart2, Heart, Calendar, BarChart, Code2, ArrowLeftRight, CircleDot } from "lucide-react";
import CategoryCard from "./CategoryCard";

export const categories = [
  {
    title: "Financieras",
    description: "Hipotecas, préstamos, inversiones",
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    title: "Matemáticas",
    description: "Álgebra, geometría, trigonometría",
    icon: <PlusSquare className="w-8 h-8" />,
  },
  {
    title: "Científicas",
    description: "Física, química, conversiones",
    icon: <BarChart2 className="w-8 h-8" />,
  },
  {
    title: "Salud",
    description: "IMC, calorías, nutrición",
    icon: <Heart className="w-8 h-8" />,
  },
  {
    title: "Fechas",
    description: "Edad, días entre fechas",
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    title: "Estadísticas",
    description: "Probabilidad, análisis de datos",
    icon: <BarChart className="w-8 h-8" />,
  },
  {
    title: "Programación y Tecnología",
    description: "Conversor de código, formateadores",
    icon: <Code2 className="w-8 h-8" />,
  },
  {
    title: "Conversiones",
    description: "Unidades, monedas, medidas",
    icon: <ArrowLeftRight className="w-8 h-8" />,
  },
  {
    title: "Otras Calculadoras",
    description: "Calculadoras especializadas",
    icon: <CircleDot className="w-8 h-8" />,
  },
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.title} {...category} />
      ))}
    </div>
  );
};

export default CategoryGrid;
