import Legal from '../models/mongo.models/legal.model.js';
import { privacyHtml, termsHtml } from '../views/legal.views.js';

const seedLegal = async () => {
    try {
        // Check if there are already documents in the "Legal" collection
        const count = await Legal.countDocuments();
    
        // If there are no documents, seeds the collection
        if (count === 0) {
            // console.log('Seeding database...');

            await Legal.insertMany([
                { type: 'terms', html: termsHtml },
                { type: 'privacy', html: privacyHtml }
            ]);

            console.log('MongoDB - Seeding "legals" table');
        } else {
            console.log('MongoDB - "legals" already seeded.');
        }
} catch (error) {
    console.error('Error seeding database:', error);
}
};

export default seedLegal;
