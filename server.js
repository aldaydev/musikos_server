//Express & global middleware imports
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

//Sequelize connection import
import sequelize from './databases/sql.connect.js';

//Sequelize Models imports
import { Musician, Style, Instrument } from './models/mysql.models/asociations.js';
import Musician_Style from './models/mysql.models/musician_style.model.js';
import Musician_Instrument from './models/mysql.models/musicians_instruments.model.js';

//Sequelize Seeding tables imports
import { seedInstruments, seedStyles } from './databases/sql.seed.js';

//Mongoose connection import
import connectMongo from './databases/mongo.connect.js';
import seedLegal from './databases/mongo.seed.js';

//Swagger imports
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./utils/swagger.config.js";

//Express inicialization
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
		await sequelize.authenticate();
        console.log('MySQL - Connected');

		//Sync sequelize models
        await Musician.sync();
		await Style.sync();
		await Instrument.sync();
		await Musician_Style.sync();
		await Musician_Instrument.sync();
		console.log('MySQL - Models synchronized');

		//Seeding mySQL static tables (only in production)
		await seedStyles();
		await seedInstruments();
		console.log('MySQL - All static tables seeded');

		//Connect to MongoDB (Mongoose)
		await connectMongo();
		console.log('MongoDB - Connected');

		//Seeding MongoDB static tables (only in production)
		await seedLegal();
		console.log('MongoDB - All static tables seeded');

		//Inicializating server at selected port
		app.listen(port, () => console.log(
			`Server running on http://localhost:${port}`
		));
	}catch(e){
		console.log('Error de conexión al servidor', e);
	}
}

//Server initialization
startServer();