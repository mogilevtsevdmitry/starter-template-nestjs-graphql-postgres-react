import {Module} from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PubSub} from "graphql-subscriptions";
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            // autoSchemaFile: true,    // расскомментировать для создания схему на лету в памяти (не создается локальнО)
            autoSchemaFile: 'schema.gql',
            sortSchema: true,
            installSubscriptionHandlers: true,
            definitions: {
                emitTypenameField: true,
            },
        }),
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: 'PUB_SUB',
            useValue: new PubSub(),
        },
    ],
})
export class AppModule {
}
