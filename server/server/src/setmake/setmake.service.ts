import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SetmakeService {
    constructor(private prisma: PrismaService) { }

    getSetMake() {
        return this.prisma.setMake.findMany({
            where: {
                status: "Pending"
            },
            include: {
                proofprocess:{
                    include:{
                        workflow: {
                            include: {
                                project: {
                                    select: {
                                        ofNo: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }


    async updateSetMake(id:number){
        const setMake = await this.prisma.setMake.findUnique({
            where:{
                id
            }
        })

        if (!setMake){ throw new Error("Id not found")}

        return this.prisma.setMake.update({
            where:{
                id,
            },
            data:{
                status:'Make-Set'
            }
        })
        
    }

    async getJobList(){
       return this.prisma.setMake.findMany({
            where:{
                status:"Make-Set"
            },
            include: {
                proofprocess:{
                    include:{
                        workflow: {
                            include: {
                                project: {
                                    select: {
                                        ofNo: true,
                                        customerName:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
}
