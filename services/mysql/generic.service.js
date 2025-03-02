import { Instrument } from "../../models/mysql.models/instrument.model.js"
import { Province } from "../../models/mysql.models/province.model.js";
import { Region } from "../../models/mysql.models/region.model.js";
import { Style } from "../../models/mysql.models/style.model.js";
import { Town } from "../../models/mysql.models/town.model.js";

export default {
    getInstruments: async () => {
        try {
            const instruments = await Instrument.findAll({
                order: [['id', 'ASC']]
            });
            return instruments;
        } catch (error) {
            const errorGettingInstruments = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingInstruments');
            throw {
                code: 'internalServerError',
                key: errorGettingInstruments,
            };
        }
    },

    getStyles: async () => {
        try {
            const styles = await Style.findAll({
                order: [['id', 'ASC']]
            });
            return styles;
        } catch (error) {
            const errorGettingStyles = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingStyles');
            throw {
                code: 'internalServerError',
                key: errorGettingStyles,
            };
        }
    },

    getProvinces: async () => {
        try {
            const regions = await Province.findAll({
                order: [['id', 'ASC']]
            });
            return regions;
        } catch (error) {
            const errorGettingProvinces = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingProvinces');
            throw {
                code: 'internalServerError',
                key: errorGettingProvinces,
            };
        }
    },

    getTowns: async (parent_code) => {
        try {
            const provinces = await Town.findAll({
                where: { parent_code: parent_code },
                order: [['id', 'ASC']]
            });
            return provinces;
        } catch (error) {
            const errorGettingTowns = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingTowns');
            throw {
                code: 'internalServerError',
                key: errorGettingTowns,
            };
        }
    },
}