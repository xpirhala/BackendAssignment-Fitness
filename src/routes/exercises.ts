import { Router, Request, Response, NextFunction } from 'express'
import { ExerciseService } from '../services/exercise'
const exerciseService = new ExerciseService();

const router = Router()



export default () => {
	router.get('/', async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
		const result = await exerciseService.getAllExercises();
		res.json(result);
	})

	return router
}
