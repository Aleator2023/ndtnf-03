console.log("Library app initialized");

import express from 'express';
import { router } from './routes'
import { connectDB } from './db';

connectDB();

const app = express();

app.use(express.json());
app.use('/books', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});