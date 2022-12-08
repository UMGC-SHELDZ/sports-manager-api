import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Team from '../models/team.model';

// @ts-ignore
import jwt from 'jsonwebtoken';
import Sport from "../models/sport.model";
import _ from "lodash";
import Player from "../models/player.model";

// Logger
const logger = pinoLogger();

/**
 * Controller for Team-based endpoints and logic
 */
class TeamController {
    /**
     * Adds a new team to the database
     * @param {RouterContext} ctx The request context object containing data for the new team.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addTeam(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {
            // Create and update new team.
            const team: Document = await new Team(ctx.request.body).save();

            // Response to client
            ctx.body = team;
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
     * Gets a team from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new team.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getTeam(ctx: RouterContext, next: () => Promise<void>): Promise<void>{

        // try/catch block allows us to capture errors to return to the client
        try {
            // Get Team object
            const team = await Team.findById(new Types.ObjectId(ctx.params.id));

            // Give appropriate response if team is found or not
            if(!_.isNil(team)){
                ctx.body = team;
                ctx.status = 200;
                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = {message : "Team not found"};
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
     * Gets all teams from the database
     * @param {RouterContext} ctx The request context object containing data for the new team.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllTeams(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get team object and respond to client
            ctx.body = await Team.find({});
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
     * Updates a team from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new team.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateTeam(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get team object and respond to client
            const team = await Team.findByIdAndUpdate(new Types.ObjectId(ctx.params.id)
                , ctx.request.body,
                {new : true});
            if(!_.isNil(team)){
                ctx.body = team;
                ctx.status = 204;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message : "Team not found"};
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
     * Deletes a team from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new team.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteTeam(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get team object and respond to client
            const team = await Team.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            if(!_.isNil(team)){
                ctx.body = team;
                ctx.status = 204;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message : "Team not found"};
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

export default new TeamController();