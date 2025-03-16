import logger from "../../config/logger.config.js";
import sequelize from "../../config/mysql.config.js";
import { Instrument, Profile, Style } from "../../models/mysql.models/associations.js";
import { Province } from "../../models/mysql.models/province.model.js";
import { Town } from "../../models/mysql.models/town.model.js";
import { LogError } from "../../utils/errors/logErrors.js";
import { Op } from "sequelize";

export default {

    //Find a Profile through a single value
    findOne: async (key, value) => {
        try {
            const element = await Profile.findOne({ where: { [key]: value } });
            return element;
        } catch (error) {
            const errorFindingProfile = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorFindingProfile');
            throw { code: 'internalServerError', key: errorFindingProfile };
        }
    },

    //Create a new Profile
    create: async (data) => {
        try {
            const newProfile = await Profile.create(data);
            return newProfile;
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

    //Check if a Profile has confirmed the account
    checkConfirmed: async (username, type) => {
        try {
            const isConfirmed = await Profile.findOne({
                where: {
                    username,
                    is_confirmed: true
                }
            });
            return isConfirmed;
        } catch (error) {
            const errorFindingProfile = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorFindingProfile');
            throw {
                code: 'internalServerError',
                key: errorFindingProfile,
                redirect: `/login?error=internal&type=${type}&username=${username}`
            };
        }
    },

    //Update is_confirmed value for a Profile (with redirection)
    updateIsConfirmed: async (username, type) => {
        try {
            const updateProfile = await Profile.update(
                { is_confirmed: true },
                { where: { username } }
            );
            return updateProfile;
        } catch (error) {
            const errorUpdatingProfile = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingProfile');
            throw {
                code: 'internalServerError',
                key: errorUpdatingProfile,
                redirect: `/login?error=internal&type${type}&username=${username}`
            };
        }
    },

    //Check if a usernmae or email exists related to a Profile
    checkUser: async (login) => {
        try {
            //Find if username or email exists in MySQL
            const result = await Profile.findOne({
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
            const errorCheckingProfile = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorCheckingProfile');
            throw {
                code: 'internalServerError',
                key: errorCheckingProfile,
            };
        }
    },

    //Update password from recoverPassword request
    updatePassword: async (password, username) => {
        try {
            const updatedProfile = await Profile.update(
                { password: password },
                { where: { username } }
            );
            return updatedProfile;
        } catch (error) {
            const errorUpdatingProfile = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingProfile');
            throw {
                code: 'internalServerError',
                key: errorUpdatingProfile,
            };
        }
    },

    //Check if a Profile is requesting (can redirect)
    checkisRequesting: async (username, response = normal) => {
        try {
            const isConfirmed = await Profile.findOne({
                where: {
                    username,
                    is_requesting: true
                }
            });
            return isConfirmed;
        } catch (error) {

            const errorFindingProfile = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorFindingProfile');

            if (response === 'normal') {
                throw {
                    code: 'internalServerError',
                    key: errorFindingProfile,
                };
            } else if (response === 'query') {
                throw {
                    code: 'internalServerError',
                    key: errorFindingProfile,
                    redirect: `/login?error=internal&type=isRequesting&username=${username}`
                };
            }
        }
    },

    //Update is_requesting value for a Profile (with redirection)
    updateIsRequesting: async (username, state, response = 'normal') => {
        try {
            const updatedProfile = await Profile.update(
                { is_requesting: state },
                { where: { username } }
            );
            return updatedProfile;
        } catch (error) {
            const errorUpdatingProfile = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorUpdatingProfile');

            if (response === 'normal') {
                throw {
                    code: 'internalServerError',
                    key: errorUpdatingProfile,
                };
            } else if (response === 'query') {
                throw {
                    code: 'internalServerError',
                    key: errorUpdatingProfile,
                    redirect: `/login?error=internal&type=isRequesting&username=${username}`
                };
            }
        }
    },

    //Update is_requesting value for all Profiles
    updateAllisRequesting: async () => {
        try {
            await Profile.update(
                { is_requesting: false },
                { where: { is_requesting: true } }
            );
            logger.info('MySQL - All "is_requesting" fields reset');
        } catch (error) {
            logger.error('MySQL - Error at reseting "is_requesting" fields');
        }
    },

    //Getting all confirmed Profiles
    getAll: async () => {
        try {
            const Profiles = await Profile.findAll({
                where: {
                    //Profile must be confirmed
                    is_confirmed: true,
                },
                include: [
                    //---INSTRUEMNTS---//
                    {
                        model: Instrument,
                        through: { attributes: [] },
                        //Taking de name atribute of instruments associated to Profiles
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `instruments`.`name`)'), 'instrument_names']]
                    },
                    //---STYLES---//
                    {
                        model: Style,
                        through: { attributes: [] },
                        //Taking de name atribute of styles associated to Profiles
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `styles`.`name`)'), 'style_names']]
                    },
                    //---PROVINCE---//
                    {
                        model: Province,
                        //Taking de name atribute of province associated to Profiles
                        attributes: ['name']
                    },
                    //---TOWN---//
                    {
                        model: Town,
                        //Taking de name atribute of province associated to Profiles
                        attributes: ['name']
                    },
                ],
                //Atributes of Profile we want to get 
                attributes: [
                    'id', 
                    'username',
                    'image',
                    'name',
                    'age'
                ],
                //We group the data by Profile id
                group: ['Profile.id'],
                raw: true,
                nest: true
            });
            return Profiles;
        } catch (error) {
            const errorGettingProfiles = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingProfiles');
            throw {
                code: 'internalServerError',
                key: errorGettingProfiles,
            };
        }
    },

    //Getting filtered Profiles
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
            const Profiles = await Profile.findAll({
                where: {
                    //Profile must be confirmed
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
                        //Taking de name atribute of instruments associated to Profiles
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `instruments`.`name`)'), 'instrument_names']],
                        //If instruments in queryString, filter by them
                        where: ifExists('instruments', instruments)
                    },
                    //---STYLES---//
                    {
                        model: Style, 
                        through: { attributes: [] },
                        //Taking de name atribute of styles associated to Profiles
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `styles`.`name`)'), 'style_names']],
                        //If styles in queryString, filter by them
                        where: ifExists('styles', styles)
                    },
                    //---PROVINCE---//
                    {
                        model: Province,
                        //Taking de name atribute of province associated to Profiles
                        attributes: ['name'],
                        //If province in queryString, filter by it
                        where: ifExists('province', province)
                    },
                    //---TOWN---//
                    {
                        model: Town,
                        //Taking de name atribute of town associated to Profiles
                        attributes: ['name'],
                        //If town in queryString, filter by it
                        where: ifExists('town', town)
                    },
                ],
                //Atributes of Profile we want to get 
                attributes: [
                    'id', 
                    'username', 
                    'image',
                    'name',
                    'age',
                    //We take the count of all instruments asociated to a Profile
                    [sequelize.literal('(SELECT COUNT(DISTINCT `Profiles_instruments`.`instrument_id`) FROM `Profiles_instruments` WHERE `Profiles_instruments`.`Profile_id` = `Profile`.`id`)'), 'instrument_count'],
                    //We take the count of all styles asociated to a Profile
                    [sequelize.literal('(SELECT COUNT(DISTINCT `Profiles_styles`.`style_id`) FROM `Profiles_styles` WHERE `Profiles_styles`.`Profile_id` = `Profile`.`id`)'), 'style_count']
                ],
                //We group the data by Profile id
                group: ['Profile.id'],
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
            return Profiles;
        } catch (error) {
            const errorGettingProfiles = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingProfiles');
            throw {
                code: 'internalServerError',
                key: errorGettingProfiles,
            };
        }
    },

    //Getting all confirmed Profiles
    getOne: async (username) => {
        try {
            const Profiles = await Profile.findOne({
                where: {
                    //Profile must be confirmed
                    username: username,
                    is_confirmed: true,
                },
                include: [
                    //---INSTRUEMNTS---//
                    {
                        model: Instrument,
                        through: { attributes: [] },
                        //Taking de name atribute of instruments associated to Profiles
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `instruments`.`name`)'), 'instrument_names']]
                    },
                    //---STYLES---//
                    {
                        model: Style,
                        through: { attributes: [] },
                        //Taking de name atribute of styles associated to Profiles
                        attributes: [[sequelize.literal('GROUP_CONCAT(DISTINCT `styles`.`name`)'), 'style_names']]
                    },
                    //---PROVINCE---//
                    {
                        model: Province,
                        //Taking de name atribute of province associated to Profiles
                        attributes: ['name']
                    },
                    //---TOWN---//
                    {
                        model: Town,
                        //Taking de name atribute of province associated to Profiles
                        attributes: ['name']
                    },
                ],
                //Atributes of Profile we want to get 
                attributes: [
                    'id', 
                    'username',
                    'image',
                    'name',
                    'age'
                ],
                //We group the data by Profile id
                group: ['Profile.id'],
                raw: true,
                nest: true
            });
            return Profiles;
        } catch (error) {
            const errorGettingProfiles = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingProfiles');
            throw {
                code: 'internalServerError',
                key: errorGettingProfiles,
            };
        }
    },
    
    //Update password from recoverPassword request
    updateEmail: async (email, username) => {
        try {
            const updatedProfile = await Profile.update(
                { email: email },
                { where: { username } }
            );
            console.log('Updated', updatedProfile);
            return updatedProfile;
        } catch (error) {
            const errorUpdatingProfile = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingProfile');
            throw {
                code: 'internalServerError',
                key: errorUpdatingProfile,
            };
        }
    },

    //Update password from recoverPassword request
    updateUsername: async (newUsername, username) => {
        try {
            const updatedProfile = await Profile.update(
                { username: newUsername },
                { where: { username } }
            );
            console.log('Updated', updatedProfile);
            return updatedProfile;
        } catch (error) {
            const errorUpdatingProfile = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorUpdatingProfile');
            throw {
                code: 'internalServerError',
                key: errorUpdatingProfile,
            };
        }
    },

    deleteAccount: async (username) => {
        try {
            const deletedProfile = await Profile.destroy({
                where: { username }
            });
            console.log('Deleting', deletedProfile);
            return deletedProfile;
        } catch (error) {
            const errorDeletingProfile = new LogError({
                message: 'Fail at deleting in MySQL',
                error: error.message
            }).add('errorDeletingProfile');
            throw {
                code: 'internalServerError',
                key: errorDeletingProfile,
            };
        }
    }
}