import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Musician model
const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        //Validating email format even in MySQL
        validate: {
            is: {
                args: /^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                msg: "Invalid format of email"
            }
        }
    },

    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        //Validating password have 60 characters (encrypted)
        validate: {
            len: [60, 60]
        }
    },

    is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    is_requesting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    //Timestamps

    last_connection: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    accepted_terms_at: {
        type: DataTypes.DATE,
        allowNull: false, // Terms must be accepted
        defaultValue: DataTypes.NOW, // Automatically records the acceptance date
    },
    accepted_privacy_at: {
        type: DataTypes.DATE,
        allowNull: false, // Privacy policy must be accepted
        defaultValue: DataTypes.NOW, // Automatically records the acceptance date
    },

},

    { tableName: 'users' }
);

export { User };