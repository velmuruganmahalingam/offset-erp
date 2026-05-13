import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (req)=>{
                    return req?.cookie?.token
                },
            ]),
            ignoreExpiration:false,
            secretOrKey:'SUPER_SECRET_KEY',
        })
    }

    async validate(payload:any){
        return payload;
    }
}