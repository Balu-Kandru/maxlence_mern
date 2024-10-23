import { DataTypes, Model } from "sequelize";
import { Role } from "./role.model";
import { User } from "./user.model";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";


export class LinkUserNRole extends Model {
    public id!: number;
    public roleId: number;
    public userId: number;

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
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Role,
                    key: "id"
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: "id"
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        }, {
            sequelize,
            tableName: TableName.linkUserNRole,
            timestamps: true
        });
    }
};