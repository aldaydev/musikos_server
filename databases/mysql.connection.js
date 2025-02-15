//Logger import
import logger from "../config/logger.config.js";

//Sequelize config import
import sequelize from "../config/mysql.config.js";

//Sequelize Models imports
import { Musician, Style, Instrument } from '../models/mysql.models/asociations.js';
import Musician_Style from "../models/mysql.models/musician_style.model.js";
import Musician_Instrument from "../models/mysql.models/musicians_instruments.model.js";

//Sequelize Seeding tables imports
import { seedInstruments, seedStyles } from "./mysql.seed.js";


class MySQL {

    async connect(){
        try{
            await sequelize.authenticate();
            logger.info('MySQL - Connected');
        }catch(error){
            logger.error({message: 'MySQL - Error connecting', details: error.original.sqlMessage});
        }
    }

    async close(){
        try{
            sequelize.close();
            logger.info('MySQL - Closed');
        }catch(error){
            logger.error({message: 'MySQL - Error closing', details: error.original.sqlMessage});
        }
    }

    async syncModels(){
        try{
            await Musician.sync();
            await Style.sync();
            await Instrument.sync();
            await Musician_Style.sync();
            await Musician_Instrument.sync();
            logger.info('MySQL - Models synchronized');
        }catch(error){
            logger.error({message: 'MySQL - Error synchronizing models', details: error.original.sqlMessage});
        }
        
    }

    async seedTables(){
        try{
            await seedStyles();
            await seedInstruments();
            logger.info('MySQL - All static tables seeded');
        }catch(error){
            logger.error({message: 'MySQL - Error seeding tables', details: error.original.sqlMessage});
        }
    }
}

export default new MySQL;

