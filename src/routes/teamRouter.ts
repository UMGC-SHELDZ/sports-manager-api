import KoaRouter from 'koa-router';
import teamController from '../controllers/teamController';

// Setup Router
const teamRouter: KoaRouter = new KoaRouter();

// Base router for Team REST endpoints
const baseRoute: string = '/team';

/* ROUTES */
// POST route to create new Team
teamRouter.post('add-team',
    baseRoute,
    teamController.addTeam
);

// GET route to get a single team
teamRouter.get('get-team',
    `${baseRoute}/:id`,
    teamController.getTeam
);

// GET route to get all teams
teamRouter.get('get-all-teams',
    baseRoute,
    teamController.getAllTeams
);

// POST route to update a team by ID
teamRouter.put('update-team',
    `${baseRoute}/:id`,
    teamController.updateTeam
);

// DELETE route to delete a team
teamRouter.delete('delete-team',
    `${baseRoute}/:id`,
    teamController.deleteTeam
);

export default teamRouter;