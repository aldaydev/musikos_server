//Express Router import
import { Router } from 'express';

//Routes import
import musiciansRoutes from './musicians.routes.js';
import legalsRoutes from './legals.routes.js';
import authRoutes from './auth.routes.js';
import searchRoutes from './search.routes.js';
import genericRoutes from './generic.routes.js';

//Router initialization
const router = Router();

// ---------- MONGO ROUTES ---------- //

router.use('/musikos/v1/legal', legalsRoutes);

// ---------- SQL ROUTES ---------- //

router.use('/musikos/v1/musicians', musiciansRoutes);

router.use('/musikos/v1/auth', authRoutes);

router.use('/musikos/v1/search', searchRoutes);

router.use('/musikos/v1/generic', genericRoutes);


export { router };