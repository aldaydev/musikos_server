//Express Router import
import { Router } from 'express';

//Controllers import
import legalController from '../controllers/legal.controller.js';

//Router initialization
const router = Router();

//EndPoint for getting terms and conds
router.get('/terms', legalController.getTerms);

//EndPoint for getting terms and conds
router.get('/privacy', legalController.getPrivacy);

export default router;