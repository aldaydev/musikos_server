//Services imports
import musicianService from "../services/mysql/musician.service.js";
import { encryptPassword } from '../utils/bcrypt.js';

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
        try {
            let { minAge, maxAge, styles, instruments, province, town, name } = req.query;

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
        } catch (error) {
            next(error);
        }
    },

    getRestrictedData: async (req, res, next) => {
        try {
            const musicianData = await musicianService.findOne('username', req.user.username);
            res.status(200).json(musicianData);
        } catch (error) {
            next(error);
        }
    },

    getPublicData: async (req, res, next) => {
        try {
            const musician = await musicianService.getOne(req.params.username);

            console.log(musician);

            const musicianData = {
                image: musician.image,
                name: musician.name,
                username: musician.username,

            }

        } catch (error) {
            next(error);
        }
    },

    updateValue: async (req, res, next) => {
        try {

            if (req.body.email) {
                await musicianService.updateEmail(req.body.email, req.body.username);
                res.status(200).json({ message: 'Email actualizado correctamente' })
            } else if (req.body.password) {
                const encrypt = await encryptPassword(req.body.password);
                await musicianService.updatePassword(encrypt, req.body.username);
                res.status(200).json({ message: 'Constraseña actualizada correctamente' })
            } else if(req.body.newUsername){
                await musicianService.updateUsername(req.body.newUsername, req.body.username);
                res.status(200).json({ message: 'Username actualizado correctamente' })
            }else{
                throw { code: 'badRequest' }
            }

        } catch (error) {
            next(error);
        }
    }

}