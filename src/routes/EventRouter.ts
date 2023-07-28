import express, { Router } from "express";

import upload from "../config/uploads";
import { uploadImage } from "../middlewares/uploads/uploadImage";

import EventController from "../controllers/EventController";
import Authenticator from "../security/Authenticator";
import { idParams } from "../middlewares/validators/idParams";

// Route name: /users
const EventRouter = express.Router();

// -- Configure routes
EventRouter.get( "/", EventController.getAll );
EventRouter.post( "/", Authenticator.isAuth(), uploadImage(), EventController.create );
EventRouter.put( "/:id", idParams(), Authenticator.isAuth(), EventController.update );
EventRouter.delete( "/:id", idParams(), Authenticator.isAuth(), EventController.delete );


export default EventRouter;