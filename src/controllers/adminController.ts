import { RouterContext } from 'koa-router';
import pinoLogger from "../../logger/logger";

// Logger
const logger = pinoLogger();

/**
 * Controller for Player-based endpoints and logic
 */
class AdminController {
    public async healthCheck(ctx: RouterContext, next: () => Promise<void>): Promise<void>{

        // try/catch block allows us to capture errors to return to the client
        try {
            // Get player object and respond to client
            ctx.body = { serverResp: 'running' }
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        } catch (e: any) {
            // Set proper status
            ctx.status = 500;
            ctx.body = e.message;

            // Log results
            logger.error(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            // Clear req/res queue
            await next();
        }
    }
}

export default new AdminController();