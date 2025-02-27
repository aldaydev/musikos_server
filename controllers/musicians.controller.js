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

    getAndFilter: async (req, res, next) => {
        try {
            const musicians = await musicianService.getAll();

            // console.log(musicians);

            // const adaptMusicians = musicians.map((musician)=>{
            //     console.log('Un musician', musician.dataValues);
            //     return {...musician.dataValues, age: JSON.parse(musician.age)}
            // })

            console.log(musicians[0].dataValues.region);

            const musiciansData = musicians.reduce((acc, curr) => {
                const musicianData = {
                    name: curr.name,
                    username: curr.username,
                    age: curr.dataValues.age,
                    instruments: curr.Instruments,
                    styles: curr.Styles,
                    image: curr.image
                }
                acc.push(musicianData);
                return acc;
            }, [])

            // console.log(musicians);
            res.json(musiciansData);
        } catch (error) {
            next(error);
        }
    }

}