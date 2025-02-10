import legalService from "../services/mongo/legal.service.js";
import { LogError } from "../utils/errors/logErrors.js";

class Legals {
    //Terms controller
    async getTerms(req, res, next){
        try{
            const terms = await legalService.findOne('terms');
            if(!terms){
                // throw {code: 'notFoundTerms'};
                const noTermsFound = new LogError({
                    message: 'Resource not found in MongoDB'
                }).add('noTermsFound');
                throw {code: 'internalServerError', key: noTermsFound};
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
                const noPrivacyFound = new LogError({
                    message: 'Resource not found in MongoDB',
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

export default new Legals;