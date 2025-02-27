import { comparePassword, encryptPassword } from '../utils/bcrypt.js';

export default {
    generate: async (req, res, next) => {
        try{
            //Checking if required data was sent
            if(!req.body.password){
                throw {code: 'badRequest'};
            }
            //Generating encrypted password and setting up in req.body
            req.body.password = await encryptPassword(req.body.password);

            next();
            
        }catch(error){
            next(error)
        }
    },

    compare: async (req, res, next) => {
        try {
            //Getting password and hash
            const { password } = req.body;
            const { hash } = req.user;

            //Calling bcrypt compare function
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