import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import jwt from 'jsonwebtoken';

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
    public async login(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
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
                    // Create manager return object
                    const authUser: { [key: string]: string } ={
                        _id: user._id.toString(),
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userName: user.userName
                    }

                    const userResp: { [key: string]: any } = {
                        user: authUser,
                        token: jwt.sign({ 
                            userId: user._id.toString(),
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        },
                            !_.isNil(process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'jwt-secret'
                    )};
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
     * Adds a new manager to the database
     * @param {RouterContext} ctx The request context object containing data for the new manager.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {
            // Search if username already exists
            const existingManager = await Manager.find({'userName' : ctx.request.body.userName});

            // If it does not, add new user
            if(_.isEmpty(existingManager)){
                // Create and update new entity.
                const manager: IManager = await new Manager(ctx.request.body);
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
            } else {
                ctx.body = { message: 'Username already exists' };
                ctx.status = 409;

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
                        _id: manager._id.toString()
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

export default new ManagerController();