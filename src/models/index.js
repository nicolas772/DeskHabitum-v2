const config = require('../config/db.config')
const Sequelize = require("sequelize")

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.setting = require('./setting.model')(sequelize, Sequelize);

// Definir relación 1 a 1 con Setting
db.user.hasOne(db.setting, {
  foreignKey: 'userId', // Nombre de la clave foránea en Setting
});

db.setting.belongsTo(db.user);


db.user.afterCreate(async (user, options) => {
  try {
    // Crea un registro en la tabla Setting con los valores predeterminados
    const setting = await db.setting.create({
      userId: user.id, // Asigna la clave foránea
    });
  } catch (error) {
    console.error('Error al crear el registro en Setting:', error);
  }
});

module.exports = db;