import { Router, Request, Response, NextFunction } from 'express'
import { authorizeRoles, authenticate } from '../middlewares/authMiddleware';
import { ROLE_TYPE } from '../utils/enums';
import { UserService } from '../services/user';
import { validateUpdateUser } from '../middlewares/validationMiddleware';
import { get } from 'http';
import { getUserId } from '../utils/jwt';
const userService = new UserService();


const router = Router()



export default () => {
    router.get('/', authenticate, authorizeRoles(ROLE_TYPE.USER, ROLE_TYPE.ADMIN), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
       const result = await userService.getAllUsers(req.headers.authorization);
       
       res.json(result);


    });

    router.get('/:id', authenticate, authorizeRoles(ROLE_TYPE.USER, ROLE_TYPE.ADMIN), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        const askedUserId = parseInt(req.params.id);
        const userId = getUserId(req.headers.authorization);
        let result;
        try {
            result = await userService.getUserById(userId, askedUserId, req.headers.authorization);
        } catch (error) {
            res.status(404).json({ message: req.t('userNotFound') });
        }
        res.json({ data: result });
    });

    router.put('/update/:id', authenticate, authorizeRoles(ROLE_TYPE.ADMIN),validateUpdateUser, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        let result;
        try {
            result = await userService.updateUser(parseInt(req.params.id), req.body);
        } catch (error) {
            res.status(400).json({ message: req.t('userUpdateError') });
        }

        if (!result) {
            res.status(404).json({ message: req.t('userNotFoundOrNoChanges') });
        }
        res.json({ result: result, message: req.t('userUpdated') });
    }
    );

    return router;
}