# Maxlence MERN Application

## Overview

This project consists of two parts:
1. **Client Side** - React application using Vite.
2. **Server Side** - Node.js backend with Express, MySQL, Redis, and JWT for authentication.

## Prerequisites

Before starting the project, ensure the following services are running:

1. **Redis**:
   The application requires Redis to be running on port `6380`. You can start the Redis server with the following command:
   ```bash
   redis-server --port 6380
# Maxlence MERN Application

## Overview

This project consists of two parts:
1. **Client Side** - React application using Vite.
2. **Server Side** - Node.js backend with Express, MySQL, Redis, and JWT for authentication.

## Prerequisites

Before starting the project, ensure the following services are running:

1. **Redis**:
   The application requires Redis to be running on port `6380`. You can start the Redis server with the following command:
   ```bash
   redis-server --port 6380


## client env
VITE_SERVER_BASE_URL=http://localhost:3001

## server env
PORT=3001
MORGAN=dev

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Admin@123
DB_PORT=3306
DB_SCHEMA=maxlence_mern

DOMAIN=http://localhost:3001

EMAIL_USER=YOU'RE_EMAIL
EMAIL_PASS=EMAIL_PASS

JWT_SECRETKEY=maxlence_mern

REDIS_HOST=localhost
REDIS_PORT=6380

CLIENT_URL=http://localhost:5173
