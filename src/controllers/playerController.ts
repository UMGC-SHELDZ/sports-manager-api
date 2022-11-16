import { RouterContext } from 'koa-router';
import { Document } from 'mongoose';
import pinoLogger from '../../logger/logger';
import IPlayer from '../common/interfaces/models/player/IPlayer';
import Player from '../models/player.model';

// Logger
const logger = pinoLogger();

/**
 * Controller for Player-based endpoints and logic
 */
class PlayerController {
    /**
     * Adds a new player to the database
     * @param {RouterContect} ctx The request context object containing data for the new player.
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
};

export default new PlayerController();