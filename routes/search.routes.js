//Express Router imports
import { Router } from 'express';

//Controllers imports
import searchController from '../controllers/search.controller.js';

//Middleware imports


//Router initialization
const router = Router();

//Endpoint to get all musicians
router.get('/', searchController.getAll);


export default router;