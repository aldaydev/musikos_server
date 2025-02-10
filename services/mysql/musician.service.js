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