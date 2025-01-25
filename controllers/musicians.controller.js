import { Musician } from "../models/models.js";
import Token from "../utils/token.js";


class Musicians {
    async create(req, res){
        try{
            const newMusician = await Musician.create(req.body);
            console.log('Músico creado:', newMusician.toJSON());

            const generatedToken = await Token.generate(req.body, '1000s');

            console.log(generatedToken);

            const response = {
                musician: newMusician,
                msg: 'Musician created',
                token: generatedToken
            }

            
            return res.status(201).json(response);
        }catch(e){
            console.error('Error creating new musician', e);
			res.status(500).json({ message: 'Error creating new musician', e });
        }
    }
}

export default new Musicians;