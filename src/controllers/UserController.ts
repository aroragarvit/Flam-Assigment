import UserRepository from '../database/UserRepository';
import User from '../models/User';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import {Hashing} from '../utils/Hashing';


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
      
      const user = User.getInstance(username, email, password); // here user object is created first time 
      if(await userRepository.getUser(email)){
        res.status(400).send('User already exists');
        return;
      }
      await userRepository.addUser(user);
      req.session.user = user;                                                          // we are storing user object in session storage with key user and value user object and express session will automatically send cookie to client with session id and it will store in browser and it will send with every request to server and when we want to check if user is logged in or not we will check if session has user object or not by checking req.session.user it sends session id 
      res.status(200).send('User added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send(`Internal Server Error ${err}`);
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

        const validPassword = await Hashing.ComparePassword(password, user.getPassword());
        if (!validPassword) {
            res.status(401).send('Invalid password');
            return;
        }

        req.session.user = user; // Store the user in the session and automatically sends a cookie to the client with the session ID 
        res.status(200).send('Login successful');
        } catch (err) {
        console.error(err);
        res.status(500).send(`Internal Server Error ${err}`);
        }
    }

    public static async CheckLogin(req: Request, res: Response): Promise<void> {
        try {
            if(req.session.user){               
                res.status(200).send('User is logged in');
            }else{
                res.status(400).send('User is not logged in');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send(`Internal Server Error ${err}`);
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
      res.status(500).send(`Internal Server Error ${err}`);    }
  }
  }
export default UserController;
