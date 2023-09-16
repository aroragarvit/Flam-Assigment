import {Session, SessionData} from 'express-session'; 
import {User} from '../models/User';

declare module 'express-session' {
    interface SessionData {
        user?: User;
    }
}