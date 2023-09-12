import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Database from './src/database/DbInit';
import UserRepository from './src/database/UserRepository';
import User from './src/models/User';
import { get } from 'http';

dotenv.config();

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});