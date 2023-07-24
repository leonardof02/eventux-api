import express, { Router } from "express";
import FacultyController from "../controllers/FacultyController";
import Authenticator from "../security/Authenticator";

// Route name: /users
const AuthRouter = express.Router();

// -- Configure routes
AuthRouter.post( "/", Authenticator.authenticate );

export default AuthRouter;