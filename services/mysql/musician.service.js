import { Musician } from "../../models/mysql.models/asociations.js";
import { LogError } from "../../utils/errors/logErrors.js";

export default {

    findOne: async (key, value) => {
        try{
            const element = await Musician.findOne({where: {[key]: value}});
            return element;
        }catch(error){
            const errorFindingMusician = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorFindingMusician');
            throw { code: 'internalServerError', key: errorFindingMusician };
        }
    },

    checkConfirmed: async (username) => {
        try {
            const isConfirmed = await Musician.findOne({
                where: {
                    username, 
                    is_confirmed: true
                }
            });
            return isConfirmed;
        } catch (error) {
            const errorFindingMusician = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorFindingMusician');
            throw { 
                code: 'internalServerError', 
                key: errorFindingMusician,
                redirect: `/login?error=internal`
            };
        }
    },

    updateIsConfirmed: async (username) => {
        try{
            const updateMusician = await Musician.update(
                {is_confirmed: true},
                {where: {username}}
            );
            return updateMusician;
        }catch(error){
            const errorFindingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorFindingMusician');
            throw { code: 'internalServerError', 
                key: errorFindingMusician, 
                redirect: `/login?error=internal`
            };
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