import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid') id: string
    /*
    * Поменяйте колонку уникального ID на закомментируванную строку ниже для создания числового типа
    * Также внести правки в следующих файлах:
    * auth.service.ts
    * jwt-dto.ts
    * user.resolver.ts
    * */
//    @PrimaryGeneratedColumn() id: number

    @Field({ nullable: false })
    @Column({ type: 'boolean', default: true }) isActive?: boolean

    @Field({ nullable: false })
    @Column({ type: 'boolean', default: false }) isArchived?: boolean

    @Field({ nullable: false })
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createDateTime?: Date

    @Field({ nullable: false })
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) lastChangedDateTime?: Date

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 300, nullable: true  }) createdBy?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 300, nullable: true  }) lastChangedBy?: string

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 300, nullable: true }) internalComment?: string | null
}
