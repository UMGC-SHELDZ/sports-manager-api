import KoaRouter from 'koa-router';
import playerController from '../controllers/playerController';
import authenticateJWT from '../middlware/authenticateToken';

// Setup Router
const playerRouter: KoaRouter = new KoaRouter();

// Base router for Player REST endpoints
const baseRoute: string = '/player';

/* ROUTES */
// POST route to create new Player
playerRouter.post('add-player',
    baseRoute,
    authenticateJWT,
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

playerRouter.get('get-players-by-team',
    `${baseRoute}/team/:id`,
    playerController.getPlayersByTeam
    )

// POST route to update a player by ID
playerRouter.put('update-player',
    `${baseRoute}/:id`,
    authenticateJWT,
    playerController.updatePlayer
);

// DELETE route to delete a player
playerRouter.delete('delete-player',
    `${baseRoute}/:id`,
    authenticateJWT,
    playerController.deletePlayer
);

export default playerRouter;