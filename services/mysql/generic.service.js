import { Instrument } from "../../models/mysql.models/instrument.model.js"

export default {
    getInstruments: async () => {
        try {
            const instruments = await Instrument.findAll();
            return instruments;
        } catch (error) {
            const errorGettingInstruments = new LogError({
                message: 'Fail at updating in MySQL',
                error: error.message
            }).add('errorGettingInstruments');
            throw {
                code: 'internalServerError',
                key: errorGettingInstruments,
            };
        }
    }
}