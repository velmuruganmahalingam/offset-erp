import { Injectable } from '@nestjs/common';
import { FinalApproveDto, ProofUpdateDto } from 'src/dto/proof.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { WorkflowService } from 'src/workflow/workflow.service';

@Injectable()
export class ProofService {
    constructor(private prisma: PrismaService, private workflowService: WorkflowService) { }

    async updateCorrection(proofId: number, dto: ProofUpdateDto) {

        const proof = await this.prisma.proofProcess.findUnique({
            where: {
                id: proofId
            },
        })

        if (!proof) {
            throw new Error("Proof not found")
        }

        const nextLevel = proof.correctionCount += 1

        return this.prisma.proofProcess.update({
            where: {
                id: proofId,
            },

            data: {
                designedBy: dto.designedBy,
                checkedBy: dto.checkedBy,
                assignedDate: new Date(dto.assignedDate),
                deadline: new Date(dto.deadline),
                correctionCount: nextLevel,
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

    async sendForApproval(
        proofId: number
    ) {
        return this.prisma.proofProcess.update({
            where: {
                id: proofId,
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

        const proof =
            await this.prisma.proofProcess.findUnique({
                where: {
                    id: proofId,
                },
            });

        if (!proof) {
            throw new Error("Proof not found");
        }

        await this.prisma.proofProcess.update({
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

        // move workflow forward
        return this.workflowService.moveToNextStage(
            proof.workflowId
        );
    }

}
