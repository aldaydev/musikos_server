//Logger import
import logger from '../../config/logger.config.js';

//Mongoose imports
import mongoose, { disconnect } from 'mongoose';
import mongoConfig from '../../config/mongo.config.js';

//Mongoose Seeding tables imports
import seedLegal from './mongo.seed.js';

//Close connection to MongoDB if server shutdowns
const shutdown = async () => {
    try {
        await mongoose.disconnect();
        logger.info("MongoDB - Closed");
    } catch (error) {
        logger.error("MongoDB - Error closing", error);
    }
};

process.on("SIGINT", shutdown); //When server is closed manually
process.on("SIGTERM", shutdown); //When server is shut down

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
            logger.info('MongoDB - All static tables seeded');
        } catch (error) {
            logger.error('MongoDB - Error at seeding tables');
        }
    }
}