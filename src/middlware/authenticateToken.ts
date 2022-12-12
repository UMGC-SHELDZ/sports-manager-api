import { RouterContext } from "koa-router";
import jwt from 'jsonwebtoken';

// The secret key (must match in signature in login route)
const secret = process.env.JWT_SECRET || 'jwt-secret';

/**
 * RMiddleware to authenticate a JWT token.
 * @param {RouterContext} ctx The request context object.
 * @param next The next request.
 */
const authenticateToken = async (ctx: RouterContext, next: () => Promise<void>): Promise<void> => {
    if (!ctx.headers.authorization) ctx.throw(403, 'Access forbidden.');

    const token = ctx.headers.authorization.split(' ')[1];

    try {
        ctx.request.body.jwtToken = jwt.verify(token, secret);
    } catch (e: any) {
        ctx.throw(e.status || 403, e.text);
    }
    
    await next();
};

export default authenticateToken;