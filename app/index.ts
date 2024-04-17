import './main/config/module-alias';
import { env } from './main/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/about', (req, res) => {
  res.json({
    ola: 'About route 🎉 '
  });
});

app.listen(typeof Number(env.API.PORT) === 'number' ? env.API.PORT : 3000, () => {
  console.info(`Server started at http://localhost:${env.API.PORT}`);
});
