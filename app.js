import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/router.js';



const app = express();

dotenv.config({
    path: "./config.env"
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let logStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'}
)

app.use(morgan('tiny', {stream: logStream}));
app.use('/',router)
app.use(express.static(path.join(__dirname, 'public')));


const { PORT } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

export default __dirname;
