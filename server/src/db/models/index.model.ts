import { Action } from "./action.model";
import { ActionOperation } from "./ActionOperation";
import { Content } from "./content.model";
import { LinkActionNRole } from "./linkActionNRole.model";
import { LinkUserNRole } from "./linkUserNRole.model";
import { Role } from "./role.model";
import { User } from "./user.model";

export default async function initializeModels() {
    try {
        // initialize
        await User.initialize();
        await Role.initialize();
        await LinkUserNRole.initialize();
        await Content.initialize();
        await Action.initialize();
        await LinkActionNRole.initialize();
        await ActionOperation.initialize();

        // foreignKeys
        Role.belongsToMany(User, {
            through: LinkUserNRole,
            foreignKey: 'roleId',
            otherKey: 'userId',
        });
        
        User.belongsToMany(Role, {
            through: LinkUserNRole,
            foreignKey: 'userId',
            otherKey: 'roleId',
        });
        
        Role.hasMany(LinkUserNRole, {
            foreignKey: 'roleId',
            as: 'userRoles',
        });
        
        User.hasMany(LinkUserNRole, {
            foreignKey: 'userId',
            as: 'roleLinks',
        });
        
        LinkUserNRole.belongsTo(Role, {
            foreignKey: 'roleId',
            as: 'role',
        });
        
        LinkUserNRole.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
        });
        
        Action.belongsToMany(Role, {
            through: LinkActionNRole,
            foreignKey: 'actionId',
            otherKey: 'roleId',
        });
        
        Role.belongsToMany(Action, {
            through: LinkActionNRole,
            foreignKey: 'roleId',
            otherKey: 'actionId',
        });
        
        Role.hasMany(LinkActionNRole, {
            foreignKey: 'roleId',
            as: 'actionRoles',
        });
        
        Action.hasMany(LinkActionNRole, {
            foreignKey: 'actionId',
            as: 'actionLinks',
        });
        
        LinkActionNRole.belongsTo(Role, {
            foreignKey: 'roleId',
            as: 'role',
        });
        
        LinkActionNRole.belongsTo(Action, {
            foreignKey: 'actionId',
            as: 'action',
        });
        
        User.hasMany(Content, {
            foreignKey: 'userId',
            as: 'contents',
        });
        
        Content.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
        });

        Action.hasOne(ActionOperation, {
            foreignKey: 'actionId',
            as: 'actionOp',
        });

        ActionOperation.belongsTo(Action, {
            foreignKey: 'actionId',
            as: 'opAction',
        });


        // synchronize
        await Promise.all([
        //     User.sync(),
        //     Role.sync(),
        //     LinkUserNRole.sync(),
        //     Content.sync(),
        //     Action.sync(),
        //     LinkActionNRole.sync()
        // ActionOperation.sync()
        ]);
        // console.log("All models synchronized successfully");
        
    } catch (error) {
        console.error("Error initializing models: ", error);
    }
}
