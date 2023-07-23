import { Router } from 'express';
import { registerMicroController, getListMicroController, getDataMicroController, putDataMicroController } from '../controllers/MicroController';
import { checkToken } from '../middlewares/tokenMiddleware';

const router: Router = Router();

router.post('/register', registerMicroController);
router.get('/gets_list', checkToken, getListMicroController);
router.get('/get_data/:microControllerId', checkToken, getDataMicroController);
router.post('/put_data/:microControllerId', putDataMicroController);

export default router;