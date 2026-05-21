"use client";

import Stepper from "@/components/project/stepper";

import CustomerStep from "@/components/project/steps/customer-step";
import ProjectStep from "@/components/project/steps/project-step";
import CoverStep from "@/components/project/steps/cover-step";
import PaymentStep from "@/components/project/steps/payment-step";
import ProjectContainer from "@/components/project/projectContainer";


export default function CreateProjectPage() {
  return (
    <ProjectContainer
      mode="create"
      onCreate={async (data) => {
        const res = await fetch("http://localhost:4001/project", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Create failed");

        return res.json();
      }}
    >
      {({
        formData,
        setFormData,
        step,
        nextStep,
        prevStep,
        handleSubmit,
      }) => (
        <div className="space-y-6 p-6">
          
          {/* STEP INDICATOR (UNCHANGED) */}
          <Stepper currentStep={step} />

          {/* STEP 1 */}
          {step === 1 && (
            <CustomerStep
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
            />
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <ProjectStep
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <CoverStep
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <PaymentStep
              formData={formData}
              setFormData={setFormData}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          )}

        </div>
      )}
    </ProjectContainer>
  );
}