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

@Module({
  imports: [AuthModule, PrismaModule, AuthModule, UserModule, PaperModule, ProjectModule, SmsModule],
  controllers: [AppController, ProjectController,PaperController, SmsController],
  providers: [AppService, UserService, ProjectService,PaperService, SmsService],
})
export class AppModule {}
