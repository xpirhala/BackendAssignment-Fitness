import { models } from '../models/index'

const { User } = models

class UserDbService {
    async getAllUsers(): Promise<any> {
        const exclude = ['password'];
        const users = await User.findAll({ attributes: { exclude } });
        return users;
    }

    async getUserById(id: number): Promise<any> {
        const exclude = ['password'];
        const user = await User.findByPk(id, { attributes: { exclude } });
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
        return user;
    }

    async deleteUser(id: number): Promise<boolean> {
        const deletedCount = await User.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async getAllUsersRestricted(): Promise<any> {
        const exclude = ['name', 'surname', 'password', 'email', 'createdAt', 'updatedAt', 'deletedAt', 'role', 'birthDate'];
        const users = await User.findAll({ attributes: { exclude } });
        return users;
    }

    static async findByEmail(email: string): Promise<any> {
        const where = { email };
        const user = await User.findOne({ where });
        return user;
    }
}

export { UserDbService }