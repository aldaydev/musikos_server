import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';

// Defining Musician model
const Musician = sequelize.define('Musician', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    //Required data for signup
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        //Validating username format even in MySQL
        validate: {
            is: {
                args: /^(?!.*[_-]{2})(?![_-])([a-z0-9_-]{3,30})(?<![_-])$/,
                msg: "Invalid format of username"
            }
        }
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
    
    //Data that will be entered once created
    image: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'default-musician.png'
    },
    first_name: {
        type: DataTypes.STRING(50)
    },
    last_name: {
        type: DataTypes.STRING(50)
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            min: 18, // Edad mínima
            max: 99  // Edad máxima
        }
    },
    slogan: {
        type: DataTypes.STRING(150)
    },
    description: {
        type: DataTypes.STRING(500)
    },
    web: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    },
    tiktok: {
        type: DataTypes.STRING
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
    }
}, {
    tableName: 'musicians'
});

export { Musician };