
export type CalculatorInputConfig = {
  id: string;
  label: string;
  type: "number" | "text";
  suffix?: string;
  helper: string;
};

export type InputBasedCalculator = {
  title: string;
  description: string;
  inputs: CalculatorInputConfig[];
  component?: never;
};

export type ComponentBasedCalculator = {
  title: string;
  description: string;
  component: () => Promise<React.ComponentType>;
  inputs?: never;
};

export type Calculator = InputBasedCalculator | ComponentBasedCalculator;

export type Calculators = {
  [key: string]: Calculator;
};

export const isInputBasedCalculator = (calculator: Calculator): calculator is InputBasedCalculator => {
  return 'inputs' in calculator;
};
