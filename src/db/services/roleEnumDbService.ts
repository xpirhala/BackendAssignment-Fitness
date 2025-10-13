import { models } from '../models/index'

const { RoleEnum } = models

class RoleEnumDbService {

    async getAllRoles(): Promise<any> {
        const roles = await RoleEnum.findAll();
        return roles;
    }

    async getRoleById(id: number): Promise<any> {
        const role = await RoleEnum.findByPk(id);
        return role;
    }

    async createRole(enumValue: string, description: string): Promise<any> {
        const newRole = await RoleEnum.create({ enum: enumValue, description });
        return newRole;
    }

    async updateRole(id: number, enumValue: string, description: string): Promise<any> {
        const role = await RoleEnum.findByPk(id);
        if (role) {
            role.enum = enumValue;
            role.description = description;
            await role.save();
            return role;
        }
        return null;
    }

    async deleteRole(id: number): Promise<boolean> {
        const deletedCount = await RoleEnum.destroy({ where: { id } });
        return deletedCount > 0;
    }

    async deleteRoleByEnum(enumValue: string): Promise<boolean> {
        const deletedCount = await RoleEnum.destroy({ where: { enum: enumValue } });
        return deletedCount > 0;
    }
}

export { RoleEnumDbService }

