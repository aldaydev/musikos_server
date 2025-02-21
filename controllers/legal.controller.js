import legalService from "../services/mongo/legal.service.js";
import { LogError } from "../utils/errors/logErrors.js";

export default {
    
    //Terms controller
    getTerms: async (req, res, next) => {
        try{
            const terms = await legalService.findOne('terms');
            if(!terms){
                const noTermsFound = new LogError({
                    message: 'Resource not found in MongoDB',
                    error: 'The collection doesn´t exists or is missing'
                }).add('noTermsFound');
                throw {code: 'internalServerError', key: noTermsFound};
            }else{
                res.status(200).json(terms);
            }
        }catch(error){
            next(error);
        }
    },

    //Privacy controller
    getPrivacy: async (req, res, next) => {
        try{
            const privacy = await legalService.findOne('privacy');
            if(!privacy){
                const noPrivacyFound = new LogError({
                    message: 'Resource not found in MongoDB',
                    error: 'The collection doesn´t exists or is missing'
                }).add('noPrivacyFound');
                throw { code: 'internalServerError', key: noPrivacyFound };
            }else{
                res.status(200).json(privacy);
            }
        }catch(error){
            next(error);
        }
    }
}
