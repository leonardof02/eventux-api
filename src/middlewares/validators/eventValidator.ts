import { check } from "express-validator";
import { Middleware } from "express-validator/src/base";
import validateErrors from "./validateErrors";

export default function eventValidator(): Middleware[] {
    return [
        check("name")
            .notEmpty()
            .withMessage("El nombre del evento es requerido.")
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage("El nombre solo puede contener letras y espacios"),
        check("description").notEmpty().withMessage("Debe existir una descripcion"),
        validateErrors
    ];
}
