//Express Router import
import { Router } from 'express';

//Controllers import
import musiciansController from '../controllers/musicians.controller.js';

//Middleware imports
import validationMiddleware from '../middlewares/validation.middleware.js';
import encryptMiddleware from '../middlewares/encrypt.middelware.js';
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




export default router;