import { DataTypes, Model } from "sequelize";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";

export class Role extends Model {
    public id!: number;
    public name: string;
    public description: string;
    public isActive: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static async initialize() {
        const sequelize = await getSequelizeInstance();
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        }, {
            sequelize,
            tableName: TableName.role,
            timestamps: true
        });
        
    }
}

import { Action } from './action.model'; // Import the Action type

// Define the LinkActionNRole type if you haven't already
import { LinkActionNRole } from './linkActionNRole.model';
import { LinkUserNRole } from "./linkUserNRole.model";

export interface Role {
    id: number;
    name: string;
    // Add the actionRoles property here
    actionRoles?: Array<LinkActionNRole & {
        action: Action; // Include action information
    }>;
    userRoles?: LinkUserNRole[]; // Assuming you have this type defined
}
