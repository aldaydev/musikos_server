import bcrypt from 'bcrypt';
import { encryptPassword } from '../utils/bcrypt.js';
import logger from '../config/logger.config.js';

class Encrypt_MW {
    async generate(req, res, next) {
        try{
            req.body.password = await encryptPassword(req.body.password);
            logger.info('Password encrypted');
            return next();
        }catch(e){
            logger.error('Password could not be encrypted');
            return res.status(500).json({message: "No se ha podido encriptar la contraseña", error: e});
        }
    }
}

export default new Encrypt_MW;