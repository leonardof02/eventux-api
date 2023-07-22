import { Request, Response } from "express";
import { User } from "../models/User";
import { Faculty } from "../models/Faculty";

export default class UserController {
    // Implement Controllers
    public static async getAll(req: Request, res: Response) {
        const users = await User.findAll({
            include: Faculty
        });
        res.status(200).json({
            data: users
        });
    }
}
