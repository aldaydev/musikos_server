import bcrypt from 'bcrypt';

const encryptPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw {code: 'unexpected'};
    }
};

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw {code: 'unexpected'};
    }
};

export {encryptPassword, comparePassword};