import { createServer } from 'http';
import { setupMiddleware } from '../middleware';
import { setupRoutes } from '../routes';
import cors from 'cors';
import express from 'express';
import favicon from 'serve-favicon';

const app = express();

app.use(favicon('./favicon.png'));

setupMiddleware(app);

app.use(cors());

setupRoutes(app);

const http = createServer(app);

export { http, app };
