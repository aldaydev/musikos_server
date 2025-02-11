import Validate from "../utils/validations.js";
import musicianService from "../services/mysql/musician.service.js";

class validation_MW {

    async signUp (req, res, next){
        try {
            //Body request destructuring
            let {email, username, password, acceptTerms, acceptPrivacy} = req.body;

            if(
                //Checking accepted terms and privacy
                !acceptTerms || !acceptPrivacy || 
                //Checking if all needed data was sent
                !password || !email || !username || !acceptTerms || !acceptPrivacy || 
                //Checking if terms and privacy where accepted
                !JSON.parse(acceptTerms) || !JSON.parse(acceptPrivacy) ||
                //Validating password format
                !Validate.pass(password) || 
                //Validating email format
                !Validate.email(email) || 
                //Validating username format
                !Validate.username(username) || 
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

export default new validation_MW;