import winston from 'winston';

//Set up ñpgger: levels, transports, formats
const logger = winston.createLogger({
    // Puede ser 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
    level: 'http', 
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }), // Mostrar logs en la consola
        new winston.transports.File({
            filename: 'logs/musikos.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json() // Guarda en JSON con timestamp
            )
        }) // Guardar logs en un archivo
    ]
});

export default logger;
