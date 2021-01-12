import {Entity, Column} from 'typeorm';
import {Field, ObjectType} from "@nestjs/graphql";
import {BaseEntity} from "../base/base.entity";

@ObjectType()
@Entity({name: 'tbl_users'})
export class User extends BaseEntity {
    @Field({ nullable: false })
    @Column({ type: 'varchar', length: 300 }) email: string

    @Field({ nullable: false })
    @Column({ type: 'varchar', length: 100 }) password: string
}
