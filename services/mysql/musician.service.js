import { Musician } from "../../models/mysql.models/asociations.js";
import { LogError } from "../../utils/errors/logErrors.js";

export default {

    findOne: async (key, value) => {
        try{
            const element = await Musician.findOne({where: {[key]: value}});
            return element;
        }catch(error){
            const errorFindingMusician = new LogError({
                message: 'Fail at searching in MongoDB',
                error: error.message
            }).add('errorFindingMusician');
            throw { code: 'internalServerError', key: errorFindingMusician };
        }
    },

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
            const newMusician = await Musician.create(data);
        } catch (error) {
            //If username or email already exists
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw { code: 'badRequest' };
            //If username or email already exists
            }else if(error.name === 'SequelizeValidationError'){
                throw { code: 'badRequest' };
            //Other internal errors
            }else{
                const mysqlError = new LogError({
                    message: 'MySQL failed',
                    error: error.name
                }).add('mysqlError');
                throw { code: 'internalServerError', key: mysqlError };
            }
        }
    }
}