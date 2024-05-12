import express from "express";
import path from "path";
import { createPool } from "mysql2/promise";
import {config} from 'dotenv'
import webRoutes from './routes/web.routes';
config()

const app = express();

const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
});

pool.on("connection", () => console.log("DB Connected!"));

app.set('views', path.join(__dirname, 'views'));

app.use('/', webRoutes);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(process.env.NODE_DOCKER_PORT || 3000);
console.log("Server on port", process.env.NODE_DOCKER_PORT || 3000);
