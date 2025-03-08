import { DataTypes } from 'sequelize';
import sequelize from '../../config/mysql.config.js';
import validating from '../../utils/validate.js';
import handleAge from '../../utils/handleAge.js';

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
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        defaultValue: 'No indicado'
    },

    birthdate: {
        type: DataTypes.DATEONLY,
        validate: {
            isValidAge(birthdate) {
                return validating.birthdate(birthdate)
            }
        }
    },

    age: {
        type: DataTypes.INTEGER,
        // Age field is automatically calculated
        get() {
            const birthdate = this.getDataValue('birthdate');
            if (!birthdate) return null; // Si no hay fecha de nacimiento, no se puede calcular la edad

            const today = new Date();
            const birthDateObj = new Date(birthdate);
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();

            // Ajustamos la edad si el cumpleaños aún no ha ocurrido este año
            if (month < birthDateObj.getMonth() || (month === birthDateObj.getMonth() && day < birthDateObj.getDate())) {
                age--;
            }

            return age;
        },
        validate: {
            min: 18, // Edad mínima
            max: 99  // Edad máxima
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
    },

},

    {
        tableName: 'musicians',
        hooks: {
            // Hook before creating or updating the musician
            //   beforeSave: (musician) => {
            //     if (musician.birthdate) {
            //         const age = handleAge(musician.birthdate);
            //         musician.age = age;
            //     }
            //   },
            //   beforeUpdate: (musician) => {
            //     if (musician.birthdate) {
            //         const age = handleAge(musician.birthdate);
            //         musician.age = age;
            //     }
            //   },
            beforeCreate: (musician) => {
                if (musician.birthdate) {
                    const age = handleAge(musician.birthdate);
                    musician.age = age;
                }
            },
            beforeBulkCreate: (musicians) => {
                musicians.forEach(musician => {
                    if (musician.birthdate) {
                        const age = handleAge(musician.birthdate); // Calculamos la edad de cada músico
                        musician.age = age;
                    }
                });
            },




            // Puedes agregar otros hooks si es necesario
            // Por ejemplo, si necesitas validaciones adicionales o algún otro procesamiento
        }
    }
);

export { Musician };