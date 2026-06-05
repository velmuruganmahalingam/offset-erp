'use client'
import { useGetJobListQuery } from "@/app/services/setmakeApi"
import { useEffect } from "react"
import { Fragment } from "react/jsx-runtime"

export default function JobList() {

    const { data } = useGetJobListQuery()
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Job-List Queue
                </h1>

                <p className="text-muted-foreground">
                    Jobs waiting for processing
                </p>
            </div>

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-slate-50">
                            <th className="px-4 py-3 text-left font-semibold">
                                OF No
                            </th>

                            <th className="px-4 py-3 text-left font-semibold">
                                Status
                            </th>

                            <th className="px-4 py-3 text-center font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.length ? (
                            data?.map((item: any) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {item.processType}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                            Assign
                                        </button>
                                    </td>
                                </tr>
                            ))) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No jobs available
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    )
}