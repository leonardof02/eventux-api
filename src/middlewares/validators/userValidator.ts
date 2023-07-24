import { body } from "express-validator";
import { Middleware } from "express-validator/src/base";

export function userValidator(): Middleware[] {
    return [
      body('fullName')
        .notEmpty().withMessage('El nombre de usuario es requerido.')
        .matches(/^[a-zA-Z\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),
      body("email").isEmail().withMessage('El correo electrónico es inválido.'),
      body("password").isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
      body("facultyId").isNumeric().withMessage("La facultad no existe")
    ];
}