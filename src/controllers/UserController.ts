import fs from "fs";

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Authenticator from "../security/Authenticator";
import { PUBLIC_PATH } from "../config/paths";
import { DeleteUserRequest, UserModel, UserRequest } from "../types";
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

    public static async create(req: UserRequest, res: Response) {
        try {
            const { fullName, email, password, facultyId } = req.body;
            const profileImgUrl = req.file ? req.file.path.replace(/^public/, "") : null;

            const existentUser = await User.findOne({ where: { email } });

            if( existentUser )
                return res.status(403).json({ message: "Ya existe un usuario con ese correo" })

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

        const id = req.params.id;
        const user = (await User.findByPk(id)) as UserModel;

        try {
            if (user) {
                if (user.dataValues.profileImgUrl)
                    await fs.promises.unlink(`${PUBLIC_PATH}${user.dataValues.profileImgUrl}`);
                await user.destroy();
                return res.status(200).json({
                    message: "Usuario eliminado correctamente",
                    id: user.dataValues.id
                });
            }
            res.status(400).json({
                message: `El usuario con ID: ${id} no existe`
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: `Ha ocurrido un error a la hora de borrar`
            });
        }
    }
}