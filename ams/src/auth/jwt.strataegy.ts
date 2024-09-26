import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "jsonwebtoken";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload.exp || Date.now() >= payload.exp * 1000) {
            throw new UnauthorizedException('Token expired');
        }
        return {
            userid: payload.id,
            username: payload.username,
            role: payload.role
        }
    }
}