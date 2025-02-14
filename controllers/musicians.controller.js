//Dependency imports
import Token from "../utils/token.js";
//Model import
import { Musician } from "../models/mysql.models/musician.model.js";
//Email views import
import EmailViews from "../views/email.views.js";
import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js";
import Email from "../utils/mailing.js";

class Musicians {

    //SignUp controller
    async signUp(req, res, next){
        try{
            // logger.http({message: 'Request started', method: req.method, endpoint: req.originalUrl})

            //Generate token
            const generatedToken = await Token.generate(req.body, '1000s');

            //Generating confirmation URL
            const confirmationUrl = 'http://localhost:3001/musiko/v1/musicians/signup-confirmation/' + generatedToken

            //Setting up confirmation email
            const newEmail = new Email ({
                to: req.body.email,
                subject: 'Confirma tu cuenta en Musiko',
                html: EmailViews.confirmation(confirmationUrl, req.body.username)
            });

            //Sending confirmation email
            await newEmail.send();

            //Final response
            logger.info(`Susscessful register. A confirmation link has been sent to ${req.body.email}.`);

            return res.status(200).json({
                title: '¡CONFIRMA TU CUENTA!',
                message: `Te hemos enviado un link de confirmación a ${req.body.email}. Por favor, revisa tu correo y sigue el enlace`
            });

        }catch(error){
            next(error);
        }
    }

    //Confirm SignUp controller
    async signUpConfirmation(req, res, next){
        try{
            //Token verification
            const authData = await Token.verify(req.params.token);

            //Taking user data from token (authData)
            const userData = {
                email: authData.email,
                password: authData.password,
                username: authData.username
            }

            await musicianService.create(userData);

            //Final response - redirect to front
            logger.info({message: 'Created musician:', data: userData});
            return res.status(302).redirect("/login?confirmation=true");
        }catch(error){
            next(error);
        }
    }

    //Check if a username already exists
    async checkUsername(req, res){
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
    }

    //Check if a email already exists
    async checkEmail(req, res){
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
    }

    //Check if a user exists (by email or username)
    async checkUser(req, res){
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

    }

    //SignIn controller
    async signIn(req, res){
        try{
            console.log(req.body);
            res.json({data: req.body});
        }catch(e){
            res.status(500).json({ msg: 'Error inesperado', error: e });
        }
    }
}

export default new Musicians;