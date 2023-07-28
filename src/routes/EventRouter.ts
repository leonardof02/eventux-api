import express, { Router } from "express";

import upload from "../config/uploads";
import { uploadImage } from "../middlewares/uploads/uploadImage";

import EventController from "../controllers/EventController";
import Authenticator from "../security/Authenticator";
import eventValidator from "../middlewares/validators/eventValidator";
import { idParams } from "../middlewares/validators/idParamsValidator";

// Route name: /users
const EventRouter = express.Router();

// -- Configure routes
EventRouter.get("/", EventController.getAll);
EventRouter.post(
    "/",
    Authenticator.isAuth(),
    eventValidator(),
    uploadImage(),
    EventController.create
);
EventRouter.put(
    "/:id",
    idParams(),
    Authenticator.isAuth(),
    uploadImage(),
    eventValidator(),
    EventController.update
);
EventRouter.delete(
    "/:id",
    idParams(),
    Authenticator.isAuth(),
    eventValidator(),
    EventController.delete
);

export default EventRouter;
