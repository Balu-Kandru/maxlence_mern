import { DataTypes, Model } from "sequelize";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";
import { Action } from "./action.model";


export class ActionOperation extends Model {
    public id!: number;
    public actionId: string;
    public fetch: string;
    public post: string;
    public delete: string;
    public edit: string;

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
            actionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Action,
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            fetch: {
                type: DataTypes.STRING,
                allowNull: true
            },
            post: {
                type: DataTypes.STRING,
                allowNull: true
            },
            delete: {
                type: DataTypes.STRING,
                allowNull: true
            },
            edit: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: TableName.actionOperation,
            timestamps: true
        })
    }

}