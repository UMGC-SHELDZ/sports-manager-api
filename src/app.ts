'use strict';
import koa from 'koa';
import * as KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import config from 'config';
import { Logger } from 'pino';

// Database
import dbConnect from './db/dbConnect';

// Routes
import playerRouter from './routes/playerRouter';
import teamRouter from './routes/teamRouter';

// Logger
import pinoLogger from '../logger/logger';
import { NodeEnvironment } from './common/constants/constants';
import adminRouter from './routes/adminRouter';

/* SERVER SETUP */
const port: number = config.get('port');
const host: string = config.get('host');

// Better logging than console.log
const logger: Logger = pinoLogger();
const koaPinoLogger: Function = require('koa-pino-logger');

// Need to require the koa-router
const Router = require('koa-router');

// Need to require CORS
const cors = require('@koa/cors');

// Launch Server
const app: koa = new koa();
const router: KoaRouter = new Router();
app.use(cors());
app.use(koaPinoLogger());
app.use(koaBody({ multipart: true }));
app.use(router.routes())
    .use(playerRouter.routes())
    .use(adminRouter.routes())
    .use(teamRouter.routes());

/* PORT LISTENING */
if (process.env.NODE_ENV !== NodeEnvironment.TEST) {
    // Connect to DB.
    dbConnect();

    app.listen(port, host, () => {
        logger.info(`Server listening at http://${host}:${port}`);
    });
}
export default app;
