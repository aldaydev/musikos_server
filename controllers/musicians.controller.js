//Dependency imports
import Token from "../utils/token.js";
import Mailing from "../utils/mailing.js";
//Model import
import { Musician } from "../models/mysql.models/musician.model.js";
//Email views import
import EmailViews from "../views/email.views.js";
import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js";

class Musicians {
    //SignUp controller
    async signUp(req, res){
        try{
            //Generating token
            const generatedToken = await Token.generate(req.body, '1000s');

            //Generating confirmation URL
            const confirmationUrl = 'http://localhost:3001/bandbros/v1/musicians/signup-confirm/' + generatedToken

            //Setting up confirmation email
            const emailData = {
                to: req.body.email,
                subject: 'Confirma tu cuenta en BandBros',
                html: EmailViews.confirmation(confirmationUrl, req.body.username)
            }
            
            //Sending confirmation email
            await Mailing.send(emailData, res);

            //Final response
            logger.info(`Susscessful register. A confirmation link has been sent to ${req.body.email}.`);

            return res.status(200).json({message: `Te hemos enviado un link de confirmación a ${req.body.email}. Por favor, revisa tu correo y sigue el enlace`});

        }catch(e){
            logger.error('Error creating account', e.message);
			res.status(500).json({ message: 'Ha habido un error al crear tu cuenta', error: e.message });
        }
    }

    //Confirm SignUp controller
    async confirmSignUp(req, res){
        try{
            //Token verification
            const authData = await Token.verify(req.params.token);

            //Taking user data from token (authData)
            const userData = {
                email: authData.email,
                password: authData.password,
                username: authData.username
            }

            //Adding new musician to DB
            try{
                await Musician.create(userData);
            }catch(err){
                logger.error('The user has already been confirmed', err.qslMessage);
                throw new Error('alreadyconfirmed');
            }
            

            //Final response - redirect to front
            logger.info('Created musician:', authData.username);
            return res.status(302).redirect("http://localhost:5173/login?confirmation=true");
        }catch(e){

            let status;
            if(e.message === 'invalid' || e.message === 'expired'){
                status = 401;
            }else if(e.message === 'alreadyconfirmed'){
                status = 400;
            }else{
                status = 500;
            }

            res.status(status).redirect(
                `http://localhost:5173/login?error=${e.message}`
            );

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