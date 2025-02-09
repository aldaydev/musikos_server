import logger from '../config/logger.config.js';
import legalService from "../services/mongo/legal.service.js";
import errors from '../utils/errors.js';

class Legals {
    //Terms controller
    async getTerms(req, res, next){
        try{
            const terms = await legalService.findOne('terms');
            if(!terms){
                throw {code: 'notFoundTerms'};
            }else{
                res.status(200).json(terms);
            }
        }catch(error){
            next(error);
        }
    }

    //Terms controller
    async getPrivacy(req, res, next){
        try{
            const privacy = await legalService.findOne('privacy');
            if(!privacy){
                throw {code: 'notFoundPrivacy'};
            }else{
                res.status(200).json(privacy);
            }
        }catch(error){
            next(error);
        }
    }

}

export default new Legals;