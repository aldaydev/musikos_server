import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Musician_Style model
const Musician_Style = sequelize.define(
    'Musician_Style', 
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
            style_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Style',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }
        },
    {
        tableName: 'musicians_styles',
        timestamps: false,
    }
);

export default Musician_Style;