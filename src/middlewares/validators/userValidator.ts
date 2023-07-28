import { body } from "express-validator";
import { Middleware } from "express-validator/src/base";
import { Faculty } from "../../models/Faculty";
import validateErrors from "./validateErrors";

export function userValidator(): Middleware[] {
    return [
        body("fullName")
            .notEmpty()
            .withMessage("El nombre de usuario es requerido.")
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage("El nombre solo puede contener letras y espacios"),
        body("email")
            .notEmpty()
            .withMessage("El email es requerido")
            .isEmail()
            .withMessage("El correo electrónico es inválido."),
        body("password")
            .isLength({ min: 6 })
            .withMessage("La contraseña debe tener al menos 6 caracteres."),
        body("facultyId")
            .isNumeric()
            .withMessage("La facultad no existe"),
        body("facultyId")
            .isNumeric()
            .withMessage("Facultad invalida")
            .custom( async ( id ) => {
                    const faculty = await Faculty.findByPk(id);
                    console.log(faculty);
                    if( ! faculty )
                        throw new Error("La facultad no existe");
                    return true;
            }),
        validateErrors
    ];
}
