import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRouter{
  router = Router(); 
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post('/signup', UserController.SignUp);
        this.router.post('/login', UserController.Login);
        this.router.post('/logout', UserController.Logout);
    }
}
export default UserRouter;