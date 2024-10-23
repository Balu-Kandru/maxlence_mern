import { DataTypes, Model } from "sequelize";
import { getSequelizeInstance }  from "../../loaders/sequelize.loader";
import { TableName } from "../../enums/table.enum";


export class Action extends Model {
    public id!: number;
    public name: string;
    public description: string;
    public isActive: boolean;

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
            tableName: TableName.action,
            timestamps: true
        })
    }

}