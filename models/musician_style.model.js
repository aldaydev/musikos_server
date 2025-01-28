import sequelize from '../databases/sql.connect.js';

const Musician_Style = sequelize.define(
    'Musician_Style', 
    {}, 
    {
        tableName: 'musicians_styles', // Nombre exacto de la tabla
        timestamps: false,
    }
);

export default Musician_Style;