import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Player from '../models/player.model';
import _ from "lodash";

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
            // Get player object
            const player = await Player.findById(new Types.ObjectId(ctx.params.id));

            // Give appropriate response if player is found or not
            if(!_.isNil(player)){
                ctx.body = player;
                ctx.status = 200;
                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = {message : "Player not found"};
                ctx.status = 404;
            }

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
            let updatePlayer: { [key: string]: any } = {
                _id: new Types.ObjectId(ctx.request.body._id),
                firstName: ctx.request.body.firstName,
                lastName: ctx.request.body.lastName
            };

            // If requests have optional data, map it
            if (!_.isNil(ctx.request.body.team) || !_.isEmpty(ctx.request.body.team)) {
                updatePlayer.team = new Types.ObjectId(ctx.request.body.team);
            };

            if (!_.isNil(ctx.request.body.position) || !_.isEmpty(ctx.request.body.position)) {
                updatePlayer.position = ctx.request.body.position;
            };

            if (!_.isNil(ctx.request.body.playerNumber) || !_.isEmpty(ctx.request.body.playerNumber)) {
                updatePlayer.playerNumber = ctx.request.body.playerNumber;
            };

            if (!_.isNil(ctx.request.body.salary) || !_.isEmpty(ctx.request.body.salary)) {
                updatePlayer.salary = ctx.request.body.salary;
            };


            // Get player object and respond to client
            const player = await Player.findByIdAndUpdate(
                new Types.ObjectId(ctx.request.body._id),
                updatePlayer,
                { new : true }
            );

            // If player found, process update, else return 404
            if (!_.isNil(player)) {
                // Unset data if not passed in they body
                if (_.isNil(ctx.request.body.team)) {
                    player.team = undefined
                };

                if (_.isNil(ctx.request.body.position)) {
                    player.position = undefined
                };

                if (_.isNil(ctx.request.body.playerNumber)) {
                    player.playerNumber = undefined
                };

                if (_.isNil(ctx.request.body.salary)) {
                    player.salary = undefined
                };

                const playerResp: { [key: string]: any } = {
                    firstName: player.firstName,
                    lastName: player.lastName,
                    team: player.team,
                    position: player.position,
                    playerNumber: player.playerNumber,
                    salary: player.salary,
                    _id: player._id.toString()
                };

                ctx.body = playerResp;
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Player not found.' };
                ctx.status = 404;

                // Log results
                logger.error(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

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
            const player: Document | null = await Player.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If player is found, return success, else 404
            if (!_.isNil(player)) {
                ctx.body = { message: 'Success' };
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Player not found.' };
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

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