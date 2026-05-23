import { Module } from '@nestjs/common';
import { WorkflowModule } from 'src/workflow/workflow.module';
import { ProofController } from './proof.controller';
import { ProofService } from './proof.service';

@Module({
    imports: [WorkflowModule],
    controllers: [ProofController],
    providers: [ProofService],
})
export class ProofModule {}
