import { Sequelize } from 'sequelize';
import logger from './logger.config.js';
import musicianService from '../services/mysql/musician.service.js';

//Sequelize configuration
const sequelize = new Sequelize(
    process.env.MYSQL_NAME, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASS, 
    {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+01:00', //Set the time zone
    port: process.env.MYSQL_PORT,
    logging: false, // Disable SQL logs
    pool: {
        max: 5, //Max number of connections in the pool
        min: 1, //Min number of connections in the pool
        acquire: 30000, //Max time sequelize tries to connect
        idle: 10000 //Time sequelize waits to close an inactive connection
    },
    // logging: console.log,
    define: {
        timestamps: true, //Automatically adds createdAt and updatedAt to models
        underscored: true, //Use snake_case instead of camelCase for column names
    }
});

//Close connection to MySQL if server shutdowns
const shutdown = async () => {
    try {
        await sequelize.close();
        logger.info("MySQL - Closed");
    } catch (error) {
        logger.error("MySQL - Error closing", error);
    }finally{
        process.exit(0);
    }
};

process.on("SIGINT", shutdown); //When server is closed manually
process.on("SIGTERM", shutdown); //When server is shut down (docker)
process.on("beforeExit", shutdown); //Before server close

export default sequelize;

