import expressLoader from './express.loader';
import type { Express } from 'express';
import initializeSequelize from './sequelize.loader';
import syncModel from '../db/models/index.model'


export default async function ({ app }: { app: Express}) {
    await initializeSequelize();
    console.log("mysql loaded")

    await expressLoader({ app });
    console.log("express loaded")
    
    await syncModel();
}