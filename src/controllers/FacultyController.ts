import { Request, Response } from "express";
import {Faculty} from "../models/Faculty";

export default class FacultyController {

    // Implement Controllers
    public static async getAll(req: Request, res: Response) {
        const faculties = await Faculty.findAll();
        res.status(200).json({
            data: [...faculties]
        });
    }
}
