import sequelize from '../../config/mysql.config.js';

const Musician_Instrument = sequelize.define(
    'Musician_Instrument', 
    {}, 
    {
        tableName: 'musicians_instruments', // Nombre exacto de la tabla
        timestamps: false,
    }
);

export default Musician_Instrument;