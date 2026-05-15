import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async login(data: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: data.username
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid Username')
        }

        const isPasswordValid =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!isPasswordValid) {
            throw new UnauthorizedException(
                'Invalid Password'
            );
        }

        const token = await this.jwtService.sign({
            sub: user.id,
            username: user.username,
            sections: user.sections
        })

        return {
            message: 'Login Successfull',

            token,

            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                section: user.sections
            },
        }
    }
}
