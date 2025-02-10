import jwt from 'jsonwebtoken';
import logger from '../config/logger.config.js';

class Token {

    async generate(tokenFrom, expires) {
        return new Promise((resolve, reject) => {
            jwt.sign(tokenFrom, 'secretkey', { expiresIn: expires }, (err, token) => {
                if (err) {
                    reject({code: 'unexpected'});
                }
                resolve(token);
            });
        });
    }

    async verify(tokenToVerify) {
        return new Promise((resolve, reject) => {
            jwt.verify(tokenToVerify, 'secretkey', (err, authData) => {
                if (err) {
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