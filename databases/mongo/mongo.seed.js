import logger from '../../config/logger.config.js';
import Legal from '../../models/mongo.models/legal.model.js';
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

export default seedLegal;
