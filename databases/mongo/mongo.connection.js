//Logger import
import logger from '../../config/logger.config.js';

//Mongoose imports
import mongoose from 'mongoose';
import mongoConfig from '../../config/mongo.config.js';

//Mongoose Seeding tables imports
import {seedLegal, seedComm, seedUsercomm} from './mongo.seed.js';

//Close connection to MongoDB if server shutdowns
export const shutdown = async () => {
    try {
        await mongoose.disconnect();
        logger.info("MongoDB - Closed");
    } catch (error) {
        logger.error("MongoDB - Error closing", error);
    }finally{
        process.exit(0);
    }
};

process.on("SIGINT", shutdown); //When server is closed manually
process.on("SIGTERM", shutdown); //When server is shut down
process.on("beforeExit", shutdown); //Before server close

export default {
    //Connect to MongoDB
    connect: async () => {
        try {
            await mongoose.connect(mongoConfig.uri, mongoConfig.options);
            logger.info('MongoDB - Connected');
        } catch (error) {
            logger.error('MongoDB - Error connecting');
        }
    },
    //Disconnect from MongoDB
    disconnect: async () => {
        try {
            await mongoose.disconnect();
            logger.info('MongoDB - Closed');
        } catch (error) {
            logger.error('MySQL - Error closing');
        }
    },
    //Seed MongoDB tables
    seedTables: async () => {
        try {
            await seedLegal();
            await seedComm();
            await seedUsercomm();
            logger.info('MongoDB - All static tables seeded');
        } catch (error) {
            logger.error('MongoDB - Error at seeding tables');
        }
    }
}