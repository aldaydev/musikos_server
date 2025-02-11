import jwt from 'jsonwebtoken';
import { LogError } from './errors/logErrors.js';

class Token {

    async generate(tokenFrom, expires) {
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
    }

    async verify(tokenToVerify) {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenToVerify, 'secretkey', (error, authData) => {
                if (error) {
                    let redirect = 'unexpected';
                    let status = '500';
                    // Personalización basada en el tipo de error
                    if (err.name === 'TokenExpiredError') {
                        redirect = 'expired';
                        status = 410;
                    } else if (err.name === 'JsonWebTokenError') {
                        redirect = 'incorrect';
                        status = 400;
                    }
    
                    reject({
                        status: status, 
                        redirect: `/login?error=${redirect}`});
                }
                resolve(authData);
            });
        });
    }
}

export default new Token;