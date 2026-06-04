import { Controller, Get, Param, Patch } from '@nestjs/common';
import { SetmakeService } from './setmake.service';

@Controller('setmake')
export class SetmakeController {
    constructor(private setmakeService:SetmakeService){}

    @Get('merge')
    async getSetMake(){
        return this.setmakeService.getSetMake();
    }

    @Patch(':id/set-make')
    async updateSetMake(@Param("id") id:string){
        return this.setmakeService.updateSetMake(Number(id));
    }
}
