import { Instrument } from "../../models/mysql.models/instrument.model.js"
import { Region } from "../../models/mysql.models/region.model.js";
import { Style } from "../../models/mysql.models/style.model.js";

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

    getRegions: async () => {
        try {
            const regions = await Region.findAll({
                order: [['id', 'ASC']]
            });
            return regions;
        } catch (error) {
            const errorGettingRegions = new LogError({
                message: 'Fail at searching in MySQL',
                error: error.message
            }).add('errorGettingRegions');
            throw {
                code: 'internalServerError',
                key: errorGettingRegions,
            };
        }
    }
}