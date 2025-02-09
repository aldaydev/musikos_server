export default {
    uri: 'mongodb://127.0.0.1:27017/musiko',
    options: {
        connectTimeoutMS: 3000, // Tiempo de espera de conexión
        socketTimeoutMS: 5000, // Tiempo de espera de los sockets
        serverSelectionTimeoutMS: 3000, // Espera 7 segundos antes de rendirse en encontrar un servidor
    }
};