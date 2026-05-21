import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {

    constructor(
        private prisma: PrismaService
    ) { }

    async create(dto: CreateProjectDto) {

        const project =
            await this.prisma.project.create({
                data: dto
            });

        await this.prisma.workflow.createMany({
            data: [
                {
                    projectId: project.id,

                    stage: 'Project',

                    status: 'Completed',
                },

                {
                    projectId: project.id,

                    stage: 'System Assign',

                    status: 'Pending',
                }
            ]
        });

        return project;
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