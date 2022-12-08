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

// GET route to get a single player
playerRouter.get('get-player',
    `${baseRoute}/:id`,
    playerController.getPlayer
);

// GET route to get all players
playerRouter.get('get-all-players',
    baseRoute,
    playerController.getAllPlayers
);

// POST route to update a player by ID
playerRouter.put('update-player',
    `${baseRoute}/:id`,
    playerController.updatePlayer
);

// DELETE route to delete a player
playerRouter.delete('delete-player',
    `${baseRoute}/:id`,
    playerController.deletePlayer
);

export default playerRouter;