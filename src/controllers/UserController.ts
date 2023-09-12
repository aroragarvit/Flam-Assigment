import UserRepository from '../database/UserRepository';
import User from '../models/User';
import { Request, Response } from 'express';

class UserController {
  public static async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const user = User.getInstance(username, email, password);
      const userRepository = new UserRepository();
      await userRepository.addUser(user);
      res.status(200).send('User added successfully');
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  }
}
