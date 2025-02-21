import sequelize from '../../config/mysql.config.js';

// Defining Musician_Instrument model
const Musician_Instrument = sequelize.define(
    'Musician_Instrument', 
    {}, //Empty because it has no more data than the foreign keys
    {
        tableName: 'musicians_instruments', // Nombre exacto de la tabla
        timestamps: false,
    }
);

export default Musician_Instrument;