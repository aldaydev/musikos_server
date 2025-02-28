import genericService from "../services/mysql/generic.service.js"

export default {
    getInstruments: async (req, res, next) => {
        try {
            const instruments = await genericService.getInstruments();
            console.log(instruments);
            res.status(200).json({instruments: instruments})
        } catch (error) {
            next(error);
        }
    }
}