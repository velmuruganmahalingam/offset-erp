import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    async login(
        @Body() body:LoginDto,
        @Res({ passthrough: true}) res:Response
    ){
        const data = await this.authService.login(body);
        res.cookie('token',data.token,{
            httpOnly:true,
            secure:false,
            sameSite:'lax',
            maxAge:1000 * 60 * 60 * 24
        });

        return{
            message:data.message,
            user:data.user
        }
    }
}
