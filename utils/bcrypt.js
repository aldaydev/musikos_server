import bcrypt from 'bcrypt';
import { LogError } from './errors/logErrors.js';


/**
   * Encrypts the password passed as a parameter.
   * @async
   * @param {string} password - Text plain Password to encrypt
   * @returns {Promise<string>} - Returns the encrypted password
   * @throws {Object} - If something goes wrong, throws an error
*/
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


/**
   * Compare password and hash passed as parameters.
   * @async
   * @param {string} password - Text plain Password to compare
   * @param {string} password - Text plain Hash to compare
   * @returns {Promise<boolean>} - Returns if comparison is ok or not
   * @throws {Object} - If something goes wrong, throws an error
*/
const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;

    } catch (error) {
        const errorDecrypting = new LogError({
            message: 'Error decrypting password',
            error: error.message
        }).add('errorDecrypting');
        throw {code: 'internalServerError', key: errorDecrypting};
    }
};

export {encryptPassword, comparePassword};