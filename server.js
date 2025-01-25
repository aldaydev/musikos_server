import express, {json, urlencoded} from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';

const app = express();

//Middlewares globales
app.use(json());
app.use(urlencoded({extended: false}));
app.use(cors());

//Testing
app.get('/test', (req, res) => {
	res.json({
		mensaje: 'Server activo'
	})
});

app.use(router);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));


