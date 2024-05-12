// routes/web.routes.js
import { Router } from 'express';
import { pool } from '../index.js'; // Importe a conexão do banco de dados

const router = Router();

router.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result[0]);
});

export default router;
