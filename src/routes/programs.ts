import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'
import { authenticate } from '../middlewares/authMiddleware'
const router = Router()

import { ProgramService } from '../services/program'
const programService = new ProgramService();



export default () => {
	router.get('/', authenticate, async (req: Request, res: Response): Promise<any> => {
		const result = await programService.getAllPrograms();
		res.json(result);
	})

	return router
}
