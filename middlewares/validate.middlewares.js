import Validate from "../utils/validations.js";
import { Musician } from "../models/mysql.models/musician.model.js";

class validation_MW {

    //Format validations for email, pass and username
    // async initial (req, res, next){
    //     //Validating pass, email and username
    //     if(!req.body.pass || !Validate.pass(req.body.pass)){
    //         console.log('Contraseña inexistente o con formato incorrecto');
    //         return res.status(400).json({msg: 'Contraseña inexistente o con formato incorrecto'});
    //     }else if(!req.body.email || !Validate.email(req.body.email)){
    //         console.log('Email inexistente o con formato incorrecto');
    //         return res.status(400).json({msg: 'Email inexistente o con formato incorrecto'});
    //     }else if(!req.body.username || !Validate.username(req.body.username)){
    //         console.log('Username inexistente o con formato incorrecto');
    //         return res.status(400).json({msg: 'Username inexistente o con formato incorrecto'});
    //     }else{
    //         console.log('Password, email and username have passed validation');
    //         next();
    //     }
    // }

    async signUp (req, res, next){

        //Body request destructuring
        const {email, username, pass, acceptTerms, acceptPrivacy} = req.body;

        //Validating pass format
        if(!req.body.pass || !Validate.pass(pass)){
            console.log('Contraseña inexistente o con formato incorrecto');
            return res.status(400).json({msg: 'Contraseña inexistente o con formato incorrecto'});

        //Validating email format
        }else if(!req.body.email || !Validate.email(email)){
            console.log('Email inexistente o con formato incorrecto');
            return res.status(400).json({msg: 'Email inexistente o con formato incorrecto'});

        //Validating username format
        }else if(!req.body.username || !Validate.username(username)){
            console.log('Username inexistente o con formato incorrecto');
            return res.status(400).json({msg: 'Username inexistente o con formato incorrecto'});

        //Checking if email already exists
        }else if(await Musician.findOne({ where: {email} })){
            console.log(`Ya hay una cuenta registrada con el email ${email}`)
            return res.status(400).json({ msg: `Ya hay una cuenta registrada con el email ${email}`});
        }
        
        //Checking if username already exists
        else if(await Musician.findOne({ where: {username} })){
            console.log(`El username (${username}) no está disponible.`);
            return res.status(400).json({ msg: `El username (${username}) no está disponible.` });
        
        //Checking accepted terms and privacy
        }else if (!acceptTerms || !acceptPrivacy) {
            console.log('Debes aceptar los Términos y Condiciones y la Política de Privacidad.', acceptTerms, acceptPrivacy)
            res.status(400).json({msg: 'Debes aceptar los Términos y Condiciones y la Política de Privacidad.'});

        //All validations passed
        }else{
            console.log('Password, email and username have passed all validations');
            next();
        }
    }

    //Exists, terms and privacy validations
//     async existsAndTerms (req, res, next){

//         //Body request destructuring
//         const {email, username, acceptTerms, acceptPrivacy} = req.body;

//         console.log(typeof acceptTerms);

//         //Checking if terms and privacy were accepted
//         if (!acceptTerms || !acceptPrivacy) {
//             console.log('Debes aceptar los Términos y Condiciones y la Política de Privacidad.')
//             res.status(400).json({msg: 'Debes aceptar los Términos y Condiciones y la Política de Privacidad.'});
//         }

//         //Checking if email already exists
//         else if(await Musician.findOne({ where: {email} })){
//             console.log(`Ya hay una cuenta registrada con el email ${email}`)
//             return res.status(400).json({ msg: `Ya hay una cuenta registrada con el email ${email}`});
//         }
//         //Checking if username already exists
//         else if(await Musician.findOne({ where: {username} })){
//             console.log(`El username (${username}) no está disponible.`);
//             return res.status(400).json({ msg: `El username (${username}) no está disponible.` });
//         }else{
//             next();
//         }
//     }
    
}

export default new validation_MW;