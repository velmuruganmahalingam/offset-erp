interface StepperProps {
  currentStep: number;
}

const steps = [
  "Customer",
  "Project",
  "Cover",
  "Payment",
];

export default function Stepper({
  currentStep,
}: StepperProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isActive = currentStep === stepNumber;

        const isCompleted =
          currentStep > stepNumber;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all

                ${
                  isCompleted
                    ? "border-black bg-black text-white"
                    : isActive
                    ? "border-black text-black"
                    : "border-gray-300 text-gray-400"
                }
              `}
              >
                {stepNumber}
              </div>

              <p
                className={`mt-2 text-sm font-medium

                ${
                  isActive || isCompleted
                    ? "text-black"
                    : "text-gray-400"
                }
              `}
              >
                {step}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-4 h-[2px] flex-1

                ${
                  currentStep > stepNumber
                    ? "bg-black"
                    : "bg-gray-300"
                }
              `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}