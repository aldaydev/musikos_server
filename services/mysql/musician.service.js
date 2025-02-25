import { Musician } from "../../models/mysql.models/asociations.js";
import { LogError } from "../../utils/errors/logErrors.js";
import { Op } from "sequelize";

export default {

    //Find a Musician through a single value
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

    //Create a new Musician
    create: async (data) => {
        try {
            const newMusician = await Musician.create(data);
            return newMusician;
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
    },

    //Check if a Musician has confirmed the account
    checkConfirmed: async (username, type) => {
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
                redirect: `/login?error=internal&type=${type}&username=${username}`
            };
        }
    },

    //Update is_confirmed value for a Musician (with redirection)
    updateIsConfirmed: async (username, type) => {
        try{
            const updateMusician = await Musician.update(
                {is_confirmed: true},
                {where: {username}}
            );
            return updateMusician;
        }catch(error){
            const errorUpdatingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');
            throw { code: 'internalServerError', 
                key: errorUpdatingMusician, 
                redirect: `/login?error=internal&type${type}&username=${username}`
            };
        }
    },

    //Check if a usernmae or email exists related to a musician
    checkUser: async (login) => {
        try {
            //Find if username or email exists in MySQL
            const result = await Musician.findOne({ where: {
                [Op.or]: 
                    [
                        { email: login },
                        { username: login }
                    ]
                } 
            });
            return result;
            
        } catch (error) {
            const errorCheckingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorCheckingMusician');
            throw { 
                code: 'internalServerError', 
                key: errorCheckingMusician, 
            };
        }
    },

    //Update password from recoverPassword request
    recoverPassword: async (password, id) => {
        try{
            const updateMusician = await Musician.update(
                {password: password},
                {where: {id}}
            );
            return updateMusician;
        }catch(error){
            const errorUpdatingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');
            throw { code: 'internalServerError', 
                key: errorUpdatingMusician, 
            };
        }
    }
}