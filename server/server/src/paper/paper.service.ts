import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaperService {
    constructor(private prisma:PrismaService){}

    async getAllPapersWithSize(){
        return this.prisma.paperSize.findMany({
            orderBy:{
                id:'asc',
            }
        })
    }
}
