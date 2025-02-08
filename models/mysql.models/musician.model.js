import { DataTypes, INTEGER } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Definición del modelo Musician
const Musician = sequelize.define('Musician', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //Datos necesarios para el signup
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accepted_terms_at: {
        type: DataTypes.DATE,
        allowNull: false, // Obliga a aceptar los términos al registrarse.
        defaultValue: DataTypes.NOW, // Registra automáticamente la fecha de aceptación.
    },
    accepted_privacy_at: {
        type: DataTypes.DATE,
        allowNull: false, // Lo mismo para la política de privacidad.
        defaultValue: DataTypes.NOW,
    },
    //Datos que se introducen una vez creado
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'default-musician.png'
    },
    first_name: {
        type: DataTypes.STRING(50)
    },
    last_name: {
        type: DataTypes.STRING(50)
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            min: 18, // Edad mínima
            max: 99  // Edad máxima
        }
    },
    slogan: {
        type: DataTypes.STRING(150)
    },
    description: {
        type: DataTypes.STRING(500)
    },
    web: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    },
    tiktok: {
        type: DataTypes.STRING
    },
    last_connection: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'musicians'
});

export { Musician };