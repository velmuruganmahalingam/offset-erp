import { Body, Controller, UseGuards, Post, Get } from '@nestjs/common';
import { JwtGuard } from 'src/auth/gaurds/jwt.guard';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/dto/create-project.dto';

@Controller('project')
@UseGuards(JwtGuard)
export class ProjectController {
    constructor(private projectService:ProjectService){}

    @Post()
    create(@Body()body:CreateProjectDto){
        return this.projectService.create(body);
    }

    @Get()
    findAll(){
        return this.projectService.findAll()
    }
}
