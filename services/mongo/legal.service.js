import Legal from "../../models/mongo.models/legal.model.js";
import { LogError } from "../../utils/errors/logErrors.js";

export default {

    findOne: async (value) => {
        try {
            return await Legal.findOne({ type: value });
        } catch (error) {
            const errorFindingLegals = new LogError({
                message: 'Fail at searching in MongoDB',
                error: error.message
            }).add('errorFindingLegals');
            throw { code: 'internalServerError', key: errorFindingLegals };
        }
    }
}