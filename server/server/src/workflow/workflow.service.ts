import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkflowService {

    constructor(
        private prisma: PrismaService
    ) {}

    async getSystemAssignQueue() {

        return this.prisma.workflow.findMany({

            where: {
                stage: 'System Assign',
                status: 'Pending',
            },

            include: {
                project: true,
            },

            orderBy: {
                createdAt: 'desc',
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

                await this.prisma.workflow.create({

                    data: {

                        projectId: project.id,

                        stage: 'System Assign',

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