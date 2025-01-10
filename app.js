import express from 'express';
import dotenv from 'dotenv';
import router from './routes/router.js';
import logger from './logging/logger.js';


const app = express();

dotenv.config({
    path: "./config.env"
});

app.use("/",router)
app.use(logger);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
