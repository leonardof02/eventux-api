import express, { Router } from "express";

import upload from "../config/uploads";
import { uploadEventImage } from "../middlewares/uploads/uploadEventImage";

import EventController from "../controllers/EventController";
import Authenticator from "../security/Authenticator";

// Route name: /users
const EventRouter = express.Router();

// -- Configure routes
EventRouter.get( "/", EventController.getAll );
EventRouter.post( "/", Authenticator.isAuth(), uploadEventImage(), EventController.create );

export default EventRouter;