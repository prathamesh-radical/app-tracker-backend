import express from 'express';
import { login, signUp } from '../controller/authController.js';

const AuthRoute = express.Router();

AuthRoute.post('/signup', signUp);
AuthRoute.post('/login', login);

export default AuthRoute;