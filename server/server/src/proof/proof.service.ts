import { Injectable } from '@nestjs/common';
import { FinalApproveDto, ProofUpdateDto } from 'src/dto/proof.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkflowService } from 'src/workflow/workflow.service';

@Injectable()
export class ProofService {
    constructor(private prisma: PrismaService, private workflowService: WorkflowService) { }

    async updateCorrection(workflowId: number, dto: ProofUpdateDto) {

        const proof = await this.prisma.proofProcess.findFirst({
            where: {
                workflowId,
            },
        })

        if (!proof) {
            throw new Error("Proof not found")
        }

        const nextLevel = proof.correctionCount += 1

        return this.prisma.proofProcess.update({
            where: {
                id: proof.id,
            },

            data: {
                designedBy: dto.designedBy,
                checkedBy: dto.checkedBy,
                assignedDate: new Date(dto.assignedDate),
                deadline: new Date(dto.deadline),
                correctionCount: proof.correctionCount + 1,
            },
        });
    }

    async getProofById(workflowId: number) {
        return this.prisma.workflow.findFirst({
            where: {
                id: workflowId
            },
            include: {
                project: true,
                proofProcess: true,
                stage: true,
            },
        })

    }

    async getProofQueue() {
        return this.prisma.workflow.findMany({
            where: {
                stage: {
                    name: "Proof",
                },
                status: "Pending",
            },

            include: {
                project: true,
                stage: true,
                proofProcess: true
            },

            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getApprovalQueue() {
        return this.prisma.workflow.findMany({
            where: {
                stage: {
                    name: "Proof",
                },
                proofProcess: {
                    some: {
                        status: "WaitingApproval",
                    }
                },
            },

            include: {
                project: true,
                stage: true,
                proofProcess: true,
            },
        });
    }

    async sendForApproval(workflowId: number) {

        const proof =
            await this.prisma.proofProcess.findFirst({
                where: {
                    workflowId,
                },
            });

        if (!proof) {
            throw new Error("Proof not found");
        }

        return this.prisma.proofProcess.update({
            where: {
                id: proof.id,
            },
            data: {
                status: "WaitingApproval",
            },
        });
    }

    async finalApprove(
    proofId: number,
    dto: FinalApproveDto,
) {
    const proof = await this.prisma.proofProcess.findUnique({
        where: {
            id: proofId,
        },
        include: {
            workflow: {
                include: {
                    project: true,
                },
            },
        },
    });

    if (!proof) {
        throw new Error("Proof not found");
    }

    const processType =
        proof.workflow.project.ofNo;
    
    const jobType = processType.substring(0,4)

    const isMultiColor = [
        "ROMC",
        "PDMC",
    ].includes(jobType);

    return this.prisma.$transaction(async (tx) => {

        const approvedProof =
            await tx.proofProcess.update({
                where: {
                    id: proofId,
                },
                data: {
                    approvedBy: dto.approvedBy,
                    assignedDate: new Date(dto.assignedDate),
                    deadline: new Date(dto.deadline),
                    status: "Approved",
                },
            });

        // Only initiate SetMake for Multi Color jobs
        if (isMultiColor) {
            await tx.setMake.create({
                data: {
                    proofProcessId:
                        approvedProof.id,

                    processType,

                    status: "Pending",

                    deadline:
                        approvedProof.deadline,

                    notes:
                        approvedProof.notes,
                },
            });
        }

        await this.workflowService.moveToNextStage(
            proof.workflowId,
        );

        return approvedProof;
    });
}

}
