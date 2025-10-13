import { models } from '../models/index'

const { User } = models

class UserDbService {
    async getAllUsers(): Promise<any> {
        const users = await User.findAll();
        return users;
    }

    async getUserById(id: number): Promise<any> {
        const user = await User.findByPk(id);
        return user;
    }

    async createUser(data: any): Promise<any> {
        const newUser = await User.create(data);
        return newUser;
    }

    async updateUser(id: number, data: any): Promise<any> {
        const user = await User.findByPk(id);
        if (user) {
            Object.assign(user, data);
            await user.save();
            return user;
        }
        return null;
    }

    async deleteUser(id: number): Promise<boolean> {
        const deletedCount = await User.destroy({ where: { id } });
        return deletedCount > 0;
    }

    static async findByEmail(email: string): Promise<any> {
        const where = { email };
        const attributes = ['password']
        const user = await User.findOne({ where, attributes });
        return user;
    }
}

export { UserDbService }