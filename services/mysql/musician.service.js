import customError from "../../utils/customError.js";
import { Musician } from "../../models/mysql.models/asociations.js";

export default {

    checkUsername: async (username) => {
        try{
            const exists = await Musician.findOne({ where: {username} });
            return exists;
        }catch(error){
            throw new customError (
                'interno', 
                'Error at checking username'
            );
        }
    },

    checkEmail: async (email) => {
        try{
            const exists = await Musician.findOne({ where: {email} });
            console.log(exists);
            return exists;
        }catch(error){
            throw new customError (
                'interno', 
                'Error at checking username'
            );
        }
    }
}