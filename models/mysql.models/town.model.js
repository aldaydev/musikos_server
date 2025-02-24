import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Style model
const Town = sequelize.define('Town', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parent_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'towns',
    timestamps: false
    }
);

export { Town };