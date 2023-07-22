import express, { Router } from "express";
import EventController from "../controllers/EventController";

// Route name: /users
const EventRouter = express.Router();

// -- Configure routes
EventRouter.get( "/", EventController.getAll );

export default EventRouter;