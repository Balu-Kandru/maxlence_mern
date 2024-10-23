import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";


export class Content extends Model {
    public id!: number;
    public title: string;
    public body: string;
    public userId: number;

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
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
        }, {
            sequelize,
            tableName: TableName.content,
            timestamps: true,
            defaultScope: {
                attributes: { exclude: ['userId'] },
            },
            scopes: {
                withPassword: {
                    attributes: { include: ['userId'] },
                },
            },
        })
    } 
}