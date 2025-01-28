import { Router } from 'express';
import Musicians from '../controllers/musicians.controller.js';

const router = Router();

//EndPoint for creating a musician
router.post('/bandbros/v1/musicians/signup', Musicians.signUp);

//EndPoint for confirming musician account (email)
router.get('/bandbros/v1/musicians/signup-confirm/:token', Musicians.confirmSignUp);

export { router };