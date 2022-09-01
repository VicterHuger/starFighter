import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/router';

dotenv.config();

const app = express();

app.use([cors(), json(), router]);

const PORT:number = Number(process.env.PORT) || 4001;

app.listen(PORT, ():void=> console.log(`Server is listening on PORT: ${PORT}`));