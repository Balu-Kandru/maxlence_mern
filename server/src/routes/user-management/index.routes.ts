import { Router } from 'express';
import usersRoute from './users.routes';

export default function(app: Router) {
    const route = Router();
    app.use('/user-management', route);
    
    usersRoute(route);

    return route;
}