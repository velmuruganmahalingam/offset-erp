import { Controller, Get, Post } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

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
}
