import { Sequelize, DataTypes, Model } from 'sequelize'

import roleEnum, { RoleEnumModel } from './roleEnum'

import { EXERCISE_DIFFICULTY } from '../../utils/enums'
import { models } from '.'

export interface UserModel extends Model {
    id: number
    name: String
    surname: String
    email: String
    password: String
    nickName: String
    birthDate: Date

   // role: RoleEnumModel
}

export default (sequelize: Sequelize, modelName: string) => {
    const UserModelCtor = sequelize.define<UserModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name:{
                type: DataTypes.STRING(200),
                allowNull: false
            },
            surname:{
                type: DataTypes.STRING(200),
                allowNull: false
            },
            email:{
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true
            },
            password:{
                type: DataTypes.STRING(200),
                allowNull: false
            },
            nickName:{
                type: DataTypes.STRING(200),
                allowNull: false,
                unique: true
            },
            birthDate:{
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            
            role:{
                type: DataTypes.STRING(20),
                allowNull: false,
            }
        }, 
        {
            paranoid: true,
            timestamps: true,
            tableName: 'user'
        }
    )

    UserModelCtor.associate = () => {
        UserModelCtor.belongsTo(models.RoleEnum, {
            foreignKey: {
                name: 'role',
                allowNull: false,
            },
            targetKey: 'enum',
        });

        UserModelCtor.hasMany(models.TrackingExercise, {
            foreignKey: {
                name: 'userID',
                allowNull: false,
            }
        })
    }

    return UserModelCtor
}
