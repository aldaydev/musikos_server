import validate from "../utils/validate.js";
import musicianService from "../services/mysql/musician.service.js";

export default {
    signUp: async (req, res, next) => {
        try {
            //Body request destructuring
            let {email, username, password, acceptTerms, acceptPrivacy} = req.body;

            if(
                //Checking if all needed data was sent
                !password || !email || !username || !acceptTerms || !acceptPrivacy || 
                //Checking if terms and privacy where accepted
                !JSON.parse(acceptTerms) || !JSON.parse(acceptPrivacy) ||
                //Validating password format
                !validate.pass(password) || 
                //Validating email format
                !validate.email(email) || 
                //Validating username format
                !validate.username(username) || 
                //Checking if email already exists in DB
                await musicianService.findOne('email', email) ||
                //Checking if username already exists in DB
                await musicianService.findOne('username', username)
            ){
                throw {code: 'badRequest'};
            }else{
                next();
            }
            
        } catch (error) {
            next(error);
        }
    },

    signIn: async (req, res, next) => {
        try {

            //Check if required data was sent in req.body
            if(!req.body.login || !req.body.password){
                throw {code: 'badRequest'}
            }

            //Check if username or email belongs to a musician
            const checkUser = await musicianService.checkUser(req.body.login);

            //If no musician found throw an error
            if(!checkUser){
                throw {code: 'badRequest'}
            }

            //Save username in req.body
            req.user = {
                id: checkUser.id,
                email: checkUser.email,
                username: checkUser.username,
                hash: checkUser.password
            }

            next();

        } catch (error) {
            next(error);
        }
    },

    recoverPassword: async (req, res, next) => {
        try {
            
            if(!req.body.login){
                throw {code: 'badRequest'};
            }

            const user = await musicianService.checkUser(req.body.login);
            if(!user){
                throw {code: 'badRequest'};
            }

            req.user = {
                username: user.username,
                email: user.email,
                id: user.id
            }

            next();

        } catch (error) {
            next(error);
        }
    }
}