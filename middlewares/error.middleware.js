// import resErrors from "../utils/errors/resErrors.js";
import { resErrors } from "../utils/errors/resErrors.js";
import logger from "../config/logger.config.js";
import { LogError, logErrors } from "../utils/errors/logErrors.js";

export default (err, req, res, next) => {

    //Throw log Error if exists
    if(err.key){
        logErrors[err.key].endpoint = req.originalUrl;
        logErrors[err.key].method = req.method;
        logErrors[err.key].user = req.body.username || req.query.username || 'No autenticado';
        logger.error(logErrors[err.key]);
    }
    //If error redirection...
    if(err.redirect){
        res.status(303).redirect(`http://localhost:5173${err.redirect}`);
    }else{
        let errorResponse;
        //If unexpected error (no code recieved)
        if(!resErrors[err.code]){
            errorResponse = resErrors.unexpected;
            new LogError({
                message: 'Unexpected error',
                method: req.method,
                endpoint: req.originalUrl,
                user: req.body.username || req.query.username || 'No autenticado'
            }).add('unexpected');
            logger.error(logErrors.unexpected);
        //If error response with code
        }else{
            errorResponse = resErrors[err.code]
        }
        //Final response
        res.status(errorResponse.status).json(errorResponse);
    }
}