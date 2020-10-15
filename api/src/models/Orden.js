const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('orden', {
        priceNow:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM('carrito','creada','procesando','completa','cancelada'),
            allowNull:false
        }
    });
  };
  
