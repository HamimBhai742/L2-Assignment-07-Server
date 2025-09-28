import express, { Application } from 'express';
import { router } from './routes/router';
import { notFound } from './middleware/not.found';
import { globalError } from './middleware/global.error';
import cors from 'cors';
import './config/passport'
import passport from 'passport';
export const app: Application = express();

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/a7', router);

app.get('/', (req, res) => {
  res.send('Personal Protfolio server is running');
});

app.use(globalError);

app.use(notFound)
