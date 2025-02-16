import { encryptPassword } from '../utils/bcrypt.js';
import logger from '../config/logger.config.js';

export default {
    generate: async (req, res, next) => {
        try{
            req.body.password = await encryptPassword(req.body.password);
            next();
        }catch(error){
            next(error)
        }
    }
}