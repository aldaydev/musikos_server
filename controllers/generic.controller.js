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

    getProvinces: async (req, res, next) => {
        try {
            const regions = await genericService.getProvinces();
            console.log(regions);
            res.status(200).json(regions);
        } catch (error) {
            next(error);
        }
    },

    getTowns: async (req, res, next) => {
        try {
            const parent_code = parseInt(req.query.code);
            console.log(parent_code)
            const provinces = await genericService.getTowns(parent_code);
            console.log(provinces);
            res.status(200).json(provinces);
        } catch (error) {
            next(error);
        }
    }
}