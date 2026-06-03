import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SetmakeService {
    constructor(private prisma: PrismaService) { }

    getSetMake() {
        return this.prisma.proofProcess.findMany({
            where: {
                status: "Approved"
            },
            include: {
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
        })
    }

    // updateSetMake(){
    //     return this.prisma.proofProcess.findUnique({
    //         where:{

    //         }
    //     })
    // }
}
