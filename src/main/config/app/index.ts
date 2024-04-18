import { createServer } from 'http';
import { setupMiddleware } from '../middleware';
import cors from 'cors';
import express from 'express';

const app = express();

setupMiddleware(app);

app.use(cors());

const http = createServer(app);

export { http, app };
