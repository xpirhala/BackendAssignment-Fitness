import {ICreateUserInterface} from "../interfaces/userInterface"
import { UserDbService } from "../db/services/userDbService"
//@ts-ignore
import bcrypt from "bcrypt";
import { isAdmin } from "../utils/jwt";

const userDbService = new UserDbService();

export class UserService {
    // Implement user-related logic here
    async createUser(data: ICreateUserInterface): Promise<any> {
        // For purpose of this test, we will hash the password with salt rounds of 10        
        data.password = await bcrypt.hash(data.password, 10);
        const existingUser = await userDbService.createUser(data);
        

        return existingUser;
    }

    async getAllUsers(authHeader: string): Promise<any> {
        // Fetch and return all users from the database
        let users;
        if (isAdmin(authHeader)) {
            users = await userDbService.getAllUsers();
        } else {
            users = await userDbService.getAllUsersRestricted();
        }
        return {users: users};
    }

    async getUserById(id: number): Promise<any> {
        // Fetch and return a user by ID from the database
        const user = await userDbService.getUserById(id);
        return user;
    }

    async updateUser(id: number, data: any): Promise<any> {
        // Update an existing user in the database
        const result = await userDbService.updateUser(id, data);
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    }

    async deleteUser(id: number): Promise<any> {
        // Delete a user from the database
        const result = await userDbService.deleteUser(id);
        if (!result) {
            throw new Error('User not found or could not be deleted');
        }
        return result;
    }
}
