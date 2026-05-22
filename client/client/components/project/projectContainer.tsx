"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialFormState = {
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
  nofcolors: "",
  extraColour: "",
  specialEffects: [],
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
  coverDetails: {},
  paymentDetails: {
    totalAmount: "",
    advancePaid: "",
    balance: "",
    deliveryMethod: "",
    transportName: "",
    notes: "",
  },
  workflow: [],
}

type Props = {
  mode: "create" | "edit";
  initialData?: any;
  id?: string | number;

  onCreate: (data: any) => Promise<any>;
  onUpdate?: (payload: { id: string | number; data: any }) => Promise<any>;

  children: (args: {
    formData: any;
    setFormData: React.Dispatch<any>;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    nextStep: () => void;
    prevStep: () => void;
    handleSubmit: () => void;
    mode: "create" | "edit";
  }) => React.ReactNode;
};

export default function ProjectContainer({
  mode,
  initialData,
  id,
  onCreate,
  onUpdate,
  children,
}: Props) {
  const [formData, setFormData] = useState(initialFormState)
  const [originalData, setOriginalData] =
    useState<any>(null);
  const [step, setStep] = useState(1);
  const router = useRouter()

  //  EDIT HYDRATION
  useEffect(() => {
    if (mode === "edit" && initialData) {

      setFormData(initialData);

      setOriginalData(initialData);
    }
  }, [mode, initialData]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  //  SUBMIT LOGIC
  const handleSubmit = async () => {

    const hasChanges =
      JSON.stringify(formData) !==
      JSON.stringify(originalData);
    const normalizeProjectPayload = (formData: any) => {
      return {
        ...formData,

        numberOfCopies: formData.numberOfCopies
          ? Number(formData.numberOfCopies)
          : null,

        numberOfColours: formData.numberOfColours
          ? Number(formData.numberOfColours)
          : null,

        numberOfPapers: formData.numberOfPapers
          ? Number(formData.numberOfPapers)
          : null,

        numberOfPages: formData.numberOfPages
          ? Number(formData.numberOfPages)
          : null,

        numberOfPlates: formData.numberOfPlates
          ? Number(formData.numberOfPlates)
          : null,

        numberOfDrawings: formData.numberOfDrawings
          ? Number(formData.numberOfDrawings)
          : null,

        numberOfPositive: formData.numberOfPositive
          ? Number(formData.numberOfPositive)
          : null,

        numberOfCD: formData.numberOfCD
          ? Number(formData.numberOfCD)
          : null,
      };
    };
    try {

      if (mode === "edit") {

        if (!hasChanges) {

          router.push("/dashboard/Project/list");

          return;
        }

        if (!onUpdate) {
          throw new Error(
            "onUpdate is required in edit mode"
          );
        }

        await onUpdate({
          id: id!,
          data: normalizeProjectPayload(formData),
        });

      } else {
        const payload = normalizeProjectPayload(formData);
        await onCreate(payload);
      }

      setFormData(initialFormState);

      setStep(1);

      router.push("/dashboard/Project/list");

    } catch (err) {

      console.error(err);
    }
  };

  return (
    <>
      {children({
        formData,
        setFormData,
        step,
        setStep,
        nextStep,
        prevStep,
        handleSubmit,
        mode,
      })}
    </>
  );
}