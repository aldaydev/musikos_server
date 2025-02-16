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

    //SignUp controller
    signUp: async (req, res, next) => {
        try{
            //Initial log
            logger.http({message: 'Request started', action: 'Register user', method: req.method, endpoint: req.originalUrl})
            
            const userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }

            //Creating musician
            await musicianService.create(userData);

            //Generate token
            const generatedToken = await Token.generate(req.body, '1000s');

            //Generating confirmation URL
            const confirmationUrl = 'http://localhost:3001/musikos/v1/musicians/signup-confirmation/' + generatedToken

            //Setting up confirmation email
            const newEmail = new Email ({
                to: req.body.email,
                subject: 'Confirma tu cuenta en Musiko',
                html: EmailViews.confirmation(confirmationUrl, req.body.username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Final response
            logger.http({message: 'Request ended', action: `confirmation link has been sent to ${req.body.email}`, method: req.method, endpoint: req.originalUrl})

            return res.status(200).json({
                title: '¡CONFIRMA TU CUENTA!',
                message: `Te hemos enviado un link de confirmación a ${req.body.email}. Por favor, revisa tu correo y sigue el enlace`
            });

        }catch(error){
            next(error);
        }
    },

    //Confirm SignUp controller
    signUpConfirmation: async (req, res, next) => {
        try{
            //Token verification
            const authData = await Token.verifyAndRedirect(req.params.token);

            //Taking user data from token (authData)
            const userData = {
                email: authData.email,
                password: authData.password,
                username: authData.username
            }

            const username = authData.username;

            const isConfirmed = await 

            //Final response - redirect to front
            logger.info({message: 'Created musician:', data: userData});
            return res.status(302).redirect("http://localhost:5173/login?confirmation=true");
        }catch(error){
            next(error);
        }
    },

    checkUsername: async (req, res, next) => {
        try{
            const exists = await musicianService.checkUsername(req.body.username);
            if(exists){
                res.json({exists: true})
            }else{
                res.json({exists: false})
            }
        }catch(error){
            res.status(500).json({message: 'Error al comprobar username', error})
        }
    },

    checkEmail: async (req, res, next) => {
        const {email} = req.body;

        try{
            if(await Musician.findOne({ where: {email} })){

                res.json({exists: true})
            }else{
                res.json({exists: false})
            }
        }catch(e){
            res.status(500).json({message: 'Error al comprobar username', error: e.message})
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