"use client";

import {
  useFinalApproveMutation,
  useGetProofQueueQuery,
} from "@/app/services/proofApi";

import { useRouter } from "next/navigation";
import { useState, Fragment } from "react";

export default function ProofPage() {

  const [showApproveModal, setShowApproveModal] =
    useState(false);

  const [selectedProof, setSelectedProof] =
    useState<any>(null);

  const [expandedId, setExpandedId] =
    useState<number | null>(null);

  const router = useRouter();

  const {
    data = [],
    isLoading,
  } = useGetProofQueueQuery();

  const [finalApprove] =
    useFinalApproveMutation();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const handleFinalApprove = async () => {

    if (!selectedProof) return;

    try {

      await finalApprove({

        id: selectedProof.id,

        data: {
          approvedBy: "MD",
          assignedDate: new Date().toISOString(),
          deadline: new Date().toISOString(),
        },

      });

      setShowApproveModal(false);
      setSelectedProof(null);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Proof Queue
        </h1>

        <p className="text-muted-foreground">
          Jobs waiting for proof processing
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">
                OF No
              </th>

              <th className="px-4 py-3 text-left">
                Customer
              </th>

              <th className="px-4 py-3 text-left">
                Correction Level
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>

            {data.map((item: any) => {

              const proof =
                item.proofProcess?.[0];

              const isExpanded =
                expandedId === item.id;

              return (

                <Fragment key={item.id}>

                  <tr
                    className="border-t cursor-pointer"
                    onClick={() =>
                      setExpandedId(
                        isExpanded ? null : item.id
                      )
                    }
                  >

                    <td className="px-4 py-3">

                      {isExpanded ? "▼" : "▶"}{" "}

                      {item.project.ofNo}

                    </td>

                    <td className="px-4 py-3">
                      {item.project.customerName}
                    </td>

                    <td className="px-4 py-3">
                      {proof?.correctionCount ?? 0}
                    </td>

                    <td className="px-4 py-3">
                      {proof?.status ?? "Initial Proof"}
                    </td>

                    <td className="px-4 py-3">

                      {proof?.status !== "WaitingApproval" && (

                        <button
                          onClick={(e) => {

                            e.stopPropagation();

                            router.push(
                              `/dashboard/Prepress/job-flow/jobs/proof/checking/${item.id}`
                            );

                          }}
                          className="
                            rounded-md
                            bg-blue-100
                            px-3
                            py-1
                            text-xs
                            font-medium
                            text-blue-700
                          "
                        >
                          Review
                        </button>

                      )}

                    </td>

                  </tr>

                  {isExpanded && (

                    <tr>

                      <td
                        colSpan={5}
                        className="
                          bg-gray-50
                          px-8
                          py-4
                        "
                      >

                        <div className="space-y-2">

                          <div>
                            ✔ Initial Proof
                          </div>

                          {Array.from({
                            length:
                              proof?.correctionCount ?? 0,
                          }).map((_, index) => (

                            <div key={index}>
                              ✔ Correction {index + 1}
                            </div>

                          ))}

                          {proof?.status ===
                            "WaitingApproval" ? (

                            <>
                              <div>
                                ⏳ Waiting Approval
                              </div>

                              <button
                                onClick={() => {

                                  setSelectedProof(
                                    proof
                                  );

                                  setShowApproveModal(
                                    true
                                  );

                                }}
                                className="
                                  mt-2
                                  rounded-md
                                  bg-green-100
                                  px-3
                                  py-1
                                  text-xs
                                  font-medium
                                  text-green-700
                                "
                              >
                                Final Approve
                              </button>
                            </>

                          ) : (

                            <div>
                              ⬜ Next Correction
                            </div>

                          )}

                        </div>

                      </td>

                    </tr>

                  )}

                </Fragment>

              );

            })}

          </tbody>

        </table>

      </div>

      {showApproveModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
            className="
              bg-white
              rounded-xl
              p-6
              w-[400px]
            "
          >

            <h2
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Approve Proof
            </h2>

            <p>
              Are you sure you want to
              approve this proof?
            </p>

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
              "
            >

              <button
                onClick={() =>
                  setShowApproveModal(false)
                }
                className="
                  px-4
                  py-2
                  border
                  rounded
                "
              >
                Cancel
              </button>

              <button
                onClick={handleFinalApprove}
                className="
                  px-4
                  py-2
                  bg-green-600
                  text-white
                  rounded
                "
              >
                Approve
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}