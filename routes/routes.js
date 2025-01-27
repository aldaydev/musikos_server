import { Router } from 'express';
import Musicians from '../controllers/musicians.controller.js';

const router = Router();

router.post('/bandbros/v1/musicians/signup', Musicians.create);

router.get('/bandbros/v1/musicians/signup-confirm/:token', Musicians.confirm);

export { router };