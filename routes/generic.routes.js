//Express Router import
import { Router } from 'express';

//Controllers import
import genericController from '../controllers/generic.controller.js';

//Middleware imports


//Router initialization
const router = Router();

//Endpoint for getting instruments list
router.get('/instruments-and-styles',
    genericController.getInstrumentsAndStyles //Final controller
);

//Endpoint for getting regions
router.get('/regions',
    genericController.getRegions //Final controller
);

export default router;