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
    }
}