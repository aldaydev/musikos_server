//dotenv import
import dotenv from 'dotenv';
import logger from './logger.config.js';

//function to activate env variables
const envConfig = () => {
    dotenv.config();
    logger.info('Variables de entorno activas');
}

export default envConfig();