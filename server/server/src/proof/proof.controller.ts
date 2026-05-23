import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ProofService } from './proof.service';
import { FinalApproveDto, ProofUpdateDto } from 'src/dto/proof.dto';

@Controller('proof')
export class ProofController {
    constructor(private proofService: ProofService) { }

    @Get("queue")
    getProofQueue() {
        return this.proofService.getProofQueue();
    }

    @Get(':workflowId')
    getProofById(
        @Param('workflowId') workflowId:string
    ){
        return this.proofService.getProofById(Number(workflowId))
    }

    @Get("approval-queue")
    getApprovalQueue() {
        return this.proofService.getApprovalQueue();
    }

    @Patch(":id/send-for-approval")
    sendForApproval(
        @Param("id") id: string
    ) {
        return this.proofService.sendForApproval(
            Number(id)
        );
    }

    @Patch(":id/correction")
    updateCorrection(
        @Param("id") id: string,
        @Body() dto: ProofUpdateDto,
    ) {
        return this.proofService.updateCorrection(
            Number(id),
            dto,
        );
    }

    @Patch(":id/final-approve")
    finalApprove(
        @Param("id") id: string,
        @Body() dto: FinalApproveDto,
    ) {
        return this.proofService.finalApprove(
            Number(id),
            dto,
        );
    }
}
