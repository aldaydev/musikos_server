import Legal from "../models/mongo.models/legal.model.js";
import logger from '../config/logger.config.js';
import customError from "../utils/customError.js";

class Legals {
    //Terms controller
    async getTerms(req, res){
        try{
            logger.http('Request started: /legal/terms');
            const terms = await Legal.findOne({ type: "terms" });
            if(!terms){
                throw new customError(
                    'interno', 
                    'Fallo al obtener los términos de servicio'
                )
                // throw new Error('Fallo al obtener los términos de servicio', {cause: 'interno'});
            }else{
                res.status(200).json(terms);
            }
        }catch(error){
            if(error.type === 'interno'){
                res.status(500).json({ 
                    message: error.message, 
                    type: error.type
                });
            }else{
                logger.error('Unknown error');
                res.status(500).json({ 
                    message: 'Error inesperado en el servidor', 
                    cause: 'interno' 
                });
            }
        }
    }

    //Terms controller
    async getPrivacy(req, res){
        try{
            const privacy = await Legal.findOne({ type: "privacy" });
            if(!privacy){
                logger.error('Database failure');
                throw new customError(
                    'interno', 
                    'Fallo al obtener la política de privacidad'
                )
            }else{
                res.status(200).json(privacy);
            }
            res.json(privacy);
        }catch(error){
            console.log(error);
            if(error.type === 'interno'){
                res.status(500).json({ 
                    message: error.message, 
                    type: error.type 
                });
            }else{
                logger.error('Unknown error');
                res.status(500).json({ 
                    message: 'Error inesperado en el servidor', 
                    type: 'interno' });
            }
        }
    }

}

export default new Legals;