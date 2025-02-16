//Express Router import
import { Router } from 'express';

//Routes import
import musiciansRouter from './musicians.routes.js';
import legalsRoutes from './legals.routes.js';

//Router initialization
const router = Router();

// ---------- MONGO ROUTES ---------- //

router.use('/musikos/v1/legal', legalsRoutes);

// ---------- SQL ROUTES ---------- //

router.use('/musikos/v1/musicians', musiciansRouter);


export { router };