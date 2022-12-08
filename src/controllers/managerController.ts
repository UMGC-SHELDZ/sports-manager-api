import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import * as _ from 'lodash';
import pinoLogger from '../../logger/logger';
import Manager from '../models/manager.model';
import { compare } from 'bcrypt';
import IManager from '../common/interfaces/models/IManager';

// Logger
const logger = pinoLogger();

/**
 * Controller for Manager-based endpoints and logic
 */
class ManagerController {
    /**
     * Logs in a user and gives them a token
     * @param {RouterContext} ctx The request context object containing username and password.
     * @param {() => Promise<void>} next The next client request.
     */
    public async login(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get the Manager object for the username
            const user = await Manager.findOne({ 'userName': ctx.request.body.userName });

            // Get password of user, or make sure password empty if no user found
            if (!_.isNil(user)) {
                logger.info('User Found');
                const userPass: string = user.password;

                 // Check if user password matches password provided
                const matched = await compare(ctx.request.body.password, userPass);

                // Perform correct actions for match and not matching results
                if (matched){
                    const userResp: { [key: string]: any } = {
                        id: user._id.toString()
                    }
                    ctx.body = userResp;
                    ctx.status = 200

                    // Log results
                    logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
                }
            } else {
                // User not found, or username/password combo wrong
                logger.info('User Not Found');
                ctx.body = { message: 'Invalid username or password!' };
                ctx.status = 401
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

    /**
     * Adds a new manager to the database
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {
            // Create and update new entity.
            const manager: IManager = new Manager(ctx.request.body);
            await manager.save();

            // Resp Object
            const userResp: { [key: string]: any } = {
                userName: manager.userName,
                firstName: manager.firstName,
                lastName: manager.lastName,
                id: manager._id.toString()
            }

            // Response to client
            ctx.body = userResp;
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
            const manager = await Manager.findById(new Types.ObjectId(ctx.params.id));

            // if Manager found, return results
            if (!_.isNil(manager)) {
                const managerResp: { [key: string]: any } = {
                    userName: manager.userName,
                    firstName: manager.firstName,
                    lastName: manager.lastName,
                    id: manager._id.toString()
                }
    
                ctx.body = managerResp;
                ctx.status = 200;
    
                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Manager not found.' };
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

    /**
     * Gets all managers from the database
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllManagers(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            const managers = await Manager.find({});

            if (!_.isNil(managers) || !_.isEmpty(managers)) {
                const managersResp: Array<{ [key: string]: string }> = _.map(managers, (manager) => {
                    return {
                        userName: manager.userName,
                        firstName: manager.firstName,
                        lastName: manager.lastName,
                        id: manager._id.toString()
                    };
                });
    
                ctx.body = managersResp;
                ctx.status = 200;
    
                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Managers not found.' };
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

    /**
     * Updates a manager from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateManager(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            const manager = await Manager.findByIdAndUpdate(
                new Types.ObjectId(ctx.request.body.id),
                ctx.request.body,
                { new : true });

            // If manager found, process update, else return 404
            if (!_.isNil(manager)) {
                const managerResp: { [key: string]: any } = {
                    userName: manager.userName,
                    firstName: manager.firstName,
                    lastName: manager.lastName,
                    id: manager._id.toString()
                };
    
                ctx.body = managerResp;
                ctx.status = 202;
    
                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Manager not found.' };
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
     * Deletes a manager from the database by ID
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteManager(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get manager object and respond to client
            const manager: Document | null = await Manager.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If manager is found, return success, else 404
            if (!_.isNil(manager)) {
                ctx.body = { message: 'Success' };
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            } else {
                ctx.body = { message: 'Manager not found.' };
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

export default new ManagerController();