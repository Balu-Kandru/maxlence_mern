import { Request, Response, NextFunction } from 'express';
import { assignAction, assignRole, createAction, createRole, createUser, getAction, getUsers, getRoleByName, getRoles, validateUser, getUserActions, deleteUser, getOperation, getUser, getRolesAndActionsByUserId, transformRolesAndActions, verifyUser } from '../services/user-management.service';
import { validationResult } from 'express-validator';
import { generateJwtToken, generateToken } from '../services/helpers/hashing';
import { sendWelcomeEmail } from '../services/email.service';
import { APIPath } from '../enums/api.enum';
import { StatusCodes } from 'http-status-codes';
import config from '../config/index.config';
import { Roles } from '../enums/roles.enum';
import { wholeUrl } from '../services/helpers/common';
import { getCachedData, storeCache } from '../loaders/redis.loader';


export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const page = +req.query.page || 0;
        const limit = +req.query.limit || 20;
        const offset = page * limit;
        const cacheKey = `users:page:${page}:limit:${limit}`;

        const cachedUsers = await getCachedData(cacheKey);
        if (cachedUsers) {
            res.success(cachedUsers, "fetched users successfully")
            return;
        }
        const users = await getUsers(limit, offset);
        await storeCache(cacheKey, JSON.stringify(users), 60);
        res.success(users, "fetched users successfully")
    } catch (error) {
        next(error);

    }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const token = await generateToken();
        const { name, email, password } = req.body;
        const profilePicture = req.file;
        const filePath = `${config.server.url}/${profilePicture.path}`;
        const url = wholeUrl();
        const confirmationLink = `${url}${APIPath.confirmEmail}/${token}`;

        const userInfo = await createUser({ name, email, password, filePath, token });

        const roleName = Roles.customer;
        const roleInfo = await getRoleByName(roleName);

        await assignRole(userInfo.id, roleInfo.id)
        await sendWelcomeEmail(email, confirmationLink);
        res.success('User register successfully, please confirm your email before login');
    } catch (error) {
        console.log(error)
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { email, password } = req.body;

        const user = await verifyUser(email, password);
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials' });
        } else {
            const rolesWithActions = await getRolesAndActionsByUserId(user.id);

            const { roles, actions, roleNames } = transformRolesAndActions(rolesWithActions);
            const accesToken = await generateJwtToken({ id: user.id, email: user.email, role: roleNames });

            const Info = { user, accesToken, roles, actions };
            res.success(Info, "User loggedIn successfully");
        }
        return;
    } catch (error) {
        next(error);
    }
};

export async function confirmUser(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    try {
        await validateUser(token);
        const htmlResponse =
            `<html>
                <body>
                    <h1>Confirmation Successful!</h1>
                    <p>Your account has been successfully confirmed. Thank you for joining us!</p>
                </body>
            </html>`;
        res.status(StatusCodes.OK).send(htmlResponse);
    } catch (error) {
        console.error(error.message)
        const htmlResponse =
            `<html>
            <body>
                <h1>Validation Failed!</h1>
                <p>Please contact admin</p>
            </body>
        </html>`;
        res.status(StatusCodes.BAD_REQUEST).send(htmlResponse);
    }
}

export async function loggedInUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.user;
        const whereCondition = { id }
        const users = await getUser(whereCondition);
        res.success(users, "fetched users successfully")
    } catch (error) {
        next(error);

    }
}

export async function sendResetPasswordLink(req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.body;

        res.success('Successfully');
    } catch (error) {
        next(error);
    }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.params;

        res.success('Successfully');
    } catch (error) {
        next(error);
    }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { id: userId } = req.user;
        await
            res.success('Successfully');
    } catch (error) {
        next(error);
    }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { id: userId } = req.user;

        res.success('Successfully');
    } catch (error) {
        next(error);
    }
}

export async function removeUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.query;
        await deleteUser(+userId);
        res.success("Delete user")
    } catch (error) {
        next(error);
    }
}

export async function userActions(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.user;
        const actions = await getUserActions(id);
        res.success(actions, "Fetched user actions")
    } catch (error) {
        next(error);
    }
}


export async function assignRoleToUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, roleId } = req.body;
        await assignRole(userId, roleId)
        res.success('Successfully');
    } catch (error) {
        next(error);
    }
}


export async function saveRole(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, description } = req.body;
        const roleInfo = await createRole(name, description)
        res.success(roleInfo, 'Successfully');
    } catch (error) {
        next(error);
    }
}

export async function rolesList(req: Request, res: Response, next: NextFunction) {
    try {
        const roleInfo = await getRoles();
        res.success(roleInfo, "Fetched successfully")
    } catch (error) {
        next(error);
    }
}


export async function assignRoleToAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { actionId, roleId } = req.body;
        await assignAction(actionId, roleId)
        res.success('Successfully');
    } catch (error) {
        next(error);
    }
}


export async function saveAction(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, description } = req.body;
        const actionInfo = await createAction(name, description)
        res.success(actionInfo, 'Successfully');
    } catch (error) {
        next(error);
    }
}

export async function actionList(req: Request, res: Response, next: NextFunction) {
    try {
        const roleInfo = await getAction();
        res.success(roleInfo, "Fetched successfully")
    } catch (error) {
        next(error);
    }
}

export async function operations(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { actionId } = req.query;
        const operationInfo = await getOperation(+actionId);
        res.success(operationInfo, "Fetched successfully")
    } catch (error) {
        next(error);
    }
}

export async function createAdminUser(req: Request, res: Response, next: NextFunction) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorInfo = errors.array().map(ele => ele.msg);
            next({message: errorInfo.join(",")})
            return;
        }
        const { username: name, email, password } = req.body;
        const profilePicture = req.file;
        const token = await generateToken();

        const filePath = `${config.server.url}/${profilePicture.path}`;
        const isValidated = true;
        const userInfo = await createUser({ name, email, password, filePath, isValidated, token });

        const roleName = Roles.admin;
        const roleInfo = await getRoleByName(roleName);
        await assignRole(userInfo.id, roleInfo.id)
        res.success("Created successfully")
    } catch (error) {
        next(error);
    }
}