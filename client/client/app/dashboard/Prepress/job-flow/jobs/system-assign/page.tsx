

import { useGetSystemAssignQueueQuery } from "@/app/services/workFlowApi";
import FlowTable from "@/components/workflow/flowTable";

export default function SystemAssignPage() {
   const {
    data = [],
    isLoading,
  } = useGetSystemAssignQueueQuery();

  return (
    <FlowTable
      title="System Assign Queue"
      description="Pending jobs waiting for system assignment"
      data={data}
      isLoading={isLoading}
      assignRoute="/dashboard/Prepress/job-flow/jobs/system-assign/assign"
    />
  );
}