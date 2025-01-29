import jwt from 'jsonwebtoken';

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
                    return reject(new Error('Error al verificar el token'));
                }
                resolve(authData);
            });
        });
    }
}

export default new Token;