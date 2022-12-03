import KoaRouter from 'koa-router';
import adminController from '../controllers/adminController';

// Setup Router
const adminRouter: KoaRouter = new KoaRouter();

// Base router for admin REST endpoints
const baseRoute: string = '/admin';

/* ROUTES */
// GET route health check
adminRouter.get('health-check',
    baseRoute,
    adminController.healthCheck
);

export default adminRouter;