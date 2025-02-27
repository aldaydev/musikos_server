//Logger import
import logger from "../../config/logger.config.js";

//Sequelize config import
import sequelize from "../../config/mysql.config.js";

//Sequelize Models imports
import { Musician, Style, Instrument } from '../../models/mysql.models/asociations.js';
import { Region } from "../../models/mysql.models/region.model.js";
import { Province } from "../../models/mysql.models/province.model.js";
import { Town } from "../../models/mysql.models/town.model.js";
import Musician_Style from "../../models/mysql.models/musician_style.model.js";
import Musician_Instrument from "../../models/mysql.models/musicians_instruments.model.js";

//Sequelize Seeding tables imports
import { seedInstruments, seedMusicians, seedProvinces, seedRegions, seedStyles, seedTowns } from "./mysql.seed.js";


export default {
    //Connect to MySQL
    connect: async () => {
        try{
            await sequelize.authenticate();
            logger.info('MySQL - Connected');
        }catch(error){
            logger.error({message: 'MySQL - Error connecting', error: error.original.sqlMessage});
        }
    },
    //Disconnect from MySQL
    close: async () => {
        try{
            sequelize.close();
            logger.info('MySQL - Closed');
        }catch(error){
            logger.error({message: 'MySQL - Error closing', error: error.original.sqlMessage});
        }
    },
    //Sync MySQL models
    syncModels: async () => {
        try{
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');  // Desactivar claves foráneas

            //Force: true to delete all data an create black tables
            await Musician.sync({ force: true });
            await Musician_Style.sync({ force: true });
            await Musician_Instrument.sync({ force: true });

            await Style.sync({ force: true });
            await Instrument.sync({ force: true });
            await Region.sync({ force: true });
            await Province.sync({ force: true });
            await Town.sync({ force: true });

            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');  // Activar claves foráneas
            logger.info('MySQL - Models synchronized and cleared');
        }catch(error){
            logger.error({message: 'MySQL - Error synchronizing models', error: error.original.sqlMessage});
        }
    },
    //Seed MySQL tables
    seedTables: async () => {
        try{
            await seedStyles();
            await seedInstruments();
            await seedRegions();
            await seedProvinces();
            await seedTowns();
            await seedMusicians();
        }catch(error){
            logger.error({message: 'MySQL - Error seeding tables', error: error});
        }
    }
}


