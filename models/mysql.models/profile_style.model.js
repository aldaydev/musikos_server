import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Profile_Style model
const Profile_Style = sequelize.define(
    'Profile_Style', 
    {
            Profile_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Profile',
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
        tableName: 'profiles_styles',
        timestamps: false,
    }
);

export default Profile_Style;