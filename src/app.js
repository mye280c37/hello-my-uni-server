import { express_config } from './config/express_config';
import routes from './router/routes';

import apiRouter from './router/apiRouter';

import cors from 'cors';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express_config();

app.use(cors());  // CORS 설정

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use(routes.api, apiRouter);

export default app;

console.log('Server running at localhost');