import { Sequelize, DataTypes } from 'sequelize';

// Configuración de la conexión
const sequelize = new Sequelize('bandbros', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false // Desactiva los logs SQL
});

// Definición del modelo User
const Musician = sequelize.define('Musician', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'musicians'
});

// Función para conectar a la base de datos
async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida correctamente.");
        await Musician.sync(); // Esto crea la tabla si no existe
        console.log("Modelo User sincronizado con la base de datos.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
}