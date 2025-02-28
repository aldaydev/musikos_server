//Express Router import
import { Router } from 'express';

//Controllers import
import genericController from '../controllers/generic.controller.js';

//Middleware imports


//Router initialization
const router = Router();

//Endpoint for getting instruments list
router.get('/get-instruments',
    genericController.getInstruments //Final controller
);

export default router;