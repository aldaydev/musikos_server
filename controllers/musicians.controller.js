//Dependency imports
import Token from "../utils/token.js";
import Mailing from "../utils/mailing.js";
//Model import
import { Musician } from "../models/mysql.models/musician.model.js";
//Email views import
import EmailViews from "../views/email.views.js";

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

            // const loadMailer = async () =>{
            //     const {default: Mailing} = await import('../utils/mailing.js');
            //     await Mailing.send(emailData);
            // }
            // loadMailer();
            
            //Sending confirmation email
            await Mailing.send(emailData, res);

            //Final response
            console.log(`SignUp correcto. Se ha enviado un link de confirmación a ${req.body.email}.`);
            return res.status(202).json({msg: `Te hemos enviado un link de confirmación a ${req.body.email}. Por favor, revisa tu correo y sigue el enlace`});

        }catch(e){
            console.error('Error creating new musician', e);
			res.status(500).json({ msg: 'Error al crear tu cuenta', error: e });
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
                pass: authData.pass,
                username: authData.username
            }

            //Adding new musician to DB
            const newMusician = await Musician.create(userData);
            console.log('Músico creado:', newMusician.toJSON());

            //Final response - redirect to front
            return res.redirect(302, "https://cvaudiovisual.alday.es");
        }catch(e){
            res.status(404).send('<h1>No se ha podido confirmar tu cuenta</h1>');
        }
    }

    //Check if a username already exists
    async checkUsername(req, res){
        const {username} = req.body;

        try{
            if(await Musician.findOne({ where: {username} })){
                res.json({exists: true})
            }else{
                res.json({exists: false})
            }
        }catch(e){
            res.status(500).json({msg: 'Error al comprobar username', error: e})
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
            res.status(500).json({msg: 'Error al comprobar username', error: e})
        }
    }

    //Check if a user exists (by email or username)
    async checkUser(req, res){
        const {check} = req.body;
        // console.log(req.body.check);
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