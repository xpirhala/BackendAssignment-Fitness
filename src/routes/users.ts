import { Router, Request, Response, NextFunction } from 'express'
import { authorizeRoles, authenticate } from '../middlewares/authMiddleware';
import { ROLE_TYPE } from '../utils/enums';
import { UserService } from '../services/user';
import { validateUpdateUser } from '../middlewares/validationMiddleware';

const userService = new UserService();


const router = Router()



export default () => {
    router.get('/', authenticate, authorizeRoles(ROLE_TYPE.USER, ROLE_TYPE.ADMIN), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
       const result = await userService.getAllUsers(req.headers.authorization);
       
       res.json(result);


    });

    router.get('/:id', authenticate, authorizeRoles(ROLE_TYPE.USER, ROLE_TYPE.ADMIN), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        const userId = parseInt(req.params.id);
        const result = await userService.getUserById(userId);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(result);
    });

    router.put('/update/:id', authenticate, authorizeRoles(ROLE_TYPE.ADMIN),validateUpdateUser, async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
        const result = await userService.updateUser(parseInt(req.params.id), req.body);
        if (!result) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.json(result);
    });

    return router;
}