import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Style model
const Region = sequelize.define('Region', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'regions',
    timestamps: false
    }
);

export { Region };