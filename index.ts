import express, { Express } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import UserRouter from './src/routes/UserRouter';
import * as redis from 'redis';
import connectRedis from 'connect-redis';

const app: Express = express();
app.use(express.json());

const url = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = redis.createClient({
    url
});

const RedisStore = connectRedis(session);

const sessionOptions: session.SessionOptions = {
  secret: 'mysecret',
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient as any,
  }),
  saveUninitialized: false,
  resave: false,
};

app.use(session(sessionOptions));
app.use("/", new UserRouter().router);
const port = 3000;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
