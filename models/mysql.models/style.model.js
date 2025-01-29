import { DataTypes } from 'sequelize';
import sequelize from '../../databases/sql.connect.js';

// Definición del modelo Musician
const Style = sequelize.define('Style', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    style_name: {
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