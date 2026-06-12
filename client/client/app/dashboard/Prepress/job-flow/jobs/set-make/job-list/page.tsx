'use client'
import { useGetJobListQuery } from "@/app/services/setmakeApi"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useState } from "react"

export default function JobList() {
    const [selectedJob, setSelectedJob] = useState<any>(null)
    const [open, setOpen] = useState(false)
    const [assignForm, setAssignForm] = useState({
        setMaker: "",
        assignedDate: "",
        deadline: "",
    })
    const { data } = useGetJobListQuery()
    useEffect(() => {
        console.log(data)
    }, [data])

    const now = new Date()

    const localDateTime =
        new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16)

    const handleAssign = (job: any) => {
        setSelectedJob(job)
        setAssignForm({
            setMaker: "",
            assignedDate: localDateTime,
            deadline: "",
        })
        setOpen(true)
    }
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
                                Customer Name
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

                                    <td className="px-4 py-3 font-medium">
                                        {item.proofprocess.workflow.project.customerName}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                            {item.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => handleAssign(item)}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Assign Job</DialogTitle>
                    </DialogHeader>

                    {selectedJob && (
                        <div className="space-y-4">
                            {/* <div>
                                <strong>Customer:</strong>{" "}
                                {selectedJob.proofprocess.workflow.project.customerName}
                            </div> */}

                            <div>
                                <strong>Process:</strong>{" "}
                                {selectedJob.processType}
                            </div>

                            {/* <div>
                                <strong>Status:</strong>{" "}
                                {selectedJob.status}
                            </div> */}

                            {/* Add dropdown/input here */}
                            <div>
                                <label className="text-sm font-medium">
                                    Set Maker
                                </label>

                                <input
                                    type="text"
                                    value={assignForm.setMaker}
                                    onChange={(e) =>
                                        setAssignForm({
                                            ...assignForm,
                                            setMaker: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border p-2"
                                    placeholder="Enter set maker name"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Assigned Date & Time
                                </label>

                                <input
                                    type="datetime-local"
                                    value={assignForm.assignedDate}
                                    className="w-full rounded-md border p-2 bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Deadline
                                </label>

                                <input
                                    type="datetime-local"
                                    value={assignForm.deadline}
                                    onChange={(e) =>
                                        setAssignForm({
                                            ...assignForm,
                                            deadline: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border p-2"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter showCloseButton>
                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                            onClick={() => {
                                // Assign API call
                                setOpen(false)
                            }}
                        >
                            Assign
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}