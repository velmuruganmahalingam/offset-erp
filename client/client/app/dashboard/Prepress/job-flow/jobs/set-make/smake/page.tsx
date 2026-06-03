'use client'
import { useGetSetMakeQueueQuery } from "@/app/services/setmakeApi"
import { useMemo, useState } from "react"

export default function MergeMake() {
    const { data } = useGetSetMakeQueueQuery();
    const [formData, setFormData] = useState({
        selectedOf: '',
        setMakeOf: '',
        notes:''
    })

    const ofNos = useMemo(
        () => data?.map(({ id, workflow }: { id: number; workflow: { project: { ofNo: string } } }) => ({
            id,
            ofNo: workflow.project.ofNo,
        })) ?? [],
        [data]
    );

    const handleAddJob = () => {
        if (formData.selectedOf) {
            setFormData(prev => ({
                ...prev,
                setMakeOf: prev.selectedOf
            }))
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Merge Job</h1>
            </div>

            <div className="rounded-xl border bg-white p-6 space-y-4">
                <div>
                    <label>Select Job</label>
                    <div className="flex gap-2">
                        <select
                            className="w-full border rounded p-2"
                            value={formData.selectedOf}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                selectedOf: e.target.value
                            }))}
                        >
                            <option value="">-- Select OF Job --</option>
                            {ofNos.map((item: any) => (
                                <option key={item.id} value={item.ofNo}>
                                    {item.ofNo}
                                </option>
                            ))}
                        </select>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleAddJob}
                        >
                            Add Job
                        </button>
                    </div>
                </div>

                <div>
                    <label>Set-Make Of.No</label>
                    <input
                        className="w-full border rounded p-2"
                        value={formData.setMakeOf}
                        disabled
                    />
                </div>
                <div>
                    <label>Notes</label>
                    <textarea
                    className="w-full border rounded p-2"
                    value={formData.notes}
                    onChange={(e)=>{
                       setFormData((prev)=>({
                        ...prev,
                        notes:e.target.value
                       }))
                    }}/>
                </div>
            </div>
        </div>
    )
}