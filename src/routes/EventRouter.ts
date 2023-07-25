import express, { Router } from "express";
import EventController from "../controllers/EventController";
import Authenticator from "../security/Authenticator";
import upload from "../config/uploads";

// Route name: /users
const EventRouter = express.Router();

// -- Configure routes
EventRouter.get( "/", EventController.getAll );
EventRouter.post( "/", Authenticator.isAuth(), upload.single("image") , EventController.create );

export default EventRouter;