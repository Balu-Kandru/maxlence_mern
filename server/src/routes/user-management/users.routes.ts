import { Router } from 'express';
import { actionList, assignRoleToAction, assignRoleToUser, changePassword, confirmUser, listUsers, loggedInUserInfo, login, operations, registerUser, removeUser, rolesList, saveAction, saveRole, sendForgotPasswordMail, updateUser, userActions } from '../../controllers/user-management.controller';
import { createUserValidator, emailValidator, loginUserValidator, operationsValidator, tokenNPasswordValidator } from '../../validators/userValidators';
import upload from '../middlewares/multerConfig';


export default function (app: Router) {
    const route = Router();
    app.use(route);

    route.get('/', listUsers);

    route.post('/register', upload.single('profilePicture'), createUserValidator, registerUser)

    route.get('/confirm/:token', confirmUser)

    route.post('/login', loginUserValidator, login);

    route.post("/forget-password-mail", emailValidator, sendForgotPasswordMail);

    route.post("/change-password/:token", tokenNPasswordValidator, changePassword);

    route.delete('/', removeUser);

    route.get('/user-profile', loggedInUserInfo);

    route.put('/user-profile', upload.single('profilePicture'), updateUser);

    route.get('/userActions', userActions)

    route.post('/role', saveRole)

    route.get('/roles', rolesList)

    route.post('/assignRoleToUser', assignRoleToUser);

    route.post('/action', saveAction)

    route.get('/actions', actionList)

    route.get('/action-operations', operationsValidator, operations)

    route.post('/assignRoleToAction', assignRoleToAction);

}