import bcrypt from 'bcrypt';

const encryptPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

export {encryptPassword, comparePassword};