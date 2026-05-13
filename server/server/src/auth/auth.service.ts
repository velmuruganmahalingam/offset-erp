import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import passport from 'passport';

@Injectable()
export class AuthService {
    constructor(
        private prisma:PrismaService,
        private jwtService:JwtService
    ){}

    async login(data:LoginDto){
        const user = await this.prisma.user.findUnique({
            where:{
                username:data.username
            }
        })

        if(!user){
            throw new UnauthorizedException('Invalid Username')
        }

        if(user.password !== data.password){
            throw new UnauthorizedException('Invalid Password')
        }

        const token = await this.jwtService.signAsync({
            sub:user.id,
            username:user.username,
            sections:user.sections
        })

        return {
            message:'Login Successfull',

            token,

            user:{
                id:user.id,
                name:user.name,
                username:user.username,
                section:user.sections
            },
        }
    }
}
