import { Sequelize } from 'sequelize';

//Configuración de la conexión a BD
const sequelize = new Sequelize('bandbros', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false, // Desactiva los logs SQL
    pool: {
        max: 5, // Número máximo de conexiones en el pool
        min: 0, // Número mínimo de conexiones en el pool
        acquire: 30000, // Tiempo máximo intento de conexión en ms
        idle: 10000 // Conexión inactiva liberada en ms
    },
    define: {
        timestamps: true, // Añade automáticamente createdAt y updatedAt a los modelos
        underscored: true, // Usa snake_case en lugar de camelCase para los nombres de columnas
    }
});

export default sequelize;

