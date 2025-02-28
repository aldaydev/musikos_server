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

                const instruments = Array.from(Object.values(curr.Instruments));
                const styles = Array.from(Object.values(curr.Styles));
                console.log("Instruments", styles);
                
                const musicianData = {
                    name: curr.name || 'No indicado',
                    username: curr.username,
                    age: curr.age || 'No indicado',
                    instruments: instruments[0] ? instruments : 'No indicado',
                    styles: styles[0] ? styles : 'No indicado',
                    image: curr.image,
                    region: curr.Region && curr.Region.name || 'No indicado'

                }
                
                acc.push(musicianData);
                return acc;
            }, [])

            console.log("SOLO ESTE",musiciansData);
            res.json(musiciansData);
        } catch (error) {
            next(error);
        }
    }

}