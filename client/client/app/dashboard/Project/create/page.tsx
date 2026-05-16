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
  });

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {

      const toNumber = (value: any) => {
        return value === "" ? null : Number(value)
      }

      const payload = {
        ...formData,

        orderDate: formData.orderDate ? new Date(formData.orderDate) : null,
        proofDate: formData.proofDate ? new Date(formData.proofDate) : null,
        deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate) : null,
        numberOfColours: toNumber(formData.numberOfColours),
        numberOfCopies: toNumber(formData.numberOfCopies),
        numberOfCD:toNumber(formData.numberOfCD),
        numberOfDrawings:toNumber(formData.numberOfDrawings),
        numberOfPages:toNumber(formData.numberOfPages),
        numberOfPapers:toNumber(formData.numberOfPapers),
        numberOfPlates:toNumber(formData.numberOfPlates),
        numberOfPositive:toNumber(formData.numberOfPositive),
        paymentDetails: {
          ...formData.paymentDetails,
          totalAmount: toNumber(
            formData.paymentDetails
              ?.totalAmount
          ),

          advancePaid: toNumber(
            formData.paymentDetails
              ?.advancePaid
          ),

          balance: toNumber(
            formData.paymentDetails
              ?.balance
          ),
        }
      }

      const res = await fetch('http://localhost:4001/project', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error('Project creatation failed')
      }
      const data = await res.json();

      console.log(data)
      alert('Project Created')
    }
    catch (err) {
      console.error(err)
      alert('Something went wrong check')
    }
  }

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
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}