import { Router, Request, Response, NextFunction } from 'express'
import { ExerciseService } from '../services/exercise'
import { ROLE_TYPE } from '../utils/enums';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware'
import { validateCreateExercise, validateDeleteExercise, validateUpdateExercise } from '../middlewares/validationMiddleware';


const exerciseService = new ExerciseService();

const router = Router()



export default () => {
	router.get('/', authenticate, authorizeRoles(ROLE_TYPE.ADMIN,ROLE_TYPE.USER),async (_req: Request, res: Response, _next: NextFunction): Promise<any> => {
		const result = await exerciseService.getAllExercises();
		res.json(result);
	})

	router.post('/create', authenticate, authorizeRoles(ROLE_TYPE.ADMIN), validateCreateExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Logic to add a new exercise
		let result;
		try {
		result = await exerciseService.createExercise(req.body);
		}catch (error) {
			res.status(400).json({ message: req.t('exercisesCreateError') });
		}

		res.status(201).json({ result: result, message: req.t('exercisesCreate') });
	})

	router.put('/update', authenticate, authorizeRoles(ROLE_TYPE.ADMIN), validateUpdateExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Logic to update an existing exercise
		let result;
		try {
			result = await exerciseService.updateExercise(parseInt(req.body.id), req.body);
		} catch (error) {
			res.status(400).json({ message: req.t('exercisesUpdateError') });
		}

		res.status(200).json({ result: result, message: req.t('exerciseUpdated') });
	})

	router.delete('/delete', authenticate, authorizeRoles(ROLE_TYPE.ADMIN),validateDeleteExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
		// Logic to delete an exercise
		let result;
		try {
			result = await exerciseService.deleteExercise(parseInt(req.body.id));
		} catch (error) {
			res.status(400).json({ message: req.t('exercisesDeleteError') });
		}

		res.status(200).json({ message: req.t('exerciseDeleted') });
	})


	return router
}
