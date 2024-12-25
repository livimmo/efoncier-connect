import { useState } from "react";
import { Steps, StepsContent, StepsItem } from "@/components/ui/steps";
import { PropertySelection } from "./PropertySelection";
import { PaymentForm } from "./PaymentForm";
import { PaymentConfirmation } from "./PaymentConfirmation";

interface PaymentStepsProps {
  parcelId?: string | null;
}

export const PaymentSteps = ({ parcelId }: PaymentStepsProps) => {
  const [currentStep, setCurrentStep] = useState(parcelId ? 1 : 0);

  return (
    <div className="space-y-8">
      <Steps value={currentStep} onChange={setCurrentStep}>
        <StepsItem title="Identification" description="Sélectionnez votre bien" />
        <StepsItem title="Paiement" description="Choisissez votre mode de paiement" />
        <StepsItem title="Confirmation" description="Récapitulatif et validation" />
      </Steps>

      <StepsContent value={currentStep} className="mt-4">
        {currentStep === 0 && (
          <PropertySelection onSelect={() => setCurrentStep(1)} />
        )}
        {currentStep === 1 && (
          <PaymentForm 
            parcelId={parcelId || "TF-12345"} 
            onSuccess={() => setCurrentStep(2)} 
          />
        )}
        {currentStep === 2 && (
          <PaymentConfirmation />
        )}
      </StepsContent>
    </div>
  );
};