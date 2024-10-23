import express from "express";
import config from "./config/index.config";
import path from "path";

async function startServer() {
    const app = express();

    ((await import('./loaders/index.loader')).default({ app }))
    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
    
    app.listen(config.port, () => {
        console.log(`server is running at port ${config.port}`);
    }).on("error", (error) => {
        console.log(error.message)
        process.exit(1);
    })

    
}

startServer()