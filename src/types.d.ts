import { Request } from "express";
import { Model, DataTypes } from "sequelize";

// ---------- Extended Express Request
export interface UserRequest extends Request {
    body: User;
}

export interface EventRequest extends Request {
    body: Event,
    userId: number
}

export interface DeleteUserRequest extends Request {
    params: { id: string };
    userId: number;
}

// ---------- Main Types
interface User {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    profileImgUrl?: string;
    isAdmin?: boolean;
    facultyId?: number;
}

interface Event {
    name: string,
    description: string,
    imgUrl?: string,
    date?: string,
    attachedFileUrl?: string
}

// ---------- Models
export class UserModel extends Model<User> implements User {
    public id: number;
    public username: string;
    public email: string;
    public password: string;
}

export class EventModel extends Model<Event> implements Event {
    public name: string;
    public description: string;
    public imgUrl: string;
    public date: string;
    public attachedFileUrl: string;
}

// ---------- Configs
export type MulterErrorCallback = (error: Error | null, filename: string) => void;

export interface MulterConfigCallback {
    req: Request,
    file: Express.Multer.File,
    cb: MulterErrorCallback
}