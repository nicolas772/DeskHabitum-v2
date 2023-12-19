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
      if (user) return { success: false, status: 409, message: "El email ingresado no está disponible", title: "Error" };

      await User.create({
         nombre: nombre,
         apellido: apellido,
         email: email,
         password: bcrypt.hashSync(password, 8)
      });

      return { success: true, status: 200, message: "Usuario registrado correctamente", title: "Información" };
   } catch (error) {
      console.error('Error al registrar usuario:', error);

      if (error.name === 'SequelizeUniqueConstraintError') {
         return { success: false, status: 409, message: "El email ingresado no está disponible", title: "Error" };
      }

      return { success: false, status: 500, message: "Error interno del servidor", title: "Error" };
   }
}

async function login(datosUsuario) {
   try {
      // Lógica para guardar el usuario en la base de datos utilizando Sequelize
      const { email, password } = datosUsuario
      const user = await User.findOne({
         where: {
            email: email
         }
      })
      if (!user) return { success: false, status: 409, message: "Email no encontrado", title: "Error" };

      var passwordIsValid = bcrypt.compareSync(
         password,
         user.password
      );

      if (!passwordIsValid) return { success: false, status: 401, message: "Contraseña incorrecta", title: "Error" }

      var token = jwt.sign({ id: user.id }, config.secret, {
         expiresIn: 8640000000
       });

       return {
         success: true,
         status: 200,
         message: "Usuario encontrado",
         title: "Información",
         data : {id: user.id,
         nombre: user.nombre,
         apellido: user.apellido,
         email: user.email,
         accessToken: token},
       }
   } catch (error) {
      console.error('Error en Login usuario:', error);

      if (error.name === 'SequelizeUniqueConstraintError') {
         return { success: false, status: 409, message: "El email ingresado no está registrado", title: "Error" };
      }

      return { success: false, status: 500, message: "Error interno del servidor", title: "Error" };
   }
}

module.exports = { 
   signup,
   login,
};