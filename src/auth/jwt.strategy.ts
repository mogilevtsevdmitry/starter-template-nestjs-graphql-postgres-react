import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from './constants';
import {AuthService} from "./auth.service";
import {JwtDto} from "./jwt-dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtDto) {
        const user = await this.authService.validateUser(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
