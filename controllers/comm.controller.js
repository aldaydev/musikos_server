import e from "express";
import commService from "../services/mongo/comm.service.js";

export default {
    usercomm: async (req, res, next) => {
        try {
            const user_id = req.query.user_id;
            const user_comms = await commService.findUserComms(user_id);
            console.log('USERCOMMS', user_comms);
            let comms = user_comms.map(async(comm) => {
                console.log(comm);
                const commInfo = await commService.findComm(comm);
                return commInfo[0];
            })
            
            comms = await Promise.all(comms);
            console.log('comms', comms);
            res.status(200).json(comms);
        } catch (error) {
            next(error);
        }
    }
}