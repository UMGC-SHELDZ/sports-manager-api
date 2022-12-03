import KoaRouter from 'koa-router';
import managerController from '../controllers/managerController';

// Setup Router
const managerRouter: KoaRouter = new KoaRouter();

// Base router for Manager REST endpoints
const baseRoute: string = '/manager';

/* ROUTES */
// POST route to create new Manager
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
managerRouter.post('update-manager',
    baseRoute,
    managerController.updateManager
);

// DELETE route to delete a manager
managerRouter.delete('delete-manager',
    baseRoute,
    managerController.deleteManager
);

export default managerRouter;