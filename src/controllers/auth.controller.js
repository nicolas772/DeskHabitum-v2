const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function signup(datosUsuario) {
   try {
      // Lógica para guardar el usuario en la base de datos utilizando Sequelize
      const { nombre, apellido, email, password } = datosUsuario
      const user = await User.findOne({
         where: {
            email: email
         }
      })
      if (user) return { status: 409, message: "El email ingresado no está disponible", title: "Error" };

      await User.create({
         nombre: nombre,
         apellido: apellido,
         email: email,
         password: bcrypt.hashSync(password, 8)
      });

      return { status: 200, message: "Usuario registrado correctamente", title: "Información"};
   } catch (error) {
      console.error('Error al registrar usuario:', error);

      if (error.name === 'SequelizeUniqueConstraintError') {
         return { status: 409, message: "El email ingresado no está disponible", title: "Error" };
      }

      return { status: 500, message: "Error interno del servidor", title: "Error" };
   }
}

module.exports = { signup };