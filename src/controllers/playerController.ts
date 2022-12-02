import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Player from '../models/player.model';

// Logger
const logger = pinoLogger();

/**
 * Controller for Player-based endpoints and logic
 */
class PlayerController {
    /**
     * Adds a new player to the database
     * @param {RouterContext} ctx The request context object containing data for the new player.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addPlayer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {
            // Create and update new entity.
            const player: Document = await new Player(ctx.request.body).save();

            // Response to client
            ctx.body = player;
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
     * Gets a player from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new player.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getPlayer(ctx: RouterContext, next: () => Promise<void>): Promise<void>{

        // try/catch block allows us to capture errors to return to the client
        try {
            // Get player object and respond to client

            ctx.body = await Player.findById(new Types.ObjectId(ctx.params.id));
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
     * Gets all players from the database
     * @param {RouterContext} ctx The request context object containing data for the new player.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllPlayers(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get player object and respond to client
            ctx.body = await Player.find({});
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
     * Updates a player from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new player.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updatePlayer(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get player object and respond to client
            ctx.body = await Player.findByIdAndUpdate(
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
     * Deletes a player from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new player.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deletePlayer(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get player object and respond to client
            ctx.body = await Player.findByIdAndDelete(new Types.ObjectId(ctx.params.id))

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

export default new PlayerController();