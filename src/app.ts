'use strict'
import koa from 'koa';
import * as KoaRouter from 'koa-router';
import koaBody from 'koa-body';

// Need to require the koa-router
const Router = require('koa-router');

// Launch Server
const app: koa = new koa();
const router: KoaRouter = new Router();
app.use(koaBody({ multipart: true }));
app.use(router.routes());

// PORT LISTENING
app.listen(5000, 'localhost', () => {
    console.log('App running on localhost port 5000!')
});

export default app;