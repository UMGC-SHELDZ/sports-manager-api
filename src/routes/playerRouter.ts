import KoaRouter from 'koa-router';
import playerController from '../controllers/playerController';

// Setup Router
const playerRouter: KoaRouter = new KoaRouter();

// Base router for Player REST endpoints
const baseRoute: string = '/player';

/* ROUTES */
// POST route to create new Player
playerRouter.post('add-player',
    baseRoute,
    playerController.addPlayer
);

export default playerRouter;