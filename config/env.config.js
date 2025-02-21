import dotenv from 'dotenv';
import logger from './logger.config.js';

//function to activate env variables
const envConfig = () => {
    dotenv.config();
    logger.info('Server - Environment variables enabled');
}

export default envConfig();