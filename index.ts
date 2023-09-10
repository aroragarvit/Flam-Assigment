import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Database from './src/database/dbInit';

dotenv.config();

const app: Express = express();
const port = 3000;
const db = Database.getInstance();

app.get('/', (req: Request, res: Response) => {
    
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});