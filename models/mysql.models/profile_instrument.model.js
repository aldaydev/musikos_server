import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Profile_Instrument model
const Profile_Instrument = sequelize.define(
    'Profile_Instrument', 
    {
        profile_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Profile',
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
        tableName: 'profiles_instruments', // Nombre exacto de la tabla
        timestamps: false,
    }
);

export default Profile_Instrument;