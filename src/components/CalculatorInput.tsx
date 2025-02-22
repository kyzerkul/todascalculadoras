
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CalculatorInputProps {
  label: string;
  id: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
  helper?: string;
}

const CalculatorInput = ({
  label,
  id,
  type = "number",
  value,
  onChange,
  placeholder,
  suffix,
  helper,
}: CalculatorInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={suffix ? "pr-12" : ""}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {suffix}
          </div>
        )}
      </div>
      {helper && <p className="text-sm text-muted-foreground">{helper}</p>}
    </div>
  );
};

export default CalculatorInput;
