import express from 'express';
import { getUserprofile, userLogin, userLogout, userSignUp } from '../controllers/user.controller.js';
import { verifyUser } from '../middlewares/verifyUser.middleware.js';


const Router = express.Router();

// route of user signup
Router.route('/signup')
.post(userSignUp)

// route of user login
Router.route('/login')
.post(userLogin)

// route of user logout
Router.route('/logout')
.get(verifyUser, userLogout)


// route of user profile
Router.route('/profile')
.get(verifyUser, getUserprofile)


// route of user verifing
Router.route('/test')
.get(verifyUser)




export {Router as userRouter};