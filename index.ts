import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';


import UserRouter from './src/Routes/UserRouter';
dotenv.config();

const app: Express = express();
app.use(express.json());

const redisClient = redis.createClient({
  host : 'localhost',
  port: REDIS_PORT
})
app.use(session({
  name: process.env.SESS_NAME,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  secret: process.env.SESS_SECRET,
  cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      secure: IN_PROD
  }
}))

app.use("/", new UserRouter().router);
const port = 3000;


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
