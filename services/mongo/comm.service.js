import Comm from "../../models/mongo.models/comm.model.js";
import Usercomm from "../../models/mongo.models/usercomm.model.js";
import { LogError } from "../../utils/errors/logErrors.js";

export default {

    findUserComms: async (user_id) => {
        try {
            const userComms = await Usercomm.findOne({ user_id });
            if(!userComms) {
                return [];
            }
            return userComms.user_comms;
        } catch (error) {
            const errorFindingUserComm = new LogError({
                message: 'Fail at searching in MongoDB',
                error: error.message
            }).add('errorFindingUserComm');
            throw { code: 'internalServerError', key: errorFindingUserComm };
        }
    },

    findComm: async (keyword) => {
        try {
            return await Comm.find({ keyword });
        } catch (error) {
            const errorFindingComm = new LogError({
                message: 'Fail at searching in MongoDB',
                error: error.message
            }).add('errorFindingComm');
            throw { code: 'internalServerError', key: errorFindingComm };
        }
    },

    createComm: async (user_id, comm_keyword) => {
        try {
            const newUserComm = {
                user_id: user_id,
                user_comms: [comm_keyword]
            }
            return await Usercomm.create(newUserComm);
        } catch (error) {
            const errorCreatingComm = new LogError({
                message: 'Fail at creating in MongoDB',
                error: error.message
            }).add('errorCreatingComm');
            throw { code: 'internalServerError', key: errorCreatingComm };
        }
    },
}