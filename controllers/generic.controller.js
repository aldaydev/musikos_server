import genericService from "../services/mysql/generic.service.js"

export default {
    getInstrumentsAndStyles: async (req, res, next) => {
        try {
            const instruments = await genericService.getInstruments();
            const styles = await genericService.getStyles();

            res.status(200).json({instruments, styles});
        } catch (error) {
            next(error);
        }
    },

    getRegions: async (req, res, next) => {
        try {
            const regions = await genericService.getRegions();
            console.log(regions);
            res.status(200).json(regions);
        } catch (error) {
            next(error);
        }
    }
}