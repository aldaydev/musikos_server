import logger from '../config/logger.config.js';
import customError from "../utils/customError.js";
import legalService from "../services/mongo/legal.service.js";
import errors from '../utils/errors.js';

class Legals {
    //Terms controller
    async getTerms(req, res){
        try{
            const terms = await legalService.findOne('terms');
            if(!terms){
                throw new customError(
                    'database',
                    'interno', 
                    'Fallo al obtener la política de privacidad',
                    404
                )
                
            }else{
                res.status(200).json(terms);
            }
        }catch(error){
            if(error.status === 404){
                res.status(404).json(error)
            }else if (error.origin !== 'unexpected'){
                res.status(500).json(error)
            }else{
                res.status(500).json(errors.unexpected)
            }
            // console.log(error);
            // if(error.type === 'interno'){
            //     res.status(404).json({ 
            //         message: error.message, 
            //         type: error.type
            //     });
            // }else{
            //     logger.error('Unknown error');
            //     res.status(500).json(errors.unexpected);
            // }
        }
    }

    //Terms controller
    async getPrivacy(req, res){
        try{
            const privacy = await legalService.findOne('privacy');
            if(!privacy){
                throw new customError(
                    'database',
                    'interno', 
                    'Fallo al obtener la política de privacidad',
                    404
                )
            }else{
                res.status(200).json(privacy);
            }
        }catch(error){
            if(error.status === 404){
                res.status(404).json(error)
            }else if (error.origin !== 'unexpected'){
                res.status(500).json(error)
            }else{
                res.status(500).json(errors.unexpected)
            }
            // console.log(error);
            // if(error.type === 'interno'){
            //     res.status(404).json({ 
            //         message: error.message, 
            //         type: error.type 
            //     });
            // }else{
            //     logger.error('Unknown error');
            //     res.status(500).json(errors.unexpected);
            // }
        }
    }

}

export default new Legals;