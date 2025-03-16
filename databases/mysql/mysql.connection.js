//Logger import
import logger from "../../config/logger.config.js";

//Sequelize config import
import sequelize from "../../config/mysql.config.js";

//Sequelize Models imports
import { User, Profile, Style, Instrument, Province, Town } from '../../models/mysql.models/associations.js';

import Profile_Style from "../../models/mysql.models/profile_style.model.js";
import Profile_Instrument from "../../models/mysql.models/profile_instrument.model.js";

//Sequelize Seeding tables imports
import { seedInstruments, seedProfiles, seedProfilesIntruments, seedProfilesStyles, seedProvinces, seedStyles, seedTowns } from "./mysql.seed.js";



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
            await User.sync({ force: true });

            await Profile.sync({ force: true });
            await seedProfiles();
            await Style.sync({ force: true });
            await seedStyles();
            await Instrument.sync({ force: true });
            await seedInstruments();
            await Profile_Style.sync({ force: true });
            await seedProfilesStyles();
            await Profile_Instrument.sync({ force: true });
            await seedProfilesIntruments();
            
            await Province.sync({ force: true });
            await seedProvinces();
            await Town.sync({ force: true });
            await seedTowns();


            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');  // Activar claves foráneas
            logger.info('MySQL - Models synchronized and cleared');
        }catch(error){
            logger.error({message: 'MySQL - Error synchronizing models', error: error.original.sqlMessage});
        }
    },
    //Seed MySQL tables
    seedTables: async () => {
        try{
            
            
            // await seedRegions();
            // await seedProvinces();
            // await seedTowns();
            // await seedProfiles();
            // await seedStyles();
            // await seedInstruments();
            // await seedProfilesIntruments();
            
            
        }catch(error){
            logger.error({message: 'MySQL - Error seeding tables', error: error});
        }
    }
}


