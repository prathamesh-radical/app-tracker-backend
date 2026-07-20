import express from 'express';
import { ForgotPassword, login, signUp } from '../controller/authController.js';

const AuthRoute = express.Router();

AuthRoute.post('/signup', signUp);
AuthRoute.post('/login', login);
AuthRoute.put('/forgot', ForgotPassword);

export default AuthRoute;