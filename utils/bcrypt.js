import bcrypt from 'bcrypt';
import { LogError } from './errors/logErrors.js';

const encryptPassword = async (password) => {
    try {
        const saltRounds = parseInt(process.env.BCRYPT_SALTS);
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        const errorEncrypting = new LogError({
            message: 'Error encrypting password',
            error: error.message
        }).add('errorEncrypting');
        throw {code: 'internalServerError', key: errorEncrypting};
    }
};

const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        
        if(!isMatch){
            const wrongPassword = new LogError({
                message: 'Worng Password',
                error: 'Password doesn´t match with hash'
            }).add('wrongPassword');
            throw {code: 'badRequest', key: wrongPassword};
        }else{
            return true;
        }

    } catch (error) {
        const errorDecrypting = new LogError({
            message: 'Error decrypting password',
            error: error.message
        }).add('errorDecrypting');
        throw {code: 'internalServerError', key: errorDecrypting};
    }
};

export {encryptPassword, comparePassword};