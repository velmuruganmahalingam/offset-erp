'use client';

import FlowTable from "@/components/workflow/flowTable";
import { useGetProofQueueQuery } from "@/app/services/workFlowApi";

export default function ProofPage() {

  const {
    data = [],
    isLoading,
  } = useGetProofQueueQuery();

  return (
    <FlowTable
      title="Proof Queue"
      description="Jobs waiting for proof processing"
      data={data}
      isLoading={isLoading}
      assignRoute="/dashboard/Prepress/job-flow/jobs/proof/assign"
    />
  );
}