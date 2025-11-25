import express from 'express';
import { json, urlencoded } from 'body-parser';
import routes from './routes';
import middleware from './middleware';

const app = express();

// Middleware setup
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(middleware);

// Routes setup
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Export the app for use in index.ts
export default app;