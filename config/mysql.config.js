import { Sequelize } from 'sequelize';
import logger from './logger.config.js';

//Configuración de la conexión a BD
const sequelize = new Sequelize(
    process.env.MYSQL_NAME, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASS, 
    {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+01:00',
    port: process.env.MYSQL_PORT,
    logging: false, // Desactiva los logs SQL
    pool: {
        max: 5, // Número máximo de conexiones en el pool
        min: 1, // Número mínimo de conexiones en el pool
        acquire: 30000, // Tiempo máximo intento de conexión en ms
        idle: 10000 // Conexión inactiva liberada en ms
    },
    // define: {
    //     timestamps: true, // Añade automáticamente createdAt y updatedAt a los modelos
    //     underscored: true, // Usa snake_case en lugar de camelCase para los nombres de columnas
    // }
});

const shutdown = async () => {
    try {
        await sequelize.close();
        logger.info("MySQL - Closed");
    } catch (error) {
        logger.error("MySQL - Error closing", error);
    }
};

process.on("SIGINT", shutdown); // Cuando se cierra el servidor manualmente
process.on("SIGTERM", shutdown); // Cuando se apagada el servidor

export default sequelize;

