import { Router } from 'express';
import { contentDeleteValidator, contentValidator } from '../../validators/contentValidators';
import { getContentByUser, contentList, saveContent, removeContent } from '../../controllers/content.controller';


export default function (app: Router) {
    const route = Router();
    app.use(route);

    route.get('/', getContentByUser);

    route.post('/', contentValidator, saveContent);

    route.get('/getAllContent', contentList);

    route.delete('/', contentDeleteValidator, removeContent)

}