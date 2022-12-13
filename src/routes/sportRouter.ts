import KoaRouter from 'koa-router';
import sportController from '../controllers/sportController';
import authenticateJWT from '../middlware/authenticateToken';
import teamController from "../controllers/teamController";
import teamRouter from "./teamRouter";

// Setup Router
const sportRouter: KoaRouter = new KoaRouter();

// Base router for Sport REST endpoints
const baseRoute: string = '/sports';

/* ROUTES */
// POST route to create new Sport
sportRouter.post('add-sport',
    baseRoute,
    authenticateJWT,
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
sportRouter.put('update-sport',
    baseRoute,
    authenticateJWT,
    sportController.updateSport
);

// DELETE route to delete a sport
sportRouter.delete('delete-sport',
    `${baseRoute}/:id`,
    authenticateJWT,
    sportController.deleteSport
);

export default sportRouter;