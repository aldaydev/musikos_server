import Legal from "../models/mongo.models/legal.model.js";

class Legals {
    //Terms controller
    async getTerms(req, res){
        try{
            const terms = await Legal.findOne({ type: "terms" });
            console.log(terms);
            res.json({terms});
        }catch(e){
            console.error('Error accessing the content of the terms and conditions', e);
			res.status(500).json({ msg: 'Error al acceder al contenido de los términos y condiciones', error: e });
        }
    }

    //Terms controller
    async getPrivacy(req, res){
        try{
            const privacy = await Legal.findOne({ type: "privacy" });
            console.log(privacy);
            res.json({privacy});
        }catch(e){
            console.error('Error accessing the content of the privacy conditions', e);
			res.status(500).json({ msg: 'Error al acceder al contenido de las condiciones de privacidad', error: e });
        }
    }

}

export default new Legals;