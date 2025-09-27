import express, { Application } from 'express';
import { router } from './routes/router';
import { notFound } from './middleware/not.found';

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/a7', router);

app.get('/', (req, res) => {
  res.send('Personal Protfolio server is running');
});

app.use(notFound)
