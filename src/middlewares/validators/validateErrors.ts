import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default function validateErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ message: "Errores de validacion", errors });
    next();
}
