import { body } from "express-validator";
import { Middleware } from "express-validator/src/base";
import validateErrors from "./validateErrors";

export function userValidator(): Middleware[] {
    return [
        body("name")
            .notEmpty()
            .withMessage("El nombre del evento es requerido.")
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage("El nombre solo puede contener letras y espacios"),
        body("description").isString().withMessage("Descripcion invalida"),
        validateErrors
    ];
}
