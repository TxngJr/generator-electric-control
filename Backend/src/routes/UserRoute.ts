import { Router } from 'express';
import { registerUser, loginUser, logoutUser,forgotPassword } from '../controllers/UserController';
import { checkToken } from '../middlewares/tokenMiddleware'

const router: Router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', checkToken, logoutUser);
router.post('/forgot_password', forgotPassword);

export default router;