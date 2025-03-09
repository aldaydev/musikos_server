// Mongoose import
import mongoose from 'mongoose';

// Defining Legal schema
const usercommSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true
    },
    user_comms: {
        type: Array,
        required: true
    }
});

// Creating Legal Model
const Usercomm = mongoose.model('usercomm', usercommSchema);

export default Usercomm;
