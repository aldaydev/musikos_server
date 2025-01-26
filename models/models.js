import { DataTypes } from 'sequelize';
import sequelize from '../databases/sql.connect.js';

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
    pass: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }
}, {
    tableName: 'musicians'
});

export { Musician };