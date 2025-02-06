import Validate from "../utils/validations.js";
import { Musician } from "../models/mysql.models/musician.model.js";
import logger from "../config/logger.config.js";

class validation_MW {

    async signUp (req, res, next){

        //Body request destructuring
        const {email, username, password, acceptTerms, acceptPrivacy} = req.body;

        //Validating password format
        if(!password || !Validate.pass(password)){
            logger.error('Non-existent or incorrectly formatted password');
            return res.status(400).json({message: 'Contraseña inexistente o con formato incorrecto'});

        //Validating email format
        }else if(!email || !Validate.email(email)){
            logger.error('Non-existent or incorrectly formatted email');
            return res.status(400).json({message: 'Email inexistente o con formato incorrecto'});

        //Validating username format
        }else if(!username || !Validate.username(username)){
            logger.error('Non-existent or incorrectly formatted username');
            return res.status(400).json({message: 'Username inexistente o con formato incorrecto'});

        //Checking if email already exists
        }else if(await Musician.findOne({ where: {email} })){
            logger.error(`There is already an account registered with the email ${email}`)
            return res.status(400).json({ message: `Ya hay una cuenta registrada con el email ${email}`});
        }
        
        //Checking if username already exists
        else if(await Musician.findOne({ where: {username} })){
            logger.error(`The username (${username}) is not avaiable.`);
            return res.status(400).json({ message: `El username (${username}) no está disponible.` });
        
        //Checking accepted terms and privacy
        }else if (!acceptTerms || !acceptPrivacy) {
            logger.error('The Terms and Conditions and Privacy Policy have not been accepted.', acceptTerms, acceptPrivacy)
            res.status(400).json({message: 'Debes aceptar los Términos y Condiciones y la Política de Privacidad.'});

        //All validations passed
        }else{
            logger.info('All validations passed');
            next();
        }
    }

}

export default new validation_MW;