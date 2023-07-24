import { Request } from "express";

export interface UserRequest extends Request {
    body: User;
}

interface User {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    profileImgUrl?: string;
    isAdmin?: boolean;
    facultyId?: number;
}

import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

export class UserModel extends Model<User> implements User {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}
