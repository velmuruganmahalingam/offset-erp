import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PaperModule } from './paper/paper.module';
import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';
import { PaperController } from './paper/paper.controller';
import { PaperService } from './paper/paper.service';
import { SmsService } from './sms/sms.service';
import { SmsController } from './sms/sms.controller';
import { SmsModule } from './sms/sms.module';
import { WorkflowService } from './workflow/workflow.service';
import { WorkflowController } from './workflow/workflow.controller';
import { WorkflowModule } from './workflow/workflow.module';
import { ProofService } from './proof/proof.service';
import { ProofController } from './proof/proof.controller';
import { ProofModule } from './proof/proof.module';
import { SetmakeService } from './setmake/setmake.service';
import { SetmakeController } from './setmake/setmake.controller';
import { SetmakeModule } from './setmake/setmake.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, PaperModule, ProjectModule, SmsModule, WorkflowModule, ProofModule, SetmakeModule],
  controllers: [AppController, ProjectController,PaperController, SmsController, WorkflowController, ProofController, SetmakeController],
  providers: [AppService, UserService, ProjectService,PaperService, SmsService, WorkflowService, ProofService, SetmakeService],
})
export class AppModule {}
