import { Controller,Get } from '@nestjs/common';
import { PaperService } from './paper.service';

@Controller('paper')
export class PaperController {
    constructor(private paperService:PaperService){}

    @Get()
    findAll(){
        return this.paperService.getAllPapersWithSize()
    }
}
