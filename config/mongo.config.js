export default {
    uri: process.env.MONGO_URI,
    options: {
        connectTimeoutMS: 3000, // Tiempo de espera de conexión
        socketTimeoutMS: 5000, // Tiempo de espera de los sockets
        serverSelectionTimeoutMS: 3000, // Espera 7 segundos antes de rendirse en encontrar un servidor
    }
};