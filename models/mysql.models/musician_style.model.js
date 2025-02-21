import sequelize from '../../config/mysql.config.js';

// Defining Musician_Style model
const Musician_Style = sequelize.define(
    'Musician_Style', 
    {}, //Empty because it has no more data than the foreign keys
    {
        tableName: 'musicians_styles',
        timestamps: false,
    }
);

export default Musician_Style;