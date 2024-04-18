import './main/config/module-alias';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/auth', (req, res) => {
  res.json({
    ola: 'About route 🎉 '
  });
});

app.get('/about', (req, res) => {
  res.json({
    ola: 'About route 🎉 '
  });
});

app.listen(3000, () => {
  console.info(`Server started at http://localhost:${3000}`);
});
