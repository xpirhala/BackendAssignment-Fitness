import { Sequelize, DataTypes, Model } from 'sequelize'
import { ProgramModel } from './program'

import { UserModel } from './user'

import { EXERCISE_DIFFICULTY } from '../../utils/enums'

export interface RoleEnumModel extends Model {
    id: number
    enum: String
    description: String
}

export default (sequelize: Sequelize, modelName: string) => {
    const RoleEnumModelCtor = sequelize.define<RoleEnumModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            enum: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            description: {
                type: DataTypes.STRING(200),
            }
        }, 
        {
            paranoid: true,
            timestamps: true,
            tableName: 'roleEnums'
        }
    )

    RoleEnumModelCtor.associate = (models) => {
        RoleEnumModelCtor.hasMany(models.User, {
            foreignKey: {
                name: 'role',
                allowNull: false,
            },
            sourceKey: 'enum'
        })
    }

    return RoleEnumModelCtor
}
