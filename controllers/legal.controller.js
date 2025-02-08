import logger from '../config/logger.config.js';
import customError from "../utils/customError.js";
import legalService from "../services/mongo/legal.service.js";

class Legals {
    //Terms controller
    async getTerms(req, res){
        try{
            const terms = await legalService.findOne('terms');
            if(!terms){
                throw new customError(
                    'interno', 
                    'Fallo al obtener los términos de servicio'
                )
                
            }else{
                res.status(200).json(terms);
            }
        }catch(error){
            if(error.type === 'interno'){
                res.status(404).json({ 
                    message: error.message, 
                    type: error.type
                });
            }else{
                logger.error('Unknown error');
                res.status(500).json({ 
                    message: 'Error inesperado en el servidor', 
                    type: 'interno' 
                });
            }
        }
    }

    //Terms controller
    async getPrivacy(req, res){
        try{
            const privacy = await legalService.findOne('privacy');
            if(!privacy){
                throw new customError(
                    'interno', 
                    'Fallo al obtener la política de privacidad'
                )
            }else{
                res.status(200).json(privacy);
            }
        }catch(error){
            if(error.type === 'interno'){
                res.status(404).json({ 
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