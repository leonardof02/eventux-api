import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User";
import { Faculty } from "../models/Faculty";
import { UserRequest } from "../types";
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

    public static async create(req: UserRequest, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty) return res.status(400).json({ errors });

        try {
            const { fullName, email, password, facultyId } = req.body;
            const encryptedPassword = bcrypt.hash(password, 10);
            await User.create({ fullName, email, encryptedPassword, facultyId });
            res.status(200).json({
                message: "User created successfully",
                user: {
                    fullName,
                    email
                }
            });
        }
        catch (err) {
            res.status(500).json({
                message: "Server internal error",
                errors: err.message
            });
        }
    }
}
