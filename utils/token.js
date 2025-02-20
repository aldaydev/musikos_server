import jwt from 'jsonwebtoken';
import { LogError } from './errors/logErrors.js';
import { ResError } from './errors/resErrors.js';

export default {
    generate: async (tokenFrom, expires) => {
        return new Promise((resolve, reject) => {
            jwt.sign(tokenFrom, 'secretkey', { expiresIn: expires }, (error, token) => {
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

    verifyAndRedirect: async (tokenToVerify, username) => {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenToVerify, 'secretkey', (error, authData) => {
                if (error) {
                    let redirect = 'unexpected';
                    let status = 500;
                    let message = 'Error interno en el servidor. Inténtalo más tarde.'
                    
                    // Personalización basada en el tipo de error
                    if (error.name === 'TokenExpiredError') {
                        redirect = 'expired';
                        status = 410;
                        message = 'El enlace ha caducado o es incorrecto.'
                    } else if (error.name === 'JsonWebTokenError') {
                        redirect = 'incorrect';
                        status = 400;
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
                        status
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