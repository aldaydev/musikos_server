import validate from "../utils/validate.js";
import musicianService from "../services/mysql/musician.service.js";
import { ResError } from "../utils/errors/resErrors.js";

export default {
    signUp: async (req, res, next) => {
        try {
            //Body request destructuring
            let {email, username, name, password, birthdate, acceptTerms, acceptPrivacy} = req.body;

            //Correct format of birthdate
            if(birthdate.day.length === 1){
                birthdate.day = `0${birthdate.day}`
            }

            if(birthdate.month.length === 1){
                birthdate.month = `0${birthdate.month}`
            }

            console.log('Llega hasta aquí', req.body);

            const birthdateFormat = `${birthdate.year}-${birthdate.month}-${birthdate.day}`;
            console.log('Llega hasta aquí', birthdateFormat);
            req.body.birthdate = birthdateFormat;

            if(
                //Checking if all needed data was sent
                !password || !email || !username || !acceptTerms || !acceptPrivacy || 
                !birthdate.year || !birthdate.month ||!birthdate.day || !name ||
                //Checking if terms and privacy where accepted
                !JSON.parse(acceptTerms) || !JSON.parse(acceptPrivacy) ||
                //Validating password format
                !validate.pass(password) ||
                //Validating email format
                !validate.email(email) || 
                //Validating name format
                !validate.name(name) ||
                //Validating username format
                !validate.username(username) || 
                //Validating username birthdate
                !validate.birthdate2(birthdateFormat) ||
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

            if(!checkUser.is_confirmed){
                new ResError(
                    'No has confirmado tu cuenta.',
                    403
                ).add('alreadyRequested');
                throw {code: 'alreadyRequested'};
            }

            //Saving data in req.user
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

    passwordRecoverEmail: async (req, res, next) => {
        try {
            //Check if required data was sent in req.body
            if(!req.body.login){
                throw {code: 'badRequest'};
            }

            //Check if username or email belongs to a musician
            const user = await musicianService.checkUser(req.body.login);
            if(!user){
                throw {code: 'badRequest'};
            }

            if(user.is_requesting){
                new ResError(
                    'Ya solicitado. Revisa tu correo.',
                    409
                ).add('alreadyRequested');
                throw {code: 'alreadyRequested'};
            }

            //Saving data in req.user
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