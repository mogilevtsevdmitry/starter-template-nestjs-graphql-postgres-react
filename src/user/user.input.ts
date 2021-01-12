import { InputType, Field } from '@nestjs/graphql';
import {BaseEntity} from "../base/base.entity";

@InputType()
export class UserInput extends BaseEntity {
    @Field({nullable: false})
    email: string

    @Field({nullable: false})
    password: string
}
