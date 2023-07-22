import { Request, Response } from "express";
import User from "../models/User";


export default class UserController {

    // Implement Controllers
    public static async getAll( req: Request, res: Response ) {
        // const users = await User.find();
        // res.status(200).json([ ...users ]);
    }
}