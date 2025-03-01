import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Style model
const Style = sequelize.define('Style', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'styles',
    timestamps: false
    }
);

export { Style };