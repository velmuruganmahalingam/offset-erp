import { Injectable } from '@nestjs/common';
import { AssignSystemDto } from 'src/dto/assignSystem.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkflowService {

    constructor(
        private prisma: PrismaService
    ) {

    }

    async getSystemAssignQueue() {

        return this.prisma.workflow.findMany({

            where: {
                stage: { name: 'System Assign' },
                status: 'Pending',
            },

            include: {
                project: true,
                stage: true,
            },

            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async assignSystem(workflowId: number, dto: AssignSystemDto) {

        const workflow = await this.prisma.workflow.findUnique({
            where: { id: workflowId },
            include: { stage: true },
        });

        if (!workflow) throw new Error("Workflow not found");

        const nextStage = await this.prisma.workflowStage.findFirst({
            where: {
                order: workflow.stage.order + 1,
                isActive: true,
            },
        });

        // 1. update current stage
        await this.prisma.workflow.update({
            where: { id: workflowId },
            data: {
                assignedSystem: dto.assignedSystem,
                assignedTo: dto.assignedTo,
                assignedDate: new Date(dto.assignedDate),
                deadline: new Date(dto.deadLine),
                status: "Completed",
            },
        });

        // 2. create next stage (Proof)
        if (nextStage) {
            return this.prisma.workflow.create({
                data: {
                    projectId: workflow.projectId,
                    stageId: nextStage.id,
                    status: "Pending",
                },
            });
        }

        return { message: "Workflow completed" };
    }

    

    async moveToNextStage(workflowId: number) {

        const workflow =
            await this.prisma.workflow.findUnique({

                where: {
                    id: workflowId,
                },

                include: {
                    stage: true,
                },

            });

        if (!workflow)
            throw new Error("Workflow not found");

        const nextStage =
            await this.prisma.workflowStage.findFirst({

                where: {
                    order: workflow.stage.order + 1,
                    isActive: true,
                },

            });

        await this.prisma.workflow.update({

            where: {
                id: workflowId,
            },

            data: {
                status: "Completed",
            },

        });

        if (!nextStage) {
            return {
                message: "Workflow completed",
            };
        }

        return this.prisma.workflow.create({

            data: {

                projectId: workflow.projectId,

                stageId: nextStage.id,

                status: "Pending",

            },

        });
    }

    async seedMissingWorkflows() {

        const projects =
            await this.prisma.project.findMany({

                include: {
                    workflows: true,
                },

            });

        for (const project of projects) {

            if (
                !project.workflows ||
                project.workflows.length === 0
            ) {
                const firstStage =
                    await this.prisma.workflowStage.findFirst({

                        where: {
                            order: 1,
                        },

                    });

                await this.prisma.workflow.create({

                    data: {

                        projectId: project.id,

                        stageId: firstStage!.id,

                        status: 'Pending',

                    },

                });

            }

        }

        return {
            message:
                'Workflow sync completed',
        };
    }
}