
// import { Musician } from "../../models/mysql.models/musician.model.js";
import customError from "../../utils/customError.js";
import { Musician } from "../../models/mysql.models/asociations.js";
import mysql from "../../databases/mysql.connection.js";
import sequelize from "../../config/mysql.config.js";

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