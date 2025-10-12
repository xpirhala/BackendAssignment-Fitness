import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

const router = Router()

import { ProgramService } from '../services/program'
const programService = new ProgramService();



export default () => {
	router.get('/', async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
		const result = await programService.getAllPrograms();
		res.json(result);
	})

	return router
}
