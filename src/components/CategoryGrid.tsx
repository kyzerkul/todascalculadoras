
import { Calculator } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Financieras",
    description: "Hipotecas, préstamos, inversiones",
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    title: "Matemáticas",
    description: "Álgebra, geometría, trigonometría",
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    title: "Científicas",
    description: "Física, química, conversiones",
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    title: "Salud",
    description: "IMC, calorías, nutrición",
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    title: "Fechas",
    description: "Edad, días entre fechas",
    icon: <Calculator className="w-8 h-8" />,
  },
  {
    title: "Estadísticas",
    description: "Probabilidad, análisis de datos",
    icon: <Calculator className="w-8 h-8" />,
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
