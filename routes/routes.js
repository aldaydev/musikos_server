import { Router } from 'express';
import Musicians from '../controllers/musicians.controller.js';

const router = Router();

router.post(`/bandbros/v1/musicians/create`, Musicians.create);

export { router };