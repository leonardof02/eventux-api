import { body } from "express-validator";

function userValidators() {
    return [
      body('name').notEmpty().withMessage('El nombre es requerido.'),
      body('email').isEmail().withMessage('El correo electrónico es inválido.'),
      body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    ];
  }
  
  module.exports = userValidators;