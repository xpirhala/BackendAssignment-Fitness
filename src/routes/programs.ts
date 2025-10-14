import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'
import { authenticate,authorizeRoles } from '../middlewares/authMiddleware'
const router = Router()

import { ProgramService } from '../services/program'
import { ROLE_TYPE } from '../utils/enums';

const programService = new ProgramService();



export default () => {
	router.get('/', authenticate, authorizeRoles(ROLE_TYPE.USER), async (req: Request, res: Response): Promise<any> => {
		const result = await programService.getAllPrograms();
		res.json(result);
	})

	return router
}
