import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import { corsConfig, expressJsonConfig } from './constants/index.js';
import { api, docs } from './routes/index.js';
import { handleError, handleNotFound } from './utils/index.js';

const app = express();

app.use(morgan('tiny'));
app.use(express.json(expressJsonConfig));
app.use(cors(corsConfig));

app.use('/api-docs', docs);
app.use('/api/v1', api);

app.use(handleNotFound);
app.use(handleError);

export default app;
