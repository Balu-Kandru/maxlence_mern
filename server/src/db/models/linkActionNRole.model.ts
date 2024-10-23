import { DataTypes, Model } from "sequelize";
import { Role } from "./role.model";
import { Action } from "./action.model";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";

export class LinkActionNRole extends Model {
    public id!: number;
    public roleId: number;
    public actionId: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static async initialize(){
        const sequelize = await getSequelizeInstance();
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Role,
                    key: "id"
                }
            },
            actionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Action,
                    key: "id"
                }
            }
        }, {
            sequelize,
            tableName: TableName.linkActionNRole,
            timestamps: true
        })
    }
};