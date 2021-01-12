import {Args, ID, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {Inject, UseGuards} from "@nestjs/common";
import {PubSubEngine} from 'graphql-subscriptions'
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {UserInput} from "./user.input";
import {GqlAuthGuard} from "../auth/gql-auth.guard";

const SUB_USER_ADD = 'subAddNewUser'

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService,
                @Inject('PUB_SUB') private pubSub: PubSubEngine) {
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => [User])
    async allUsers() {
        return this.userService.getAll()
    }

    @UseGuards(GqlAuthGuard)
    @Query(returns => User)
    async getUserById(@Args('id', {type: () => ID}) id: string /*number*/) {
        return this.userService.getOne(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => User)
    async createUser(@Args('user') user: UserInput) {
        const newUser = this.userService.create(user)
        await this.pubSub.publish(SUB_USER_ADD, {[SUB_USER_ADD]: newUser})
        return newUser
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => User)
    async deleteUser(@Args('id', {type: () => ID}) id: number) {
        return this.userService.delete(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(returns => User)
    async updateUser(@Args('user') user: UserInput) {
        return this.userService.update(user)
    }

    @Subscription(returns => User)
    subAddNewUser() {
        return this.pubSub.asyncIterator(SUB_USER_ADD)
    }
}
