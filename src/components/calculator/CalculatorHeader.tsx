
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type CalculatorHeaderProps = {
  title: string;
  description: string;
  category: "matematicas" | "financieras" | "cientificas" | "conversiones" | "salud";
};

const CalculatorHeader = ({ title, description, category }: CalculatorHeaderProps) => {
  const getCategoryText = (category: CalculatorHeaderProps["category"]) => {
    switch (category) {
      case "matematicas":
        return "matemáticas";
      case "financieras":
        return "financieras";
      case "cientificas":
        return "científicas";
      case "conversiones":
        return "conversiones";
      case "salud":
        return "salud";
    }
  };

  return (
    <>
      <Link
        to={`/categoria/${category}`}
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a calculadoras {getCategoryText(category)}
      </Link>

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          {title}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </>
  );
};

export default CalculatorHeader;
