import http from 'http'
import express from 'express'

import { sequelize } from './db/models'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import AuthorizationRouter from './routes/authorization'
import UserRouter from './routes/users'
import ProfileRouter from './routes/profile'
/*import TrackingRouter from './routes/tracking'*/

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/programs', ProgramRouter())
app.use('/exercises', ExerciseRouter())
app.use('/auth', AuthorizationRouter())
app.use('/users', UserRouter())
app.use('/profile', ProfileRouter())
/*app.use('/tracking', TrackingRouter())*/

const httpServer = http.createServer(app)

try {
    sequelize.sync()
} catch (error) {
    console.log('Sequelize sync error')
}

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
