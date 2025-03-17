import React from 'react';

export type CalculatorInputConfig = {
  id?: string;
  name?: string;
  label: string;
  type: "number" | "text" | "date" | "select" | "time" | "datetime-local";
  suffix?: string;
  helper?: string;
  defaultValue?: string;
  placeholder?: string;
  options?: { value: string, label: string }[];
  condition?: { field: string, value: string | string[] };
};

export type CategoryType = "matematicas" | "financieras" | "cientificas" | "conversiones" | "salud" | "fechas" | string;

export type InputBasedCalculator = {
  title: string;
  description: string;
  inputs: CalculatorInputConfig[];
  category?: CategoryType;
  component?: never;
  icon?: React.ComponentType;
  calculate?: (inputs: Record<string, string>) => string;
};

export type ComponentBasedCalculator = {
  title: string;
  description: string;
  component: () => Promise<React.ComponentType>;
  category?: CategoryType;
  inputs?: never;
  icon?: React.ComponentType;
};

export type Calculator = InputBasedCalculator | ComponentBasedCalculator;

export type Calculators = {
  [key: string]: Calculator;
};

export const isInputBasedCalculator = (calculator: Calculator): calculator is InputBasedCalculator => {
  return 'inputs' in calculator;
};
