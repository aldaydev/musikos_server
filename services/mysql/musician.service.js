import logger from "../../config/logger.config.js";
import sequelize from "../../config/mysql.config.js";
import { Instrument, Musician, Style } from "../../models/mysql.models/asociations.js";
import { Province } from "../../models/mysql.models/province.model.js";
import { Town } from "../../models/mysql.models/town.model.js";
import { LogError } from "../../utils/errors/logErrors.js";
import { Op } from "sequelize";

export default {

    //Find a Musician through a single value
    findOne: async (key, value) => {
        try {
            const element = await Musician.findOne({ where: { [key]: value } });
            return element;
        } catch (error) {
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
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw { code: 'badRequest' };
                //If username or email already exists
            } else if (error.name === 'SequelizeValidationError') {
                throw { code: 'badRequest' };
                //Other internal errors
            } else {
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
        try {
            const updateMusician = await Musician.update(
                { is_confirmed: true },
                { where: { username } }
            );
            return updateMusician;
        } catch (error) {
            const errorUpdatingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');
            throw {
                code: 'internalServerError',
                key: errorUpdatingMusician,
                redirect: `/login?error=internal&type${type}&username=${username}`
            };
        }
    },

    //Check if a usernmae or email exists related to a musician
    checkUser: async (login) => {
        try {
            //Find if username or email exists in MySQL
            const result = await Musician.findOne({
                where: {
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
    updatePassword: async (password, username) => {
        try {
            const updatedMusician = await Musician.update(
                { password: password },
                { where: { username } }
            );
            return updatedMusician;
        } catch (error) {
            const errorUpdatingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');
            throw {
                code: 'internalServerError',
                key: errorUpdatingMusician,
            };
        }
    },

    //Check if a Musician is requesting (can redirect)
    checkisRequesting: async (username, response = normal) => {
        try {
            const isConfirmed = await Musician.findOne({
                where: {
                    username,
                    is_requesting: true
                }
            });
            return isConfirmed;
        } catch (error) {

            const errorFindingMusician = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorFindingMusician');

            if (response === 'normal') {
                throw {
                    code: 'internalServerError',
                    key: errorFindingMusician,
                };
            } else if (response === 'query') {
                throw {
                    code: 'internalServerError',
                    key: errorFindingMusician,
                    redirect: `/login?error=internal&type=isRequesting&username=${username}`
                };
            }
        }
    },

    //Update is_requesting value for a Musician (with redirection)
    updateIsRequesting: async (username, state, response = 'normal') => {
        try {
            const updatedMusician = await Musician.update(
                { is_requesting: state },
                { where: { username } }
            );
            return updatedMusician;
        } catch (error) {
            const errorUpdatingMusician = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');

            if (response === 'normal') {
                throw {
                    code: 'internalServerError',
                    key: errorUpdatingMusician,
                };
            } else if (response === 'query') {
                throw {
                    code: 'internalServerError',
                    key: errorUpdatingMusician,
                    redirect: `/login?error=internal&type=isRequesting&username=${username}`
                };
            }
        }
    },

    //Update is_requesting value for all Musicians
    updateAllisRequesting: async () => {
        try {
            await Musician.update(
                { is_requesting: false },
                { where: { is_requesting: true } }
            );
            logger.info('MySQL - All "is_requesting" fields reset');
        } catch (error) {
            logger.error('MySQL - Error at reseting "is_requesting" fields');
        }
    },

    //Getting all confirmed musicians
    getAll: async () => {
        try {
            const musicians = await Musician.findAll({
                where: {
                    //Musician must be confirmed
                    is_confirmed: true,
                },
                include: [
                    //---INSTRUEMNTS---//
                    {
                        model: Instrument,
                        through: { attributes: [] },
                        //Taking de name atribute of instruments associated to musicians
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `instruments`.`name`)'), 'instrument_names']]
                    },
                    //---STYLES---//
                    {
                        model: Style,
                        through: { attributes: [] },
                        //Taking de name atribute of styles associated to musicians
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `styles`.`name`)'), 'style_names']]
                    },
                    //---PROVINCE---//
                    {
                        model: Province,
                        //Taking de name atribute of province associated to musicians
                        attributes: ['name']
                    },
                    //---TOWN---//
                    {
                        model: Town,
                        //Taking de name atribute of province associated to musicians
                        attributes: ['name']
                    },
                ],
                //Atributes of Musician we want to get 
                attributes: [
                    'id', 
                    'username',
                    'image',
                    'name',
                    'age'
                ],
                //We group the data by musician id
                group: ['Musician.id'],
                raw: true,
                nest: true
            });
            return musicians;
        } catch (error) {
            const errorGettingMusicians = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingMusicians');
            throw {
                code: 'internalServerError',
                key: errorGettingMusicians,
            };
        }
    },

    //Getting filtered musicians
    filter: async (minAge, maxAge, styles, instruments, province, town, name) => {
        try {
            //Initialize array for multiple instruments or styles
            let instrumentsArray = [], stylesArray = [];

            //Function thant handle if a filter is needed or not
            const ifExists = (key, value) => {
                //If value param exists
                if(value){
                    let ArrayToSpread;
                    //Action for instruments
                    if(key === 'instruments'){
                        instrumentsArray = Array.isArray(instruments) ? instruments : [instruments];
                        ArrayToSpread = instrumentsArray;
                        return {
                            name: { [Op.in]: [...ArrayToSpread] }
                        }
                    //Action for styles
                    }else if(key === 'styles'){
                        stylesArray = Array.isArray(styles) ? styles : [styles];
                        ArrayToSpread = stylesArray;
                        return {
                            name: { [Op.in]: [...ArrayToSpread] }
                        }
                    //Action for province
                    }else if(key === 'province'){
                        return {
                            name: province
                        }
                    //Action for town
                    }else if(key === 'town'){
                        return {
                            name: town
                        }
                    //Action for name
                    }else if(key === 'name'){
                        return {name : { [Op.like]: `%${name}%` } }
                    }
                //If value param doesn´t exists
                }else{
                    //Action for name
                    if(key === 'name'){
                        return {};
                    }
                }
            }

            //Here begins the request to database
            const musicians = await Musician.findAll({
                where: {
                    //Musician must be confirmed
                    is_confirmed: true,
                    //Selected age range
                    age: {
                        [Op.between] : [minAge, maxAge]
                    },
                    //If name, op.iLike
                    ...ifExists('name', name),
                },
                include: [
                    //---INSTRUEMNTS---//
                    {
                        model: Instrument,
                        through: { attributes: [] },
                        //Taking de name atribute of instruments associated to musicians
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `instruments`.`name`)'), 'instrument_names']],
                        //If instruments in queryString, filter by them
                        where: ifExists('instruments', instruments)
                    },
                    //---STYLES---//
                    {
                        model: Style, 
                        through: { attributes: [] },
                        //Taking de name atribute of styles associated to musicians
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `styles`.`name`)'), 'style_names']],
                        //If styles in queryString, filter by them
                        where: ifExists('styles', styles)
                    },
                    //---PROVINCE---//
                    {
                        model: Province,
                        //Taking de name atribute of province associated to musicians
                        attributes: ['name'],
                        //If province in queryString, filter by it
                        where: ifExists('province', province)
                    },
                    //---TOWN---//
                    {
                        model: Town,
                        //Taking de name atribute of town associated to musicians
                        attributes: ['name'],
                        //If town in queryString, filter by it
                        where: ifExists('town', town)
                    },
                ],
                //Atributes of Musician we want to get 
                attributes: [
                    'id', 
                    'username', 
                    'image',
                    'name',
                    'age',
                    //We take the count of all instruments asociated to a musician
                    [sequelize.literal('(SELECT COUNT(DISTINCT `musicians_instruments`.`instrument_id`) FROM `musicians_instruments` WHERE `musicians_instruments`.`musician_id` = `Musician`.`id`)'), 'instrument_count'],
                    //We take the count of all styles asociated to a musician
                    [sequelize.literal('(SELECT COUNT(DISTINCT `musicians_styles`.`style_id`) FROM `musicians_styles` WHERE `musicians_styles`.`musician_id` = `Musician`.`id`)'), 'style_count']
                ],
                //We group the data by musician id
                group: ['Musician.id'],
                having: {
                    [Op.and]: [
                        sequelize.literal(`instrument_count >= ${instrumentsArray.length}`),
                        sequelize.literal(`style_count >= ${stylesArray.length}`)
                    ]
                },
                // //This having is to make the request look at all instrments asociated
                // having: sequelize.literal(`instrument_count >= ${instrumentsArray.length}`),
                // //This having is to make the request look at all styles asociated
                // having: sequelize.literal(`style_count >= ${stylesArray.length}`),  
                raw: true,
                nest: true,

            });
            return musicians;
        } catch (error) {
            const errorGettingMusicians = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingMusicians');
            throw {
                code: 'internalServerError',
                key: errorGettingMusicians,
            };
        }
    },

    //Getting all confirmed musicians
    getOne: async (username) => {
        try {
            const musicians = await Musician.findOne({
                where: {
                    //Musician must be confirmed
                    username: username,
                    is_confirmed: true,
                },
                include: [
                    //---INSTRUEMNTS---//
                    {
                        model: Instrument,
                        through: { attributes: [] },
                        //Taking de name atribute of instruments associated to musicians
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `instruments`.`name`)'), 'instrument_names']]
                    },
                    //---STYLES---//
                    {
                        model: Style,
                        through: { attributes: [] },
                        //Taking de name atribute of styles associated to musicians
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `styles`.`name`)'), 'style_names']]
                    },
                    //---PROVINCE---//
                    {
                        model: Province,
                        //Taking de name atribute of province associated to musicians
                        attributes: ['name']
                    },
                    //---TOWN---//
                    {
                        model: Town,
                        //Taking de name atribute of province associated to musicians
                        attributes: ['name']
                    },
                ],
                //Atributes of Musician we want to get 
                attributes: [
                    'id', 
                    'username',
                    'image',
                    'name',
                    'age'
                ],
                //We group the data by musician id
                group: ['Musician.id'],
                raw: true,
                nest: true
            });
            return musicians;
        } catch (error) {
            const errorGettingMusicians = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingMusicians');
            throw {
                code: 'internalServerError',
                key: errorGettingMusicians,
            };
        }
    },
    
    //Update password from recoverPassword request
    updateEmail: async (email, username) => {
        try {
            const updatedMusician = await Musician.update(
                { email: email },
                { where: { username } }
            );
            console.log('Updated', updatedMusician);
            return updatedMusician;
        } catch (error) {
            const errorUpdatingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');
            throw {
                code: 'internalServerError',
                key: errorUpdatingMusician,
            };
        }
    },

    //Update password from recoverPassword request
    updateUsername: async (newUsername, username) => {
        try {
            const updatedMusician = await Musician.update(
                { username: newUsername },
                { where: { username } }
            );
            console.log('Updated', updatedMusician);
            return updatedMusician;
        } catch (error) {
            const errorUpdatingMusician = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingMusician');
            throw {
                code: 'internalServerError',
                key: errorUpdatingMusician,
            };
        }
    },
}