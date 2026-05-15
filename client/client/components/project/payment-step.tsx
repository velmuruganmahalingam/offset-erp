import { useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface PaymentStepProps {
  formData: any;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;

  nextStep: () => void;

  prevStep: () => void;
}

const deliveryOptions = [
  "Direct",
  "Transport",
];

export default function PaymentStep({
  formData,
  setFormData,
  nextStep,
  prevStep,
}: PaymentStepProps) {
  const paymentDetails =
    formData.paymentDetails || {};

  const updatePaymentDetails = (
    key: string,
    value: any
  ) => {
    setFormData((prev: any) => ({
      ...prev,

      paymentDetails: {
        ...prev.paymentDetails,

        [key]: value,
      },
    }));
  };

  useEffect(() => {
    const total =
      Number(
        paymentDetails.totalAmount
      ) || 0;

    const advance =
      Number(
        paymentDetails.advancePaid
      ) || 0;

    const balance =
      total - advance;

    updatePaymentDetails(
      "balance",

      balance
    );
  }, [
    paymentDetails.totalAmount,

    paymentDetails.advancePaid,
  ]);

  return (
    <Card>
      <CardContent className="space-y-8 p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Payment Details
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Total Amount"
              value={
                paymentDetails.totalAmount ||
                ""
              }
              onChange={(e) =>
                updatePaymentDetails(
                  "totalAmount",
                  e.target.value
                )
              }
            />

            <Input
              type="number"
              placeholder="Advance Paid"
              value={
                paymentDetails.advancePaid ||
                ""
              }
              onChange={(e) =>
                updatePaymentDetails(
                  "advancePaid",
                  e.target.value
                )
              }
            />

            <Input
              type="number"
              placeholder="Balance"
              value={
                paymentDetails.balance ||
                ""
              }
              disabled
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">
            Delivery Method
          </label>

          <div className="flex gap-6">
            {deliveryOptions.map(
              (item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="radio"
                    value={item}
                    checked={
                      paymentDetails.deliveryMethod ===
                      item
                    }
                    onChange={() =>
                      updatePaymentDetails(
                        "deliveryMethod",
                        item
                      )
                    }
                  />

                  {item}
                </label>
              )
            )}
          </div>
        </div>

        {paymentDetails.deliveryMethod ===
          "Transport" && (
          <div>
            <Input
              placeholder="Transport Name"
              value={
                paymentDetails.transportName ||
                ""
              }
              onChange={(e) =>
                updatePaymentDetails(
                  "transportName",
                  e.target.value
                )
              }
            />
          </div>
        )}

        <div>
          <textarea
            placeholder="Notes"
            value={
              paymentDetails.notes ||
              ""
            }
            onChange={(e) =>
              updatePaymentDetails(
                "notes",
                e.target.value
              )
            }
            className="min-h-[120px] w-full rounded-md border p-3 text-sm"
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="rounded-lg border px-6 py-2 text-sm"
          >
            Previous
          </button>

          <button
            onClick={nextStep}
            className="rounded-lg bg-black px-6 py-2 text-sm text-white"
          >
            Finish
          </button>
        </div>
      </CardContent>
    </Card>
  );
}