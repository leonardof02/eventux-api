import { Request } from "express"

export interface UserRequest extends Request {
    body: User
}

interface User {
    id: number,
    fullName: string,
    email: string,
    password?: string,
    profileImgUrl?: string,
    isAdmin?: boolean,
    facultyId?: number
}