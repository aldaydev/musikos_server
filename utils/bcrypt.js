import bcrypt from 'bcrypt';

class Encrypt {
    async generate(pass) {
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(pass, saltRounds);
            console.log('Hash', hash);
            return hash;
        }catch(e){
            return res.status(500).json({msg: "No se ha podido encriptar la contraseña", error: e})
        }
    }

}

export default new Encrypt;