'use client'
import { useGetSystemAssignQueueQuery } from "@/app/services/workFlowApi";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  description: string;
  data: any[];
  assignRoute: string;
  isLoading?: boolean;
};

export default function FlowTable({ title,
  description,
  data,
  assignRoute,
  isLoading,
}: Props) {
    const router = useRouter()
   

    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    return (

        <div className="p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          {title}
        </h1>

        <p className="text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">

        <table className="min-w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">OF No</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Job Type</th>
              <th className="px-4 py-3 text-left">Delivery Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {data.map((item: any) => (

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
                  {item.project.jobType}
                </td>

                <td className="px-4 py-3">
                  {new Date(
                    item.project.deliveryDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">

                  <button
                    onClick={() =>
                      router.push(
                        `${assignRoute}/${item.id}`
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
                    Assign
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
    )
}