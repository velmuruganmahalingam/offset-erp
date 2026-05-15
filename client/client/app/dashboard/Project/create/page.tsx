"use client";

import { useState } from "react";

import Stepper from "@/components/project/stepper";

import CustomerStep from "@/components/project/customer-step";
import ProjectStep from "@/components/project/project-step";
import CoverStep from "@/components/project/cover-step";
import PaymentStep from "@/components/project/payment-step";

export default function CreateProjectPage() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
         ofNo: "",

  orderDate: "",

  proofDate: "",

  deliveryDate: "",

  customerName: "",

  mobile: "",

  place: "",

  orderTakenBy: "",

  jobType: "",

  processType: "",

  size: "",

  gsm: "",

  numberOfCopies: "",

  layout: "",

  designBy: "",

  rawMaterialByParty: false,

  openStyle: "",

  numberOfColours: "",

  extraColour: "",

  specialEffects: [] as string[],

  lamination: "",

  creasing: false,

  pasting: false,

  designDetails: "",

  numberOfPapers: "",

  numberOfPages: "",

  numberOfPlates: "",

  numberOfDrawings: "",

  numberOfPositive: "",

  numberOfCD: "",
    });

    const nextStep = () => {
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    return (
        <div className="space-y-6 p-6">
            <Stepper currentStep={step} />

            {step === 1 && (
                <CustomerStep
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                />
            )}

            {step === 2 && (
        <ProjectStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

       {step === 3 && (
        <CoverStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <PaymentStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )} 
        </div>
    );
}