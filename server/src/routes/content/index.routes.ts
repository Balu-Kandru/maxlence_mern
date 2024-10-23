import { Router } from 'express';
import contentRoute from './content.routes';

export default function(app: Router) {
    const route = Router();
    app.use('/content', route);
    
    contentRoute(route);
    return route;
}