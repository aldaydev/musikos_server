import bcrypt from 'bcrypt';
import { LogError } from './errors/logErrors.js';

const encryptPassword = async (password) => {
    try {
        const saltRounds = 10;
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
            console.log('La contraseña no coincide')
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