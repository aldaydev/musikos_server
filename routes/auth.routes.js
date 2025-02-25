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

// ---------- SIGNUP PROCESS ---------- //

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

// ---------- SIGNIN PROCESS ---------- //

//EndPoint for signingIn
router.post('/signin', 
    validationMiddleware.signIn, //Validation Middleware
    encryptMiddleware.compare, //Compare bcrypt middleware
    tokenMiddleware.generateAccessToken, //Generate AccessToken middleware
    tokenMiddleware.generateRefreshToken, //Generate RefreshToken middleware
    authController.signIn //Final controller
);

//Endpoint for verifying accessToken
router.get('/verify-access-token',
    tokenMiddleware.verifyAccessToken, //Verifying AccessToken middleware
    authController.verifyAccessToken //Final controller
);

// ---------- REFRESH TOKEN PROCESS ---------- //

//Endpoint for generating new accessToken
router.get('/new-access-token',
    tokenMiddleware.verifyRefreshToken, //Verifying RefreshToken middleware
    tokenMiddleware.generateAccessToken, //Gnerate AccessToken middleware
    authController.newAccessToken //Final controller
);

// ---------- CLOSING SESSION PROCESS ---------- //

//Endpoint for clearing token cookies
router.delete('/clear-cookies',
    authController.clearCookies
);

// ---------- PASSWORD RECOVERING PROCESS ---------- //

//Endpoint for sending password recover email
router.post('/password-recover-email',
    validationMiddleware.passwordRecoverEmail, //Validation for passwordRecover middleware
    authController.passwordRecoverEmail //Final controller
);

//Endpoint for confirming password recover
router.get('/confirm-password-recover',
    authController.confirmPasswordRecover
);

//Endpoint for setting up a new password
router.patch('/password-recover',
    encryptMiddleware.generate, //Encrypting pass Middleware
    tokenMiddleware.verifyRecoverPassToken, //Verifying 
    authController.recoverPassword //Final controller
);

export default router;