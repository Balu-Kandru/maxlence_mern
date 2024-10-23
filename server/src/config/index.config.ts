import dotenv from "dotenv";
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const envs = dotenv.config();

if(envs.error){
    throw new Error(".env file not found")
}

export default {
    port: parseInt(process.env.PORT, 10),
    logs: {
        morgan: process.env.MORGAN
    },
    mysql: {
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: +process.env.DB_PORT,
        database: process.env.DB_SCHEMA
    },
    email: {
        emailId: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    server: {
        url: process.env.DOMAIN,
        jwt_secret: process.env.JWT_SECRETKEY,
        unProtectedRoutes: [
            "/status",
            "/api/user-management/role",
            "/api/user-management/login",
            "/api/user-management/register",
            "/api/user-management/confirm/:token"
        ]
    },
    clientUrl: process.env.CLIENT_URL, 
    apiPrefix:{
        server: "/api"
    },
    redis:{
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6380
    }
}