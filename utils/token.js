import jwt from 'jsonwebtoken';
import { LogError } from './errors/logErrors.js';
import { ResError } from './errors/resErrors.js';

const SCRTKY = process.env.JWT_SCRTKY;

export default {

    //Generates a new token
    generate: async (tokenFrom, expires) => {
        return new Promise((resolve, reject) => {
            jwt.sign(tokenFrom, SCRTKY, { expiresIn: expires }, (error, token) => {
                if (error) {
                    //New Log error
                    const errorGeneratingToken = new LogError({
                        message: 'Error generating token',
                        error: error.message
                    }).add('errorGeneratingToken');
                    //Reject resError (code) and logError (key)
                    reject({code: 'internalServerError', key: errorGeneratingToken});
                }
                resolve(token);
            });
        });
    },

    //Verifying token and redirecting if error
    verifyAndRedirect: async (tokenToVerify, username) => {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenToVerify, SCRTKY, (error, authData) => {
                if (error) {

                    //Set "redirect" and "message" by error type
                    let redirect = 'unexpected';
                    let message = 'Error interno en el servidor. Inténtalo más tarde.'
                    if (error.name === 'TokenExpiredError') {
                        redirect = 'expired';
                        message = 'El enlace ha caducado o es incorrecto.'
                    } else if (error.name === 'JsonWebTokenError') {
                        redirect = 'incorrect';
                        message = 'El enlace ha caducado o es incorrecto.'
                    }else{
                        redirect = 'internal';
                    }

                    //New logError
                    const logErrorVerifyingToken = new LogError({
                        message: 'Error verifying token',
                        error: error.message
                    }).add('logErrorVerifyingToken');

                    //New resError
                    const resErrorVerifyingToken = new ResError(
                        message,
                    ).add('resErrorVerifyingToken');
                    //Reject resError (code),logError (key) and redirection link
                    reject({
                        code: resErrorVerifyingToken, 
                        key: logErrorVerifyingToken,
                        redirect: `/login?error=${redirect}&username=${username}`
                    });
                }
                resolve(authData);
            });
        });
    },

    //Verifying token
    verify: async (tokenToVerify) => {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenToVerify, SCRTKY, (error, authData) => {
                if (error) {
                    // Reject resError depending on error.name
                    if (error.name === 'TokenExpiredError') {
                        reject({code: 'tokenExpired'});
                    } else if (error.name === 'JsonWebTokenError') {
                        reject({code: 'invalidToken'});
                    }else{
                        //If internal error, set logError
                        const errorVerifyingToken = new LogError({
                            message: 'Error verifying token',
                            error: error.message
                        }).add('logErrorVerifyingToken');
                        //Reject resError (code) and logError (key)
                        reject({code: 'invalidToken', key: errorVerifyingToken});
                    }
                }
                resolve(authData);
            });
        });
    }
}