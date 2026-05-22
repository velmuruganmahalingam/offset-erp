"use client";

import { useAssignSystemMutation } from "@/app/services/workFlowApi";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const systems = ["A", "B", "C", "D", "G", "H", "I"];

// mock users for now
const employees = [
  "John Doe",
  "Jane Smith",
  "Ravi Kumar",
  "Alex",
];

export default function AssignPage() {
  const router = useRouter();
  const params = useParams();
  const [assignSystem] =
    useAssignSystemMutation();
  const [form, setForm] = useState({
    system: "",
    assignedTo: "",
    assignedDate: "",
    deadline: "",
  });

  const handleSubmit = async () => {
    try {
      await assignSystem({
        id: Number(params.id),
        data: {
          assignedSystem: form.system,
          assignedTo: form.assignedTo,
          assignedDate: form.assignedDate,
          deadLine: form.deadline,
        },
      }).unwrap();

      router.push(
        "/dashboard/Prepress/job-flow/jobs/system-assign"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">
        Assign System Job
      </h1>

      {/* SYSTEM */}
      <div>
        <label className="text-sm">System</label>
        <select
          className="w-full border p-2 rounded"
          value={form.system}
          onChange={(e) =>
            setForm({ ...form, system: e.target.value })
          }
        >
          <option value="">Select System</option>
          {systems.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* ASSIGN TO */}
      <div>
        <label className="text-sm">Assign To</label>
        <select
          className="w-full border p-2 rounded"
          value={form.assignedTo}
          onChange={(e) =>
            setForm({ ...form, assignedTo: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* CURRENT DATE */}
      <div>
        <label className="text-sm">Assigned Date & Time</label>
        <input
          type="datetime-local"
          className="w-full border p-2 rounded"
          value={form.assignedDate}
          onChange={(e) =>
            setForm({ ...form, assignedDate: e.target.value })
          }
        />
      </div>

      {/* DEADLINE */}
      <div>
        <label className="text-sm">Deadline</label>
        <input
          type="datetime-local"
          className="w-full border p-2 rounded"
          value={form.deadline}
          onChange={(e) =>
            setForm({ ...form, deadline: e.target.value })
          }
        />
      </div>

      {/* ACTION */}
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Assign
      </button>
    </div>
  );
}