import { Router, Request, Response, NextFunction } from 'express'
import { authorizeRoles, authenticate } from '../middlewares/authMiddleware';
import { ROLE_TYPE } from '../utils/enums';
import { UserService } from '../services/user';
import { getUserId } from '../utils/jwt';

const userService = new UserService();


const router = Router()



export default () => {
    router.get('/me', authenticate, authorizeRoles(ROLE_TYPE.USER, ROLE_TYPE.ADMIN), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {
       
    const userId = getUserId(req.headers.authorization);
    const result = await userService.getMe(userId);
    res.json(result);
    });

    return router;
}