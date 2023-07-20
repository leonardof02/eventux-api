import express, { Router } from "express";
import UserController from "../controllers/UserController.js";

// Route name: /users
const UserRouter = express.Router();

// -- Configure routes
UserRouter.get( "/", UserController.sayHello );

export default UserRouter;