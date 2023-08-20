import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/User";
import { UserModel, UserRequest, User as UserType } from "../types";
import { Middleware } from "express-validator/src/base";

export default class Authenticator {
    static generateToken(userId: number): string {
        const token = jwt.sign({ id: userId }, "secret", { expiresIn: "7d" });
        return token;
    }

    static validateToken(token: string): boolean {
        try {
            jwt.verify(token, "secret");
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    static decodeToken(token: string): { id: number } {
        return jwt.decode(token) as { id: number };
    }

    static async authenticate(req: UserRequest, res: Response) {
        const { email, password } = req.body;
        try {
            const user: UserModel = (await User.findOne({ where: { email } })) as UserModel;
            if(!user)
                return res.status(404).json({message: "El usuario no existe"})
            if (await bcrypt.compare(password, user.password)) {
                const token = Authenticator.generateToken(user.id);
                return res.status(200).json({ token });
            }
            res.status(401).json({ message: "Invalid Credentials" });
        } catch (err) {
            console.log(err);
            if( err instanceof TokenExpiredError )
                return res.status(403).json({ message: "Sesion expirada, vuelva a autenticarse" });
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static isAuth(): Middleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization.split(" ")[1];
            if (Authenticator.validateToken(token)) {
                const userId = Authenticator.decodeToken(token).id;
                req["userId"] = userId;
                next();
            }
            else {
                res.status(403).json({ message: "User not authenticated" });
            }
        };
    }
}
