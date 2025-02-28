//Dependency imports
import Token from "../utils/token.js";

//Email views import
import EmailViews from "../views/email.views.js";
import logger from "../config/logger.config.js";
import musicianService from "../services/mysql/musician.service.js";
import Email from "../utils/mailing.js";
import token from "../utils/token.js";

export default {

    //Check if a email already exists
    checkEmail: async (req, res, next) => {
        try {
            if (!req.body.email) {
                throw { code: 'badRequest' }
            }

            const exists = await musicianService.findOne('email', req.body.email);

            if (exists) {
                res.status(200).json({ exists: true });
            } else {
                res.status(200).json({ exists: false });
            }
        } catch (error) {
            next(error);
        }
    },

    //Check if a username already exists
    checkUsername: async (req, res, next) => {
        try {
            if (!req.body.username) {
                throw { code: 'badRequest' }
            }

            const exists = await musicianService.findOne('username', req.body.username);

            if (exists) {
                res.status(200).json({ exists: true });
            } else {
                res.status(200).json({ exists: false });
            }
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const musicians = await musicianService.getAll();

            // console.log(musicians);

            const musiciansData = musicians.reduce((acc, curr) => {

                let instruments = curr.Instruments.instrument_names;
                let splitInstruments = [];
                instruments ? splitInstruments = instruments.split(',')
                            : splitInstruments = null;
                

                const styles = curr.Styles.style_names;
                let splitStyles = [];
                styles ? splitStyles = styles.split(',')
                        : splitStyles = null;

                const musicianData = {
                    username: curr.username,
                    image: curr.image,
                    name: curr.name || 'No indicado',
                    age: curr.age || 'No indicado',
                    instruments: splitInstruments,
                    styles: splitStyles,
                    region: curr.Region && curr.Region.name || 'No indicado'

                }
                
                acc.push(musicianData);
                return acc;
            }, [])

            res.json(musiciansData);
        } catch (error) {
            next(error);
        }
    }

}