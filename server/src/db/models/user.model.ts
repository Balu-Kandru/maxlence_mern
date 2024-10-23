import { DataTypes, Model } from "sequelize";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";

export class User extends Model {
    public id!: number;
    public name: string;
    public email: string;
    public profilePic: string;
    public password: string;
    public token: string;
    public isValidated: boolean;

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
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            profilePic: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isValidated: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            token: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: null
            }
        }, {
            sequelize,
            tableName: TableName.users,
            timestamps: true,
            modelName: 'User',
            defaultScope: {
                attributes: { exclude: ['password', 'token'] },
            },
            scopes: {
                withPassword: {
                    attributes: { include: ['password'] },
                },
                withToken: {
                    attributes: { include: ['token'] }
                }
            },
        })
    }
}