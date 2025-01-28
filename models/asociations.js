import { Musician } from './musician.model.js';
import { Style } from './style.model.js';

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

// STYLE & INSTRUMENT RELATED


export { Musician, Style };
