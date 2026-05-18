import { Controller, Get, Param } from '@nestjs/common';
import { PaperService } from './paper.service';

@Controller('paper')
export class PaperController {
    constructor(private paperService:PaperService){}

    @Get()
    findAllSizes(){
        return this.paperService.getSizes()
    }

    @Get('option/:sizeId')
    findOption(@Param('sizeId') sizeId:string){
        return this.paperService.getOptionBySize(Number(sizeId))
    }
}
