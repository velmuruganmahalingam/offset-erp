"use client";

import {
  useGetProofByIdQuery,
  useSendApprovalMutation,
  useUpdateCorrectionMutation,
} from "@/app/services/proofApi";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProofChecking() {

  const params = useParams();
  const router = useRouter();

  const proofId = Number(params.id);
  console.log("route id", proofId);
  const { data, isLoading } =
    useGetProofByIdQuery(proofId);

  const [updateCorrection] =
    useUpdateCorrectionMutation();

  const [sendApproval] =
    useSendApprovalMutation();

  const [action, setAction] =
    useState<"correction" | "approval">(
      "correction"
    );

  const [form, setForm] = useState({
    designedBy: "",
    checkedBy: "",
    assignedDate: "",
    deadline: "",
    notes: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const correctionLevel =
    (data?.proofProcess?.[0]?.correctionCount ?? 0) + 1;

  const handleSubmit = async () => {

    if (action === "correction") {

      await updateCorrection({
        id: proofId,
        data: form,
      });

    } else {

      await sendApproval({
        id: proofId,
      });

    }

    router.push(
      "/dashboard/Prepress/job-flow/jobs/proof"
    );
  };
  console.log(data)
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Proof Review
        </h1>

        <p className="text-muted-foreground">
          OF No : {data?.project?.ofNo}
        </p>

        <p className="text-muted-foreground">
          Correction Level : {correctionLevel}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 space-y-4">

        <div>
          <label>Designed By</label>

          <input
            className="w-full border rounded p-2"
            value={form.designedBy}
            onChange={(e) =>
              setForm({
                ...form,
                designedBy: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Proof Checked By</label>

          <select
            className="w-full border rounded p-2"
            value={form.checkedBy}
            onChange={(e) =>
              setForm({
                ...form,
                checkedBy: e.target.value,
              })
            }
          >
            <option value="">
              Select Employee
            </option>

            <option value="John Doe">
              John Doe
            </option>

            <option value="Jane Smith">
              Jane Smith
            </option>

            <option value="Alex">
              Alex
            </option>

          </select>
        </div>

        <div>
          <label>Assigned Date & Time</label>

          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={form.assignedDate}
            onChange={(e) =>
              setForm({
                ...form,
                assignedDate: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Deadline Date & Time</label>

          <input
            type="datetime-local"
            className="w-full border rounded p-2"
            value={form.deadline}
            onChange={(e) =>
              setForm({
                ...form,
                deadline: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Remarks</label>

          <textarea
            rows={4}
            className="w-full border rounded p-2"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label>Result</label>

          <div className="flex gap-6 mt-2">

            <label>
              <input
                type="radio"
                checked={action === "correction"}
                onChange={() =>
                  setAction("correction")
                }
              />

              Correction Required
            </label>

            <label>
              <input
                type="radio"
                checked={action === "approval"}
                onChange={() =>
                  setAction("approval")
                }
              />

              Send For Approval
            </label>

          </div>
        </div>

        <div className="flex justify-end">

          <button
            onClick={handleSubmit}
            className="
              bg-black
              text-white
              px-4
              py-2
              rounded
            "
          >
            {action === "correction"
              ? "Send Correction"
              : "Send For Approval"}
          </button>

        </div>

      </div>

    </div>
  );
}