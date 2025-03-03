//Express Router import
import { Router } from 'express';

//Controllers import
import genericController from '../controllers/generic.controller.js';

//Middleware imports


//Router initialization
const router = Router();

//Endpoint for getting instruments list
router.get('/search-data',
    genericController.getSearchData //Final controller
);

//Endpoint for getting regions
router.get('/provinces',
    genericController.getProvinces //Final controller
);

//Endpoint for getting region provinces
router.get('/towns',
    genericController.getTowns //Final controller
);

export default router;