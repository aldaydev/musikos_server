import { Musician } from './musician.model.js';
import { Style } from './style.model.js';
import { Instrument } from './instrument.model.js';

// MUSICIAN & STYLE RELATED

Musician.belongsToMany(Style, { 
    through: 'musicians_styles', 
    foreignKey: 'id', 
    otherKey: 'id' 
    }
);

Style.belongsToMany(Musician, {
    through: 'musicians_styles',
    foreignKey: 'id',
    otherKey: 'id' });

// MUSICIAN & INSTRUMENT RELATED

Musician.belongsToMany(Instrument, { 
    through: 'musicians_instruments', 
    foreignKey: 'id', 
    otherKey: 'id' 
    }
);

Instrument.belongsToMany(Musician, {
    through: 'musicians_instruments',
    foreignKey: 'id',
    otherKey: 'id' });


export { Musician, Style, Instrument };
