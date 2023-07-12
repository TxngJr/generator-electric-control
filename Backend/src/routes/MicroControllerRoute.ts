import { Router } from 'express';
import { registerMicroController, getDataMicroController, putDataMicroController } from '../controllers/MicroController';
import { checkToken } from '../middlewares/tokenMiddleware';

const router: Router = Router();

router.post('/register', registerMicroController);
router.get('/get_data/:microControllerId', checkToken,getDataMicroController);
router.post('/put_data/:microControllerId', putDataMicroController);
// router.post('/get_code_reset_password', getCodeForResetPassword);
// router.post('/reset_password', ResetPassword);

export default router;