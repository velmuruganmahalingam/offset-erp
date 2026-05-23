"use client";

import { useGetProofQueueQuery } from "@/app/services/proofApi";
import { useRouter } from "next/navigation";

export default function ProofPage() {

  const router = useRouter();

  const {
    data = [],
    isLoading,
  } = useGetProofQueueQuery();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

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

              return (
                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="px-4 py-3">
                    {item.project.ofNo}
                  </td>

                  <td className="px-4 py-3">
                    {item.project.customerName}
                  </td>

                  <td className="px-4 py-3">

                    {(proof?.correctionCount ?? 0) + 1}

                  </td>

                  <td className="px-4 py-3">

                    {proof?.status ?? "Pending"}

                  </td>

                  <td className="px-4 py-3">

                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/Prepress/job-flow/jobs/proof/checking/${item.id}`
                        )
                      }
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

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}