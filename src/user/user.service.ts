import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthHelper} from "../auth/auth.helper";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

    public async getAll(): Promise<User[]> {
        return await this.repo.find({order: {id: "ASC"}})
    }

    public async create(user: User): Promise<User> {
        const email = user.email.toLocaleLowerCase().trim()
        const password = await AuthHelper.hash(user.password)
        return await this.repo.save({...user, email, password})
    }

    public async getOne(id: string /*number*/): Promise<User> {
        return await this.repo.findOne(id)
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.repo.delete(id)
    }

    public async update(user: User): Promise<User> {
        await this.repo.update({email: user.email.toLocaleLowerCase().trim()}, {password: user.password})
        return user
    }

    public async find(email: string): Promise<User> {
        return this.repo.findOne({email: email.toLocaleLowerCase().trim()})
    }

}
