//Express Router import
import { Router } from 'express';

//Controllers import
import musiciansController from '../controllers/musicians.controller.js';
import authController from '../controllers/auth.controller.js';

//Middleware imports
import validationMiddleware from '../middlewares/validation.middleware.js';
import encryptMiddleware from '../middlewares/encrypt.middelware.js';
import tokenMiddleware from '../middlewares/token.middleware.js';

//Router initialization
const router = Router();

//EndPoint for creating a musician
router.post('/signup', 
    validationMiddleware.signUp, //Validation Middleware
    encryptMiddleware.generate, //Encrypting pass Middleware
    authController.signUp //Final controller
);

//EndPoint for confirming musician account (email)
router.get('/signup-confirmation/:token', 
    authController.signUpConfirmation
);

//EndPoint for confirming musician account (email)
router.post('/resend-confirmation', 
    authController.resendConfirmation
);

//EndPoint for signingIn
router.post('/signin', 
    validationMiddleware.signIn, //Validation Middleware
    encryptMiddleware.compare, //Compare bcrypt middleware
    tokenMiddleware.generateAccessToken, //AccessToken middleware
    tokenMiddleware.generateRefreshToken, //RefreshToken middleware
    authController.signIn //Final controller
);

//Endpoint for verifying accessToken
router.post('/verify-access-token',
    tokenMiddleware.verifyAccessToken,
    authController.verifyAccessToken
);

//Endpoint for generating new accessToken
router.post('/new-access-token',
    tokenMiddleware.verifyRefreshToken,
    tokenMiddleware.generateAccessToken,
    authController.newAccessToken
);

//Endpoint for clearing token cookies
router.post('/clear-cookies',
    authController.clearCookies
);


export default router;