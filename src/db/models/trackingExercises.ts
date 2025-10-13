import { Sequelize, DataTypes, Model } from 'sequelize'


import { models } from '.'
import user from './user'

export interface TrackingExerciseModel extends Model {
    id: number
    userID: number
    exerciseID: number
    validity: boolean
    durationSeconds: number
    completedAt: Date
}

export default (sequelize: Sequelize, modelName: string) => {
    const TrackingExerciseModelCtor = sequelize.define<TrackingExerciseModel>(
        modelName,
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
          /*  userID: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },*/
         /*   exerciseID: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },*/
            validity: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            durationSeconds: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            completedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        }, 
        {
            paranoid: true,
            timestamps: true,
            tableName: 'trackingExercises'
        }
    )

    TrackingExerciseModelCtor.associate = () => {
        TrackingExerciseModelCtor.belongsTo(models.User, {
            foreignKey: {
                name: 'userID',
                allowNull: false,
            }
        });

        TrackingExerciseModelCtor.belongsTo(models.Exercise, {
            foreignKey: {
                name: 'exerciseID',
                allowNull: false,
                
            }
        })
    }

    return TrackingExerciseModelCtor
}
