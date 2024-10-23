import { Router } from 'express';
import { actionList, assignRoleToAction, assignRoleToUser, confirmUser, listUsers, loggedInUserInfo, login, operations, registerUser, removeUser, rolesList, saveAction, saveRole, userActions } from '../../controllers/user-management.controller';
import { createUserValidator, loginUserValidator, operationsValidator } from '../../validators/userValidators';
import upload from '../middlewares/multerConfig';


export default function (app: Router) {
    const route = Router();
    app.use(route);

    route.get('/', listUsers);

    route.post('/register', upload.single('profilePicture'), createUserValidator, registerUser)

    route.get('/confirm/:token', confirmUser)

    route.post('/login', loginUserValidator, login);

    route.delete('/', removeUser);

    route.get('/user-profile', loggedInUserInfo);

    route.get('/userActions', userActions)

    route.post('/role', saveRole)

    route.get('/roles', rolesList)

    route.post('/assignRoleToUser', assignRoleToUser);

    route.post('/action', saveAction)

    route.get('/actions', actionList)

    route.get('/action-operations', operationsValidator, operations)

    route.post('/assignRoleToAction', assignRoleToAction);

}