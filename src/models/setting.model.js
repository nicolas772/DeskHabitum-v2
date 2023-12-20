module.exports = (sequelize, Sequelize) => {
   const Setting = sequelize.define("settings", {
      morderunha: {
         type: Sequelize.BOOLEAN,
         defaultValue: true,
      },
      morderobjetos: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      jalarpelo: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      fatigavisual: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      malapostura: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      pellizcarpiel: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      hurgarnariz: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      alertavisual: {
         type: Sequelize.BOOLEAN,
         defaultValue: true,
      },
      intervalonotificacion: {
         type: Sequelize.STRING,
         defaultValue: "0",
      },
      tiemponotificacion: {
         type: Sequelize.STRING,
         defaultValue: "0",
      },
      tiponotificacion: {
         type: Sequelize.STRING,
         defaultValue: "tiempo",
      },
      duracionpomo: {
         type: Sequelize.INTEGER,
         defaultValue: 25,
      },
      duracionshortbreak: {
         type: Sequelize.INTEGER,
         defaultValue: 5,
      },
      duracionlongbreak: {
         type: Sequelize.INTEGER,
         defaultValue: 15,
      },
      intervalolongbreak: {
         type: Sequelize.INTEGER,
         defaultValue: 4,
      },
      cantidadpomodoros: {
         type: Sequelize.INTEGER,
         defaultValue: 4,
      },
      sonidonotificaciongeneral: {
         type: Sequelize.STRING,
         defaultValue: "sound1",
      },
      temanotificacionmania: {
         type: Sequelize.STRING,
         defaultValue: "personalizado",
      },
      alertasonorageneral: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      unhasound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      mordersound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      pelosound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      fatigasound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      posturasound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      pielsound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      narizsound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t1",
      },
      fotounha: {
         type: Sequelize.BOOLEAN,
         defaultValue: false,
      },
      humanosound: {
         type: Sequelize.STRING,
         defaultValue: "sound1t4",
      },
   });

   return Setting;
};