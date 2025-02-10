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
                // await Musician.findOne({ where: {email} }) ||
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

        // try {
        //     //Body request destructuring
        //     let {email, username, password, acceptTerms, acceptPrivacy} = req.body;

        //     //Parsing terms and privacy (boolean)
        //     acceptTerms = JSON.parse(acceptTerms);
        //     acceptPrivacy = JSON.parse(acceptPrivacy);

        //     //Checking accepted terms and privacy
        //     if (!acceptTerms || !acceptPrivacy) {
        //         logger.error('The Terms and Conditions and Privacy Policy have not been accepted.', acceptTerms, acceptPrivacy);
        //         throw {code: 'validation'};

        //     //Validating password format
        //     } else if(!password || !Validate.pass(password)){
        //         logger.error('Non-existent or incorrectly formatted password');
        //         throw {code: 'validation'};

        //     //Validating email format
        //     }else if(!email || !Validate.email(email)){
        //         logger.error('Non-existent or incorrectly formatted email');
        //         throw {code: 'validation'};

        //     //Validating username format
        //     }else if(!username || !Validate.username(username)){
        //         logger.error('Non-existent or incorrectly formatted username');
        //         throw {code: 'validation'};

        //     //Checking if email already exists
        //     }else if(await Musician.findOne({ where: {email} })){
        //         logger.error(`There is already an account registered with the email ${email}`);
        //         throw {code: 'validation'};
        //     }
            
        //     //Checking if username already exists
        //     else if(await Musician.findOne({ where: {username} })){
        //         logger.error(`The username (${username}) is not avaiable.`);
        //         throw {code: 'validation'};
            
        //     //Checking accepted terms and privacy
        //     }else{
        //         logger.info('All validations passed');
        //         next();
        //     }
        // } catch (error) {
        //     next(error);
        // }

        
    }

}

export default new validation_MW;