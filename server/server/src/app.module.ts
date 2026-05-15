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

@Module({
  imports: [AuthModule, PrismaModule, AuthModule, UserModule, PaperModule, ProjectModule],
  controllers: [AppController, ProjectController],
  providers: [AppService, UserService, ProjectService],
})
export class AppModule {}
