import KoaRouter from 'koa-router';
import managerController from '../controllers/managerController';
import authenticateJWT from '../middlware/authenticateToken';

// Setup Router
const managerRouter: KoaRouter = new KoaRouter();

// Base router for Manager REST endpoints
const baseRoute: string = '/manager';

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

// GET route to get a single manager
managerRouter.get('get-manager',
    `${baseRoute}/:id`,
    managerController.getManager
);

// GET route to get all managers
managerRouter.get('get-all-managers',
    baseRoute,
    managerController.getAllManagers
);

// POST route to update a manager by ID
managerRouter.put('update-manager',
    `${baseRoute}`,
    authenticateJWT,
    managerController.updateManager
);

// DELETE route to delete a manager
managerRouter.delete('delete-manager',
    `${baseRoute}/:id`,
    authenticateJWT,
    managerController.deleteManager
);

export default managerRouter;