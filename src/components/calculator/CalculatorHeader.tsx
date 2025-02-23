
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type CalculatorHeaderProps = {
  title: string;
  description: string;
  category: "matematicas" | "financieras";
};

const CalculatorHeader = ({ title, description, category }: CalculatorHeaderProps) => {
  return (
    <>
      <Link
        to={`/categoria/${category}`}
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a calculadoras {category === "matematicas" ? "matemáticas" : "financieras"}
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
