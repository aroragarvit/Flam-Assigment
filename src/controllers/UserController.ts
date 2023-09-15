import UserRepository from '../database/UserRepository';
import User from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

class UserController {
  public static async SignUp(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = new UserRepository();
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).send('Missing parameters');
        return;
      }
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR));
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = User.getInstance(username, email, hashedPassword);
      if(await UserRepository.getUser(email)){
        res.status(400).send('User already exists');
        return;
      }
      await userRepository.addUser(user);
      req.session.user = user; // Store the user in the session
      res.status(200).send('User added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }


  public static async Login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const userRepository = new UserRepository();
        const user = await userRepository.getUser(email); // Its returning Instance 
        if(!req.body.email || !req.body.password){
        res.status(400).send('Missing parameters');
        return;
         }
        if(req.session.user){
            res.status(400).send('Already logged in');
            return;
        }

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const validPassword = await bcrypt.compare(password, user.getPassword());
        if (!validPassword) {
            res.status(401).send('Invalid password');
            return;
        }

        req.session.user = user; // Store the user in the session and automatically sends a cookie to the client with the session ID 
        res.status(200).send('Login successful');
        } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        }
    }

  public static async Logout(req: Request, res: Response): Promise<void> {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('Logged out successfully');
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  public static LoggedInUser(req:Request, res:Response){
    if(req.session.user){
      res.status(200).send(req.session.user);
    }else{
      res.status(400).send('No user logged in');
    }
  }
    
  }
export default UserController;
