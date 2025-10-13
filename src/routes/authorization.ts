import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

import { models } from '../db/models'

import { validateUser, validateLogin } from '../middlewares/validationMiddleware'
import { AuthorizationService } from '../services/authorization'
import { UserService } from '../services/user'


const userService = new UserService();
const authorizationService = new AuthorizationService();

const router = Router()

const {
	Program
} = models

export default () => {
	router.post('/login', validateLogin,async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Login logic here
		const { email, password } = _req.body;
		const token = await authorizationService.login(email, password);
		res.status(200).json({ token });
		
	})

    router.post('/logout', async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		
	})

    router.post('/register', validateUser,async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Registration logic here
		const result = await userService.createUser(_req.body);
		res.status(201).json(result);
	})

	return router
}
