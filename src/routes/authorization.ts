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
	router.post('/login', validateLogin,async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Login logic here
		const { email, password } = req.body;
		let token;
		try {
		token = await authorizationService.login(email, password);
		} catch (error) {
			return res.status(401).json({ message: req.t('invalidCredentials') });
		}

		res.status(200).json({ token, message: req.t('successfulLogin') });

	})

    router.post('/register', validateUser,async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Registration logic here
		let result;
		try {
		result = await userService.createUser(req.body);
		} catch (error) {
			return res.status(400).json({ message: req.t('userExists') });
		}
		res.status(201).json({ message: req.t('userCreated') });
	})

	return router
}
