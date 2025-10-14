import { UserDbService } from "../db/services/userDbService";
//@ts-ignore
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

const HASH_SALT_ROUNDS = parseInt(process.env.HASH_SALT_ROUNDS) ;
export class AuthorizationService {
    // Implement authorization logic here

    async login(email: string, password: string): Promise<string> {
        // Validate user credentials and return a token
        //compare with hashed password in DB
        const user = await UserDbService.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid credentials");
        }
        const token = generateToken(user);
        return token;
    }

    async logout(token: string): Promise<void> {
        // Invalidate the token
    }

    async register(body: any): Promise<void> {
        // Register a new user
    }
}