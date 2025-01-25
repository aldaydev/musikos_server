//Import express y middlewares
import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

//Imports sequelize
import sequelize from './databases/sql.connect.js';
import { Musician } from './models/models.js';

//Inicialización express
const app = express();

//Middlewares globales
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors());
app.use(router);

//Testing
// app.get('/test', (req, res) => {
// 	res.json({
// 		mensaje: 'Server activo'
// 	})
// });

const port = process.env.PORT || 3001;

const startServer = async () => {
	try{
		//Conectar a la BD de mySQL
		await sequelize.authenticate();
        console.log('Conexión correcta a BD mySQL.');

		// Sincronizar todos los modelos importados
        await Musician.sync();
		console.log('Modelos mySQL sincronizados.');

		app.listen(port, () => console.log(`Server running on port ${port}`));
	}catch(e){

	}
}

startServer();