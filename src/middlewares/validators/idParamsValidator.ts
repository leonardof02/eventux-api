import { check } from "express-validator";
import { Middleware } from "express-validator/src/base";
import validateErrors from "./validateErrors";

export function idParams(): Middleware[] {
    return [
        check("id")
            .notEmpty()
            .withMessage("No existe el id")
            .isInt()
            .withMessage("Id invalido"),
        validateErrors
    ];
}
