import { Router, Request, Response, NextFunction } from 'express'
import { ExerciseService } from '../services/exercise'
import { ROLE_TYPE } from '../utils/enums';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware'
import { validateCreateExercise, validateDeleteExercise, validateUpdateExercise } from '../middlewares/validationMiddleware';


const exerciseService = new ExerciseService();

const router = Router()



export default () => {
	router.get('/', authenticate, authorizeRoles(ROLE_TYPE.ADMIN,ROLE_TYPE.USER),async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
		const result = await exerciseService.getAllExercises();
		res.json(result);
	})

	router.post('/create', authenticate, authorizeRoles(ROLE_TYPE.ADMIN), validateCreateExercise, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
		// Logic to add a new exercise
		const result = await exerciseService.createExercise(req.body);
		res.status(201).json({ message: 'Exercise created' });
	})

	router.put('/update', authenticate, authorizeRoles(ROLE_TYPE.ADMIN), validateUpdateExercise, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
		// Logic to update an existing exercise
		const result = await exerciseService.updateExercise(parseInt(req.body.id), req.body);
		res.json({ message: 'Exercise updated' });
	})

	router.delete('/delete', authenticate, authorizeRoles(ROLE_TYPE.ADMIN),validateDeleteExercise, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
		// Logic to delete an exercise
		const result = await exerciseService.deleteExercise(parseInt(req.body.id));
		if (!result) {
			res.status(404).json({ message: 'Exercise not found' });
			return;
		}
		res.json({ message: 'Exercise deleted' });
	})


	return router
}
