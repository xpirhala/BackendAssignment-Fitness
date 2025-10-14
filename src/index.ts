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
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import { languages } from './utils/enums'
import { lookup } from 'dns'

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',            // Default language
    preload: languages,        // Supported languages
    supportedLngs: languages, // Supported languages
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',  // Path to translations
    },
    detection: {
      order: ['querystring', 'header', 'cookie'],
      lookupQuerystring: 'lang',   // e.g. ?lang=sk
      lookupHeader: 'language', // e.g. language: sk
    },
  });

app.use(middleware.handle(i18next));

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
