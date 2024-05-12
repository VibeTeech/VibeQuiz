import express from "express";
import { createPool } from "mysql2/promise";
import { config } from 'dotenv';
import webRoutes from './routes/web.routes'; // Use import aqui

config();

const app = express();

export const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
});

pool.on("connection", () => console.log("DB Connected!"));

app.use(webRoutes); // Use as rotas importadas

app.listen(process.env.NODE_DOCKER_PORT || 3000);
console.log("Server on port", process.env.NODE_DOCKER_PORT || 3000);