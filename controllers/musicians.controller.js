import { Musician } from "../models/models.js";
import Token from "../utils/token.js";
import Encrypt from '../utils/bcrypt.js';
import mailing from "../utils/mailing.js";


class Musicians {
    async create(req, res){
        try{
            //Encrypting password
            const encryptedPass = await Encrypt.generate(req.body.pass);
            req.body.pass = await encryptedPass;

            //Adding de musician to DB
            const newMusician = await Musician.create(req.body);
            console.log('Músico creado:', newMusician.toJSON());

            //Generating token
            const generatedToken = await Token.generate(req.body, '1000s');

            //Sending confirmation email

            await mailing.send(req.body.email);

            //Custom response
            const response = {
                musician: newMusician,
                msg: 'Musician created',
                token: generatedToken
            }

            //Final response
            return res.status(201).json(response);
        }catch(e){
            console.error('Error creating new musician', e);
			res.status(500).json({ message: 'Error creating new musician', e });
        }
    }
}

export default new Musicians;