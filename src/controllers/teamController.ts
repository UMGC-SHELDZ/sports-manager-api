import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Team from '../models/team.model';
import _, { update } from 'lodash';

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

            let newTeam: { [key: string]: any } = {
                teamName: ctx.request.body.teamName
            };

            // If request has a sport, or manager, map it
            if (!_.isNil(ctx.request.body.sport) || !_.isEmpty(ctx.request.body.sport)) {
                newTeam.sport = new Types.ObjectId(ctx.request.body.sport);
            };
    
            if (!_.isNil(ctx.request.body.manager) || !_.isEmpty(ctx.request.body.manager)) {
                newTeam.manager = new Types.ObjectId(ctx.request.body.manager);
            };
            
            // Create and update new team.
            const team: Document = await new Team(newTeam).save();

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
        console.log(ctx.request.body);
        // try/catch block allows us to capture errors to return to the client
        try {

            let updateTeam: { [key: string]: any } = {
                _id: new Types.ObjectId(ctx.request.body._id),
                teamName: ctx.request.body.teamName
            };

            // If request has a sport, or manager, map it
            if (!_.isNil(ctx.request.body.sport) || !_.isEmpty(ctx.request.body.sport)) {
                updateTeam.sport = new Types.ObjectId(ctx.request.body.sport);
            };
    
            if (!_.isNil(ctx.request.body.manager) || !_.isEmpty(ctx.request.body.manager)) {
                updateTeam.manager = new Types.ObjectId(ctx.request.body.manager);
            };

            // Get team object and respond to client
            const team = await Team.findByIdAndUpdate(
                new Types.ObjectId(updateTeam._id),
                ctx.request.body,
                { new : true });

            // If team found, process update, else return 404
            if (!_.isNil(team)) {

                // unset relationships if not received from the client
                if (_.isNil(ctx.request.body.sport)) {
                    team.sport = undefined
                };

                if (_.isNil(ctx.request.body.manager)) {
                    team.manager = undefined
                };

                const teamResp: { [key: string]: any } = {
                    teamName: team.teamName,
                    sport: team.sport,
                    manager: team.manager,
                    _id: team._id.toString()
                };

                ctx.body = teamResp;
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Team not found.' };
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
     * Deletes a team from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new team.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteTeam(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get team object and respond to client
            const team: Document | null = await Team.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If manager is found, return success, else 404
            if (!_.isNil(team)) {
                ctx.body = { message: 'Success' };
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Team not found.' };
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            };

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