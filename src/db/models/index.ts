import fs from 'fs'
import { Sequelize } from 'sequelize'

import 'dotenv/config';

import defineExercise from './exercise'
import defineProgram from './program'
import defineRoleEnum from './roleEnum'
import defineUser from './user'

const sequelize: Sequelize = new Sequelize(process.env.DB_NAME || 'fitness_app', process.env.DB_USER , process.env.DB_PASSWORD , {
	host: process.env.HOST || 'localhost',
	port: parseInt(process.env.PORT) || 5432,
	logging: true,
	dialect: 'postgres',
	dialectOptions: {
		ssl: false
	}
})

sequelize.authenticate().catch((e: any) => console.error(`Unable to connect to the database${e}.`))

const Exercise = defineExercise(sequelize, 'exercise')
const Program = defineProgram(sequelize, 'program')
const RoleEnum = defineRoleEnum(sequelize, 'roleEnum')
const User = defineUser(sequelize, 'user')

const models = {
	Exercise,
	Program,
	RoleEnum,
	User
}
type Models = typeof models

// check if every model is imported
const modelsFiles = fs.readdirSync(__dirname)
// -1 because index.ts can not be counted
if (Object.keys(models).length !== (modelsFiles.length - 1)) {
	throw new Error('You probably forgot import database model!')
}

Object.values(models).forEach((value: any) => {
	if (value.associate) {
		value.associate(models)
	}
})

export { models, sequelize }
export type { Models }
