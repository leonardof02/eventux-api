import express, { Router } from "express";

import upload from "../config/uploads";
import { uploadImage } from "../middlewares/uploads/uploadImage";

import EventController from "../controllers/EventController";
import Authenticator from "../security/Authenticator";

// Route name: /users
const EventRouter = express.Router();

// -- Configure routes
EventRouter.get( "/", EventController.getAll );
EventRouter.post( "/", Authenticator.isAuth(), uploadImage(), EventController.create );

export default EventRouter;