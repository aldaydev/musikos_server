import winston from 'winston';

//Set up logger: levels, transports, formats
const logger = winston.createLogger({
    // Can be: 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'
    level: 'http', 
    //Transports = destinations / Can be: console, file...
    transports: [
        // Show logs in console
        new winston.transports.Console({
            format: winston.format.simple()
        }), 
        //Save logs in a file
        new winston.transports.File({
            filename: 'logs/musikos.log',
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.json()
            )
        })
    ]
});

export default logger;
