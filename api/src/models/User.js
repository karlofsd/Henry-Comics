const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
				isEmail: true,
			},
        }
    });
  };
  
