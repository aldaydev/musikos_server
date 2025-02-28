import { Musician } from './musician.model.js';
import { Style } from './style.model.js';
import { Instrument } from './instrument.model.js';
import { Region } from './region.model.js';
import { Province } from './province.model.js';

// MUSICIAN & STYLE RELATED

Musician.belongsToMany(Style, { 
    through: 'musicians_styles', 
    foreignKey: 'musician_id', 
    otherKey: 'style_id' 
    }
);

Style.belongsToMany(Musician, {
    through: 'musicians_styles',
    foreignKey: 'style_id',
    otherKey: 'musician_id' 
    }
);

// MUSICIAN & INSTRUMENT RELATED

Musician.belongsToMany(Instrument, { 
    through: 'musicians_instruments', 
    foreignKey: 'musician_id', 
    otherKey: 'instrument_id' 
    }
);

Instrument.belongsToMany(Musician, {
    through: 'musicians_instruments',
    foreignKey: 'instrument_id',
    otherKey: 'musician_id' }
);

// MUSICIAN & REGION RELATED

Musician.belongsTo(Region, {
    foreignKey: 'region_id',  // El nombre de la clave foránea en el modelo Musician
});

// Una región puede tener muchos músicos
Region.hasMany(Musician, {
    foreignKey: 'id',  // El nombre de la clave foránea en el modelo Musician
});

// MUSICIAN & REGION RELATED

Musician.belongsTo(Province, {
    foreignKey: 'province_id',  // El nombre de la clave foránea en el modelo Musician
});

// Una región puede tener muchos músicos
Province.hasMany(Musician, {
    foreignKey: 'id',  // El nombre de la clave foránea en el modelo Musician
});


export { Musician, Style, Instrument };
