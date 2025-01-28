//Dependency imports
import Token from "../utils/token.js";
import Encrypt from '../utils/bcrypt.js';
import Mailing from "../utils/mailing.js";
import Validate from "../utils/validate.js";
//Model import
import { Musician } from "../models/musician.model.js";
//Email views import
import EmailViews from "../views/email.views.js";

class Musicians {

    //SignUp controller
    async signUp(req, res){
        try{
            //Validating pass, email and username
            if(!Validate.pass(req.body.pass)){
                console.log('Contraseña con formato incorrecto');
                return res.status(400).json({msg: 'Contraseña con formato incorrecto'});
            }else if(!Validate.email(req.body.email)){
                console.log('Email con formato incorrecto');
                return res.status(400).json({msg: 'Email con formato incorrecto'});
            }else if(!Validate.username(req.body.username)){
                console.log('Username con formato incorrecto');
                return res.status(400).json({msg: 'Username con formato incorrecto'});
            }

            //Encrypting password
            const encryptedPass = await Encrypt.generate(req.body.pass);
            req.body.pass = await encryptedPass;

            //Generating token
            const generatedToken = await Token.generate(req.body, '1000s');

            //Generating confirmation URL
            const confirmationUrl = 'http://localhost:3001/bandbros/v1/musicians/signup-confirm/' + generatedToken

            //Sending confirmation email
            const emailData = {
                to: req.body.email,
                subject: 'Confirma tu cuenta en BandBros',
                html: EmailViews.confirmation(confirmationUrl, req.body.username)
            }

            await Mailing.send(emailData);

            //Final response
            return res.status(201).json({msg: 'Usuario creado. Te hemos enviado un email para que puedas confirmar tu cuenta.'});

        }catch(e){
            console.error('Error creating new musician', e);
			res.status(500).json({ message: 'Error al crear tu cuenta', e });
        }
    }

    //Confirm SignUp controller
    async confirmSignUp(req, res){
        try{
            const authData = await Token.verify(req.params.token);

            const userData = {
                email: authData.email,
                pass: authData.pass,
                username: authData.username
            }

            //Adding de musician to DB
            const newMusician = await Musician.create(userData);
            console.log('Músico creado:', newMusician.toJSON());

            //Final response - redirect to front
            return res.redirect(302, "https://cvaudiovisual.alday.es");
        }catch(e){
            res.status(404).send('<h1>No se ha podido realizar la verificación</h1>');
        }
        
    }
}

export default new Musicians;