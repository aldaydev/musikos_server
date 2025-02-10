import Legal from "../../models/mongo.models/legal.model.js";

export default {

    findOne: async (value) => {
        try{
            return await Legal.findOne({ type: value });
        }catch(error){
            throw {code: 'database'};
        }
    }
}