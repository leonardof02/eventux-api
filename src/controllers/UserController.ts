import { Request, Response } from "express";


export default class UserController {

    // Implement Controllers
    public static async sayHello( req: Request, res: Response ) {
        res.send("Hello World!");
    }
}