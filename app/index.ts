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

app.listen(env.API.PORT, () => {
  console.info(`Server started at http://localhost:${env.API.PORT}`);
});
