import { Request, Response } from "express";
import { User } from "../models/User";
import { Event } from "../models/Event";
import { EventRequest } from "../types";

export default class EventController {

    // Implement Controllers
    public static async getAll(req: Request, res: Response) {
        const events = await Event.findAll({
            include: User
        });
        res.status(200).json({
            data: events
        });
    }

    public static async create( req: EventRequest, res: Response ) {
        res.send( req.userId.toString() );
    }
}
