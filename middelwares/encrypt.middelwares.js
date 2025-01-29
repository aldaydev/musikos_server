import bcrypt from 'bcrypt';

class Encrypt_MW {
    async generate(req, res, next) {
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(req.body.pass, saltRounds);
            console.log('Password encrypted. Hash: ', hash);
            req.body.pass = hash;
            return next();
        }catch(e){
            return res.status(500).json({msg: "No se ha podido encriptar la contraseña", error: e})
        }
    }
}

export default new Encrypt_MW;