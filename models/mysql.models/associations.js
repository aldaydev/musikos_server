import { Profile } from './profile.model.js';
import { Style } from './style.model.js';
import { Instrument } from './instrument.model.js';
import { Province } from './province.model.js';
import { Town } from './town.model.js';
import { User } from './user.model.js';

//USER & PROFILE RELATED

User.hasOne(Profile, {
    foreignKey: 'user_id',
});
Profile.belongsTo(User);


// PROFILE & STYLE RELATED

Profile.belongsToMany(Style, { 
    through: 'profiles_styles', 
    foreignKey: 'Profile_id', 
    otherKey: 'style_id',
    onDelete: 'CASCADE' 
    }
);

Style.belongsToMany(Profile, {
    through: 'profiles_styles',
    foreignKey: 'style_id',
    otherKey: 'Profile_id',
    onDelete: 'CASCADE' 
    }
);

// Profile & INSTRUMENT RELATED

Profile.belongsToMany(Instrument, { 
    through: 'profiles_instruments', 
    foreignKey: 'Profile_id', 
    otherKey: 'instrument_id' 
    }
);

Instrument.belongsToMany(Profile, {
    through: 'profiles_instruments',
    foreignKey: 'instrument_id',
    otherKey: 'Profile_id' }
);

// Profile & PROVINCE RELATED

Profile.belongsTo(Province, {
    foreignKey: 'province_id',  // El nombre de la clave foránea en el modelo Profile
});

// Una región puede tener muchos músicos
Province.hasMany(Profile, {
    foreignKey: 'id',  // El nombre de la clave foránea en el modelo Profile
});

// PROFILE & TOWN RELATED

Profile.belongsTo(Town, {
    foreignKey: 'town_id',  // El nombre de la clave foránea en el modelo Profile
});

// Una región puede tener muchos músicos
Town.hasMany(Profile, {
    foreignKey: 'id',  // El nombre de la clave foránea en el modelo Profile
});


export { User, Profile, Style, Instrument, Province, Town };
