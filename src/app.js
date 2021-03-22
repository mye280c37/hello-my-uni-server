import express from 'express';
import routes from './router/router';

import cors from 'cors';

const app = express();

app.use(cors());  // CORS 설정

app.use('', routes);

export default app;
