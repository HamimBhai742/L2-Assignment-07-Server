import express, { Application } from 'express';

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Personal Protfolio server is running');
});
