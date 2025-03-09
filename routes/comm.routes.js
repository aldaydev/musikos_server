//Express Router import
import { Router } from 'express';

//Controllers import
import commController from '../controllers/comm.controller.js';

//Router initialization
const router = Router();

//EndPoint for getting user communications
router.get('/usercomm', commController.usercomm);


export default router;