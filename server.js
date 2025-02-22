//Dotenv config import | Activate env variables
import './config/env.config.js';

//Logger config import
import logger from './config/logger.config.js';

//Express & global middleware imports
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/router.js';

//Sequelize connection import
import mysql from './databases/mysql.connection.js'

//Mongoose connection import
import mongodb from './databases/mongo.connection.js';

//Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.config.js';
import error_MW from './middlewares/error.middleware.js';

//Express initialization
const app = express();

//Global middlewares
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173',  // Cambia a tu dominio de frontend
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,  // Habilita el envío de cookies
}));
app.use(cookieParser());
app.use(router);
app.use(error_MW);

// Swagger UI Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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