import { Router, Request, Response, NextFunction } from 'express'
import { authorizeRoles, authenticate } from '../middlewares/authMiddleware';
import { ROLE_TYPE } from '../utils/enums';



const router = Router()



export default () => {
    router.get('/exercises/complete', authenticate, authorizeRoles(ROLE_TYPE.USER, ROLE_TYPE.ADMIN), async (req: Request, res: Response, _next: NextFunction): Promise<any> => {

    });

    return router;
}   