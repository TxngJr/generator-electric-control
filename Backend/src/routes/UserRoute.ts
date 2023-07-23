import { Router } from 'express';
import { registerUser, loginUser, logoutUser, getCodeForResetPassword,checkCodeForResetPassword, resetPassword } from '../controllers/UserController';
import { checkToken } from '../middlewares/tokenMiddleware'

const router: Router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', checkToken, logoutUser);
router.post('/get_code_reset_password', getCodeForResetPassword);
router.post('/check_code_reset_password', checkCodeForResetPassword);
router.post('/reset_password', resetPassword);

export default router;