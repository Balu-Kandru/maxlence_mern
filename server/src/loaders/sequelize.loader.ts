import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import config from '../config/index.config';

let sequelize: Sequelize | null = null;

function dbConnection(){
  return new Sequelize({
    ...config.mysql,
    dialect: 'mysql',
    timezone: '+00:00',
    logging: true,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    }
  });

}

export default async function initializeSequelize() {
  if (sequelize) {
    return sequelize;
  }

  try {
    sequelize = dbConnection()
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error: any) {
    if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
      console.error(`Database "${config.mysql.database}" does not exist. Creating it...`);
      try {
        const connection = await mysql.createConnection({
          host: config.mysql.host,
          user: config.mysql.username,
          password: config.mysql.password,
          port: config.mysql.port,
        });

        await connection.query(`CREATE DATABASE \`${config.mysql.database}\`;`);
        console.log(`Database "${config.mysql.database}" created successfully.`);
        await connection.end();

        return initializeSequelize();
      } catch (error) {
        console.error('Error creating the database:', error);
        throw error;
      }
    } else {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
  return sequelize;
}

export async function getSequelizeInstance() {
  if (!sequelize) {
    throw new Error("Sequelize not initialize")
  }
  return sequelize;
}
