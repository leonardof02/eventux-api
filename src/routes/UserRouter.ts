import express, { Router } from "express";
import UserController from "../controllers/UserController";
import { userValidator } from "../middlewares/validators/userValidator";

// Route name: /users
const UserRouter = express.Router();

// -- Configure routes
UserRouter.get( "/", UserController.getAll );
UserRouter.post( "/", userValidator(), UserController.create );

export default UserRouter;