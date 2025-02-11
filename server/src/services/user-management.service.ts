import { Action } from "../db/models/action.model";
import { ActionOperation } from "../db/models/ActionOperation";
import { LinkActionNRole } from "../db/models/linkActionNRole.model";
import { LinkUserNRole } from "../db/models/linkUserNRole.model";
import { Role } from "../db/models/role.model";
import { User } from "../db/models/user.model";
import { compareHashedText, hashText } from "./helpers/hashing";
import { Op } from "sequelize"
interface CreateUserParams {
    name: string;
    email: string;
    password: string;
    filePath?: any;
    token?: string | null;
    isValidated?: boolean
}

export const getUsers = async (limit: number, offset: number, whereCondition?: any) => {
    try {
        const { count, rows } = await User.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
        });

        return {
            total: count,
            page: offset / limit,
            totalPages: Math.ceil(count / limit),
            content: rows,
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const getUser = async (whereCondition?: any) => {
    try {
        const data = await User.scope('withToken').findOne({
            where: whereCondition,
        });

        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const createUser = async ({ name, email, password, filePath, isValidated = false, token }: CreateUserParams) => {
    try {
        const hashedPassword = await hashText(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePic: filePath ? filePath : null,
            token,
            isValidated
        });

        return newUser;
    } catch (error) {
        console.log(error)
        throw new Error('User creation failed: ' + error.message);
    }
}

export const updatePassword = async (password: string, whereCondition: any) => {
    try {
        const hashedPassword = await hashText(password);
        await User.update({ password: hashedPassword }, { where: whereCondition })
    } catch (error) {
        throw new Error('failed to change password: ' + error.message);
    }
}

export async function verifyUser(email: string, password: string): Promise<User> {
    const user = await User.scope('withPassword').findOne({ where: { email, isValidated: true } });
    if (!user) {
        throw new Error('Invalid email');
    }

    const isPasswordValid = await compareHashedText(String(password), user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return user;
}

export const transformRolesAndActions = (rolesWithActions: Role[]) => {
    const roles = [];
    const actions = [];
    const roleNames = [];

    rolesWithActions.forEach(role => {
        roles.push({
            id: role.id,
            name: role.name
        });

        role.actionRoles.forEach(actionRole => {
            actions.push({
                id: actionRole.action.id,
                name: actionRole.action.name
            });
        });

        roleNames.push(role.name);
    });

    return { roles, actions, roleNames };
};


export const validateUser = async (token: string) => {
    try {
        const user = await User.findOne({ where: { token } });
        if (!user) {
            throw new Error("User does not exist");
        } else if (user.isValidated) {
            throw new Error("User already validated");
        }
        user.isValidated = true;
        await user.save();
    } catch (error) {
        throw new Error('User confirmation failed: ' + error.message);

    }
}


export const deleteUser = async (id: number) => {
    try {
        await User.destroy({
            where: { id }
        })
    } catch (error) {
        throw new Error('User deletion failed: ' + error.message);
    }
}

export const getUserActions = async (userId: number) => {
    try {
        const actions = await Role.findAll({
            include: [
                {
                    model: LinkUserNRole,
                    as: 'userRoles',
                    required: true,
                    where: { userId },
                },
                {
                    model: LinkActionNRole,
                    as: 'actionRoles',
                    include: [
                        {
                            model: Action,
                            as: 'action',
                            attributes: ['id', 'name'],
                        },
                    ],
                },
            ],
            attributes: [],
        });
        const actionList = actions.flatMap(role =>
            role.actionRoles.map(actionRole => actionRole.action)
        );

        return actionList;
    } catch (error) {
        throw new Error(`Failed to retrieve actions for user ID ${userId}: ${error.message}`);
    }

}

export const getRolesAndActionsByUserId = async (userId: number) => {
    try {
        const rolesWithActions = await Role.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: LinkUserNRole,
                    as: 'userRoles',
                    required: true,
                    where: { userId },
                },
                {
                    model: LinkActionNRole,
                    as: 'actionRoles',
                    include: [
                        {
                            model: Action,
                            as: 'action',
                            attributes: ['id', 'name'],
                        },
                    ],
                },
            ],
        });
        return rolesWithActions;
    } catch (error) {
        throw new Error(`Failed to retrieve roles and actions for user ID ${userId}: ${error.message}`);
    }
};

export const getRolesByUserId = async (userId: number) => {
    try {
        const roles = await Role.findAll({
            attributes: ['name', 'id'],
            include: [
                {
                    model: LinkUserNRole,
                    as: 'userRoles',
                    required: true,
                    where: { userId },
                },
            ],
        });
        return roles
    } catch (error) {
        throw new Error('failed: ' + error.message);
    }
}

export const getActionsByRoleIds = async (roleIds: number[]) => {
    try {
        const actions = await Action.findAll({
            attributes: ['name', 'id'],
            include: [
                {
                    model: LinkActionNRole,
                    as: 'actionLinks',
                    required: true,
                    where: {
                        roleId: {
                            [Op.in]: roleIds
                        }
                    },
                },
            ],
        });
        return actions;
    } catch (error) {
        throw new Error('Failed: ' + error.message);
    }
};

export const createRole = async (name: string, description: string) => {
    try {
        return await Role.create({
            name, description
        })
    } catch (error) {
        throw new Error('Role creation failed: ' + error.message);
    }
}

export const assignRole = async (userId: number, roleId: number) => {
    try {
        await LinkUserNRole.create({
            userId, roleId
        })
    } catch (error) {
        throw new Error('Role assigning failed: ' + error.message);
    }
}

export const getRoles = async () => {
    try {
        const rolesList = await Role.findAll()
        return rolesList;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const modifyUser = async (whereCondition: any, updateUser) => {
    try {
        await User.update(updateUser, { where: whereCondition })
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createAction = async (name: string, description: string) => {
    try {
        return await Action.create({
            name, description
        })
    } catch (error) {
        throw new Error('Action creation failed: ' + error.message);
    }
}

export const assignAction = async (actionId: number, roleId: number) => {
    try {
        await LinkActionNRole.create({
            actionId, roleId
        })
    } catch (error) {
        throw new Error('Role assigning failed: ' + error.message);
    }
}

export const getAction = async (whereCondition?: any) => {
    try {
        return await Action.findOne({
            where: whereCondition,
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getRoleByName = async (name: string) => {
    try {
        const roleInfo = await Role.findOne({ where: { name } });
        if (!roleInfo) {
            throw new Error("Given role does not exist");
        }
        return roleInfo;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getOperation = async (actionId: number) => {
    try {
        const operations = await ActionOperation.findOne({
            where: { actionId }
        })
        return operations;
    } catch (error) {
        throw new Error(error.message);
    }
}