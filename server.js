//Logger config import | Activate env variables
import logger from './config/logger.config.js';

//Dotenv config import | Activate env variables
import './config/env.config.js';

//Express & global middleware imports
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/router.js';

//Sequelize connection import
import mysql from './databases/mysql.connection.js'

//Mongoose connection import
import mongodb from './databases/mongo.connection.js';

//Swagger imports
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.config.js';

//Express initialization
const app = express();

//Global middlewares
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors());
app.use(router);

// Swagger UI Configuration
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Port definition
const port = process.env.PORT || 3001;

//Start server function
const startServer = async () => {
	try{

		//Connect to mySQL DB (Sequelize)
		mysql.connect();
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
		logger.error('Error de conexión al servidor ' + error.message);
	}
}

//Server initialization
startServer();