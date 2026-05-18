import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaperService {
    constructor(private prisma:PrismaService){}

    async getSizes(){
        return this.prisma.paperSize.findMany({
            orderBy:{
                id:'asc',
            },
            select:{
                id:true,
                name:true
            }
        })
    }

    async getOptionBySize(sizeId:number){
        return this.prisma.paperOption.findMany({
            where:{
                sizeId:sizeId
            },
            include:{
                gsm:true,
                paperType:true,
            },
            orderBy:{
                gsm:{
                    value:'asc'
                }
            }
        })
    }
}
