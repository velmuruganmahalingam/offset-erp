import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService implements OnModuleInit {

    constructor(
        private prisma: PrismaService
    ) { }

    async onModuleInit() {
        await this.prisma.workflowStage.createMany({
            data: [
                { name: "System Assign", order: 1 },
                { name: "Proof", order: 2 },
                { name: "Master Make", order: 3 },
                { name: "Set Make", order: 4 },
                { name: "Plate Making", order: 5 },
                { name: "Printing", order: 6 },
                { name: "Lamination", order: 7 },
                { name: "Special Effect", order: 8 },
                { name: "Final Cutting", order: 9 },
                { name: "greasing", order: 10 },
                { name: "pasting", order: 11 },
                { name: "Dispatch", order: 12 },
            ],
            skipDuplicates: true
        });
    }
    async create(dto: CreateProjectDto) {

        return this.prisma.$transaction(async (tx) => {
            // 1. create project
            const project = await tx.project.create({
                data: dto,
            });
            
              const stages = await tx.workflowStage.findMany({
                    where:{
                        isActive:true,
                    },
                    orderBy:{
                        order:'asc'
                    }
                });

            // 2. create workflow pipeline
            await tx.workflow.createMany({
                data: stages.map((stage, idx) => ({
                    projectId: project.id,
                    stageId: stage.id,
                    status: idx === 0 ? "Pending" : "Waiting",
                }))
            });

            return project;
        });
    }

    async findAll() {
        return this.prisma.project.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    async getProjectById(id: number) {
        return this.prisma.project.findUnique({
            where: { id },
        })
    }

    async updateProject(id: number, data: any) {
        return this.prisma.project.update({
            where: {
                id
            },
            data,
        })
    }
}