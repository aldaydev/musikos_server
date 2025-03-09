import logger from '../../config/logger.config.js';
import Comm from '../../models/mongo.models/comm.model.js';
import Legal from '../../models/mongo.models/legal.model.js';
import Usercomm from '../../models/mongo.models/usercomm.model.js';
import { ResError } from '../../utils/errors/resErrors.js';
import { privacyHtml, termsHtml } from '../../views/legal.views.js';

const seedLegal = async () => {
    try {
        // Check if there are already documents in the "Legal" collection
        const count = await Legal.countDocuments();
    
        // If there are no documents, seeds the collection
        if (count === 0) {
            await Legal.insertMany([
                { type: 'terms', html: termsHtml },
                { type: 'privacy', html: privacyHtml }
            ]);

            logger.info('MongoDB - Seeding "legals" table');
        } else {
            logger.info('MongoDB - "legals" collection already seeded');
        }
    } catch (error) {
        throw new LogError({
            message: 'MongoDB - Error seeding database',
            error: error.message
        })
    }
};

const seedComm = async () => {
    try {
        // Check if there are already documents in the "Legal" collection
        const count = await Comm.countDocuments();
    
        // If there are no documents, seeds the collection
        if (count === 0) {
            await Comm.insertMany([
                { title: 'Bienvenido', message: 'Te damos la bienvenida a musikos' },
                { title: 'Empieza ahora', message: 'Ya puedes empezar a buscar otros músicos y montar tu banda soñada' },
            ]);

            logger.info('MongoDB - Seeding "comm" table');
        } else {
            logger.info('MongoDB - "comm" collection already seeded');
        }
    } catch (error) {
        throw new LogError({
            message: 'MongoDB - Error seeding database',
            error: error.message
        })
    }
};

const seedUsercomm = async () => {
    try {
        // Check if there are already documents in the "Legal" collection
        const count = await Usercomm.countDocuments();
    
        // If there are no documents, seeds the collection
        if (count === 0) {
            await Usercomm.insertMany([
                { user_id: 2, user_comms: [
                    '67cdc14e30c7311be44352aa', '67cdc14e30c7311be44352ab'
                ] 
                },
                { user_id: 3, user_comms: [
                    '67cdc14e30c7311be44352aa'
                ] 
                },
            ]);

            logger.info('MongoDB - Seeding "usercomm" table');
        } else {
            logger.info('MongoDB - "usercomm" collection already seeded');
        }
    } catch (error) {
        throw new LogError({
            message: 'MongoDB - Error seeding database',
            error: error.message
        })
    }
};

export {seedLegal, seedComm, seedUsercomm};
