import { Router, Request, Response, NextFunction } from 'express'
import { authorizeRoles, authenticate } from '../middlewares/authMiddleware';
import { ROLE_TYPE } from '../utils/enums';

import { TrackingExerciseService } from '../services/tracking';
import { getUserId } from '../utils/jwt';
import { validateAddTrackingExercise, validateDeleteTrackingExercise, validateUpdateTrackingExercise } from '../middlewares/validationMiddleware';

const trackingExerciseService = new TrackingExerciseService();

const router = Router()



export default () => {
    router.get('/exercises/complete', authenticate, authorizeRoles(ROLE_TYPE.USER), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.getCompletedExercises(userId);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
        });

    router.get('/exercises/incomplete', authenticate, authorizeRoles(ROLE_TYPE.USER), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.getIncompleteExercises(userId);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
        });
  

    router.get('/exercises/list', authenticate, authorizeRoles(ROLE_TYPE.USER), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.getAllExercises(userId);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
    });

    router.post('/exercises/mark-complete', authenticate, authorizeRoles(ROLE_TYPE.USER),validateUpdateTrackingExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        //add validation for body
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.markExerciseComplete(userId, req.body.id);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
        });
    

     router.post('/exercises/mark-incomplete', authenticate, authorizeRoles(ROLE_TYPE.USER),validateUpdateTrackingExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.markExerciseIncomplete(userId, req.body.id);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
    });


    router.post('/exercises/create', authenticate, authorizeRoles(ROLE_TYPE.USER),validateAddTrackingExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.createExercise(userId, req.body);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
    });

     router.delete('/exercises/remove', authenticate, authorizeRoles(ROLE_TYPE.USER),validateDeleteTrackingExercise, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        const userId = getUserId(req.headers.authorization);
        try{
            result = await trackingExerciseService.removeExercise(userId, req.body.id);
        } catch (error) {
            res.status(400).json({ message: req.t('trackingExercisesFetchError') });
        }
        res.status(200).json({ data: result, message: req.t('trackingExercisesFetched') });
    });

    return router;
}   