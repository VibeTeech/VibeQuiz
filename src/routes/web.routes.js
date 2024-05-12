import express from 'express';
const router = express.Router();

import { pool } from '../database/connection';

router.get('/ping', async (req, res) => {
    const [result] = await pool.query("SELECT NOW()");
    res.json(result);
});

module.exports = router;