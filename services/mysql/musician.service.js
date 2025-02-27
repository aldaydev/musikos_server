import logger from "../../config/logger.config.js";
import { Instrument, Musician, Style } from "../../models/mysql.models/asociations.js";
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
    updatePassword: async (password, username, type) => {
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
            // const errorUpdatingMusician = new LogError({
            //     message: 'Fail at updating in MySQL',
            //     error: error.message
            // }).add('errorUpdatingMusician');
            // throw { code: 'internalServerError', 
            //     key: errorUpdatingMusician, 
            //     redirect: `/login?error=internal&type${type}&username=${username}`
            // };
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

    //Update is_requesting value for a Musician (can redirect)
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

    updateAllisRequesting: async () => {
        try {
            await Musician.update(
                { is_requesting: false },
                { where: { is_requesting: true } }
            );
            logger.info('MySQL - All "is_requesting" fields reset');
        } catch (error) {
            logger.error('MySQL - Error at resetgin "is_requesting" fields');
        }
    },

    getAll: async () => {
        try {
            const musicians = await Musician.findAll({
                where: {
                    is_confirmed: true,
                },
                include: [
                    {
                        model: Instrument,  // Incluir los instrumentos
                        through: { attributes: [] },  // No incluir los atributos de la tabla intermedia
                        attributes: ['instrument_name']
                    },
                    {
                        model: Style,  // Incluir los estilos
                        through: { attributes: [] },
                        attributes: ['style_name']
                    }
                ],
                attributes: [
                    'id', 
                    'username', 
                    'image'
                ], 
            });
            return musicians;
        } catch (error) {
            const errorGettingMusicians = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorGettingMusicians');
            throw {
                code: 'internalServerError',
                key: errorGettingMusicians,
            };
        }
    }
}