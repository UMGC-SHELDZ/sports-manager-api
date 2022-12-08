import {RouterContext} from 'koa-router';
import {Document, Types} from 'mongoose';
import pinoLogger from '../../logger/logger';
import Manager from '../models/manager.model';

// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';

// Logger
const logger = pinoLogger();

/**
 * Controller for Manager-based endpoints and logic
 */
class ManagerController {
    /**
     * Checks if token is valid
     * @param {RouterContext} ctx The request context object containing token.
     * @param {() => Promise<void>} next The next client request.
     */
    public async checkToken(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

        // try/catch block allows us to capture errors to return to the client
        try {

            // Check incoming token
            if(jwt.verify(ctx.request.header.authorization, "SHELDZ")){
                // If it is a match, pass to next middleware
                await next();
            } else {
                // If not, state invalid
                ctx.body = "Invalid token"
            }
        } catch (e: any) {
            // Set proper status
            ctx.status = 500;
            ctx.body = e.message;

            // Log results
            logger.error(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
        }
    }

    /**
     * Logs in a user and gives them a token
     * @param {RouterContext} ctx The request context object containing username and password.
     * @param {() => Promise<void>} next The next client request.
     */
    public async login(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        // try/catch block allows us to capture errors to return to the client
        try {
            // Get the Manager object for the username
            const user = await Manager.findOne({ 'userName': ctx.request.body.userName })

            // Get password of user, or make sure password empty if no user found
            let userPass = ""
            if(user){
                userPass = user.get("password")
            }

            // Check if user password matches password provided
            const matched = await bcrypt.compare(ctx.request.body.password, userPass)

            // Perform correct actions for match and not matching results
            if (matched){
                const payload = {
                    username : "ctx.request.body.userName",
                    password : "ctx.request.body.password",
                }
                ctx.body = jwt.sign(payload,"SHELDZ")
                ctx.status = 200
            } else {
                ctx.body = "Password or username incorrect"
                ctx.status = 500
            }

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            //await next();
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