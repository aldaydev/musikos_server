import commService from "../services/mongo/comm.service.js";

export default {
    usercomm: async (req, res, next) => {
        console.log('Entra aquí');
        try {
            const user_id = req.query.user_id;
            console.log(user_id);
            const user_comms = await commService.findUserComms(user_id);
            let comms = user_comms.map(async(comm) => {
                const commInfo = await commService.findComm(comm);
                return commInfo[0];
            })
            
            comms = await Promise.all(comms);
            res.status(200).json(comms);
        } catch (error) {
            next(error);
        }
    }
}