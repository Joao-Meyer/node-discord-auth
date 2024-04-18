import { app } from './main/config/app';

app.listen(3000, () => {
  console.info(`Server started at http://localhost:${3000}`);
});
