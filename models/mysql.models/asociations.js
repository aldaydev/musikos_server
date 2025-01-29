import { Musician } from './musician.model.js';
import { Style } from './style.model.js';
import { Instrument } from './instrument.model.js';

// MUSICIAN & STYLE RELATED
Musician.belongsToMany(Style, { 
    through: 'musicians_styles', 
    foreignKey: 'musicianId', 
    otherKey: 'styleId' 
    }
);

Style.belongsToMany(Musician, {
    through: 'musicians_styles',
    foreignKey: 'styleId',
    otherKey: 'musicianId' });

// MUSICIAN & INSTRUMENT RELATED

Musician.belongsToMany(Instrument, { 
    through: 'musicians_instruments', 
    foreignKey: 'musicianId', 
    otherKey: 'instrumentId' 
    }
);

Instrument.belongsToMany(Musician, {
    through: 'musicians_instruments',
    foreignKey: 'instrumentId',
    otherKey: 'musicianId' });

// STYLE & INSTRUMENT RELATED


export { Musician, Style, Instrument };
