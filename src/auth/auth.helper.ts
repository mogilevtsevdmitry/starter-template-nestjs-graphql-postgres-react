import {compare, hash, genSaltSync} from "bcrypt";

export class AuthHelper {
    static validate(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword)
    }

    static hash(password: string): Promise<string> {
        const salt = genSaltSync(10)
        return hash(password, salt)
    }
}
