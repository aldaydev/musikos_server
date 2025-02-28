import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Musician_Instrument model
const Musician_Instrument = sequelize.define(
    'Musician_Instrument', 
    {
        musician_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Musician',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        instrument_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Instrument',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        tableName: 'musicians_instruments', // Nombre exacto de la tabla
        timestamps: false,
    }
);

export default Musician_Instrument;