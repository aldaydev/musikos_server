import genericService from "../services/mysql/generic.service.js"

export default {
    getSearchData: async (req, res, next) => {
        try {
            const instruments = await genericService.getInstruments();
            const styles = await genericService.getStyles();
            const provinces = await genericService.getProvinces();

            res.status(200).json({instruments, styles, provinces});
        } catch (error) {
            next(error);
        }
    },

    getProvinces: async (req, res, next) => {
        try {
            const provinces = await genericService.getProvinces();

            res.status(200).json({provinces});
        } catch (error) {
            next(error);
        }
    },

    getTowns: async (req, res, next) => {
        try {
            const parent_code = req.query.code;
            const towns = await genericService.getTowns(parent_code);
            res.status(200).json(towns);
        } catch (error) {
            next(error);
        }
    }
}