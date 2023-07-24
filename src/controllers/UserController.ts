import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User";
import { Faculty } from "../models/Faculty";
import { UserModel, UserRequest } from "../types";
import Authenticator from "../security/Authenticator";
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
        if (!errors.isEmpty()) return res.status(400).json({ errors });

        try {
            const { fullName, email, password, facultyId } = req.body;
            const encryptedPassword = await bcrypt.hash(password, 10);
            console.log(encryptedPassword);
            const user: UserModel = (await User.create({
                fullName,
                email,
                password: encryptedPassword,
                facultyId
            })) as UserModel;
            const token = Authenticator.generateToken(user.id);
            res.status(200).json({
                message: "User created successfully",
                token,
                user: {
                    fullName,
                    email
                }
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
