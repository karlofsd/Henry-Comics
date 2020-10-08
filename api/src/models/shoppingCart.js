const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('shoppingcard', {
    idKey: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priceTotal: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confimardo', 'pendiente'),
      allowNull: false,
    },
    address: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    paymentmethod: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    shipping: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
  });

};