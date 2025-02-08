import Legal from "../../models/mongo.models/legal.model.js";
import mongodb from "../../databases/mongo.connection.js";
import logger from "../../config/logger.config.js";
import customError from "../../utils/customError.js";

export default {

    findOne: async (value) => {
        try{
            return await Legal.findOne({ type: value });
        }catch(error){
            throw new customError (
                'interno', 
                `Error at getting ${value} data`
            );
        }
        
    }
}