import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import methodOverride from 'method-override';
import path from 'path';

import { errorHandler } from './app/middleware';
import routes from './app/routes';
import { env, morganLogger, responseFormatter, sessionExpress } from './lib';

const app: Express = express();
const port = env('PORT');
app.use(express.static(path.join(__dirname, '../public')));
app.use(sessionExpress);
app.use(morganLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseFormatter);
app.use(methodOverride());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
