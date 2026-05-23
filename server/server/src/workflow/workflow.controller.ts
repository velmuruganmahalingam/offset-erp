import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { AssignSystemDto } from 'src/dto/assignSystem.dto';

@Controller('workflow')
export class WorkflowController {
    constructor(private workFlowService: WorkflowService) { }

    @Post('seed')
    seedMissingWorkflows() {
        return this.workFlowService
            .seedMissingWorkflows();
    }

    @Get('system-assign')
    getSystemAssignQueue() {
        return this.workFlowService.getSystemAssignQueue()
    }

    @Patch('system-assign/:workflowId/assign')
    assignSystem(
        @Param('workflowId') workflowId: string,
        @Body() dto: AssignSystemDto,
    ) {
        console.log('workflow id =', workflowId);
        return this.workFlowService.assignSystem(Number(workflowId), dto)
    }

    @Patch(":id/next-stage")
    moveToNextStage(@Param('id') id: string) {
        return this.workFlowService.moveToNextStage(Number(id))
    }

}
