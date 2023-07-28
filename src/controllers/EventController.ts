import fs from "fs";

import { Request, Response } from "express";
import { User } from "../models/User";
import { Event } from "../models/Event";
import { DeleteEventRequest, EventModel, EventRequest, UserModel } from "../types";
import { validationResult } from "express-validator";
import { PUBLIC_PATH } from "../config/paths";

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
        try {
            const { name, date, description } = req.body;
            const newEvent = await Event.create({
                name,
                description,
                date,
                userId: req.userId,
                imgUrl: req.file.path.replace(/^public/, "")
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

    public static async update(req: EventRequest, res: Response) {
        try {
            const id = req.params.id;
            const { name, date, description } = req.body;
            const event = (await Event.findByPk(id, { include: User })) as EventModel;
            const currentImgUrl = event.imgUrl;
            const user = (await User.findByPk(event.userId)) as UserModel;

            console.log(user);

            if (!event)
                return res.status(404).json({
                    message: `Evento con id ${id} no existe`
                });

            if (user.id !== req.userId)
                return res.status(403).json({
                    message: "No esta autorizado a realizar esa operacion"
                });
                
                
            await event.update({
                name,
                description,
                date,
            });
                
            if( req.file ) {
                await fs.promises.unlink(`${PUBLIC_PATH}${event.imgUrl}`);
                const imgUrl = req.file.path.replace(/^public/, "");
                await event.update({ imgUrl });
            }
 
            res.status(200).json({
                message: "Event Updated!",
                event
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server internal error",
                errors: err.message
            });
        }
    }

    public static async delete(req: DeleteEventRequest, res: Response) {
        try {
            const event = (await Event.findByPk(req.params.id, {
                include: User
            })) as EventModel;

            if (!event)
                return res.status(404).json({
                    message: "Evento no encontrado"
                });

            if (event.user.id !== req.userId)
                return res.status(403).json({
                    message: "No esta autorizado a realizar esa operacion"
                });

            if (event.imgUrl) await fs.promises.unlink(`${PUBLIC_PATH}${event.imgUrl}`);

            await event.destroy();
            return res.status(200).json({
                message: `El evento con id ${event.id} ha sido eliminado correctamente`
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: `Ha ocurrido un error`
            });
        }
    }
}
