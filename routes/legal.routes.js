//Express Router import
import { Router } from 'express';

//Controllers import
import Legals from '../controllers/legal.controller.js';

//Router initialization
const router = Router();

//EndPoint for getting terms and conds
router.get('/terms', Legals.getTerms);

//EndPoint for getting terms and conds
router.get('/privacy', Legals.getPrivacy);

export default router;