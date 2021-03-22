import express from 'express';
import routes from './router/routes';

import apiRouter from './router/apiRouter';

import cors from 'cors';

const app = express();

app.use(cors());  // CORS 설정

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(routes.api, apiRouter);

export default app;
