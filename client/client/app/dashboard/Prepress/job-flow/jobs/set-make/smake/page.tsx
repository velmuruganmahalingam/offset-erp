'use client'
import { useGetSetMakeQueueQuery, useUpdateSetMakeMutation } from "@/app/services/setmakeApi"
import { useMemo, useState } from "react"

export default function MergeMake() {
    const { data } = useGetSetMakeQueueQuery();
    const [updateSetMake, { isLoading }] =
        useUpdateSetMakeMutation();
    const [formData, setFormData] = useState({
        selectedId: 0,
        selectedOf: '',
        setMakeOf: '',
        notes: ''
    })

    console.log(data)
    const ofNos = useMemo(
        () =>
            data?.map((item: any) => ({
                id: item.id,
                ofNo: item.processType,
            })) ?? [],
        [data]
    );

    console.log(ofNos)

    const handleAddJob = () => {
        if (formData.selectedOf) {
            setFormData(prev => ({
                ...prev,
                setMakeOf: prev.selectedOf
            }))
        }
    }

    const handleSubmit = async () => {                                                                                  
        if (!formData.selectedOf) {
            alert("Please select a job");
            return;
        }

        try {
            await updateSetMake({
                id: formData.selectedId,
            }).unwrap();

            alert("Set Make Updated");

            setFormData({
                selectedId: 0,
                selectedOf: "",
                setMakeOf: "",
                notes: "",
            });
        } catch (error) {
            console.error(error);
            alert("Failed to update");
        }
    };

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
                            onChange={(e) => {
                                const selected = ofNos.find((item:any)=>item.id===Number(e.target.value))
                                setFormData(prev => ({
                                ...prev,
                                selectedId: Number(e.target.value),
                                selectedOf: selected?.ofNo || "",
                            }))}}>
                            <option value="">-- Select OF Job --</option>
                            {ofNos.map((item: any) => (
                                <option key={item.id} value={item.id}>
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
                        value={formData.selectedOf}
                        disabled
                    />
                </div>
                <div>
                    <label>Notes</label>
                    <textarea
                        className="w-full border rounded p-2"
                        value={formData.notes}
                        onChange={(e) => {
                            setFormData((prev) => ({
                                ...prev,
                                notes: e.target.value
                            }))
                        }} />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    )
}