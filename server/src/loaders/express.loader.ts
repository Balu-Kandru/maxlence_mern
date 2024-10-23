import express from 'express';
import helmet from 'helmet';
import type { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from '../config/index.config';
import centralRoute from '../routes/index.routes'
import { successHandler } from '../routes/middlewares/successHandler';
import { globalErrorHandler, notFoundHandler } from '../routes/middlewares/errorHandler';
import { validateToken } from '../routes/middlewares/validateToken';





export default async function ({ app }: { app: Express }) {
    app.get('/status', (req, res) => { res.sendStatus(200).end() });
    app.head('/status', (req, res) => { res.sendStatus(200).end() });
    
    // app.enable('trust proxy')
    app.use(
        helmet({
            contentSecurityPolicy: false
        })
    );
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan(config.logs.morgan));
    app.use(successHandler)
    app.use(validateToken)
    app.use(config.apiPrefix.server, centralRoute());

	app.use(notFoundHandler);
	app.use(globalErrorHandler);
    
}