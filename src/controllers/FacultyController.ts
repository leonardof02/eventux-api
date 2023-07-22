import { Request, Response } from "express";
import FacultyModel from "../models/Faculty";
import dataSource from "../config/database";

export default class FacultyController {

    // Implement Controllers
    public static async getAll(req: Request, res: Response) {
        const Faculty = dataSource.getRepository(FacultyModel);
        const faculties = await Faculty.find();
        res.status(200).json({
            data: [...faculties]
        });
    }
}
