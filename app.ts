import { authenticateUserController } from './auth';

import express from 'express';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/auth', authenticateUserController());

app.get('/about', (req, res) => {
  res.json({
    ola: 'About route 🎉 '
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
