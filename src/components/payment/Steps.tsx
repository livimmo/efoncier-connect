import { Check } from "lucide-react";

interface StepsProps {
  currentStep: number;
}

export const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    { number: 1, title: "Identification" },
    { number: 2, title: "Paiement" },
    { number: 3, title: "Confirmation" },
  ];

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-muted" />
      <div className="relative z-10 flex justify-between max-w-2xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
            >
              {currentStep > step.number ? (
                <Check className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>
            <span className="text-sm font-medium">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};