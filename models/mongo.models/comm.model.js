// Mongoose import
import mongoose from 'mongoose';

// Defining Legal schema
const commSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

// Creating Legal Model
const Comm = mongoose.model('Comm', commSchema);

export default Comm;
