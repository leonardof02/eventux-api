import express, { Router } from "express";
import UserController from "../controllers/UserController";
import { userValidator } from "../middlewares/validators/userValidator";
import Authenticator from "../security/Authenticator";
import { idParams } from "../middlewares/validators/idParamsValidator";
import { uploadImage } from "../middlewares/uploads/uploadImage";

// Route name: /users
const UserRouter = express.Router();

// -- Configure routes
UserRouter.get( "/", UserController.getAll );
UserRouter.post( "/", uploadImage(), userValidator(), UserController.create );
UserRouter.delete( "/:id", idParams(), Authenticator.isAuth(), UserController.delete );

export default UserRouter;