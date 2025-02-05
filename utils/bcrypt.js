import bcrypt from 'bcrypt';

console.log('ooooo')

class Encrypt {
    async generate(pass) {
        try{
            const saltRounds = 10;
            const hash = await bcrypt.hash(pass, saltRounds);
            console.log('Password encrypted. Hash: ', hash);
            return hash;
        }catch(e){
            return res.status(500).json({msg: "No se ha podido encriptar la contraseña", error: e})
        }
    }

}

export default new Encrypt;