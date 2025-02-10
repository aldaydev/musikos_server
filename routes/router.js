//Express Router import
import { Router } from 'express';

//Routes import
import musiciansRouter from './musicians.routes.js';
import legalRouter from './legal.routes.js';

//Router initialization
const router = Router();

// ---------- MONGO ROUTES ---------- //

router.use('/musiko/v1/legal', legalRouter);

// ---------- SQL ROUTES ---------- //

router.use('/musiko/v1/musicians', musiciansRouter);


export { router };