// Mongoose import
import mongoose from 'mongoose';

// Defining Legal schema
const legalSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    }
});

// Creating Legal Model
const Legal = mongoose.model('Legal', legalSchema);

export default Legal;
