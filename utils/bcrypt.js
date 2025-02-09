import bcrypt from 'bcrypt';
import errors from './errors.js';

const encryptPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw errors.validation;
    }
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export {encryptPassword, comparePassword};