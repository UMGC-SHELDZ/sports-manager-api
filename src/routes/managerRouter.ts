import KoaRouter from 'koa-router';
import managerController from '../controllers/managerController';
import authenticateJWT from '../middlware/authenticateToken';

// Setup Router
const managerRouter: KoaRouter = new KoaRouter();

// Base router for Manager REST endpoints
const baseRoute: string = '/managers';

/* ROUTES */
// POST route to create new Manager
managerRouter.post('login',
    `${baseRoute}/login`,
    managerController.login
);

managerRouter.post('add-manager',
    baseRoute,
    managerController.addManager
);

// GET route to get all managers
managerRouter.get('get-all-managers',
    baseRoute,
    managerController.getAllManagers
);

export default managerRouter;