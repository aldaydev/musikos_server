//Dotenv config import | Activate env variables
import './config/env.config.js';

//Logger config import
import logger from './config/logger.config.js';

//Express & global middleware imports
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/router.js';
import error_MW from './middlewares/error.middleware.js';
import notFound_MW from './middlewares/notFound.middleware.js';

//Sequelize connection import
import mysql from './databases/mysql/mysql.connection.js'

//Mongoose connection import
import mongodb from './databases/mongo/mongo.connection.js';

//Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.config.js';
import musicianService from './services/mysql/musician.service.js';

//Express initialization
const app = express();

//Global middlewares
app.use(json());
app.use(urlencoded({extended: true}));
// app.use(cors({
//     origin: '*', 
//     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//     credentials: true,
// }));
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001']; // Orígenes permitidos

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Si el origen está permitido, se acepta la solicitud
        } else {
            callback(new Error('Not allowed by CORS')); // Si el origen no está permitido, se rechaza la solicitud
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // Habilita el envío de cookies
}));
app.use(cookieParser());
// Swagger UI Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.use(error_MW);
app.use(notFound_MW);

//Port definition
const port = process.env.PORT || 3001;

//Start server function
const startServer = async () => {
	try{

		//Connect to mySQL DB (Sequelize)
		await mysql.connect();
		//Sync sequelize models
		await mysql.syncModels();
		//Seeding mySQL static tables (only in production)
		await mysql.seedTables();
		//Reseting is_requesting values
		await musicianService.updateAllisRequesting();

		//Connect to MongoDB (Mongoose)
		await mongodb.connect();
		//Seeding MongoDB static tables (only in production)
		await mongodb.seedTables();

		//Inicializating server at selected port
		app.listen(port, () => logger.info(
			`Server - Running on http://localhost:${port}`
		));

	}catch(error){
		logger.error({
			message: 'Server connection error', 
			error: error.message
		});
	}
}

//Server initialization
startServer();