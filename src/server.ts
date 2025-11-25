// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import expressConfig from './config/express';
import logger from './utils/logger';
import './config/db';

dotenv.config({ quiet: true });


const app = express();
const PORT = process.env.PORT || process.env.GLOVO_PORT || 3000;

// Correct usage: pass `app` (Express instance) to the config function
expressConfig(app);

app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
