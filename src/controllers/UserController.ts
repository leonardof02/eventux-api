import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User";
import { Faculty } from "../models/Faculty";
import { DeleteUserRequest, UserModel, UserRequest } from "../types";
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
        if ( ! errors.isEmpty())
            return res.status(400).json({ message: "Errores de validacion", errors });

        try {
            const { fullName, email, password, facultyId } = req.body;
            const profileImgUrl = req.file ? req.file.path.replace(/^public/, "") : null;
            const user: UserModel = (await User.create({
                fullName,
                email,
                password: await bcrypt.hash(password, 10),
                facultyId,
                profileImgUrl
            })) as UserModel;
            const token = Authenticator.generateToken(user.id);
            res.status(200).json({
                message: "User created successfully",
                token,
                user: { fullName, email }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Server internal error",
                errors: err.message
            });
        }
    }

    public static async delete(req: DeleteUserRequest, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: "Errores de validacion", errors });

        const id = req.params.id;
        const user = (await User.findByPk(id)) as UserModel;

        // if (!(id === req.userId.toString()) && !user.dataValues.isAdmin)
        //     return res.status(403).json({
        //         message: "El usuario no tiene los permisos para esto"
        //     });

        if (user) {
            await user.destroy();
            return res.status(200).json({
                message: "Usuario eliminado correctamente",
                id: user.dataValues.id
            });
        }
        res.status(400).json({
            message: `El usuario con ID: ${ id } no existe`
        });
    }
}
