// src/config/express.ts

import { Express } from 'express';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import Router from '../routes/v1';

export default function expressConfig(app: Express) {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
    exposedHeaders: ['hash-id-key'],
  };
  app.use(cors(corsOptions));

    // Use morgan for logging HTTP requests
    app.use(morgan('combined'));
  app.use(express.static('public'));

  // Use helmet to secure Express headers
  app.use(helmet());
  app.disable('x-powered-by');

  // Mount API routes
  app.use('/v1', Router);
}
