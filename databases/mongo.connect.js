import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bandbros');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Detiene el servidor si no se puede conectar
    }
};

export default connectMongo;