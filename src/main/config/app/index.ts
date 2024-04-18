import { setupMiddleware } from '../middleware';
import cors from 'cors';
import express from 'express';

const app = express();

setupMiddleware(app);

app.use(cors());

export { app };
