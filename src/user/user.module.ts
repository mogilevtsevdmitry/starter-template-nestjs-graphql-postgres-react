import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PubSub} from 'graphql-subscriptions'
import {User} from "./user.entity";
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, UserService],
    providers: [UserService, UserResolver,
        {
            provide: 'PUB_SUB',
            useValue: new PubSub(),
        },
    ]
})
export class UserModule {
}
