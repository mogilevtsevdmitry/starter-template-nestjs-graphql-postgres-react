import {Injectable, NotFoundException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";
import {JwtDto} from "./jwt-dto";
import {UserInput} from "../user/user.input";

const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private jwtService: JwtService) {
    }

    async login(user: User) {
        const candidate = await this.userService.find(user.email)
        if (!candidate) {
            throw new NotFoundException(`Пользователь с email ${user.email} не найден!`)
        }
        const isMath = bcrypt.compareSync(user.password, candidate.password)
        if (!isMath) {
            throw new Error('Пароли не совпадают!')
        }
        const payload: JwtDto = {email: candidate.email, userId: candidate.id}
        const token = `Bearer ${this.jwtService.sign(payload)}`
        return { access_token: token }
    }

    async validateUser(payload: JwtDto) {
        return this.userService.getOne(payload.userId)
    }

    async register(user: UserInput): Promise<User> {
        return this.userService.create(user)
    }
}
