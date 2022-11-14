'use strict'
import koa from 'koa';

const app: koa = new koa();

app.listen(5000, 'localhost', () => {
    console.log('App running on localhost port 5000!')
});

export default app;