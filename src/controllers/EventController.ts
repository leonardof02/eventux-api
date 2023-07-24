import { Request, Response } from "express";
import { User } from "../models/User";
import { Event } from "../models/Event";
import { EventRequest } from "../types";
import { validationResult } from "express-validator";

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

    public static async create(req: EventRequest, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors });

        try {
            const { name, description } = req.body;
            const newEvent = await Event.create({
                name,
                description,
                userId: req.userId
            });
            res.status(200).json({
                message: "Event Created!",
                event: newEvent.dataValues
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server internal error",
                errors: err.message
            });
        }
    }
}
