//Express & middlewares imports
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

//Squelize connection import
import sequelize from './databases/sql.connect.js';

//Squelize Models imports
import { Musician, Style, Instrument } from './models/asociations.js';
import Musician_Style from './models/musician_style.model.js';
import Musician_Instrument from './models/musicians_instruments.model.js';

//Squelize Seeding tables imports
import { seedInstruments, seedStyles } from './databases/sql.seed.js';

//Mongoose connection import
import connectMongo from './databases/mongo.connect.js';


//Express inicialization
const app = express();

//Global middlewares
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors());
app.use(router);

//Port definition
const port = process.env.PORT || 3001;

//Start server function
const startServer = async () => {
	try{
		//Connect to mySQL DB (Sequelize)
		await sequelize.authenticate();
        console.log('MySQL - Conexión correcta a BD');

		//Sync sequelize models
        await Musician.sync();
		await Style.sync();
		await Instrument.sync();
		await Musician_Style.sync();
		await Musician_Instrument.sync();

		console.log('MySQL - Modelos sincronizados.');

		//Seeding static tables
		await seedStyles();
		await seedInstruments();
		console.log('MySQL - Datos introducidos en tablas fijas');

		//Connect to MongoDB (Mongoose)
		await connectMongo();
		console.log('MongoDB - Conexión correcta a BD');

		//Inicializating server at selected port
		app.listen(port, () => console.log(`Server running on port ${port}`));
	}catch(e){
		console.log('Error de conexión al servidor', e);
	}
}

startServer();