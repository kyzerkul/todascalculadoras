
import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CategoryCard = ({ title, description, icon }: CategoryCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-none bg-white/80 backdrop-blur">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <div className="text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
