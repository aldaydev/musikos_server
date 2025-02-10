//Logger import
import logger from '../config/logger.config.js';

//Mongoose imports
import mongoose from 'mongoose';
import mongoConfig from '../config/mongo.config.js';

//Mongoose Seeding tables imports
import seedLegal from './mongo.seed.js';

const shutdown = async () => {
    try {
        await mongoose.disconnect();
        logger.info("MongoDB - Closed");
    } catch (error) {
        logger.error("MongoDB - Error closing", error);
    }
};

process.on("SIGINT", shutdown); // Cuando se cierra el servidor manualmente
process.on("SIGTERM", shutdown); // Cuando se apagada el servidor

class MongoDB {

    async connect(){
        try {
            await mongoose.connect(mongoConfig.uri, mongoConfig.options);
            logger.info('MongoDB - Connected');
        } catch (error) {
            logger.error('MongoDB - Error connecting');
        }
    }

    async close(){
        try {
            await mongoose.disconnect();
            logger.info('MongoDB - Closed');
        } catch (error) {
            logger.error('MySQL - Error closing');
        }
    }

    async seedTables(){
        try {
            await seedLegal();
            logger.info('MongoDB - All static tables seeded');
        } catch (error) {
            logger.error('MongoDB - Error at seeding tables');
        }
    }
}

export default new MongoDB;