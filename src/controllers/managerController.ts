import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Manager from '../models/manager.model';

// Logger
const logger = pinoLogger();

/**
 * Controller for Manager-based endpoints and logic
 */
class ManagerController {
    /**
     * Adds a new manager to the database
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {
            // Create and update new entity.
            const manager: Document = await new Manager(ctx.request.body).save();

            // Response to client
            ctx.body = manager;
            ctx.status = 201;

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

    /**
     * Gets a manager from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getManager(ctx: RouterContext, next: () => Promise<void>): Promise<void>{

        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            ctx.body = await Manager.findById(new Types.ObjectId(ctx.params.id));
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

    /**
     * Gets all managers from the database
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllManagers(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            ctx.body = await Manager.find({});
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

    /**
     * Updates a manager from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateManager(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            ctx.body = await Manager.findByIdAndUpdate(
                new Types.ObjectId(ctx.params.id),
                ctx.request.body,
                {new : true})

            ctx.status = 204;

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

    /**
     * Deletes a manager from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteManager(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            ctx.body = await Manager.findByIdAndDelete(new Types.ObjectId(ctx.params.id))

            ctx.status = 202;

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

export default new ManagerController();