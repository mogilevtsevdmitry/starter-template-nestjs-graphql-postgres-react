import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {AuthService} from "./auth.service";
import {UserInput} from "../user/user.input";
import {User} from "../user/user.entity";
import {TokenDto} from "./token-dto";


@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {
    }

    @Mutation(() => TokenDto)
    async login(@Args('user') user: UserInput) {
        return await this.authService.login(user)
    }

    @Mutation(returns => User)
    async register(@Args('user') user: UserInput) {
        return await this.authService.register(user)
    }
}
