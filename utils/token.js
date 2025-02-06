import jwt from 'jsonwebtoken';
import logger from '../config/logger.config.js';

const {sign, verify} = jwt;

class Token {

    async generate(tokenFrom, expires) {
        return new Promise((resolve, reject) => {
            sign(tokenFrom, 'secretkey', { expiresIn: expires }, (err, token) => {
                if (err) {
                    return reject(new Error('Error al generar el token'));
                }
                resolve(token);
            });
        });
    }

    async verify(tokenToVerify) {
        return new Promise((resolve, reject) => {
            verify(tokenToVerify, 'secretkey', (err, authData) => {
                if (err) {
                    let errorMessage = 'unknown';

                    // Personalización basada en el tipo de error
                    if (err.name === 'TokenExpiredError') {
                        errorMessage = 'expired';
                    } else if (err.name === 'JsonWebTokenError') {
                        errorMessage = 'invalid';
                    }
    
                    logger.info(errorMessage);
                    return reject(new Error(errorMessage));
                }
                resolve(authData);
            });
        });
    }
}

export default new Token;