import { Router } from 'express';
import userManagement from './user-management/index.routes';
import content from './content/index.routes'

export default function () {
    const route = Router();
    userManagement(route);
    content(route)

    return route;
}