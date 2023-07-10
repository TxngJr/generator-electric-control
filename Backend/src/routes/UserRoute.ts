import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getCodeForResetPassword, ResetPassword } from '../controllers/UserController';
import { checkToken } from '../middlewares/tokenMiddleware'

const router: Router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', checkToken, logoutUser);
router.post('/get_code_reset_password', getCodeForResetPassword);
router.post('/reset_password', ResetPassword);

export default router;