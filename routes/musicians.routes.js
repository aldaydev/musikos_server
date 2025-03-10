//Express Router import
import { Router } from 'express';

//Controllers import
import musiciansController from '../controllers/musicians.controller.js';

//Middleware imports
import validationMiddleware from '../middlewares/validation.middleware.js';
import encryptMiddleware from '../middlewares/encrypt.middleware.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

//Router initialization
const router = Router();

//Endpoint to check if a email already exists
router.post('/check-email',
    musiciansController.checkEmail
);

//Endpoint to check if a username already exists
router.post('/check-username',
    musiciansController.checkUsername
);

//Endpoint to search musicians
router.get('/', musiciansController.getAll);

//Endpoint to filter musicians
router.get('/filter', musiciansController.filter);

//Endpoint to filter musicians
router.get('/restricted-data',
    tokenMiddleware.verifyAccessToken,
    musiciansController.getRestrictedData
);

//Endpoint to get musician public profile
router.get('/:username',
    musiciansController.getPublicData
);

//Endpoint to change email
router.patch('/update',
    musiciansController.updateValue
);

export default router;