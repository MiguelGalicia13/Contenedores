import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from './domain/response.js';
import logger from './util/logger.js';
import HttpStatus from './controller/number.controller.js';
import numberRoutes from './route/number.route.js';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({'origin': '*'}));
app.use(express.json());

app.use('/numbers', numberRoutes);
app.get('/', (req, res) => res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Welcome to the Number API')));
app.listen(PORT, () => logger.info(`Server running on ${ip.address()}:${PORT}`));
