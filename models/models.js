import { DataTypes } from 'sequelize';
import sequelize from '../databases/sql.connect.js';

// Definición del modelo Musician
const Musician = sequelize.define('Musician', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'musicians'
});

export { Musician };