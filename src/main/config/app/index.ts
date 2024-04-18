import { setupMiddleware } from '../middleware';
import { setupRoutes } from '../routes';
import cors from 'cors';
import express from 'express';

const app = express();

setupMiddleware(app);

app.use(cors());

setupRoutes(app);

export { app };
