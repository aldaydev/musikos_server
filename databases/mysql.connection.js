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
            logger.error('MySQL - Error connecting', error);
        }
    }

    async close(){
        try{
            sequelize.close();
            logger.info('MySQL - Closed');
        }catch(error){
            logger.error('MySQL - Error closing', error.message)
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
            logger.error('MySQL - Error synchronizing models')
        }
        
    }

    async seedTables(){
        try{
            await seedStyles();
            await seedInstruments();
            logger.info('MySQL - All static tables seeded');
        }catch(error){

        }
    }
}

export default new MySQL;

