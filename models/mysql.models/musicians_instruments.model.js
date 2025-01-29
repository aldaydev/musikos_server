import sequelize from '../../databases/sql.connect.js';

const Musician_Instrument = sequelize.define(
    'Musician_Instrument', 
    {}, 
    {
        tableName: 'musicians_instruments', // Nombre exacto de la tabla
        timestamps: false,
    }
);

export default Musician_Instrument;