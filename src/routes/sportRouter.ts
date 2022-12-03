import KoaRouter from 'koa-router';
import sportController from '../controllers/sportController';

// Setup Router
const sportRouter: KoaRouter = new KoaRouter();

// Base router for Sport REST endpoints
const baseRoute: string = '/sport';

/* ROUTES */
// POST route to create new Sport
sportRouter.post('add-sport',
    baseRoute,
    sportController.addSport
);

// GET route to get a single sport
sportRouter.get('get-sport',
    `${baseRoute}/:id`,
    sportController.getSport
);

// GET route to get all sports
sportRouter.get('get-all-sports',
    baseRoute,
    sportController.getAllSports
);

// POST route to update a sport by ID
sportRouter.post('update-sport',
    baseRoute,
    sportController.updateSport
);

// DELETE route to delete a sport
sportRouter.delete('delete-sport',
    baseRoute,
    sportController.deleteSport
);

export default sportRouter;