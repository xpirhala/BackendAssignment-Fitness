import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

import { models } from '../db'

const router = Router()

const {
	Program
} = models

export default () => {
	router.post('/login', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		
	})

    router.post('/logout', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		
	})

    router.post('/register', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		
	})

	return router
}
