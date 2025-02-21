//Dependency imports
import Token from "../utils/token.js";
//Model import
import { Musician } from "../models/mysql.models/musician.model.js";
//Email views import
import EmailViews from "../views/email.views.js";
import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js";
import Email from "../utils/mailing.js";

export default {

    //Check if a email already exists
    checkEmail: async (req, res, next) => {
        try{
            if(!req.body.email){
                throw {code: 'badRequest'}
            }

            const exists = await musicianService.findOne('email', req.body.email);
            
            if(exists){
                res.status(200).json({exists: true});
            }else{
                res.status(200).json({exists: false});
            }
        }catch(e){
            next(error);
        }
    },

    //Check if a username already exists
    checkUsername: async (req, res, next) => {
        try{
            if(!req.body.username){
                throw {code: 'badRequest'}
            }

            const exists = await musicianService.findOne('username', req.body.username);
            
            if(exists){
                res.status(200).json({exists: true});
            }else{
                res.status(200).json({exists: false});
            }
        }catch(error){
            next(error);
        }
    },

    //SignUp controller
    signUp: async (req, res, next) => {
        try{
            //Initial log
            logger.http({message: 'Register request started', action: 'Register user', method: req.method, endpoint: req.originalUrl});

            //Collecting request body required data
            const userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }

            //Creating musician
            await musicianService.create(userData);

            //Generate token
            const generatedToken = await Token.generate(userData, '600s');

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/musicians/signup-confirmation/${generatedToken}?username=${userData.username}`

            //Setting up confirmation email
            const newEmail = new Email ({
                to: req.body.email,
                subject: 'Confirma tu cuenta en Musiko',
                html: EmailViews.confirmation(confirmationUrl, userData.username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Finalization log
            logger.http({message: `confirmation link has been sent to ${userData.email}`, action: 'Register user', method: req.method, endpoint: req.originalUrl})
            //Final response
            return res.status(200).json({
                title: '¡CONFIRMA TU CUENTA!',
                message: `Te hemos enviado un link de confirmación a ${userData.email}. Por favor, revisa tu correo y sigue el enlace`
            });

        }catch(error){
            next(error);
        }
    },

    //Confirm SignUp controller
    signUpConfirmation: async (req, res, next) => {
        try{
            //Initial log
            logger.http({message: 'Account confirmation started', action: 'Confirm account', method: req.method, endpoint: req.originalUrl});

            //Token verification
            const authData = await Token.verifyAndRedirect(req.params.token, req.query.username);

            //Taking user data from token (authData)
            const userData = {
                email: authData.email,
                password: authData.password,
                username: authData.username
            }

            //Checking if user is already confirmed
            const isConfirmed = await musicianService.checkConfirmed(userData.username);
            if(!isConfirmed){
                //If not... set is_confirmed -> true
                await musicianService.updateIsConfirmed(userData.username);
            }else{
                throw { code: 'badRequest',
                    redirect: `/login?error=already-updated`
                };
            }

            //Final log
            logger.http({message: 'Account successfully confirmed', action: 'Confirm account', method: req.method, endpoint: req.originalUrl});
            //Final response - redirect to front
            return res.status(303).redirect("http://localhost:5173/login?confirmation=true");
        }catch(error){
            next(error);
        }
    },

    //Resend confirmation email
    resendConfirmation: async (req, res, next) => {
        try {
            //Initial log
            logger.http({message: 'Resending email request stared', action: 'Resend confirmation email', method: req.method, endpoint: req.originalUrl});

            //Check if username exists in request body
            const username = req.body.username;
            if(!username){
                throw { code: 'badRequest' };
            }

            //Check if user exists
            const user = await musicianService.findOne('username', username);
            if(!user){
                throw { code: 'badRequest' };
            }

            //Checking if user is already confirmed
            const isConfirmed = await musicianService.checkConfirmed(username);
            if(isConfirmed){
                throw { code: 'badRequest' };
            }

            //Generate token from username
            const generatedToken = await Token.generate({username}, '600s');

            //Generating confirmation URL
            const confirmationUrl = `http://localhost:3001/musikos/v1/musicians/signup-confirmation/${generatedToken}?username=${username}`

            //Setting up confirmation email
            const newEmail = new Email ({
                to: user.email,
                subject: 'Nuevo email de confirmación',
                html: EmailViews.resendConfirmation(confirmationUrl, username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Finaization log
            logger.http({message: `confirmation link has been sent to ${user.email}`, action: 'Resend confirmation email', method: req.method, endpoint: req.originalUrl})
            //Final response
            return res.status(200).json({
                message: `EMAIL ENVIADO`
            });

        } catch (error) {
            next(error);
        }
    },

    checkUser: async (req, res, next) => {
        const { check } = req.body;
        const result = await Musician.findOne({ where: {
            [Op.or]: 
                [
                    { email: check },
                    { username: check }
                ]
            } 
        });
        console.log(result);
    },

    signIn: async (req, res, next) => {
        try{
            console.log(req.body);
            res.json({data: req.body});
        }catch(e){
            res.status(500).json({ msg: 'Error inesperado', error: e });
        }
    }
}