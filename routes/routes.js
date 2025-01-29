//Express Router import
import { Router } from 'express';

//Controllers import
import Musicians from '../controllers/musicians.controller.js';
import Legals from '../controllers/legal.controller.js';

//Middleware imports
import Validation_MW from '../middelwares/validate.middlewares.js';
import Encrypt_MW from '../middelwares/encrypt.middelwares.js';

//Router initialization
const router = Router();

//-------- SQL ROUTES -------- //

//EndPoint for creating a musician
router.post('/bandbros/v1/musicians/signup', 
    Validation_MW.initial, //Basic Validations Middleware
    Validation_MW.existsAndTerms, //Exists Validations Middleware
    Encrypt_MW.generate, //Encrypting pass Middleware
    Musicians.signUp //Final controller
);

//EndPoint for confirming musician account (email)
router.get('/bandbros/v1/musicians/signup-confirm/:token', 
    Musicians.confirmSignUp
);

//EndPoint for signingIn
router.post('/bandbros/v1/musicians/signin', 
    Musicians.signIn
);

//-------- MONGO ROUTES -------- //

//EndPoint for getting terms and conds
router.get('/bandbros/v1/legal/terms', Legals.getTerms);

//EndPoint for getting terms and conds
router.get('/bandbros/v1/legal/privacy', Legals.getPrivacy);

export { router };