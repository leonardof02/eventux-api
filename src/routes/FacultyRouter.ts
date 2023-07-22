import express, { Router } from "express";
import FacultyController from "../controllers/FacultyController";

// Route name: /users
const FacultyRouter = express.Router();

// -- Configure routes
FacultyRouter.get( "/", FacultyController.getAll );

export default FacultyRouter;