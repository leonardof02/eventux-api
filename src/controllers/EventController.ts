import fs from "fs";

import { Request, Response } from "express";
import { User } from "../models/User";
import { Event } from "../models/Event";
import { DeleteEventRequest, EventModel, EventRequest } from "../types";
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

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors });

        try {
            const { name, date, description } = req.body;
            const newEvent = await Event.create({
                name,
                description,
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

    public static async delete( req: DeleteEventRequest, res: Response ) {

        try {

            const event = await Event.findByPk(req.params.id) as EventModel;
    
            if( ! event )
                return res.status(404).json({ 
                    message: "Evento no encontrado"
                })
    
            if( event.id !== req.userId  )
                return res.status(403).json({
                    message: "No esta autorizado a realizar esa operacion"
                })
    
            if( event.imgUrl )
                await fs.promises.unlink(`${PUBLIC_PATH}${event.imgUrl}`);
            
            await event.destroy();
            return res.status(200).json({
                message: `El evento con id ${ event.id } ha sido eliminado correctamente`
            })
        }
        catch ( err ) {
            console.error( err );
            return res.status(500).json({
                message: `Ha ocurrido un error`
            })
        }
    }
}
