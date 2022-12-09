import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Sport from '../models/sport.model';
import Player from "../models/player.model";
import _ from "lodash";

// Logger
const logger = pinoLogger();

/**
 * Controller for Sport-based endpoints and logic
 */
class SportController {
    /**
     * Adds a new sport to the database
     * @param {RouterContext} ctx The request context object containing data for the new sport.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addSport(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {
            // Create and update new sport.
            const sport: Document = await new Sport(ctx.request.body).save();

            // Response to client
            ctx.body = sport;
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
     * Gets a sport from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new sport.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getSport(ctx: RouterContext, next: () => Promise<void>): Promise<void>{

        // try/catch block allows us to capture errors to return to the client
        try {
            // Get Sport object
            const sport = await Sport.findById(new Types.ObjectId(ctx.params.id));

            // Give appropriate response if sport is found or not
            if(!_.isNil(sport)){
                ctx.body = sport;
                ctx.status = 200;
                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = {message : "Sport not found"};
                ctx.status = 400;
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
     * Gets all sports from the database
     * @param {RouterContext} ctx The request context object containing data for the new sport.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllSports(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get sport object and respond to client
            ctx.body = await Sport.find({});
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
     * Updates a sport from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new sport.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateSport(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get sport object and respond to client
            const sport = await Sport.findByIdAndUpdate(new Types.ObjectId(ctx.params.id)
                , ctx.request.body,
                {new : true});
            if(!_.isNil(sport)){
                ctx.body = sport;
                ctx.status = 204;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message : "Sport not found"};
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
     * Deletes a sport from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new sport.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteSport(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get sport object and respond to client
            const sport = await Sport.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            if(!_.isNil(sport)){
                ctx.body = sport;
                ctx.status = 204;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message : "Sport not found"};
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
}

export default new SportController();