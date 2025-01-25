import jwt from 'jsonwebtoken';

const {sign, verify} = jwt;

class Token {

    async generate(tokenFrom, expires) {
        return new Promise((resolve, reject) => {
            sign(tokenFrom, 'secretkey', { expiresIn: expires }, (err, token) => {
                if (err) {
                    return reject(new Error('Error al generar el token'));
                }
                resolve('Bearer ' + token);
            });
        });
    }

    
}

export default new Token;