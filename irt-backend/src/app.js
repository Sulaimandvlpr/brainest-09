import express from 'express';
import router from './routes.js';
import { client } from './db.js';

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = 3001;
client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`IRT backend running on http://localhost:${PORT}`);
  });
}); 