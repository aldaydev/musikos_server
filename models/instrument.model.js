import { DataTypes } from 'sequelize';
import sequelize from '../databases/sql.connect.js';

// Definición del modelo Musician
const Instrument = sequelize.define('Instrument', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    instrument_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'instruments',
    timestamps: false
    }
);

export { Instrument };