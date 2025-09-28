import express, { Application } from 'express';
import { router } from './routes/router';
import { notFound } from './middleware/not.found';
import { globalError } from './middleware/global.error';
import cors from 'cors';
import './config/passport';
import session from 'express-session';
import passport from 'passport';
import { env } from './config/env';
import cookieParser from 'cookie-parser';
export const app: Application = express();

app.use(
  session({
    secret: env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000'], // frontend origin
    credentials: true,
  })
);


app.use('/api/a7', router);

app.get('/', (req, res) => {
  res.send('Personal Protfolio server is running');
});

app.use(globalError);

app.use(notFound);
