'use strict'
import koa from 'koa';

const app: koa = new koa();

// PORT LISTENING
if (process.env.NODE_ENV !== 'test') {
    app.listen(5000, 'localhost', () => {
        console.log('App running on localhost port 5000!')
    });
};

export default app;