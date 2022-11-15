'use strict'
import koa from 'koa';
import * as KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import config from 'config';

/* SERVER SETUP */
const port: number = config.get('port');
const host: string = config.get('host');

// Need to require the koa-router
const Router = require('koa-router');

// Launch Server
const app: koa = new koa();
const router: KoaRouter = new Router();
app.use(koaBody({ multipart: true }));
app.use(router.routes());

/* PORT LISTENING */
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, host, () => {
        console.log(`Server listening at http://${host}:${port}`);
    });
};
export default app;