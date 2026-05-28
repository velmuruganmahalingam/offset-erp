import { Controller, Get } from '@nestjs/common';
import { SetmakeService } from './setmake.service';

@Controller('setmake')
export class SetmakeController {
    constructor(private setmakeService:SetmakeService){}

    @Get('merge')
    async getSetMake(){
        return this.setmakeService.getSetMake()
    }
}
