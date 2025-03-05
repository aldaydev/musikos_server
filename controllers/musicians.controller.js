//Services imports
import musicianService from "../services/mysql/musician.service.js";

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

    //Get all musicians (without filtering)
    getAll: async (req, res, next) => {
        try {
            const musicians = await musicianService.getAll();

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
                    province: curr.Province && curr.Province.name || 'No indicado',
                    town: curr.Town && curr.Town.name,
                }
                
                acc.push(musicianData);
                return acc;
            }, [])

            res.status(200).json(musiciansData);
        } catch (error) {
            next(error);
        }
    },

    //Get filtered musicians (by query params)
    filter: async (req, res, next) => {
        try{
            let {minAge, maxAge, styles, instruments, province, town, name} = req.query;

            const filteredMusicians = await musicianService.filter(minAge, maxAge, styles, instruments, province, town, name);

            const musiciansData = filteredMusicians.reduce((acc, curr) => {

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
                    province: curr.Province && curr.Province.name || 'No indicado',
                    town: curr.Town && curr.Town.name
                }
                
                acc.push(musicianData);
                return acc;
            }, [])

            res.status(200).json(musiciansData);
        }catch(error){
            next(error);
        }
    }

}