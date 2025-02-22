import { comparePassword, encryptPassword } from '../utils/bcrypt.js';

export default {
    generate: async (req, res, next) => {
        try{
            req.body.password = await encryptPassword(req.body.password);
            next();
        }catch(error){
            next(error)
        }
    },

    compare: async (req, res, next) => {
        try {
            //Get password and hash
            const { password } = req.body;
            const { hash } = req.user;

            //Call bcrypt compare function
            const isMatch = await comparePassword(password, hash);

            //If wrong password, throw an error
            if(!isMatch){
                throw {code: 'badRequest'};
            }else{
                next();
            }

        } catch (error) {
            next(error);
        }
    }
}