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

//EndPoint for creating a musician
router.post('/signup', 
    validationMiddleware.signUp, //Validation Middleware
    encryptMiddleware.generate, //Encrypting pass Middleware
    musiciansController.signUp //Final controller
);

//EndPoint for confirming musician account (email)
router.get('/signup-confirmation/:token', 
    musiciansController.signUpConfirmation
);

//EndPoint for confirming musician account (email)
router.post('/resend-confirmation', 
    musiciansController.resendConfirmation
);

//EndPoint for signingIn
router.post('/signin', 
    validationMiddleware.signIn, //Validation Middleware
    encryptMiddleware.compare, //Compare bcrypt middleware
    tokenMiddleware.generateAccessToken, //AccessToken middleware
    tokenMiddleware.generateRefreshToken, //RefreshToken middleware
    musiciansController.signIn //Final controller
);

//Endpoint for validateToken
router.post('/verify-token',
    musiciansController.verifyMusician
);


export default router;