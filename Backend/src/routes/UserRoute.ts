import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/UserController';
import { checkToken } from '../middlewares/tokenMiddleware'

const router: Router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', checkToken, logoutUser);

export default router;