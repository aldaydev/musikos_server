// import customError from "../../utils/customError.js";
import logger from "../../config/logger.config.js";
import { Musician } from "../../models/mysql.models/asociations.js";

export default {

    checkUsername: async (username) => {
        try{
            const exists = await Musician.findOne({ where: {username} });
            return exists;
        }catch(error){
            // throw new customError (
            //     'interno', 
            //     'Error at checking username'
            // );
        }
    },

    checkEmail: async (email) => {
        try{
            const exists = await Musician.findOne({ where: {email} });
            console.log(exists);
            return exists;
        }catch(error){
            // throw new customError (
            //     'interno', 
            //     'Error at checking username'
            // );
        }
    },

    create: async (data) => {
        try {
            await Musician.create(data);
        } catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw ({
                    status: 400, 
                    redirect: `/login?error=already-confirmed`
                });
            }else{
                throw ({
                    status: 500,
                    redirect: `/login?error=unexpected`
                })
            }
        }
    }
}