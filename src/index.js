import express from "express";
import { createPool } from "mysql2/promise";
import {config} from 'dotenv'
config()

const app = express();
const webRoutes = require('./routes/web.routes');

const pool = createPool({
  host: process.env.MYSQLDB_HOST,
  user: 'root',
  password: process.env.MYSQLDB_ROOT_PASSWORD,
  port: process.env.MYSQLDB_DOCKER_PORT,
});

pool.on("connection", () => console.log("DB Connected!"));

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result[0]);
});

app.listen(process.env.NODE_DOCKER_PORT || 3000);
console.log("Server on port", process.env.NODE_DOCKER_PORT || 3000);