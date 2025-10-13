import {ICreateUserInterface} from "../interfaces/userInterface"
import { UserDbService } from "../db/services/userDbService"
//@ts-ignore
import bcrypt from "bcrypt";

const userDbService = new UserDbService();

export class UserService {
    // Implement user-related logic here
    async createUser(data: ICreateUserInterface): Promise<any> {
        // For purpose of this test, we will hash the password with salt rounds of 10        
        data.password = await bcrypt.hash(data.password, 10);
        const existingUser = await userDbService.createUser(data);
        

        return existingUser;
    }
}
