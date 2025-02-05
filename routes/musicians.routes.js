//Express Router import
import { Router } from 'express';

//Controllers import
import Musicians from '../controllers/musicians.controller.js';

//Middleware imports
import Validation_MW from '../middlewares/validate.middlewares.js';
import Encrypt_MW from '../middlewares/encrypt.middelwares.js';

//Router initialization
const router = Router();

//EndPoint for creating a musician
router.post('/signup', 
    Validation_MW.signUp, //Validations Middleware
    Encrypt_MW.generate, //Encrypting pass Middleware
    Musicians.signUp //Final controller
);

//EndPoint for confirming musician account (email)
router.get('/signup-confirm/:token', 
    Musicians.confirmSignUp
);

//EndPoint for signingIn
router.post('/signin', 
    Musicians.signIn
);

//Endpoint to check if a user already exists
router.post('/check-user',
    Musicians.checkUser
);

//Endpoint to check if a username already exists
router.post('/check-username',
    Musicians.checkUsername
);

//Endpoint to check if a email already exists
router.post('/check-email',
    Musicians.checkEmail
);

export default router;