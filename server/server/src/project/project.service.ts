import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/dto/create-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {

    constructor(private prisma:PrismaService){}
    
    async create(dto:CreateProjectDto){
        return this.prisma.project.create(
            {
                data:dto
            }
        )       
    }

    async findAll(){
        return this.prisma.project.findMany({
            orderBy:{
                createdAt:'desc'
            }
        })
    }
}
