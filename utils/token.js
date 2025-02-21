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
                    const errorGeneratingToken = new LogError({
                        message: 'Error generating token',
                        error: error.message
                    }).add('errorGeneratingToken');
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
                    let redirect = 'unexpected';
                    let message = 'Error interno en el servidor. Inténtalo más tarde.'
                    
                    // Personalización basada en el tipo de error
                    if (error.name === 'TokenExpiredError') {
                        redirect = 'expired';
                        message = 'El enlace ha caducado o es incorrecto.'
                    } else if (error.name === 'JsonWebTokenError') {
                        redirect = 'incorrect';
                        message = 'El enlace ha caducado o es incorrecto.'
                    }else{
                        redirect = 'internal';
                    }

                    const logErrorVerifyingToken = new LogError({
                        message: 'Error verifying token',
                        error: error.message
                    }).add('logErrorVerifyingToken');

                    const resErrorVerifyingToken = new ResError(
                        message,
                    ).add('resErrorVerifyingToken');

                    reject({
                        code: resErrorVerifyingToken, 
                        key: logErrorVerifyingToken,
                        redirect: `/login?error=${redirect}&username=${username}`
                    });
                }
                resolve(authData);
            });
        });
    }
}