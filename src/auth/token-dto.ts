import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class TokenDto {
    @Field()
    access_token: string
}
