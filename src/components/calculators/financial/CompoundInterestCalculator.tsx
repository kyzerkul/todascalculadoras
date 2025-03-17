import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorHeader from "@/components/calculator/CalculatorHeader";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0); // Capital inicial
  const [regularDeposit, setRegularDeposit] = useState<number>(2000); // Aporte periódico
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Default to monthly
  const [depositFrequency, setDepositFrequency] = useState<number>(12); // Default to monthly deposits
  const [calculationType, setCalculationType] = useState<'initial' | 'periodic'>('periodic'); // Default to periodic deposits
  const [result, setResult] = useState<number | null>(null);
  const [details, setDetails] = useState<{
    totalDeposits: number;
    interestEarned: number;
    annualResult: number;
    semiannualResult: number;
    quarterlyResult: number;
    monthlyResult: number;
  } | null>(null);
  const [verificationDetails, setVerificationDetails] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>, defaultValue: number = 0) => {
    const value = e.target.value;
    
    // Allow empty string (to clear input)
    if (value === "") {
      setter(defaultValue);
      return;
    }
    
    // Replace commas with dots for decimal input
    const normalizedValue = value.replace(",", ".");
    const numberValue = parseFloat(normalizedValue);
    
    if (!isNaN(numberValue)) {
      setter(numberValue);
    }
  };

  useEffect(() => {
    setResult(null);
    setDetails(null);
    setVerificationDetails("");
  }, [principal, regularDeposit, rate, time, compoundingFrequency, depositFrequency, calculationType]);

  const getCompoundingFrequency = () => {
    return calculationType === 'initial' ? 1 : compoundingFrequency;
  };

  // Formule d'intérêt composé pour capital initial unique
  const calculateSingleDepositCompoundInterest = (p: number, r: number, t: number): number => {
    // Formula: A = P * (1 + r)^t
    // p = principal, r = rate (decimal), t = time in years
    
    const decimalRate = r / 100; 
    return p * Math.pow(1 + decimalRate, t);
  };

  // Formule pour les versements périodiques avec intérêt composé
  const calculatePeriodicDepositCompoundInterest = (
    pmt: number, // montant des versements périodiques
    r: number,   // taux d'intérêt annuel (pourcentage)
    n: number,   // fréquence de capitalisation par an
    t: number,   // durée en années
    p: number = 0, // capital initial (optionnel)
    pmtFreq: number = n // fréquence des versements (par défaut identique à la fréquence de capitalisation)
  ): number => {
    const decimalRate = r / 100;
    
    // Facteur d'ajustement si les fréquences de versement et de capitalisation diffèrent
    const adjustmentFactor = pmtFreq / n;
    const adjustedRate = decimalRate / n;
    
    // Calcul pour un capital initial (si présent)
    const initialAmount = p * Math.pow(1 + adjustedRate, n * t);
    
    // Calcul pour les versements périodiques
    // Formule: PMT × (((1 + r/n)^(n×t) - 1) / (r/n))
    // Pour les versements qui ne coïncident pas avec la période de capitalisation,
    // on utilise un facteur d'ajustement
    const periodicAmount = pmt * adjustmentFactor * 
                          (Math.pow(1 + adjustedRate, n * t) - 1) / 
                          adjustedRate;
    
    return initialAmount + periodicAmount;
  };

  const generateVerificationSteps = (): string => {
    if (calculationType === 'initial') {
      // Vérification pour capital initial unique
      const decimalRate = rate / 100;
      const exponent = time;
      const multiplier = Math.pow(1 + decimalRate, exponent).toFixed(4);
      
      return `
        Verificación del cálculo (Capital Inicial Único):
        
        Formula: A = P × (1 + r)^t
        
        Donde:
        P (Capital inicial) = ${principal.toLocaleString()}€
        r (Tasa de interés) = ${rate}% (${decimalRate} en decimal)
        t (Tiempo) = ${time} años
        
        Cálculo:
        A = ${principal.toLocaleString()}€ × (1 + ${decimalRate})^(${time})
        A = ${principal.toLocaleString()}€ × ${multiplier}
        A = ${(principal * parseFloat(multiplier)).toFixed(2)}€
      `;
    } else {
      // Vérification pour versements périodiques
      const decimalRate = rate / 100;
      const adjustedRate = decimalRate / compoundingFrequency;
      const exponent = compoundingFrequency * time;
      const totalDeposits = regularDeposit * depositFrequency * time;
      
      // Facteur pour la formule des versements périodiques
      const factor = (Math.pow(1 + adjustedRate, exponent) - 1) / adjustedRate;
      
      // Si capital initial
      const initialPart = principal > 0 ? 
        `Capital inicial después de ${time} años: ${principal.toLocaleString()}€ × ${Math.pow(1 + adjustedRate, exponent).toFixed(4)} = ${(principal * Math.pow(1 + adjustedRate, exponent)).toFixed(2)}€` : 
        "No hay capital inicial.";
      
      return `
        Verificación del cálculo (Aportes Periódicos):
        
        Formula para aportes periódicos: 
        A = PMT × (((1 + r/n)^(n×t) - 1) / (r/n)) + P × (1 + r/n)^(n×t)
        
        Donde:
        PMT (Aporte periódico) = ${regularDeposit.toLocaleString()}€
        P (Capital inicial, si hay) = ${principal.toLocaleString()}€
        r (Tasa de interés) = ${rate}% (${decimalRate} en decimal)
        n (Frecuencia de capitalización) = ${compoundingFrequency} veces por año
        f (Frecuencia de aportes) = ${depositFrequency} veces por año
        t (Tiempo) = ${time} años
        
        Total de aportes realizados: ${regularDeposit.toLocaleString()}€ × ${depositFrequency} × ${time} = ${totalDeposits.toLocaleString()}€
        
        ${initialPart}
        
        Cálculo para los aportes periódicos:
        Factor de crecimiento: (((1 + ${adjustedRate.toFixed(6)})^${exponent} - 1) / ${adjustedRate.toFixed(6)}) = ${factor.toFixed(4)}
        Valor futuro de los aportes: ${regularDeposit.toLocaleString()}€ × (${depositFrequency}/${compoundingFrequency}) × ${factor.toFixed(4)} = ${(regularDeposit * (depositFrequency/compoundingFrequency) * factor).toFixed(2)}€
        
        Valor futuro total: ${(principal * Math.pow(1 + adjustedRate, exponent) + regularDeposit * (depositFrequency/compoundingFrequency) * factor).toFixed(2)}€
        
        Interés ganado: ${(principal * Math.pow(1 + adjustedRate, exponent) + regularDeposit * (depositFrequency/compoundingFrequency) * factor - totalDeposits - principal).toFixed(2)}€
      `;
    }
  };

  const calculate = () => {
    // Validation
    if (calculationType === 'initial' && principal <= 0) {
      alert("Por favor ingrese un capital inicial positivo");
      return;
    }
    
    if (calculationType === 'periodic' && regularDeposit <= 0) {
      alert("Por favor ingrese un aporte periódico positivo");
      return;
    }
    
    if (rate <= 0 || time <= 0) {
      alert("Por favor ingrese valores positivos para la tasa de interés y el tiempo");
      return;
    }
    
    let futureValue: number;
    let totalDeposited: number;
    
    // Calculate based on type
    if (calculationType === 'initial') {
      // Single initial deposit with annual compounding
      futureValue = calculateSingleDepositCompoundInterest(principal, rate, time);
      totalDeposited = principal;
    } else {
      // Periodic deposits
      futureValue = calculatePeriodicDepositCompoundInterest(
        regularDeposit, 
        rate, 
        compoundingFrequency, 
        time, 
        principal,
        depositFrequency
      );
      totalDeposited = principal + (regularDeposit * depositFrequency * time);
    }
    
    setResult(Number(futureValue.toFixed(2)));
    
    // Generate verification steps
    setVerificationDetails(generateVerificationSteps());
    
    // Calculate details for comparison
    if (calculationType === 'initial') {
      setDetails({
        totalDeposits: principal,
        interestEarned: Number(futureValue.toFixed(2)) - principal,
        annualResult: futureValue,
        semiannualResult: Number(calculateSingleDepositCompoundInterest(principal, rate, time).toFixed(2)),
        quarterlyResult: Number(calculateSingleDepositCompoundInterest(principal, rate, time).toFixed(2)),
        monthlyResult: Number(calculateSingleDepositCompoundInterest(principal, rate, time).toFixed(2)),
      });
    } else {
      setDetails({
        totalDeposits: totalDeposited,
        interestEarned: Number(futureValue.toFixed(2)) - totalDeposited,
        annualResult: Number(calculatePeriodicDepositCompoundInterest(regularDeposit, rate, 1, time, principal, depositFrequency).toFixed(2)),
        semiannualResult: Number(calculatePeriodicDepositCompoundInterest(regularDeposit, rate, 2, time, principal, depositFrequency).toFixed(2)),
        quarterlyResult: Number(calculatePeriodicDepositCompoundInterest(regularDeposit, rate, 4, time, principal, depositFrequency).toFixed(2)),
        monthlyResult: Number(calculatePeriodicDepositCompoundInterest(regularDeposit, rate, 12, time, principal, depositFrequency).toFixed(2)),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <CalculatorHeader
        title="Calculadora de Interés Compuesto"
        description="Calcula el valor futuro de inversiones con interés compuesto, ya sea con un capital inicial único o con aportes periódicos"
        category="financieras"
      />

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Cálculo</Label>
                <div className="flex space-x-2">
                  <Button 
                    type="button" 
                    variant={calculationType === 'initial' ? "default" : "outline"}
                    onClick={() => setCalculationType('initial')}
                    className="flex-1"
                  >
                    Capital Inicial Único
                  </Button>
                  <Button 
                    type="button" 
                    variant={calculationType === 'periodic' ? "default" : "outline"}
                    onClick={() => setCalculationType('periodic')}
                    className="flex-1"
                  >
                    Aportes Periódicos
                  </Button>
                </div>
              </div>
              
              {calculationType === 'initial' ? (
                <div className="space-y-2">
                  <Label>Capital Inicial (P)</Label>
                  <Input
                    type="number"
                    value={principal === 0 ? "" : principal}
                    onChange={(e) => handleInput(e, setPrincipal)}
                    placeholder="Ingrese el capital inicial"
                    step="any"
                  />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Capital Inicial (opcional)</Label>
                    <Input
                      type="number"
                      value={principal === 0 ? "" : principal}
                      onChange={(e) => handleInput(e, setPrincipal)}
                      placeholder="Ingrese el capital inicial (opcional)"
                      step="any"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Aporte Periódico</Label>
                    <Input
                      type="number"
                      value={regularDeposit === 0 ? "" : regularDeposit}
                      onChange={(e) => handleInput(e, setRegularDeposit)}
                      placeholder="Ingrese el monto de aporte periódico"
                      step="any"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frecuencia de Aportes</Label>
                    <Select 
                      value={depositFrequency.toString()} 
                      onValueChange={(value) => setDepositFrequency(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Anual (1 vez por año)</SelectItem>
                        <SelectItem value="2">Semestral (2 veces por año)</SelectItem>
                        <SelectItem value="4">Trimestral (4 veces por año)</SelectItem>
                        <SelectItem value="12">Mensual (12 veces por año)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Tasa de Interés Anual (r %)</Label>
                <Input
                  type="number"
                  value={rate === 0 ? "" : rate}
                  onChange={(e) => handleInput(e, setRate)}
                  placeholder="Ingrese la tasa de interés anual"
                  step="any"
                />
              </div>

              <div className="space-y-2">
                <Label>Plazo en Años (t)</Label>
                <Input
                  type="number"
                  value={time === 0 ? "" : time}
                  onChange={(e) => handleInput(e, setTime)}
                  placeholder="Ingrese el plazo en años"
                  step="any"
                />
              </div>

              {calculationType === 'periodic' && (
                <div className="space-y-2">
                  <Label>Frecuencia de Capitalización</Label>
                  <Select 
                    value={compoundingFrequency.toString()} 
                    onValueChange={(value) => setCompoundingFrequency(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Anual (1 vez por año)</SelectItem>
                      <SelectItem value="2">Semestral (2 veces por año)</SelectItem>
                      <SelectItem value="4">Trimestral (4 veces por año)</SelectItem>
                      <SelectItem value="12">Mensual (12 veces por año)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Button onClick={calculate} className="w-full">
                Calcular
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Resultados</h3>
              
              {result !== null && (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-md border">
                    <p className="text-sm text-gray-500">Valor Futuro (A)</p>
                    <p className="text-2xl font-bold">{result.toLocaleString()}€</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {calculationType === 'initial' ? 'Capital inicial + Interés acumulado' : 'Capital inicial + Aportes periódicos + Interés acumulado'} con capitalización {
                        calculationType === 'initial' ? "anual" : 
                        compoundingFrequency === 1 ? "anual" :
                        compoundingFrequency === 2 ? "semestral" :
                        compoundingFrequency === 4 ? "trimestral" :
                        compoundingFrequency === 12 ? "mensual" : ""
                      }
                    </p>
                  </div>
                  
                  {details && (
                    <>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Total Aportado</h4>
                          <p className="text-lg">{details.totalDeposits.toLocaleString()}€</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Interés Generado</h4>
                          <p className="text-lg">{details.interestEarned.toLocaleString()}€</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-semibold mb-2">Comparación de Frecuencias de Capitalización</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Anual:</span>
                            <span className="font-medium">{details.annualResult.toLocaleString()}€</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Semestral:</span>
                            <span className="font-medium">{details.semiannualResult.toLocaleString()}€</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Trimestral:</span>
                            <span className="font-medium">{details.quarterlyResult.toLocaleString()}€</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mensual:</span>
                            <span className="font-medium">{details.monthlyResult.toLocaleString()}€</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {verificationDetails && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-md text-xs font-mono whitespace-pre-line">
                      <h4 className="font-semibold mb-2 text-sm">Verificación del Cálculo</h4>
                      {verificationDetails}
                    </div>
                  )}
                </div>
              )}
              
              {result === null && (
                <p className="text-gray-500">
                  Ingrese los valores y presione "Calcular" para ver los resultados.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-4">Fórmulas del Interés Compuesto</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Para Capital Inicial Único:</h4>
              <div className="bg-gray-50 p-4 rounded-md mb-2">
                <p className="font-mono text-center">A = P × (1 + r)^t</p>
              </div>
              <p className="text-sm">
                <strong>Donde:</strong> P = Capital inicial, r = Tasa de interés anual (decimal),
                t = Tiempo en años
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Para Aportes Periódicos:</h4>
              <div className="bg-gray-50 p-4 rounded-md mb-2">
                <p className="font-mono text-center">A = PMT × (((1 + r/n)^(n×t) - 1) / (r/n))</p>
              </div>
              <p className="text-sm">
                <strong>Donde:</strong> PMT = Aporte periódico, r = Tasa de interés anual (decimal),
                n = Frecuencia de capitalización, t = Tiempo en años
              </p>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>
                El interés compuesto es un concepto financiero poderoso que permite que tu dinero genere 
                más dinero con el tiempo. Al recibir intereses no solo sobre tu capital inicial sino también 
                sobre los intereses acumulados, el crecimiento se acelera significativamente a largo plazo.
              </p>
              <p className="mt-2">
                La frecuencia de capitalización (cuántas veces al año se calculan y añaden los intereses) 
                tiene un impacto importante en el resultado final. Cuanto mayor sea la frecuencia, mayor 
                será el monto final obtenido.
              </p>
              <p className="mt-2">
                Los aportes periódicos regulares pueden tener un efecto dramático en el crecimiento 
                de tu inversión debido al poder del interés compuesto aplicado a cada aporte a lo largo del tiempo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompoundInterestCalculator;
